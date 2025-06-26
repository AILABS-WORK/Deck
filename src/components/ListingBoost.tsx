import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Star, TrendingUp, Eye, Clock, DollarSign, Crown, Target } from 'lucide-react';

interface BoostOption {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  icon: React.ComponentType<any>;
  color: string;
  popular?: boolean;
}

interface ListingBoostProps {
  listingId?: string;
  onBoostPurchase?: (boostId: string, listingId: string) => void;
}

const ListingBoost: React.FC<ListingBoostProps> = ({ listingId, onBoostPurchase }) => {
  const [selectedBoost, setSelectedBoost] = useState<string>('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const boostOptions: BoostOption[] = [
    {
      id: 'featured',
      name: 'Featured Listing',
      price: 2.99,
      duration: '24 hours',
      features: [
        'Top of search results',
        'Featured badge',
        '3x more views',
        'Priority in recommendations'
      ],
      icon: Star,
      color: 'text-accent-400',
      popular: true
    },
    {
      id: 'spotlight',
      name: 'Spotlight Boost',
      price: 4.99,
      duration: '48 hours',
      features: [
        'Homepage spotlight',
        'Featured + Spotlight badges',
        '5x more views',
        'Push notifications to followers',
        'Social media promotion'
      ],
      icon: Zap,
      color: 'text-secondary-400'
    },
    {
      id: 'premium',
      name: 'Premium Placement',
      price: 7.99,
      duration: '7 days',
      features: [
        'Week-long featured status',
        'Premium badge',
        '10x more views',
        'Email newsletter inclusion',
        'Cross-platform promotion',
        'Analytics dashboard'
      ],
      icon: Crown,
      color: 'text-sage-400'
    }
  ];

  const handleBoostPurchase = (boostId: string) => {
    setSelectedBoost(boostId);
    setShowConfirmation(true);
  };

  const confirmPurchase = () => {
    if (selectedBoost && listingId) {
      onBoostPurchase?.(selectedBoost, listingId);
      setShowConfirmation(false);
      setSelectedBoost('');
      // Show success message
      alert('Boost purchased successfully! Your listing is now featured.');
    }
  };

  const boostStats = {
    averageViews: '250%',
    fasterSale: '3.2x',
    higherBids: '18%'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <TrendingUp className="text-sage-400 mr-3" size={32} />
          <h2 className="text-3xl font-display font-bold text-white">
            Boost Your Listing
          </h2>
        </div>
        <p className="text-sage-300 max-w-2xl mx-auto">
          Get more visibility and sell faster with our listing boost options. 
          Featured listings get significantly more views and higher bids.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-sage-900/20 backdrop-blur-lg rounded-xl p-4 border border-sage-700 text-center">
          <div className="flex items-center justify-center mb-2">
            <Eye className="text-sage-400 mr-2" size={20} />
            <span className="text-2xl font-bold text-white">{boostStats.averageViews}</span>
          </div>
          <p className="text-sm text-sage-400">More Views</p>
        </div>
        <div className="bg-sage-900/20 backdrop-blur-lg rounded-xl p-4 border border-sage-700 text-center">
          <div className="flex items-center justify-center mb-2">
            <Clock className="text-accent-400 mr-2" size={20} />
            <span className="text-2xl font-bold text-white">{boostStats.fasterSale}</span>
          </div>
          <p className="text-sm text-sage-400">Faster Sales</p>
        </div>
        <div className="bg-sage-900/20 backdrop-blur-lg rounded-xl p-4 border border-sage-700 text-center">
          <div className="flex items-center justify-center mb-2">
            <DollarSign className="text-secondary-400 mr-2" size={20} />
            <span className="text-2xl font-bold text-white">{boostStats.higherBids}</span>
          </div>
          <p className="text-sm text-sage-400">Higher Bids</p>
        </div>
      </div>

      {/* Boost Options */}
      <div className="grid md:grid-cols-3 gap-6">
        {boostOptions.map((boost) => (
          <motion.div
            key={boost.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative bg-sage-900/20 backdrop-blur-lg rounded-2xl p-6 border transition-all duration-300 cursor-pointer ${
              boost.popular 
                ? 'border-accent-400 ring-2 ring-accent-400/20 scale-105' 
                : 'border-sage-700 hover:border-sage-500'
            }`}
            onClick={() => handleBoostPurchase(boost.id)}
          >
            {/* Popular Badge */}
            {boost.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-secondary text-charcoal-900 px-4 py-1 rounded-full text-sm font-medium flex items-center">
                  <Target size={14} className="mr-1" />
                  Most Popular
                </div>
              </div>
            )}

            {/* Boost Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-sage rounded-full flex items-center justify-center mx-auto mb-4">
                <boost.icon size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{boost.name}</h3>
              <div className="mb-2">
                <span className="text-3xl font-bold text-white">${boost.price}</span>
              </div>
              <p className="text-sage-400">{boost.duration}</p>
            </div>

            {/* Features */}
            <div className="space-y-3 mb-6">
              {boost.features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-5 h-5 bg-sage-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-sage-300 text-sm">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button
              className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                boost.popular
                  ? 'bg-gradient-secondary text-charcoal-900 hover:shadow-premium transform hover:scale-105'
                  : 'bg-gradient-sage text-white hover:shadow-premium transform hover:scale-105'
              }`}
            >
              Boost Now
            </button>
          </motion.div>
        ))}
      </div>

      {/* How It Works */}
      <div className="bg-sage-900/20 backdrop-blur-lg rounded-2xl p-6 border border-sage-700">
        <h3 className="text-xl font-semibold text-white mb-4">How Listing Boosts Work</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-sage rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-white font-bold">1</span>
            </div>
            <h4 className="font-medium text-white mb-2">Choose Your Boost</h4>
            <p className="text-sage-400 text-sm">Select the boost level that fits your needs and budget</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-sage rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-white font-bold">2</span>
            </div>
            <h4 className="font-medium text-white mb-2">Get Featured</h4>
            <p className="text-sage-400 text-sm">Your listing appears at the top of search results with special badges</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-sage rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-white font-bold">3</span>
            </div>
            <h4 className="font-medium text-white mb-2">Sell Faster</h4>
            <p className="text-sage-400 text-sm">Get more views, higher bids, and sell your items quicker</p>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-charcoal-900 rounded-2xl p-6 border border-sage-700 max-w-md w-full"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Confirm Boost Purchase</h3>
            
            {selectedBoost && (
              <div className="mb-6">
                <div className="bg-sage-900/20 rounded-xl p-4 border border-sage-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">
                      {boostOptions.find(b => b.id === selectedBoost)?.name}
                    </span>
                    <span className="text-sage-400 font-bold">
                      ${boostOptions.find(b => b.id === selectedBoost)?.price}
                    </span>
                  </div>
                  <p className="text-sage-400 text-sm">
                    Duration: {boostOptions.find(b => b.id === selectedBoost)?.duration}
                  </p>
                </div>
              </div>
            )}

            <div className="flex space-x-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 px-4 py-3 bg-sage-700 text-white rounded-xl hover:bg-sage-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmPurchase}
                className="flex-1 px-4 py-3 bg-gradient-sage text-white rounded-xl hover:shadow-premium transition-all duration-300"
              >
                Confirm Purchase
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Success Stories */}
      <div className="bg-sage-500/10 border border-sage-500/20 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-white mb-4">Success Stories</h4>
        <div className="space-y-3">
          <div className="flex items-start">
            <div className="w-8 h-8 bg-gradient-sage rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <span className="text-white text-xs font-bold">SC</span>
            </div>
            <div>
              <p className="text-sage-300 text-sm">
                "My desk sold in 2 hours after boosting! Got 5x more views than my previous listing."
              </p>
              <p className="text-sage-400 text-xs mt-1">- Sarah C., MIT</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-8 h-8 bg-gradient-sage rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <span className="text-white text-xs font-bold">MJ</span>
            </div>
            <div>
              <p className="text-sage-300 text-sm">
                "Featured listing helped me get 20% higher bids. Totally worth the investment!"
              </p>
              <p className="text-sage-400 text-xs mt-1">- Mike J., BU</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingBoost;