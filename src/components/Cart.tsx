import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Plus, Minus, Heart, Trash2, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { state, updateQuantity, removeFromCart, saveForLater, moveToCart, clearCart } = useCart();
  const [activeTab, setActiveTab] = useState<'cart' | 'saved'>('cart');

  const platformFee = 2.00;
  const finalTotal = state.total + platformFee;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
          
          {/* Cart Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-gradient-dark border-l border-sage-700 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-sage-700">
              <div className="flex items-center">
                <ShoppingBag className="text-sage-400 mr-3" size={24} />
                <h2 className="text-xl font-display font-bold text-white">
                  Your Cart
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-sage-400 hover:text-white transition-colors rounded-lg hover:bg-sage-800/50"
              >
                <X size={20} />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-sage-700">
              <button
                onClick={() => setActiveTab('cart')}
                className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'cart'
                    ? 'text-white border-b-2 border-sage-400'
                    : 'text-sage-400 hover:text-white'
                }`}
              >
                Cart ({state.itemCount})
              </button>
              <button
                onClick={() => setActiveTab('saved')}
                className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'saved'
                    ? 'text-white border-b-2 border-sage-400'
                    : 'text-sage-400 hover:text-white'
                }`}
              >
                Saved ({state.savedItems.length})
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {activeTab === 'cart' ? (
                <div className="p-6">
                  {state.items.length === 0 ? (
                    <div className="text-center py-12">
                      <ShoppingBag className="w-16 h-16 text-sage-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-white mb-2">Your cart is empty</h3>
                      <p className="text-sage-400 mb-6">Start bidding on items to add them here</p>
                      <button
                        onClick={onClose}
                        className="px-6 py-3 bg-gradient-sage text-white rounded-xl hover:shadow-premium transition-all duration-300"
                      >
                        Browse Auctions
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {state.items.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="bg-sage-900/20 rounded-xl p-4 border border-sage-700"
                        >
                          <div className="flex space-x-3">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-white truncate">{item.title}</h4>
                              <p className="text-sm text-sage-400">{item.timeLeft} left</p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-lg font-bold text-sage-300">
                                  ${item.currentBid}
                                </span>
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="p-1 text-sage-400 hover:text-white transition-colors"
                                  >
                                    <Minus size={16} />
                                  </button>
                                  <span className="text-white font-medium w-8 text-center">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="p-1 text-sage-400 hover:text-white transition-colors"
                                  >
                                    <Plus size={16} />
                                  </button>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2 mt-2">
                                <button
                                  onClick={() => saveForLater(item.id)}
                                  className="flex items-center text-xs text-sage-400 hover:text-white transition-colors"
                                >
                                  <Heart size={12} className="mr-1" />
                                  Save for later
                                </button>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="flex items-center text-xs text-red-400 hover:text-red-300 transition-colors"
                                >
                                  <Trash2 size={12} className="mr-1" />
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-6">
                  {state.savedItems.length === 0 ? (
                    <div className="text-center py-12">
                      <Heart className="w-16 h-16 text-sage-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-white mb-2">No saved items</h3>
                      <p className="text-sage-400">Items you save for later will appear here</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {state.savedItems.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="bg-sage-900/20 rounded-xl p-4 border border-sage-700"
                        >
                          <div className="flex space-x-3">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-white truncate">{item.title}</h4>
                              <p className="text-sm text-sage-400">{item.timeLeft} left</p>
                              <span className="text-lg font-bold text-sage-300">
                                ${item.currentBid}
                              </span>
                              <div className="flex items-center space-x-2 mt-2">
                                <button
                                  onClick={() => moveToCart(item.id)}
                                  className="px-3 py-1 bg-sage-600 text-white text-xs rounded-lg hover:bg-sage-500 transition-colors"
                                >
                                  Move to cart
                                </button>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="flex items-center text-xs text-red-400 hover:text-red-300 transition-colors"
                                >
                                  <Trash2 size={12} className="mr-1" />
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            {activeTab === 'cart' && state.items.length > 0 && (
              <div className="border-t border-sage-700 p-6 bg-sage-900/20">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sage-300">
                    <span>Subtotal</span>
                    <span>${state.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sage-300">
                    <span>Platform fee</span>
                    <span>${platformFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-white border-t border-sage-700 pt-2">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Link
                    to="/checkout"
                    onClick={onClose}
                    className="w-full bg-gradient-sage text-white font-semibold py-3 rounded-xl hover:shadow-premium transition-all duration-300 flex items-center justify-center"
                  >
                    <CreditCard className="mr-2" size={20} />
                    Checkout
                  </Link>
                  <button
                    onClick={clearCart}
                    className="w-full text-sage-400 hover:text-white transition-colors text-sm"
                  >
                    Clear cart
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;