import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, CreditCard } from 'lucide-react';
import { getBillingTiers, createCheckoutSession } from '../api/billing';
import type { BillingTier } from '../types';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function Billing() {
  const [tiers, setTiers] = useState<BillingTier[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const [currentPlan] = useState('starter'); // Mock current plan

  useEffect(() => {
    loadTiers();
  }, []);

  const loadTiers = async () => {
    try {
      setLoading(true);
      const tiersData = await getBillingTiers();
      setTiers(tiersData);
    } catch (error) {
      console.error('Failed to load billing tiers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async (tierId: string) => {
    try {
      setCheckoutLoading(tierId);
      const { url } = await createCheckoutSession(tierId);
      window.open(url, '_blank');
    } catch (error) {
      console.error('Failed to create checkout session:', error);
    } finally {
      setCheckoutLoading(null);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <LoadingSpinner size="lg" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Choose your plan
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Unlock the full potential of AI-powered code analysis. 
              Start free and upgrade as your needs grow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`relative h-full ${
                  tier.id === 'pro' ? 'ring-2 ring-blue-500' : ''
                }`}>
                  {tier.id === 'pro' && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge variant="info">Most Popular</Badge>
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {tier.name}
                      </h3>
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-bold text-gray-900">
                          ${tier.price}
                        </span>
                        <span className="text-gray-600 ml-1">
                          {tier.price > 0 ? '/month' : ''}
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="space-y-3">
                      {currentPlan === tier.id ? (
                        <Button
                          variant="outline"
                          size="lg"
                          disabled
                          className="w-full"
                        >
                          Current Plan
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleUpgrade(tier.id)}
                          loading={checkoutLoading === tier.id}
                          size="lg"
                          variant={tier.id === 'pro' ? 'primary' : 'outline'}
                          className="w-full"
                        >
                          <CreditCard className="w-4 h-4 mr-2" />
                          {tier.price === 0 ? 'Get Started' : 'Upgrade'}
                        </Button>
                      )}
                    </div>

                    <div className="mt-4 text-xs text-gray-500 text-center">
                      <div>
                        {tier.limits.repos === -1 ? 'Unlimited' : tier.limits.repos} repositories
                      </div>
                      <div>
                        {tier.limits.queries === -1 ? 'Unlimited' : tier.limits.queries} queries/month
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Questions about pricing?
            </h3>
            <p className="text-gray-600 mb-6">
              Contact our sales team for custom enterprise solutions.
            </p>
            <Button variant="outline">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
