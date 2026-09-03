import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { listLocalPaymentAttempts } from '@/lib/payments/store';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Number(searchParams.get('limit') || 100);

    const { data, error } = await supabaseAdmin
      .from('payment_attempts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.warn('[Payments List] Supabase query error (falling back to local):', error.message);
    } else if (data && data.length > 0) {
      return NextResponse.json({ attempts: data });
    }

    const localAttempts = await listLocalPaymentAttempts();
    return NextResponse.json({ attempts: localAttempts.slice(0, limit) });
  } catch (error) {
    console.error('[Payments List] Error:', error);
    const localAttempts = await listLocalPaymentAttempts();
    return NextResponse.json({ attempts: localAttempts });
  }
}
