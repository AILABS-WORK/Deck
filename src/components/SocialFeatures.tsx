import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Share2, Heart, MessageCircle, Trophy, Star, UserPlus, Camera, Send } from 'lucide-react';
import { mockUser } from '../data/mockData';

interface SocialPost {
  id: string;
  user: {
    name: string;
    avatar: string;
    xp: number;
    verified: boolean;
  };
  content: string;
  image?: string;
  roomDesign?: {
    style: string;
    items: string[];
    totalCost: number;
  };
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  isLiked: boolean;
}

interface SocialFeaturesProps {
  onShare?: (content: string) => void;
}

const SocialFeatures: React.FC<SocialFeaturesProps> = ({ onShare }) => {
  const [activeTab, setActiveTab] = useState('feed');
  const [newPost, setNewPost] = useState('');
  const [showPostModal, setShowPostModal] = useState(false);

  const mockPosts: SocialPost[] = [
    {
      id: '1',
      user: {
        name: 'Emma Chen',
        avatar: '/api/placeholder/40/40',
        xp: 342,
        verified: true
      },
      content: 'Just transformed my dorm with these amazing auction finds! Saved 80% compared to retail 🌱',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400',
      roomDesign: {
        style: 'Boho Minimalist',
        items: ['Vintage Tapestry', 'Plant Collection', 'String Lights'],
        totalCost: 45
      },
      likes: 23,
      comments: 8,
      shares: 4,
      timestamp: '2h ago',
      isLiked: false
    },
    {
      id: '2',
      user: {
        name: 'Alex Rodriguez',
        avatar: '/api/placeholder/40/40',
        xp: 156,
        verified: false
      },
      content: 'Weekly sustainability challenge: Who can save the most waste this week? 💪',
      likes: 15,
      comments: 12,
      shares: 6,
      timestamp: '4h ago',
      isLiked: true
    }
  ];

  const [posts, setPosts] = useState(mockPosts);
  const [followers, setFollowers] = useState(127);
  const [following, setFollowing] = useState(89);

  const tabs = [
    { id: 'feed', label: 'Feed', icon: Users },
    { id: 'challenges', label: 'Challenges', icon: Trophy },
    { id: 'leaderboard', label: 'Leaderboard', icon: Star }
  ];

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const handleShare = (post: SocialPost) => {
    const shareText = `Check out this amazing room transformation by ${post.user.name} on DECK'D! ${post.content}`;
    onShare?.(shareText);
    
    // Update share count
    setPosts(prev => prev.map(p => 
      p.id === post.id ? { ...p, shares: p.shares + 1 } : p
    ));
  };

  const createPost = () => {
    if (!newPost.trim()) return;
    
    const post: SocialPost = {
      id: Date.now().toString(),
      user: {
        name: mockUser.name,
        avatar: '/api/placeholder/40/40',
        xp: mockUser.xp,
        verified: true
      },
      content: newPost,
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: 'now',
      isLiked: false
    };
    
    setPosts(prev => [post, ...prev]);
    setNewPost('');
    setShowPostModal(false);
  };

  const challenges = [
    {
      id: '1',
      title: 'Sustainable September',
      description: 'Save 50 lbs of waste this month',
      progress: 32,
      target: 50,
      participants: 156,
      reward: '50 XP + Eco Warrior Badge',
      timeLeft: '12 days'
    },
    {
      id: '2',
      title: 'Style Challenge: Minimalist',
      description: 'Create a minimalist room design under $100',
      progress: 0,
      target: 1,
      participants: 89,
      reward: '100 XP + Style Master Badge',
      timeLeft: '5 days'
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'Sarah Kim', xp: 1247, badge: 'Eco Legend', change: '+2' },
    { rank: 2, name: 'Mike Johnson', xp: 1156, badge: 'Style Master', change: '0' },
    { rank: 3, name: 'Emma Chen', xp: 1089, badge: 'Trendsetter', change: '+1' },
    { rank: 4, name: mockUser.name, xp: mockUser.xp, badge: mockUser.badgeLevel, change: '+3' },
    { rank: 5, name: 'Alex Rodriguez', xp: 892, badge: 'Rising Star', change: '-1' }
  ];

  return (
    <div className="space-y-6">
      {/* Social Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-white">Community</h2>
          <p className="text-sage-300">Connect with fellow sustainable students</p>
        </div>
        <button
          onClick={() => setShowPostModal(true)}
          className="p-3 bg-gradient-sage text-white rounded-xl hover:shadow-premium transition-all duration-300"
        >
          <Camera size={20} />
        </button>
      </div>

      {/* Social Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-sage-900/20 backdrop-blur-lg rounded-xl p-4 border border-sage-700 text-center">
          <p className="text-2xl font-bold text-white">{followers}</p>
          <p className="text-sm text-sage-400">Followers</p>
        </div>
        <div className="bg-sage-900/20 backdrop-blur-lg rounded-xl p-4 border border-sage-700 text-center">
          <p className="text-2xl font-bold text-white">{following}</p>
          <p className="text-sm text-sage-400">Following</p>
        </div>
        <div className="bg-sage-900/20 backdrop-blur-lg rounded-xl p-4 border border-sage-700 text-center">
          <p className="text-2xl font-bold text-white">{mockUser.xp}</p>
          <p className="text-sm text-sage-400">Total XP</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-charcoal-800 rounded-xl p-1">
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

      {/* Content */}
      {activeTab === 'feed' && (
        <div className="space-y-4">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-sage-900/20 backdrop-blur-lg rounded-2xl p-6 border border-sage-700"
            >
              {/* Post Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-sage rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">
                      {post.user.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <p className="font-medium text-white">{post.user.name}</p>
                      {post.user.verified && (
                        <div className="ml-1 w-4 h-4 bg-sage-400 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-sage-400">XP {post.user.xp} • {post.timestamp}</p>
                  </div>
                </div>
                <button className="p-2 text-sage-400 hover:text-white transition-colors">
                  <UserPlus size={16} />
                </button>
              </div>

              {/* Post Content */}
              <p className="text-white mb-4">{post.content}</p>

              {/* Post Image */}
              {post.image && (
                <img
                  src={post.image}
                  alt="Post content"
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
              )}

              {/* Room Design Info */}
              {post.roomDesign && (
                <div className="bg-sage-500/10 border border-sage-500/20 rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sage-400 font-medium">{post.roomDesign.style}</span>
                    <span className="text-white font-bold">${post.roomDesign.totalCost}</span>
                  </div>
                  <p className="text-sage-300 text-sm">
                    Items: {post.roomDesign.items.join(', ')}
                  </p>
                </div>
              )}

              {/* Post Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-sage-700">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    post.isLiked 
                      ? 'text-red-400 bg-red-500/10' 
                      : 'text-sage-400 hover:text-white hover:bg-sage-700/50'
                  }`}
                >
                  <Heart size={16} className={post.isLiked ? 'fill-current' : ''} />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sage-400 hover:text-white hover:bg-sage-700/50 transition-colors">
                  <MessageCircle size={16} />
                  <span>{post.comments}</span>
                </button>
                <button
                  onClick={() => handleShare(post)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sage-400 hover:text-white hover:bg-sage-700/50 transition-colors"
                >
                  <Share2 size={16} />
                  <span>{post.shares}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === 'challenges' && (
        <div className="space-y-4">
          {challenges.map((challenge) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-sage-900/20 backdrop-blur-lg rounded-2xl p-6 border border-sage-700"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">{challenge.title}</h3>
                  <p className="text-sage-300">{challenge.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-sage-400">{challenge.timeLeft} left</p>
                  <p className="text-xs text-sage-400">{challenge.participants} participants</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-sage-300">Progress</span>
                  <span className="text-white">{challenge.progress}/{challenge.target}</span>
                </div>
                <div className="w-full bg-sage-800 rounded-full h-2">
                  <div
                    className="bg-gradient-sage h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-sage-400">
                  Reward: {challenge.reward}
                </div>
                <button className="px-4 py-2 bg-gradient-sage text-white rounded-lg hover:shadow-premium transition-all duration-300">
                  Join Challenge
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === 'leaderboard' && (
        <div className="space-y-3">
          {leaderboard.map((user, index) => (
            <motion.div
              key={user.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-sage-900/20 backdrop-blur-lg rounded-xl p-4 border border-sage-700 ${
                user.name === mockUser.name ? 'ring-2 ring-sage-400' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                    user.rank <= 3 ? 'bg-gradient-sage' : 'bg-sage-700'
                  }`}>
                    <span className="text-white font-bold text-sm">#{user.rank}</span>
                  </div>
                  <div>
                    <p className="font-medium text-white">{user.name}</p>
                    <p className="text-sm text-sage-400">{user.badge}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-white">{user.xp} XP</p>
                  <p className={`text-sm ${
                    user.change.startsWith('+') ? 'text-green-400' : 
                    user.change.startsWith('-') ? 'text-red-400' : 'text-sage-400'
                  }`}>
                    {user.change !== '0' && user.change}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Post Creation Modal */}
      <AnimatePresence>
        {showPostModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPostModal(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-x-4 top-1/2 transform -translate-y-1/2 bg-charcoal-900 rounded-2xl p-6 border border-sage-700 z-50 max-w-md mx-auto"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Share Your Style</h3>
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Share your room transformation, sustainability wins, or style tips..."
                className="w-full px-4 py-3 bg-sage-800 border border-sage-600 rounded-xl text-white placeholder-sage-400 focus:border-sage-400 focus:outline-none transition-colors resize-none"
                rows={4}
              />
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  onClick={() => setShowPostModal(false)}
                  className="px-4 py-2 text-sage-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={createPost}
                  disabled={!newPost.trim()}
                  className="px-6 py-2 bg-gradient-sage text-white rounded-lg hover:shadow-premium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  <Send size={16} className="mr-2" />
                  Post
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SocialFeatures;