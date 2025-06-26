import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Leaf, Target, Calendar, Award, BarChart3, PieChart } from 'lucide-react';
import { mockUser } from '../data/mockData';

interface AnalyticsData {
  totalSavings: number;
  totalSpent: number;
  itemsBought: number;
  itemsSold: number;
  wasteReduced: number;
  co2Saved: number;
  monthlyTrend: Array<{ month: string; savings: number; spending: number }>;
  categoryBreakdown: Array<{ category: string; amount: number; percentage: number }>;
  sustainabilityGoals: Array<{ goal: string; current: number; target: number; unit: string }>;
}

interface AdvancedAnalyticsProps {
  timeRange?: '7d' | '30d' | '90d' | '1y';
}

const AdvancedAnalytics: React.FC<AdvancedAnalyticsProps> = ({ timeRange = '30d' }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTimeRange, setSelectedTimeRange] = useState(timeRange);

  const mockAnalytics: AnalyticsData = {
    totalSavings: 1247,
    totalSpent: 340,
    itemsBought: 12,
    itemsSold: 8,
    wasteReduced: 156,
    co2Saved: 89,
    monthlyTrend: [
      { month: 'Jan', savings: 120, spending: 45 },
      { month: 'Feb', savings: 180, spending: 67 },
      { month: 'Mar', savings: 220, spending: 89 },
      { month: 'Apr', savings: 190, spending: 56 },
      { month: 'May', savings: 280, spending: 83 },
      { month: 'Jun', savings: 247, spending: 0 }
    ],
    categoryBreakdown: [
      { category: 'Furniture', amount: 156, percentage: 46 },
      { category: 'Electronics', amount: 89, percentage: 26 },
      { category: 'Decor', amount: 67, percentage: 20 },
      { category: 'Textbooks', amount: 28, percentage: 8 }
    ],
    sustainabilityGoals: [
      { goal: 'Waste Reduction', current: 156, target: 200, unit: 'lbs' },
      { goal: 'CO₂ Savings', current: 89, target: 120, unit: 'kg' },
      { goal: 'Items Circulated', current: 20, target: 30, unit: 'items' },
      { goal: 'Money Saved', current: 1247, target: 1500, unit: '$' }
    ]
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'spending', label: 'Spending', icon: DollarSign },
    { id: 'sustainability', label: 'Impact', icon: Leaf },
    { id: 'goals', label: 'Goals', icon: Target }
  ];

  const timeRanges = [
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
    { id: '90d', label: '90 Days' },
    { id: '1y', label: '1 Year' }
  ];

  const achievements = [
    { title: 'Eco Warrior', description: 'Saved 100+ lbs of waste', earned: true, date: '2 weeks ago' },
    { title: 'Smart Shopper', description: 'Saved $1000+ on purchases', earned: true, date: '1 month ago' },
    { title: 'Style Master', description: 'Created 10+ room designs', earned: false, progress: 7 },
    { title: 'Community Leader', description: 'Helped 50+ students', earned: false, progress: 23 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-white">Analytics Dashboard</h2>
          <p className="text-sage-300">Track your impact and optimize your sustainable shopping</p>
        </div>
        
        {/* Time Range Selector */}
        <div className="flex space-x-1 bg-charcoal-800 rounded-xl p-1">
          {timeRanges.map((range) => (
            <button
              key={range.id}
              onClick={() => setSelectedTimeRange(range.id as any)}
              className={`px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                selectedTimeRange === range.id
                  ? 'bg-gradient-sage text-white shadow-lg'
                  : 'text-sage-300 hover:text-white'
              }`}
            >
              {range.label}
            </button>
          ))}
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

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-sage-900/20 backdrop-blur-lg rounded-xl p-4 border border-sage-700"
            >
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="text-green-400" size={20} />
                <span className="text-green-400 text-sm font-medium">+23%</span>
              </div>
              <p className="text-2xl font-bold text-white">${mockAnalytics.totalSavings}</p>
              <p className="text-sm text-sage-400">Total Savings</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-sage-900/20 backdrop-blur-lg rounded-xl p-4 border border-sage-700"
            >
              <div className="flex items-center justify-between mb-2">
                <Leaf className="text-sage-400" size={20} />
                <span className="text-sage-400 text-sm font-medium">+15%</span>
              </div>
              <p className="text-2xl font-bold text-white">{mockAnalytics.wasteReduced}</p>
              <p className="text-sm text-sage-400">Lbs Waste Saved</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-sage-900/20 backdrop-blur-lg rounded-xl p-4 border border-sage-700"
            >
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="text-accent-400" size={20} />
                <span className="text-accent-400 text-sm font-medium">+8%</span>
              </div>
              <p className="text-2xl font-bold text-white">{mockAnalytics.itemsBought}</p>
              <p className="text-sm text-sage-400">Items Purchased</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-sage-900/20 backdrop-blur-lg rounded-xl p-4 border border-sage-700"
            >
              <div className="flex items-center justify-between mb-2">
                <Award className="text-secondary-400" size={20} />
                <span className="text-secondary-400 text-sm font-medium">{mockUser.xp}</span>
              </div>
              <p className="text-2xl font-bold text-white">{mockUser.badgeLevel}</p>
              <p className="text-sm text-sage-400">Current Badge</p>
            </motion.div>
          </div>

          {/* Trend Chart */}
          <div className="bg-sage-900/20 backdrop-blur-lg rounded-2xl p-6 border border-sage-700">
            <h3 className="text-lg font-semibold text-white mb-4">Savings vs Spending Trend</h3>
            <div className="h-48 flex items-end justify-between space-x-2">
              {mockAnalytics.monthlyTrend.map((data, index) => (
                <div key={data.month} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex flex-col items-center space-y-1 mb-2">
                    <div
                      className="w-full bg-green-400 rounded-t"
                      style={{ height: `${(data.savings / 300) * 100}%` }}
                    ></div>
                    <div
                      className="w-full bg-red-400 rounded-b"
                      style={{ height: `${(data.spending / 300) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-sage-400">{data.month}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-center space-x-6 mt-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-400 rounded mr-2"></div>
                <span className="text-sm text-sage-300">Savings</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-400 rounded mr-2"></div>
                <span className="text-sm text-sage-300">Spending</span>
              </div>
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="bg-sage-900/20 backdrop-blur-lg rounded-2xl p-6 border border-sage-700">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Achievements</h3>
            <div className="space-y-3">
              {achievements.slice(0, 2).map((achievement, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-sage-800/30 rounded-xl">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                      achievement.earned ? 'bg-gradient-sage' : 'bg-sage-700'
                    }`}>
                      <Award size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{achievement.title}</p>
                      <p className="text-sm text-sage-400">{achievement.description}</p>
                    </div>
                  </div>
                  {achievement.earned ? (
                    <span className="text-sage-400 text-sm">{achievement.date}</span>
                  ) : (
                    <span className="text-sage-400 text-sm">{achievement.progress}/50</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Spending Tab */}
      {activeTab === 'spending' && (
        <div className="space-y-6">
          {/* Spending Summary */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-sage-900/20 backdrop-blur-lg rounded-2xl p-6 border border-sage-700">
              <h3 className="text-lg font-semibold text-white mb-4">Spending Breakdown</h3>
              <div className="space-y-4">
                {mockAnalytics.categoryBreakdown.map((category, index) => (
                  <div key={category.category}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sage-300">{category.category}</span>
                      <span className="text-white font-medium">${category.amount}</span>
                    </div>
                    <div className="w-full bg-sage-800 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${category.percentage}%` }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="bg-gradient-sage h-2 rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-sage-900/20 backdrop-blur-lg rounded-2xl p-6 border border-sage-700">
              <h3 className="text-lg font-semibold text-white mb-4">Savings Analysis</h3>
              <div className="space-y-4">
                <div className="text-center p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                  <p className="text-3xl font-bold text-green-400">${mockAnalytics.totalSavings}</p>
                  <p className="text-green-300">Total Saved vs Retail</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-xl font-bold text-white">78%</p>
                    <p className="text-sm text-sage-400">Avg. Discount</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-white">${mockAnalytics.totalSpent}</p>
                    <p className="text-sm text-sage-400">Total Spent</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sustainability Tab */}
      {activeTab === 'sustainability' && (
        <div className="space-y-6">
          {/* Environmental Impact */}
          <div className="bg-sage-900/20 backdrop-blur-lg rounded-2xl p-6 border border-sage-700">
            <h3 className="text-lg font-semibold text-white mb-6">Environmental Impact</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-sage rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf size={32} className="text-white" />
                </div>
                <p className="text-2xl font-bold text-white">{mockAnalytics.wasteReduced} lbs</p>
                <p className="text-sage-400">Waste Diverted</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp size={32} className="text-white" />
                </div>
                <p className="text-2xl font-bold text-white">{mockAnalytics.co2Saved} kg</p>
                <p className="text-sage-400">CO₂ Reduced</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award size={32} className="text-white" />
                </div>
                <p className="text-2xl font-bold text-white">{mockAnalytics.itemsBought + mockAnalytics.itemsSold}</p>
                <p className="text-sage-400">Items Circulated</p>
              </div>
            </div>
          </div>

          {/* Campus Ranking */}
          <div className="bg-sage-900/20 backdrop-blur-lg rounded-2xl p-6 border border-sage-700">
            <h3 className="text-lg font-semibold text-white mb-4">Campus Sustainability Ranking</h3>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sage-300">Your Rank at MIT</span>
              <span className="text-2xl font-bold text-white">#4</span>
            </div>
            <div className="w-full bg-sage-800 rounded-full h-3 mb-4">
              <div className="bg-gradient-sage h-3 rounded-full" style={{ width: '85%' }}></div>
            </div>
            <p className="text-sage-400 text-sm">
              You're in the top 15% of sustainable students on campus! 
              Keep up the great work to reach the top 3.
            </p>
          </div>
        </div>
      )}

      {/* Goals Tab */}
      {activeTab === 'goals' && (
        <div className="space-y-6">
          {/* Sustainability Goals */}
          <div className="bg-sage-900/20 backdrop-blur-lg rounded-2xl p-6 border border-sage-700">
            <h3 className="text-lg font-semibold text-white mb-6">Sustainability Goals</h3>
            <div className="space-y-4">
              {mockAnalytics.sustainabilityGoals.map((goal, index) => (
                <motion.div
                  key={goal.goal}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-sage-800/30 rounded-xl"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">{goal.goal}</span>
                    <span className="text-sage-300">
                      {goal.current}{goal.unit} / {goal.target}{goal.unit}
                    </span>
                  </div>
                  <div className="w-full bg-sage-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(goal.current / goal.target) * 100}%` }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                      className="bg-gradient-sage h-2 rounded-full"
                    ></motion.div>
                  </div>
                  <p className="text-sage-400 text-sm mt-2">
                    {Math.round((goal.current / goal.target) * 100)}% complete
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Set New Goals */}
          <div className="bg-sage-900/20 backdrop-blur-lg rounded-2xl p-6 border border-sage-700">
            <h3 className="text-lg font-semibold text-white mb-4">Set New Goals</h3>
            <div className="space-y-4">
              <button className="w-full p-4 bg-sage-800/30 rounded-xl text-left hover:bg-sage-700/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Monthly Savings Goal</p>
                    <p className="text-sage-400 text-sm">Set a target for money saved each month</p>
                  </div>
                  <Target className="text-sage-400" size={20} />
                </div>
              </button>
              <button className="w-full p-4 bg-sage-800/30 rounded-xl text-left hover:bg-sage-700/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Waste Reduction Challenge</p>
                    <p className="text-sage-400 text-sm">Challenge yourself to save more waste</p>
                  </div>
                  <Leaf className="text-sage-400" size={20} />
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedAnalytics;