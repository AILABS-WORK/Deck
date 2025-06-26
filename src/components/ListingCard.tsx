import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MapPin, Clock, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Listing {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  distance: string;
  timeAgo: string;
  tags: string[];
  sellerXP: number;
  isLiked?: boolean;
}

interface ListingCardProps {
  listing: Listing;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const [isLiked, setIsLiked] = useState(listing.isLiked || false);
  
  const discount = listing.originalPrice 
    ? Math.round(((listing.originalPrice - listing.price) / listing.originalPrice) * 100)
    : null;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-dark-800/40 backdrop-blur-lg rounded-2xl overflow-hidden border border-dark-700 hover:border-primary-500/50 transition-all duration-300"
    >
      <Link to={`/checkout/${listing.id}`}>
        <div className="relative">
          <img
            src={listing.image}
            alt={listing.title}
            className="w-full h-40 object-cover"
          />
          
          {/* Discount Badge */}
          {discount && (
            <div className="absolute top-3 left-3 bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {discount}% OFF
            </div>
          )}
          
          {/* Like Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsLiked(!isLiked);
            }}
            className="absolute top-3 right-3 p-2 bg-dark-900/80 backdrop-blur-sm rounded-full hover:bg-dark-800 transition-colors"
          >
            <Heart
              size={16}
              className={isLiked ? 'fill-red-500 text-red-500' : 'text-white'}
            />
          </button>
          
          {/* XP Badge */}
          <div className="absolute bottom-3 right-3 flex items-center bg-primary-500/90 text-white text-xs font-medium px-2 py-1 rounded-full">
            <Zap size={12} className="mr-1" />
            {listing.sellerXP}
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-white mb-2 line-clamp-2">
            {listing.title}
          </h3>
          
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-xl font-bold text-white">${listing.price}</span>
              {listing.originalPrice && (
                <span className="text-sm text-dark-400 line-through ml-2">
                  ${listing.originalPrice}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex items-center text-xs text-dark-400 mb-3">
            <MapPin size={12} className="mr-1" />
            <span className="mr-3">{listing.distance}</span>
            <Clock size={12} className="mr-1" />
            <span>{listing.timeAgo}</span>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {listing.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="bg-dark-700 text-dark-300 text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
            {listing.tags.length > 2 && (
              <span className="text-dark-400 text-xs px-2 py-1">
                +{listing.tags.length - 2}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ListingCard;