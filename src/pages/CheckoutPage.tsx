import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, User, Shield, QrCode, CreditCard, Gavel, Clock, TrendingUp } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { mockAuctions } from '../data/mockData';
import { useCart } from '../context/CartContext';

const CheckoutPage: React.FC = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [step, setStep] = useState('bidding'); // bidding, payment, pickup
  const [currentBid, setCurrentBid] = useState('');
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState('2h 34m');
  
  const auction = mockAuctions.find(item => item.id === id);
  
  if (!auction) {
    return <div>Auction not found</div>;
  }

  const handleBidSubmit = () => {
    const bidAmount = parseFloat(currentBid);
    if (bidAmount > auction.currentBid) {
      // Add to cart when bid is placed
      addToCart({
        id: auction.id,
        title: auction.title,
        currentBid: bidAmount,
        image: auction.image,
        timeLeft: auction.timeLeft
      });
      
      // Simulate winning bid
      setTimeout(() => {
        setStep('payment');
      }, 1000);
    } else {
      alert('Bid must be higher than current bid!');
    }
  };

  const handlePayment = () => {
    setPaymentComplete(true);
    setTimeout(() => {
      setStep('pickup');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-dark px-6 py-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link to="/marketplace" className="p-2 mr-4 text-sage-400 hover:text-white transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-2xl font-display font-bold text-white">
              {step === 'bidding' && 'Live Auction'}
              {step === 'payment' && 'Payment'}
              {step === 'pickup' && 'Pickup Arranged'}
            </h1>
            <p className="text-sage-400">
              {step === 'bidding' && `Ends in ${timeLeft}`}
              {step === 'payment' && 'Complete your purchase'}
              {step === 'pickup' && 'Congratulations on winning!'}
            </p>
          </div>
        </div>

        {step === 'bidding' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Auction Details */}
            <div className="bg-sage-900/20 backdrop-blur-lg rounded-2xl p-6 border border-sage-700">
              <img
                src={auction.image}
                alt={auction.title}
                className="w-full h-64 object-cover rounded-xl mb-6"
              />
              
              <h2 className="text-2xl font-bold text-white mb-4">{auction.title}</h2>
              
              {/* Current Bid Info */}
              <div className="bg-sage-500/10 border border-sage-500/20 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Gavel className="text-sage-400 mr-2" size={20} />
                    <span className="text-sage-400 font-medium">Current Bid</span>
                  </div>
                  <div className="flex items-center text-accent-400">
                    <Clock className="mr-1" size={16} />
                    <span className="font-medium">{timeLeft}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-white">${auction.currentBid}</span>
                  <div className="text-right">
                    <p className="text-sm text-sage-400">{auction.bidCount} bids</p>
                    <p className="text-sm text-sage-400 line-through">${auction.originalPrice}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center text-sage-300 mb-4">
                <MapPin size={16} className="mr-2" />
                <span>{auction.distance} away</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {auction.tags.map(tag => (
                  <span key={tag} className="bg-sage-700 text-sage-300 px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bidding Section */}
            <div className="bg-sage-900/20 backdrop-blur-lg rounded-2xl p-6 border border-sage-700">
              <h3 className="text-lg font-semibold text-white mb-4">Place Your Bid</h3>
              
              <div className="flex space-x-3 mb-4">
                <div className="flex-1">
                  <input
                    type="number"
                    value={currentBid}
                    onChange={(e) => setCurrentBid(e.target.value)}
                    placeholder={`Minimum: $${auction.currentBid + 1}`}
                    min={auction.currentBid + 1}
                    step="0.50"
                    className="w-full px-4 py-3 bg-charcoal-700 border border-sage-600 rounded-xl text-white placeholder-sage-400 focus:border-sage-500 focus:outline-none transition-colors"
                  />
                </div>
                <button
                  onClick={handleBidSubmit}
                  disabled={!currentBid || parseFloat(currentBid) <= auction.currentBid}
                  className="px-6 py-3 bg-gradient-sage text-white font-semibold rounded-xl hover:shadow-premium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Bid Now
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 5].map(increment => (
                  <button
                    key={increment}
                    onClick={() => setCurrentBid((auction.currentBid + increment).toString())}
                    className="py-2 bg-sage-700 text-white rounded-lg hover:bg-sage-600 transition-colors text-sm"
                  >
                    +${increment}
                  </button>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-accent-500/10 border border-accent-500/20 rounded-lg">
                <p className="text-accent-400 text-sm">
                  💡 Tip: Auctions end automatically when time runs out. Bid early to secure your item!
                </p>
              </div>
            </div>

            {/* Seller Info */}
            <div className="bg-sage-900/20 backdrop-blur-lg rounded-2xl p-6 border border-sage-700">
              <h3 className="text-lg font-semibold text-white mb-4">Seller Information</h3>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-sage rounded-full flex items-center justify-center mr-4">
                  <User size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-medium text-white">Sarah M.</p>
                  <p className="text-sm text-sage-400">MIT Student • XP Level {auction.sellerXP}</p>
                  <div className="flex items-center mt-1">
                    <Shield size={14} className="text-green-400 mr-1" />
                    <span className="text-sm text-green-400">Verified Student</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 'payment' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Winning Bid Confirmation */}
            <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-white mb-2">Congratulations!</h2>
              <p className="text-green-400 mb-4">You won the auction with a bid of ${currentBid}</p>
              <div className="flex items-center justify-center text-sm text-sage-300">
                <TrendingUp className="mr-1" size={16} />
                <span>You saved ${auction.originalPrice - parseFloat(currentBid)} (
                  {Math.round(((auction.originalPrice - parseFloat(currentBid)) / auction.originalPrice) * 100)}% off)
                </span>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-sage-900/20 backdrop-blur-lg rounded-2xl p-6 border border-sage-700">
              <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sage-300">{auction.title}</span>
                <span className="text-white">${currentBid}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sage-300">Platform fee</span>
                <span className="text-white">$2.00</span>
              </div>
              <hr className="border-sage-600 my-4" />
              <div className="flex justify-between items-center text-lg font-bold">
                <span className="text-white">Total</span>
                <span className="text-sage-400">${parseFloat(currentBid) + 2}</span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-sage-900/20 backdrop-blur-lg rounded-2xl p-6 border border-sage-700">
              <h3 className="text-lg font-semibold text-white mb-4">Payment Method</h3>
              <div className="border border-sage-600 rounded-xl p-4 mb-4">
                <div className="flex items-center">
                  <CreditCard size={20} className="text-sage-400 mr-3" />
                  <div>
                    <p className="text-white font-medium">•••• •••• •••• 4242</p>
                    <p className="text-sm text-sage-400">Expires 12/25</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Button */}
            <button
              onClick={handlePayment}
              disabled={paymentComplete}
              className="w-full bg-gradient-sage text-white font-semibold py-4 rounded-2xl hover:shadow-premium transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {paymentComplete ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              ) : (
                <CreditCard className="mr-2" size={20} />
              )}
              {paymentComplete ? 'Processing...' : `Pay $${parseFloat(currentBid) + 2}`}
            </button>
          </motion.div>
        )}

        {step === 'pickup' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 text-center"
          >
            {/* Success Message */}
            <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6">
              <div className="text-6xl mb-4">🏆</div>
              <h2 className="text-2xl font-bold text-white mb-2">Auction Won!</h2>
              <p className="text-green-400">Payment successful! The seller has been notified.</p>
            </div>

            {/* QR Codes */}
            <div className="bg-sage-900/20 backdrop-blur-lg rounded-2xl p-6 border border-sage-700">
              <h3 className="text-lg font-semibold text-white mb-6">Pickup Instructions</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="bg-white p-4 rounded-xl mb-3 inline-block">
                    <QrCode size={80} className="text-black" />
                  </div>
                  <p className="text-sm text-sage-300">Your QR Code</p>
                  <p className="text-xs text-sage-400">Show this to seller</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-white p-4 rounded-xl mb-3 inline-block">
                    <QrCode size={80} className="text-black" />
                  </div>
                  <p className="text-sm text-sage-300">Seller's QR Code</p>
                  <p className="text-xs text-sage-400">Scan when you meet</p>
                </div>
              </div>
              
              <div className="bg-sage-500/10 border border-sage-500/20 rounded-xl p-4 mb-4">
                <p className="text-sage-400 text-sm">
                  💡 Both QR codes must be scanned to complete the transaction and release funds.
                </p>
              </div>
              
              <div className="text-left space-y-2">
                <div className="flex items-center">
                  <MapPin size={16} className="text-sage-400 mr-2" />
                  <span className="text-sage-300">Pickup: Baker House Lobby</span>
                </div>
                <div className="flex items-center">
                  <User size={16} className="text-sage-400 mr-2" />
                  <span className="text-sage-300">Contact: Sarah M. (available after payment)</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full bg-sage-500 text-white font-semibold py-3 rounded-xl hover:bg-sage-600 transition-colors">
                Contact Seller
              </button>
              <Link
                to="/marketplace"
                className="block w-full bg-charcoal-800 text-white font-semibold py-3 rounded-xl hover:bg-charcoal-700 transition-colors text-center"
              >
                Continue Bidding
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;