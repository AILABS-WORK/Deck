import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Recycle, Users, Zap, Mail, Gavel, Clock, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-dark overflow-hidden">
      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <img 
              src="/ChatGPT Image Jun 25, 2025, 05_33_42 PM.jpg" 
              alt="Deck'd Logo" 
              className="w-32 h-32 mx-auto mb-4 rounded-2xl shadow-2xl"
            />
            <h1 className="text-6xl md:text-8xl font-display font-bold bg-gradient-primary bg-clip-text text-transparent">
              Deck'd
            </h1>
          </motion.div>
          
          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-2xl md:text-3xl font-medium text-dark-300 mb-4"
          >
            Give your stuff a <span className="text-accent-400 font-bold">second shot</span>
          </motion.p>
          
          {/* Auction Focus */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center mb-8 space-x-6"
          >
            <div className="flex items-center bg-dark-800/50 rounded-full px-4 py-2">
              <Gavel className="text-primary-400 mr-2" size={20} />
              <span className="text-white font-medium">Live Auctions</span>
            </div>
            <div className="flex items-center bg-dark-800/50 rounded-full px-4 py-2">
              <TrendingDown className="text-accent-400 mr-2" size={20} />
              <span className="text-white font-medium">Prices Drop Fast</span>
            </div>
            <div className="flex items-center bg-dark-800/50 rounded-full px-4 py-2">
              <Clock className="text-secondary-400 mr-2" size={20} />
              <span className="text-white font-medium">Limited Time</span>
            </div>
          </motion.div>
          
          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-lg text-dark-300 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            The AI-powered auction platform for university students. Bid on dorm essentials, 
            get style recommendations, and make move-outs sustainable with real-time auctions.
          </motion.p>
          
          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <Link
              to="/onboarding"
              className="inline-flex items-center px-8 py-4 bg-gradient-primary text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Mail className="mr-3" size={20} />
              Sign in with your .edu email
              <ArrowRight className="ml-3" size={20} />
            </Link>
          </motion.div>
        </motion.div>
        
        {/* Live Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-dark-800/50 backdrop-blur-lg rounded-2xl px-4 py-3 border border-dark-700 text-center">
              <p className="text-xs text-dark-300">Active Auctions</p>
              <p className="text-2xl font-bold text-primary-400">47</p>
            </div>
            <div className="bg-dark-800/50 backdrop-blur-lg rounded-2xl px-4 py-3 border border-dark-700 text-center">
              <p className="text-xs text-dark-300">Avg. Savings</p>
              <p className="text-2xl font-bold text-accent-400">73%</p>
            </div>
            <div className="bg-dark-800/50 backdrop-blur-lg rounded-2xl px-4 py-3 border border-dark-700 text-center">
              <p className="text-xs text-dark-300">Lbs Saved</p>
              <p className="text-2xl font-bold text-secondary-400">12,847</p>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Features Section */}
      <div className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-display font-bold text-center mb-16"
          >
            Why students love <span className="text-primary-400">Deck'd</span>
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Gavel className="w-12 h-12 text-primary-400" />,
                title: "Live Auctions",
                description: "Bid in real-time on dorm essentials. Prices drop as time runs out, creating incredible deals for students."
              },
              {
                icon: <Zap className="w-12 h-12 text-accent-400" />,
                title: "AI Style Matching",
                description: "Upload your room photo and get personalized auction recommendations that match your aesthetic perfectly."
              },
              {
                icon: <Recycle className="w-12 h-12 text-secondary-400" />,
                title: "Sustainable Impact",
                description: "Track your environmental impact and compete with friends to see who can save the most waste from landfills."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-dark-800/30 backdrop-blur-lg rounded-3xl p-8 border border-dark-700 hover:border-primary-500/50 transition-all duration-300"
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-dark-300 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-20 px-6 bg-dark-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-display font-bold mb-16"
          >
            How <span className="text-primary-400">Deck'd</span> Works
          </motion.h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Upload Room Photo", desc: "AI analyzes your style" },
              { step: "2", title: "Get Recommendations", desc: "Personalized auction matches" },
              { step: "3", title: "Bid & Win", desc: "Real-time auction bidding" },
              { step: "4", title: "Quick Pickup", desc: "QR code campus meetup" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-dark-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;