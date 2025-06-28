import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, MapPin, Clock, Zap, Gavel, Bell, BellOff, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Auction {
  id: string;
  title: string;
  currentBid: number;
  originalPrice: number;
  timeLeft: string;
  image: string;
  distance: string;
  bidCount: number;
  tags: string[];
  sellerXP: number;
  isWatched: boolean;
  styleMatch: string;
}

interface AuctionCardProps {
  auction: Auction;
  onWatchToggle?: (id: string) => void;
}

const AuctionCard: React.FC<AuctionCardProps> = ({ auction, onWatchToggle }) => {
  const [isWatched, setIsWatched] = useState(auction.isWatched);
  const [timeLeft, setTimeLeft] = useState(auction.timeLeft);
  const [currentBid, setCurrentBid] = useState(auction.currentBid);
  const [bidCount, setBidCount] = useState(auction.bidCount);
  const [isUrgent, setIsUrgent] = useState(false);
  const [recentBidActivity, setRecentBidActivity] = useState(false);
  
  const discount = Math.round(((auction.originalPrice - currentBid) / auction.originalPrice) * 100);

  // Simulate real-time bid updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Random chance of new bid (10% every 5 seconds)
      if (Math.random() < 0.1) {
        setCurrentBid(prev => prev + Math.floor(Math.random() * 3) + 1);
        setBidCount(prev => prev + 1);
        setRecentBidActivity(true);
        
        // Reset activity indicator after 3 seconds
        setTimeout(() => setRecentBidActivity(false), 3000);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Parse time left and check if urgent (< 1 hour)
  useEffect(() => {
    const parseTime = (timeStr: string) => {
      const parts = timeStr.split(' ');
      if (parts.length >= 2) {
        const value = parseInt(parts[0]);
        const unit = parts[1];
        if (unit.startsWith('h') && value < 1) return true;
        if (unit.startsWith('m') && value < 60) return true;
      }
      return false;
    };
    
    setIsUrgent(parseTime(timeLeft));
  }, [timeLeft]);

  // Countdown timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const parts = prev.split(' ');
        if (parts.length >= 2) {
          let value = parseInt(parts[0]);
          const unit = parts[1];
          
          if (unit.startsWith('m') && value > 0) {
            return `${value - 1}m`;
          } else if (unit.startsWith('h') && value > 0) {
            return `${value - 1}h ${Math.floor(Math.random() * 60)}m`;
          }
        }
        return prev;
      });
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const handleWatchToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWatched(!isWatched);
    onWatchToggle?.(auction.id);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-sage-900/20 backdrop-blur-lg rounded-2xl overflow-hidden border border-sage-700 hover:border-sage-500/50 transition-all duration-300 relative"
    >
      <Link to={`/auction/${auction.id}`}>
        <div className="relative">
          <img
            src={auction.image}
            alt={auction.title}
            className="w-full h-40 object-cover"
          />
          
          {/* Live Indicator */}
          <div className="absolute top-3 left-3 flex items-center bg-red-500/90 text-white text-xs font-bold px-2 py-1 rounded-full">
            <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>
            LIVE
          </div>
          
          {/* Discount Badge */}
          <div className="absolute top-3 left-16 bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {discount}% OFF
          </div>
          
          {/* Time Left Badge */}
          <div className={`absolute top-3 right-12 px-2 py-1 rounded-full text-xs font-bold ${
            isUrgent 
              ? 'bg-red-500 text-white animate-pulse' 
              : 'bg-charcoal-900/80 text-white'
          }`}>
            <Clock size={10} className="inline mr-1" />
            {timeLeft}
          </div>
          
          {/* Watch Button */}
          <button
            onClick={handleWatchToggle}
            className="absolute top-3 right-3 p-2 bg-charcoal-900/80 backdrop-blur-sm rounded-full hover:bg-charcoal-800 transition-colors"
          >
            {isWatched ? (
              <Bell size={16} className="text-sage-400 fill-current" />
            ) : (
              <BellOff size={16} className="text-white" />
            )}
          </button>
          
          {/* XP Badge */}
          <div className="absolute bottom-3 right-3 flex items-center bg-sage-500/90 text-white text-xs font-medium px-2 py-1 rounded-full">
            <Zap size={12} className="mr-1" />
            {auction.sellerXP}
          </div>

          {/* Recent Bid Activity */}
          {recentBidActivity && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute bottom-3 left-3 bg-green-500/90 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center"
            >
              <TrendingUp size={10} className="mr-1" />
              NEW BID!
            </motion.div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-white mb-2 line-clamp-2">
            {auction.title}
          </h3>
          
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="flex items-center mb-1">
                <Gavel size={14} className="text-sage-400 mr-1" />
                <motion.span 
                  key={currentBid}
                  initial={{ scale: 1.1, color: '#7A8471' }}
                  animate={{ scale: 1, color: '#ffffff' }}
                  className="text-xl font-bold text-white"
                >
                  ${currentBid}
                </motion.span>
                {recentBidActivity && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-2 text-green-400 text-xs"
                  >
                    +${currentBid - auction.currentBid}
                  </motion.div>
                )}
              </div>
              <span className="text-sm text-sage-400 line-through">
                ${auction.originalPrice}
              </span>
            </div>
            <div className="text-right">
              <div className="flex items-center text-xs text-sage-400 mb-1">
                <Users size={10} className="mr-1" />
                <motion.span key={bidCount}>
                  {bidCount} bids
                </motion.span>
              </div>
              <p className="text-xs text-accent-400 font-medium">
                {isUrgent ? 'ENDING SOON!' : 'Active'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center text-xs text-sage-400 mb-3">
            <MapPin size={12} className="mr-1" />
            <span>{auction.distance}</span>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {auction.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="bg-sage-700 text-sage-300 text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
            {auction.tags.length > 2 && (
              <span className="text-sage-400 text-xs px-2 py-1">
                +{auction.tags.length - 2}
              </span>
            )}
          </div>

          {/* Quick Bid Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              e.preventDefault();
              // Quick bid functionality
              setCurrentBid(prev => prev + 1);
              setBidCount(prev => prev + 1);
              setRecentBidActivity(true);
              setTimeout(() => setRecentBidActivity(false), 3000);
            }}
            className="w-full mt-3 bg-gradient-sage text-white font-medium py-2 rounded-lg hover:shadow-premium transition-all duration-300 text-sm"
          >
            Quick Bid ${currentBid + 1}
          </motion.button>
        </div>
      </Link>
    </motion.div>
  );
};

export default AuctionCard;