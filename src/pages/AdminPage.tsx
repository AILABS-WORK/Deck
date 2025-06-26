import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Trash2, CheckCircle, AlertTriangle, Users, DollarSign, TrendingUp } from 'lucide-react';

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const flaggedListings = [
    { id: '1', title: 'Suspicious Electronics Bundle', reporter: 'user123', reason: 'Too good to be true pricing', status: 'pending' },
    { id: '2', title: 'Inappropriate Dorm Decor', reporter: 'user456', reason: 'Inappropriate content', status: 'pending' },
    { id: '3', title: 'Fake Textbook Listing', reporter: 'user789', reason: 'Duplicate listing', status: 'resolved' }
  ];

  const dashboardStats = [
    { label: 'Daily Active Users', value: '1,247', change: '+12%', icon: Users, color: 'text-primary-400' },
    { label: 'GMV Today', value: '$8,340', change: '+8%', icon: DollarSign, color: 'text-accent-400' },
    { label: 'Items Listed', value: '156', change: '+23%', icon: TrendingUp, color: 'text-secondary-400' },
    { label: 'Lbs Saved', value: '2,847', change: '+15%', icon: Eye, color: 'text-green-400' }
  ];

  const campusStats = [
    { campus: 'MIT', users: 423, gmv: '$12,450', items: 89 },
    { campus: 'Boston University', users: 387, gmv: '$9,230', items: 76 },
    { campus: 'Northeastern', users: 312, gmv: '$7,890', items: 64 },
    { campus: 'Harvard', users: 289, gmv: '$11,200', items: 52 }
  ];

  const handleListingAction = (id: string, action: 'approve' | 'delete') => {
    console.log(`${action} listing ${id}`);
    // Handle listing moderation
  };

  return (
    <div className="min-h-screen bg-gradient-dark px-6 py-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-white mb-2">
            DECK'D Admin
          </h1>
          <p className="text-dark-400">Platform management and analytics</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-dark-800 rounded-xl p-1 mb-8">
          {[
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'moderation', label: 'Moderation' },
            { id: 'analytics', label: 'Analytics' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-gradient-primary text-white shadow-lg'
                  : 'text-dark-300 hover:text-white hover:bg-dark-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {dashboardStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-dark-800/40 backdrop-blur-lg rounded-2xl p-6 border border-dark-700"
                >
                  <div className="flex items-center justify-between mb-4">
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                    <span className="text-green-400 text-sm font-medium">{stat.change}</span>
                  </div>
                  <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-sm text-dark-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Campus Breakdown */}
            <div className="bg-dark-800/40 backdrop-blur-lg rounded-2xl p-6 border border-dark-700">
              <h3 className="text-xl font-semibold text-white mb-6">Campus Breakdown</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-dark-600">
                      <th className="text-left py-3 text-dark-400 font-medium">Campus</th>
                      <th className="text-left py-3 text-dark-400 font-medium">Users</th>
                      <th className="text-left py-3 text-dark-400 font-medium">GMV</th>
                      <th className="text-left py-3 text-dark-400 font-medium">Items</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campusStats.map((campus, index) => (
                      <tr key={index} className="border-b border-dark-700/50">
                        <td className="py-4 text-white font-medium">{campus.campus}</td>
                        <td className="py-4 text-dark-300">{campus.users}</td>
                        <td className="py-4 text-primary-400 font-medium">{campus.gmv}</td>
                        <td className="py-4 text-dark-300">{campus.items}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Moderation Tab */}
        {activeTab === 'moderation' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-dark-800/40 backdrop-blur-lg rounded-2xl p-6 border border-dark-700">
              <h3 className="text-xl font-semibold text-white mb-6">Flagged Listings</h3>
              
              <div className="space-y-4">
                {flaggedListings.map((listing) => (
                  <div
                    key={listing.id}
                    className="flex items-center justify-between p-4 bg-dark-700/50 rounded-xl border border-dark-600"
                  >
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h4 className="font-medium text-white mr-3">{listing.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          listing.status === 'pending'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-green-500/20 text-green-400'
                        }`}>
                          {listing.status}
                        </span>
                      </div>
                      <p className="text-sm text-dark-400 mb-1">
                        Reported by: {listing.reporter}
                      </p>
                      <p className="text-sm text-dark-300">
                        Reason: {listing.reason}
                      </p>
                    </div>
                    
                    {listing.status === 'pending' && (
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => handleListingAction(listing.id, 'approve')}
                          className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                        >
                          <CheckCircle size={16} />
                        </button>
                        <button
                          onClick={() => handleListingAction(listing.id, 'delete')}
                          className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-dark-800/40 backdrop-blur-lg rounded-2xl p-6 border border-dark-700">
              <h3 className="text-xl font-semibold text-white mb-6">Platform Analytics</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-dark-700/50 rounded-xl p-4">
                  <h4 className="font-medium text-white mb-4">User Growth</h4>
                  <div className="h-32 bg-gradient-primary/10 rounded-lg flex items-end justify-center">
                    <p className="text-primary-400 text-sm">📈 Growth chart placeholder</p>
                  </div>
                </div>
                
                <div className="bg-dark-700/50 rounded-xl p-4">
                  <h4 className="font-medium text-white mb-4">Popular Categories</h4>
                  <div className="space-y-2">
                    {['Furniture', 'Electronics', 'Textbooks', 'Decor'].map((category, index) => (
                      <div key={category} className="flex justify-between items-center">
                        <span className="text-dark-300">{category}</span>
                        <span className="text-primary-400">{35 - index * 7}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;