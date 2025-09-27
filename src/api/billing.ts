import type { BillingTier } from '../types';

export const getBillingTiers = async (): Promise<BillingTier[]> => {
  return [
    {
      id: 'starter',
      name: 'Starter',
      price: 0,
      features: [
        '1 repository',
        '50 queries per month',
        'Basic code analysis',
        'Community support'
      ],
      limits: {
        repos: 1,
        queries: 50
      }
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 29,
      features: [
        '10 repositories',
        '500 queries per month',
        'Advanced AI insights',
        'Priority support',
        'Custom onboarding guides'
      ],
      limits: {
        repos: 10,
        queries: 500
      }
    },
    {
      id: 'team',
      name: 'Team',
      price: 99,
      features: [
        'Unlimited repositories',
        'Unlimited queries',
        'Team collaboration',
        'Advanced analytics',
        'Custom integrations',
        'Dedicated support'
      ],
      limits: {
        repos: -1,
        queries: -1
      }
    }
  ];
};

export const createCheckoutSession = async (tierId: string): Promise<{ url: string }> => {
  // Mock Stripe checkout session creation
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    url: `https://checkout.stripe.com/pay/cs_test_${tierId}#fidkdWxOYHwnPyd1blpxYHZxWjA0T1JCNlRJVGxSYUdgNndVMHI2SEVuNEhIcmQxZH13NkJkUFdoSjM5fEhKdjRoUnxqbmJKd35qV0liZ1VHfUNLPCcpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPydocGlxbFpscWBoJyknaWpmamFqZWqnKGZpamZscmJ1cmc`
  };
};
