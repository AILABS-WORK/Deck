import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Plus, Image, User, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Cart from './Cart';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { state } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const navLinks = [
    { to: '/marketplace', icon: Home, label: 'Home' },
    { to: '/list', icon: Plus, label: 'List' },
    { to: '/visualizer', icon: Image, label: 'Style' },
    { to: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-gradient-dark">
      <main className="pb-20">
        {children}
      </main>
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-charcoal-900/95 backdrop-blur-lg border-t border-sage-700">
        <div className="flex justify-around items-center py-2 px-4">
          {navLinks.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-sage text-white shadow-premium scale-105'
                    : 'text-sage-400 hover:text-white hover:bg-sage-800/50'
                }`
              }
            >
              <Icon size={20} />
              <span className="text-xs mt-1 font-medium">{label}</span>
            </NavLink>
          ))}
          
          {/* Cart Button */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative flex flex-col items-center py-2 px-3 text-sage-400 hover:text-white transition-colors rounded-xl hover:bg-sage-800/50"
          >
            <ShoppingBag size={20} />
            <span className="text-xs mt-1 font-medium">Cart</span>
            {state.itemCount > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">{state.itemCount}</span>
              </div>
            )}
          </button>
        </div>
      </nav>

      {/* Cart Drawer */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Layout;