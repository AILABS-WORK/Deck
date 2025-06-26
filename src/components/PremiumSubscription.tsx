import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Zap, Star, Check, Sparkles, TrendingUp, Shield, Users } from 'lucide-react';

interface PremiumPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  color: string;
}

interface PremiumSubscriptionProps {
  onSubscribe?: (planId: string) => void;
}

const PremiumSubscription: React.FC<PremiumSubscriptionProps> = ({ onSubscribe }) => {
  const [selectedPlan, setSelectedPlan] = useState<string>('pro');
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const plans: PremiumPlan[] = [
    {
      id: 'basic',
      name: 'DECK\'D Basic',
      price: billingPeriod === 'monthly' ? 0 : 0,
      period: 'Free Forever',
      description: 'Perfect for getting started with sustainable shopping',
      features: [
        'Basic auction bidding',
        'Standard style recommendations',
        'Basic room photo upload',
        'Community access',
        'Standard support'
      ],
      color: 'sage'
    },
    {
      id: 'pro',
      name: 'DECK\'D Pro',
      price: billingPeriod === 'monthly' ? 9.99 : 99.99,
      period: billingPeriod === 'monthly' ? '/month' : '/year',
      description: 'Advanced AI features and premium tools',
      features: [
        'Everything in Basic',
        'Advanced AI style generation',
        'AR room visualization',
        'Custom style prompts',
        'Priority auction notifications',
        'Advanced analytics dashboard',
        'Premium customer support',
        'Early access to new features'
      ],
      popular: true,
      color: 'primary'
    },
    {
      id: 'premium',
      name: 'DECK\'D Premium',
      price: billingPeriod === 'monthly' ? 19.99 : 199.99,
      period: billingPeriod === 'monthly' ? '/month' : '/year',
      description: 'Complete platform access with exclusive benefits',
      features: [
        'Everything in Pro',
        'Unlimited AI generations',
        'Professional room consultations',
        'Exclusive premium auctions',
        'Advanced social features',
        'Custom badges and recognition',
        'White-glove concierge service',
        'Campus ambassador program',
        'Revenue sharing on referrals'
      ],
      color: 'accent'
    }
  ];

  const premiumFeatures = [
    {
      icon: Sparkles,
      title: 'AI-Powered Everything',
      description: 'Advanced AI for style generation, room analysis, and personalized recommendations'
    },
    {
      icon: TrendingUp,
      title: 'Advanced Analytics',
      description: 'Detailed insights into your spending, savings, and environmental impact'
    },
    {
      icon: Shield,
      title: 'Premium Protection',
      description: 'Enhanced buyer protection, priority dispute resolution, and insurance coverage'
    },
    {
      icon: Users,
      title: 'Exclusive Community',
      description: 'Access to premium-only events, challenges, and networking opportunities'
    }
  ];

  const handleSubscribe = (planId: string) => {
    onSubscribe?.(planId);
    // Simulate subscription process
    alert(`Subscribing to ${plans.find(p => p.id === planId)?.name}...`);
  };

  const getColorClasses = (color: string, variant: 'bg' | 'text' | 'border' = 'bg') => {
    const colorMap = {
      sage: {
        bg: 'bg-gradient-sage',
        text: 'text-sage-400',
        border: 'border-sage-400'
      },
      primary: {
        bg: 'bg-gradient-primary',
        text: 'text-primary-400',
        border: 'border-primary-400'
      },
      accent: {
        bg: 'bg-gradient-secondary',
        text: 'text-accent-400',
        border: 'border-accent-400'
      }
    };
    return colorMap[color as keyof typeof colorMap]?.[variant] || '';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Crown className="text-accent-400 mr-3" size={32} />
          <h2 className="text-3xl font-display font-bold text-white">
            Upgrade to Premium
          </h2>
        </div>
        <p className="text-sage-300 max-w-2xl mx-auto">
          Unlock the full potential of DECK'D with advanced AI features, 
          premium tools, and exclusive community access
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex items-center justify-center">
        <div className="bg-charcoal-800 rounded-xl p-1 flex">
          <button
            onClick={() => setBillingPeriod('monthly')}
            className={`px-6 py-2 rounded-lg transition-all duration-200 ${
              billingPeriod === 'monthly'
                ? 'bg-gradient-sage text-white shadow-lg'
                : 'text-sage-300 hover:text-white'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingPeriod('yearly')}
            className={`px-6 py-2 rounded-lg transition-all duration-200 relative ${
              billingPeriod === 'yearly'
                ? 'bg-gradient-sage text-white shadow-lg'
                : 'text-sage-300 hover:text-white'
            }`}
          >
            Yearly
            <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs px-2 py-1 rounded-full">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative bg-sage-900/20 backdrop-blur-lg rounded-2xl p-6 border transition-all duration-300 ${
              plan.popular 
                ? 'border-primary-400 ring-2 ring-primary-400/20 scale-105' 
                : 'border-sage-700 hover:border-sage-500'
            }`}
          >
            {/* Popular Badge */}
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-primary text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                  <Star size={14} className="mr-1" />
                  Most Popular
                </div>
              </div>
            )}

            {/* Plan Header */}
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-sage-400 text-sm mb-4">{plan.description}</p>
              <div className="mb-4">
                <span className="text-4xl font-bold text-white">${plan.price}</span>
                <span className="text-sage-400 ml-1">{plan.period}</span>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <Check size={16} className={`${getColorClasses(plan.color, 'text')} mr-3 mt-0.5 flex-shrink-0`} />
                  <span className="text-sage-300 text-sm">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={() => handleSubscribe(plan.id)}
              className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                plan.id === 'basic'
                  ? 'bg-sage-700 text-white hover:bg-sage-600'
                  : `${getColorClasses(plan.color)} text-white hover:shadow-premium transform hover:scale-105`
              }`}
            >
              {plan.id === 'basic' ? 'Current Plan' : 'Upgrade Now'}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Premium Features Showcase */}
      <div className="bg-sage-900/20 backdrop-blur-lg rounded-2xl p-8 border border-sage-700">
        <h3 className="text-2xl font-bold text-white text-center mb-8">
          Why Go Premium?
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {premiumFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start"
            >
              <div className="p-3 bg-gradient-sage rounded-xl mr-4 flex-shrink-0">
                <feature.icon size={24} className="text-white" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                <p className="text-sage-300">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Money Back Guarantee */}
      <div className="text-center bg-sage-500/10 border border-sage-500/20 rounded-xl p-6">
        <div className="flex items-center justify-center mb-3">
          <Shield className="text-sage-400 mr-2" size={24} />
          <span className="text-sage-400 font-medium">30-Day Money Back Guarantee</span>
        </div>
        <p className="text-sage-300 text-sm">
          Try DECK'D Premium risk-free. If you're not completely satisfied, 
          we'll refund your subscription within 30 days.
        </p>
      </div>

      {/* Student Discount */}
      <div className="text-center bg-accent-500/10 border border-accent-500/20 rounded-xl p-6">
        <div className="flex items-center justify-center mb-3">
          <Zap className="text-accent-400 mr-2" size={24} />
          <span className="text-accent-400 font-medium">Student Discount Available</span>
        </div>
        <p className="text-sage-300 text-sm">
          Verified students get 50% off all premium plans. 
          Your .edu email automatically qualifies you for student pricing.
        </p>
      </div>
    </div>
  );
};

export default PremiumSubscription;