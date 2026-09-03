export interface Product {
  productId: string;
  name: string;
  description: string;
  amountPaise: number;
  currency: string;
  metadata?: Record<string, unknown>;
}

export const CURRENCY = 'INR' as const;

export const PRODUCT_CATALOG: readonly Product[] = [
  {
    productId: 'prod_starter_1mo',
    name: 'Starter Plan — 1 month',
    description: 'Up to 5 agents, 500 conversations/month, core AI replies.',
    amountPaise: 49900,
    currency: CURRENCY,
    metadata: { plan: 'starter', duration: '1 month', agents: 5 },
  },
  {
    productId: 'prod_growth_1mo',
    name: 'Growth Plan — 1 month',
    description: 'Up to 25 agents, 5,000 conversations/month, all AI features + analytics.',
    amountPaise: 149900,
    currency: CURRENCY,
    metadata: { plan: 'growth', duration: '1 month', agents: 25 },
  },
  {
    productId: 'prod_pro_1mo',
    name: 'Pro Plan — 1 month',
    description: 'Unlimited agents, unlimited conversations, priority support + custom integrations.',
    amountPaise: 299900,
    currency: CURRENCY,
    metadata: { plan: 'pro', duration: '1 month', agents: 'unlimited' },
  },
  {
    productId: 'prod_enterprise_1mo',
    name: 'Enterprise Plan — 1 month',
    description: 'Dedicated account manager, custom SLA, compliance features (SOC 2, GDPR).',
    amountPaise: 599900,
    currency: CURRENCY,
    metadata: { plan: 'enterprise', duration: '1 month', agents: 'unlimited' },
  },
  {
    productId: 'prod_addon_consulting',
    name: 'AI Strategy Consulting Session',
    description: '60-minute personalized AI workflow consultation with our solutions architect.',
    amountPaise: 19900,
    currency: CURRENCY,
    metadata: { service: 'consulting', duration: '60 minutes' },
  },
  {
    productId: 'prod_simulate_failure',
    name: '[TEST] Simulate Payment Failure',
    description: 'Test product that triggers a simulated Razorpay API error for failure-path demos. Not available for real customers.',
    amountPaise: 100,
    currency: CURRENCY,
    metadata: { simulateFailure: true, testOnly: true },
  },
] as const;

export function getProductById(productId: string): Product | undefined {
  return PRODUCT_CATALOG.find((p) => p.productId === productId);
}
