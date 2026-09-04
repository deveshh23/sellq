import { NextResponse } from 'next/server';
import { getProductById } from '@/lib/catalog';
import razorpay from '@/lib/razorpay';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { saveLocalPaymentAttempt } from '@/lib/payments/store';
import { PaymentAttempt } from '@/types';

const SIMULATE_FAILURE_PRODUCT_ID = 'prod_simulate_failure';

export async function POST(req: Request) {
  const body = await req.json();
  const { conversationId, productId } = body;

  if (!conversationId || typeof conversationId !== 'string') {
    return NextResponse.json(
      { error: 'conversationId is required' },
      { status: 400 }
    );
  }

  if (!productId || typeof productId !== 'string') {
    return NextResponse.json(
      { error: 'productId is required' },
      { status: 400 }
    );
  }

  const product = getProductById(productId);

  if (!product) {
    const attempt: PaymentAttempt = {
      id: `pa-${Date.now()}`,
      conversationId,
      productId,
      amount: 0,
      currency: 'INR',
      status: 'failed',
      errorMessage: 'Requested product_id not found in catalog.',
      createdAt: new Date().toISOString(),
    };

    await persistAttempt(attempt);
    return NextResponse.json(
      { error: 'Requested product is not available.' },
      { status: 400 }
    );
  }

  if (productId === SIMULATE_FAILURE_PRODUCT_ID) {
    const simulatedError =
      'Simulated Razorpay API failure: test-mode credentials rejected (razorpay_error_400).';
    const attempt: PaymentAttempt = {
      id: `pa-${Date.now()}`,
      conversationId,
      productId,
      productName: product.name,
      amount: product.amountPaise,
      currency: product.currency,
      status: 'failed',
      errorMessage: simulatedError,
      createdAt: new Date().toISOString(),
    };

    await persistAttempt(attempt);
    return NextResponse.json(
      { error: simulatedError, simulatedFailure: true },
      { status: 400 }
    );
  }

  let razorpayLink: unknown = null;

  let customerName = 'Valued Customer';
  let customerEmail = 'customer@sellq.ai';

  try {
    const { data: conv, error: convError } = await supabaseAdmin
      .from('conversations')
      .select('contact_name, contact_email')
      .eq('id', conversationId)
      .single();

    if (!convError && conv) {
      customerName = conv.contact_name || customerName;
      customerEmail = conv.contact_email || customerEmail;
    }
  } catch {
    /* non-critical — fall back to generic customer info */
  }

  try {
    razorpayLink = await razorpay.paymentLink.create({
      amount: product.amountPaise,
      currency: product.currency,
      description: `SellQ payment — ${product.name}`,
      customer: {
        name: customerName,
        email: customerEmail,
        contact: '919999999999',
      },
      notify: {
        email: true,
        sms: true,
      },
      callback_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/payments/callback`,
      callback_method: 'get',
      notes: {
        product_id: product.productId,
        conversation_id: conversationId,
      },
    });
  } catch (error: unknown) {
    const errorMsg =
      typeof (error as { message?: string })?.message === 'string'
        ? (error as { message: string }).message
        : 'Razorpay Payment Link API call failed.';

    const attempt: PaymentAttempt = {
      id: `pa-${Date.now()}`,
      conversationId,
      productId,
      productName: product.name,
      amount: product.amountPaise,
      currency: product.currency,
      status: 'failed',
      errorMessage: errorMsg,
      createdAt: new Date().toISOString(),
    };

    await persistAttempt(attempt);

    return NextResponse.json(
      { error: errorMsg, razorpayError: true },
      { status: 502 }
    );
  }

  const linkUrl: string | undefined =
    (razorpayLink as { short_url?: string; url?: string; long_url?: string })?.short_url ||
    (razorpayLink as { short_url?: string; url?: string; long_url?: string })?.url ||
    (razorpayLink as { short_url?: string; url?: string; long_url?: string })?.long_url;
  const linkId: string | undefined =
    (razorpayLink as { id?: string; paymentLinkId?: string })?.id ||
    (razorpayLink as { id?: string; paymentLinkId?: string })?.paymentLinkId;

  const attempt: PaymentAttempt = {
    id: `pa-${Date.now()}`,
    conversationId,
    productId,
    productName: product.name,
    amount: product.amountPaise,
    currency: product.currency,
    status: 'pending',
    razorpayLinkId: linkId,
    razorpayPaymentLinkUrl: linkUrl,
    createdAt: new Date().toISOString(),
  };

  await persistAttempt(attempt);

  return NextResponse.json({
    success: true,
    paymentLinkId: linkId,
    paymentLinkUrl: linkUrl,
    amount: product.amountPaise,
    currency: product.currency,
    productName: product.name,
    productDescription: product.description,
  });
}

async function persistAttempt(attempt: PaymentAttempt): Promise<void> {
  try {
    const { error } = await supabaseAdmin
      .from('payment_attempts')
      .insert({
        conversation_id: attempt.conversationId,
        user_id: null,
        product_id: attempt.productId,
        amount: attempt.amount,
        currency: attempt.currency,
        status: attempt.status,
        razorpay_link_id: attempt.razorpayLinkId,
        razorpay_payment_link_url: attempt.razorpayPaymentLinkUrl,
        error_message: attempt.errorMessage,
        created_at: attempt.createdAt,
      })
      .select()
      .single();

    if (error) {
      console.warn('[Payments] Supabase insert error (falling back to local):', error.message);
      await saveLocalPaymentAttempt(attempt);
    }
  } catch (error) {
    console.warn('[Payments] Supabase insert failed (falling back to local):', error);
    await saveLocalPaymentAttempt(attempt);
  }
}
