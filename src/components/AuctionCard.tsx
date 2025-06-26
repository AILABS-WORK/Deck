import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, MapPin, Clock, Zap, Gavel, Bell, BellOff } from 'lucide-react';
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
  const [isUrgent, setIsUrgent] = useState(false);
  
  const discount = Math.round(((auction.originalPrice - auction.currentBid) / auction.originalPrice) * 100);

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

  const handleWatchToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWatched(!isWatched);
    onWatchToggle?.(auction.id);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-dark-800/40 backdrop-blur-lg rounded-2xl overflow-hidden border border-dark-700 hover:border-primary-500/50 transition-all duration-300"
    >
      <Link to={`/auction/${auction.id}`}>
        <div className="relative">
          <img
            src={auction.image}
            alt={auction.title}
            className="w-full h-40 object-cover"
          />
          
          {/* Discount Badge */}
          <div className="absolute top-3 left-3 bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {discount}% OFF
          </div>
          
          {/* Time Left Badge */}
          <div className={`absolute top-3 right-12 px-2 py-1 rounded-full text-xs font-bold ${
            isUrgent 
              ? 'bg-red-500 text-white animate-pulse' 
              : 'bg-dark-900/80 text-white'
          }`}>
            <Clock size={10} className="inline mr-1" />
            {timeLeft}
          </div>
          
          {/* Watch Button */}
          <button
            onClick={handleWatchToggle}
            className="absolute top-3 right-3 p-2 bg-dark-900/80 backdrop-blur-sm rounded-full hover:bg-dark-800 transition-colors"
          >
            {isWatched ? (
              <Bell size={16} className="text-primary-400 fill-current" />
            ) : (
              <BellOff size={16} className="text-white" />
            )}
          </button>
          
          {/* XP Badge */}
          <div className="absolute bottom-3 right-3 flex items-center bg-primary-500/90 text-white text-xs font-medium px-2 py-1 rounded-full">
            <Zap size={12} className="mr-1" />
            {auction.sellerXP}
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-white mb-2 line-clamp-2">
            {auction.title}
          </h3>
          
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="flex items-center mb-1">
                <Gavel size={14} className="text-primary-400 mr-1" />
                <span className="text-xl font-bold text-primary-400">${auction.currentBid}</span>
              </div>
              <span className="text-sm text-dark-400 line-through">
                ${auction.originalPrice}
              </span>
            </div>
            <div className="text-right">
              <p className="text-xs text-dark-400">{auction.bidCount} bids</p>
              <p className="text-xs text-accent-400 font-medium">
                {isUrgent ? 'ENDING SOON!' : 'Active'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center text-xs text-dark-400 mb-3">
            <MapPin size={12} className="mr-1" />
            <span>{auction.distance}</span>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {auction.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="bg-dark-700 text-dark-300 text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
            {auction.tags.length > 2 && (
              <span className="text-dark-400 text-xs px-2 py-1">
                +{auction.tags.length - 2}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default AuctionCard;