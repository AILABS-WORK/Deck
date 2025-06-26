import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Clock, Bell, Eye, Heart } from 'lucide-react';
import AuctionCard from './AuctionCard';
import { mockAuctions } from '../data/mockData';

interface PersonalizedRecommendationsProps {
  userStyle?: string;
  roomImage?: string;
  placedItems?: string[];
  onWatchToggle?: (id: string) => void;
}

const PersonalizedRecommendations: React.FC<PersonalizedRecommendationsProps> = ({
  userStyle,
  roomImage,
  placedItems = [],
  onWatchToggle
}) => {
  const [recommendations, setRecommendations] = useState<typeof mockAuctions>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('style-match');

  const tabs = [
    { id: 'style-match', label: 'Style Match', icon: Sparkles, color: 'text-sage-400' },
    { id: 'trending', label: 'Trending', icon: TrendingUp, color: 'text-accent-400' },
    { id: 'ending-soon', label: 'Ending Soon', icon: Clock, color: 'text-red-400' },
    { id: 'watched', label: 'Watched', icon: Eye, color: 'text-secondary-400' }
  ];

  useEffect(() => {
    generateRecommendations();
  }, [userStyle, roomImage, placedItems, activeTab]);

  const generateRecommendations = () => {
    setIsLoading(true);
    
    // Simulate AI recommendation generation
    setTimeout(() => {
      let filtered = [...mockAuctions];
      
      switch (activeTab) {
        case 'style-match':
          if (userStyle) {
            filtered = filtered.filter(auction => auction.styleMatch === userStyle);
          }
          break;
        case 'trending':
          filtered = filtered.sort((a, b) => b.bidCount - a.bidCount);
          break;
        case 'ending-soon':
          filtered = filtered.filter(auction => {
            const timeLeft = auction.timeLeft;
            return timeLeft.includes('m') || (timeLeft.includes('h') && parseInt(timeLeft) < 2);
          });
          break;
        case 'watched':
          filtered = filtered.filter(auction => auction.isWatched);
          break;
      }
      
      setRecommendations(filtered.slice(0, 6));
      setIsLoading(false);
    }, 1000);
  };

  const getRecommendationReason = (auction: typeof mockAuctions[0]) => {
    switch (activeTab) {
      case 'style-match':
        return `Matches your ${userStyle} style preference`;
      case 'trending':
        return `${auction.bidCount} active bids - high demand!`;
      case 'ending-soon':
        return `Ending in ${auction.timeLeft} - bid now!`;
      case 'watched':
        return 'You\'re watching this item';
      default:
        return 'Recommended for you';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white mb-1">
            Personalized Recommendations
          </h3>
          <p className="text-sage-300 text-sm">
            AI-curated items based on your style and preferences
          </p>
        </div>
        <button
          onClick={generateRecommendations}
          className="p-2 bg-sage-700 text-sage-300 hover:text-white rounded-lg transition-colors"
        >
          <Sparkles size={16} />
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-charcoal-800 rounded-xl p-1 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-shrink-0 flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-gradient-sage text-white shadow-lg'
                : 'text-sage-300 hover:text-white hover:bg-sage-700'
            }`}
          >
            <tab.icon size={14} className="mr-1" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* AI Insights */}
      {userStyle && activeTab === 'style-match' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-sage-500/10 border border-sage-500/20 rounded-xl p-4"
        >
          <div className="flex items-center mb-2">
            <Sparkles className="text-sage-400 mr-2" size={16} />
            <span className="text-sage-400 font-medium">AI Style Analysis</span>
          </div>
          <p className="text-sage-300 text-sm">
            Based on your {userStyle} style preference, we found {recommendations.length} matching items. 
            These pieces complement your aesthetic and fit well in university dorm spaces.
          </p>
        </motion.div>
      )}

      {/* Recommendations Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-sage-900/20 rounded-2xl p-4 animate-pulse">
              <div className="bg-sage-700 h-32 rounded-xl mb-3"></div>
              <div className="bg-sage-700 h-4 rounded mb-2"></div>
              <div className="bg-sage-700 h-3 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : recommendations.length > 0 ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {recommendations.map((auction) => (
              <div key={auction.id} className="relative">
                <AuctionCard 
                  auction={auction} 
                  onWatchToggle={onWatchToggle}
                />
                {/* Recommendation Badge */}
                <div className="absolute top-2 left-2 bg-sage-500/90 text-white text-xs px-2 py-1 rounded-full flex items-center">
                  <Sparkles size={10} className="mr-1" />
                  AI Pick
                </div>
                {/* Reason Tooltip */}
                <div className="absolute bottom-2 left-2 right-2 bg-charcoal-900/90 text-white text-xs p-2 rounded opacity-0 hover:opacity-100 transition-opacity">
                  {getRecommendationReason(auction)}
                </div>
              </div>
            ))}
          </div>
          
          {/* Load More */}
          <button
            onClick={generateRecommendations}
            className="w-full py-3 bg-sage-800/50 text-sage-300 hover:text-white hover:bg-sage-700/50 rounded-xl transition-colors"
          >
            Load More Recommendations
          </button>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold text-white mb-2">No recommendations yet</h3>
          <p className="text-sage-400 mb-4">
            {activeTab === 'style-match' 
              ? 'Upload a room photo or select a style to get personalized recommendations'
              : 'Check back later for new items in this category'
            }
          </p>
          {activeTab === 'style-match' && (
            <button
              onClick={() => window.location.href = '/visualizer'}
              className="px-6 py-3 bg-gradient-sage text-white rounded-xl hover:shadow-premium transition-all duration-300"
            >
              Set Up Your Style
            </button>
          )}
        </div>
      )}

      {/* Smart Notifications */}
      {userStyle && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-charcoal-800/50 rounded-xl p-4 border border-sage-700"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Bell className="text-sage-400 mr-2" size={16} />
              <div>
                <p className="text-white font-medium text-sm">Smart Notifications</p>
                <p className="text-sage-400 text-xs">Get alerts for new {userStyle} style items</p>
              </div>
            </div>
            <button className="px-3 py-1 bg-sage-500 text-white text-xs rounded-lg hover:bg-sage-600 transition-colors">
              Enable
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PersonalizedRecommendations;