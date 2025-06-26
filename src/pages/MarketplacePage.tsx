import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Bell, MapPin, Clock, Gavel, TrendingUp, Sparkles } from 'lucide-react';
import AuctionCard from '../components/AuctionCard';
import AIStyleSearch from '../components/AIStyleSearch';
import PersonalizedRecommendations from '../components/PersonalizedRecommendations';
import NotificationCenter from '../components/NotificationCenter';
import { mockAuctions, mockUser } from '../data/mockData';

const MarketplacePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('live');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStyle, setSelectedStyle] = useState(mockUser.preferredStyle);
  const [watchedItems, setWatchedItems] = useState(mockUser.watchedItems);
  const [notifications, setNotifications] = useState(mockUser.notifications);
  const [showRecommendations, setShowRecommendations] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);

  // Enhanced notifications with more types
  const enhancedNotifications = [
    {
      id: '1',
      type: 'style' as const,
      title: 'New Style Match Found!',
      message: 'A minimal style desk lamp just listed - perfect for your room!',
      timestamp: '2m ago',
      read: false,
      priority: 'high' as const,
      actionUrl: '/auction/1'
    },
    {
      id: '2',
      type: 'auction' as const,
      title: 'Auction Ending Soon',
      message: 'Vintage Tapestry ends in 23 minutes - you\'re currently winning!',
      timestamp: '10m ago',
      read: false,
      priority: 'medium' as const,
      actionUrl: '/auction/7'
    },
    {
      id: '3',
      type: 'social' as const,
      title: 'New Follower',
      message: 'Emma Chen started following you',
      timestamp: '1h ago',
      read: true,
      priority: 'low' as const
    },
    {
      id: '4',
      type: 'achievement' as const,
      title: 'Achievement Unlocked!',
      message: 'You earned the "Eco Warrior" badge for saving 100+ lbs of waste!',
      timestamp: '2h ago',
      read: false,
      priority: 'high' as const
    },
    {
      id: '5',
      type: 'system' as const,
      title: 'Weekly Challenge',
      message: 'New sustainability challenge: Save 50 lbs this week',
      timestamp: '1d ago',
      read: true,
      priority: 'medium' as const
    }
  ];

  const tabs = [
    { id: 'live', label: '🔥 Live Auctions', color: 'text-accent-400' },
    { id: 'ending', label: '⏰ Ending Soon', color: 'text-red-400' },
    { id: 'style', label: '✨ Your Style', color: 'text-sage-400' },
    { id: 'watched', label: '👁️ Watching', color: 'text-secondary-400' }
  ];

  const getFilteredAuctions = () => {
    let filtered = mockAuctions;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(auction =>
        auction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        auction.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply tab filter
    switch (activeTab) {
      case 'ending':
        filtered = filtered.filter(auction => {
          const timeLeft = auction.timeLeft;
          return timeLeft.includes('m') || (timeLeft.includes('h') && parseInt(timeLeft) < 2);
        });
        break;
      case 'style':
        filtered = filtered.filter(auction => 
          selectedStyle && auction.styleMatch === selectedStyle
        );
        break;
      case 'watched':
        filtered = filtered.filter(auction => watchedItems.includes(auction.id));
        break;
      default:
        // Live auctions (all)
        break;
    }

    return filtered;
  };

  const handleWatchToggle = (auctionId: string) => {
    setWatchedItems(prev => 
      prev.includes(auctionId) 
        ? prev.filter(id => id !== auctionId)
        : [...prev, auctionId]
    );
  };

  const handleStyleSelect = (style: string) => {
    setSelectedStyle(style);
    setActiveTab('style');
  };

  const handlePhotoUpload = (file: File) => {
    // Simulate AI analysis and style detection
    console.log('Analyzing photo:', file.name);
  };

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === notificationId ? { ...notif, read: true } : notif
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const filteredAuctions = getFilteredAuctions();
  const unreadNotifications = enhancedNotifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-charcoal-900/95 backdrop-blur-lg border-b border-sage-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center mb-1">
                <img 
                  src="/ChatGPT Image Jun 25, 2025, 05_33_42 PM.jpg" 
                  alt="Deck'd" 
                  className="w-8 h-8 rounded-lg mr-3"
                />
                <h1 className="text-2xl font-display font-bold bg-gradient-sage bg-clip-text text-transparent">
                  Deck'd
                </h1>
              </div>
              <p className="text-sm text-sage-400">MIT Campus • 47 live auctions</p>
            </div>
            
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(true)}
                className="p-3 bg-charcoal-800 rounded-xl text-sage-400 hover:text-white transition-colors relative"
              >
                <Bell size={20} />
                {unreadNotifications > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">{unreadNotifications}</span>
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-sage-400" size={20} />
            <input
              type="text"
              placeholder="Search auctions, styles, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-charcoal-800 border border-sage-600 rounded-xl text-white placeholder-sage-400 focus:border-sage-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-charcoal-800 rounded-xl p-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-sage text-white shadow-lg'
                    : 'text-sage-300 hover:text-white hover:bg-sage-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* AI Style Search */}
      <div className="px-6 py-4">
        <AIStyleSearch
          onStyleSelect={handleStyleSelect}
          onPhotoUpload={handlePhotoUpload}
          selectedStyle={selectedStyle}
        />
      </div>

      {/* Quick Stats */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-sage-900/20 backdrop-blur-lg rounded-xl p-4 border border-sage-700">
            <div className="flex items-center mb-2">
              <Gavel className="w-4 h-4 text-sage-400 mr-2" />
              <span className="text-sm text-sage-400">Live Now</span>
            </div>
            <p className="text-2xl font-bold text-white">{mockAuctions.length}</p>
          </div>
          <div className="bg-sage-900/20 backdrop-blur-lg rounded-xl p-4 border border-sage-700">
            <div className="flex items-center mb-2">
              <Clock className="w-4 h-4 text-accent-400 mr-2" />
              <span className="text-sm text-sage-400">Ending Soon</span>
            </div>
            <p className="text-2xl font-bold text-white">
              {mockAuctions.filter(a => a.timeLeft.includes('m') || (a.timeLeft.includes('h') && parseInt(a.timeLeft) < 2)).length}
            </p>
          </div>
          <div className="bg-sage-900/20 backdrop-blur-lg rounded-xl p-4 border border-sage-700">
            <div className="flex items-center mb-2">
              <TrendingUp className="w-4 h-4 text-secondary-400 mr-2" />
              <span className="text-sm text-sage-400">Avg. Savings</span>
            </div>
            <p className="text-2xl font-bold text-white">73%</p>
          </div>
        </div>
      </div>

      {/* Personalized Recommendations */}
      {showRecommendations && activeTab === 'live' && (
        <div className="px-6 mb-6">
          <div className="bg-sage-900/20 backdrop-blur-lg rounded-2xl p-6 border border-sage-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Sparkles className="text-sage-400 mr-2" size={20} />
                <h2 className="text-lg font-semibold text-white">AI Recommendations</h2>
              </div>
              <button
                onClick={() => setShowRecommendations(false)}
                className="text-sage-400 hover:text-white transition-colors text-sm"
              >
                Hide
              </button>
            </div>
            <PersonalizedRecommendations 
              userStyle={selectedStyle}
              onWatchToggle={handleWatchToggle}
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="px-6 pb-6">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">
            {activeTab === 'live' && 'Live Auctions'}
            {activeTab === 'ending' && 'Ending Soon'}
            {activeTab === 'style' && `Your ${selectedStyle} Style`}
            {activeTab === 'watched' && 'Watching'}
          </h2>
          <span className="text-sm text-sage-400">
            {filteredAuctions.length} items
          </span>
        </div>

        {/* Auctions Grid */}
        {filteredAuctions.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {filteredAuctions.map((auction) => (
              <AuctionCard 
                key={auction.id} 
                auction={auction} 
                onWatchToggle={handleWatchToggle}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white mb-2">No auctions found</h3>
            <p className="text-sage-400">
              {activeTab === 'style' 
                ? 'No items match your selected style yet. Try uploading a room photo for better matches!'
                : 'Try adjusting your search or check back later for new auctions.'
              }
            </p>
          </div>
        )}

        {/* Load More */}
        {filteredAuctions.length > 0 && (
          <div className="mt-8 text-center">
            <button className="px-6 py-3 bg-charcoal-800 border border-sage-600 rounded-xl text-sage-300 hover:text-white hover:border-sage-500 transition-colors">
              Load More Auctions
            </button>
          </div>
        )}
      </div>

      {/* Notification Center */}
      <NotificationCenter
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        notifications={enhancedNotifications}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
      />
    </div>
  );
};

export default MarketplacePage;