import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Share2, Trophy, Leaf, Zap, Star, Package, ShoppingBag, Users, TrendingUp } from 'lucide-react';
import { mockUser } from '../data/mockData';
import SocialFeatures from '../components/SocialFeatures';
import ListingBoost from '../components/ListingBoost';
import AdvancedAnalytics from '../components/AdvancedAnalytics';

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: Trophy },
    { id: 'social', label: 'Social', icon: Share2 },
    { id: 'boost', label: 'Boost Listings', icon: TrendingUp }
  ];

  const generateShareImage = () => {
    // Simulate generating shareable eco-impact image
    alert('Shareable image generated! You saved ' + mockUser.lbsSaved + ' lbs of waste this semester 🌱');
  };

  return (
    <div className="min-h-screen bg-gradient-dark px-6 py-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-white">Profile</h1>
            <p className="text-sage-400">Manage your account and track your impact</p>
          </div>
          <button className="p-3 bg-charcoal-800 rounded-xl text-sage-400 hover:text-white transition-colors">
            <Settings size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-charcoal-800 rounded-xl p-1 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-gradient-sage text-white shadow-lg'
                  : 'text-sage-300 hover:text-white hover:bg-sage-700'
              }`}
            >
              <tab.icon size={18} className="mr-2" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            {/* User Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-sage-900/20 backdrop-blur-lg rounded-2xl p-6 border border-sage-700"
            >
              <div className="flex items-center mb-6">
                <div className="w-20 h-20 bg-gradient-sage rounded-full flex items-center justify-center text-2xl font-bold text-white mr-4">
                  {mockUser.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{mockUser.name}</h2>
                  <p className="text-sage-400">{mockUser.email}</p>
                  <p className="text-sm text-sage-400">{mockUser.university} • {mockUser.dorm}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Zap className="text-sage-400 mr-1" size={16} />
                    <span className="text-2xl font-bold text-white">{mockUser.xp}</span>
                  </div>
                  <p className="text-sm text-sage-400">Total XP</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Trophy className="text-accent-400 mr-1" size={16} />
                    <span className="text-lg font-bold text-white">{mockUser.badgeLevel}</span>
                  </div>
                  <p className="text-sm text-sage-400">Badge Level</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Star className="text-secondary-400 mr-1" size={16} />
                    <span className="text-lg font-bold text-white">#4</span>
                  </div>
                  <p className="text-sm text-sage-400">Campus Rank</p>
                </div>
              </div>
            </motion.div>

            {/* Eco Impact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-sage-900/20 backdrop-blur-lg rounded-2xl p-6 border border-sage-700"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">Your Eco Impact</h3>
                <button
                  onClick={generateShareImage}
                  className="p-2 bg-sage-500 rounded-lg text-white hover:bg-sage-600 transition-colors"
                >
                  <Share2 size={16} />
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="text-center py-6 bg-gradient-sage/10 rounded-xl border border-sage-500/20">
                  <Leaf className="w-12 h-12 text-sage-400 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-white mb-2">{mockUser.lbsSaved} lbs</p>
                  <p className="text-sage-400 font-medium">Waste Diverted from Landfill</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center py-4 bg-secondary-500/10 rounded-xl border border-secondary-500/20">
                    <p className="text-2xl font-bold text-white">{mockUser.co2Saved}kg</p>
                    <p className="text-sm text-secondary-400">CO₂ Saved</p>
                  </div>
                  <div className="text-center py-4 bg-accent-500/10 rounded-xl border border-accent-500/20">
                    <p className="text-2xl font-bold text-white">{mockUser.itemsSold + mockUser.itemsBought}</p>
                    <p className="text-sm text-accent-400">Items Circulated</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Activity Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-sage-900/20 backdrop-blur-lg rounded-2xl p-6 border border-sage-700"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Activity</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-sage-700/50 rounded-xl">
                  <div className="flex items-center">
                    <Package className="text-sage-400 mr-3" size={20} />
                    <div>
                      <p className="font-medium text-white">Items Sold</p>
                      <p className="text-sm text-sage-400">Total revenue earned</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-white">{mockUser.itemsSold}</p>
                    <p className="text-sm text-sage-400">$340 earned</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-sage-700/50 rounded-xl">
                  <div className="flex items-center">
                    <ShoppingBag className="text-secondary-400 mr-3" size={20} />
                    <div>
                      <p className="font-medium text-white">Items Bought</p>
                      <p className="text-sm text-sage-400">Money saved shopping</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-white">{mockUser.itemsBought}</p>
                    <p className="text-sm text-secondary-400">$180 saved</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Badges & Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-sage-900/20 backdrop-blur-lg rounded-2xl p-6 border border-sage-700"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Badges & Achievements</h3>
              
              <div className="grid grid-cols-3 gap-4">
                {[
                  { emoji: '🌱', name: 'Eco Warrior', desc: 'Saved 100+ lbs', earned: true },
                  { emoji: '⭐', name: 'Top Seller', desc: '10+ items sold', earned: true },
                  { emoji: '🎯', name: 'Bargain Hunter', desc: '5+ purchases', earned: true },
                  { emoji: '🔥', name: 'Trendsetter', desc: 'Style influencer', earned: false },
                  { emoji: '💎', name: 'Featured Seller', desc: 'Boosted listings', earned: false },
                  { emoji: '🏆', name: 'Legend', desc: '500+ XP', earned: false }
                ].map((badge, index) => (
                  <div
                    key={index}
                    className={`text-center p-4 rounded-xl border ${
                      badge.earned
                        ? 'bg-sage-500/10 border-sage-500/20'
                        : 'bg-sage-700/30 border-sage-600'
                    }`}
                  >
                    <div className={`text-2xl mb-2 ${badge.earned ? '' : 'grayscale opacity-50'}`}>
                      {badge.emoji}
                    </div>
                    <p className={`text-sm font-medium ${badge.earned ? 'text-white' : 'text-sage-400'}`}>
                      {badge.name}
                    </p>
                    <p className="text-xs text-sage-400">{badge.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Class of 2025 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-sage/10 backdrop-blur-lg rounded-2xl p-6 border border-sage-500/20 text-center"
            >
              <h3 className="text-lg font-semibold text-white mb-2">Class of {mockUser.gradYear}</h3>
              <p className="text-sage-300 mb-4">
                You're part of the most sustainable graduating class ever! 🎓
              </p>
              <div className="flex justify-center space-x-6 text-sm">
                <div>
                  <p className="text-sage-400 font-bold">2,847 lbs</p>
                  <p className="text-sage-400">Class total saved</p>
                </div>
                <div>
                  <p className="text-sage-400 font-bold">156</p>
                  <p className="text-sage-400">Active students</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <AdvancedAnalytics />
        )}

        {/* Social Tab */}
        {activeTab === 'social' && (
          <SocialFeatures />
        )}

        {/* Boost Listings Tab */}
        {activeTab === 'boost' && (
          <ListingBoost />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;