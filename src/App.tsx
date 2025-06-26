import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import LandingPage from './pages/LandingPage';
import OnboardingPage from './pages/OnboardingPage';
import MarketplacePage from './pages/MarketplacePage';
import ListItemPage from './pages/ListItemPage';
import RoomVisualizerPage from './pages/RoomVisualizerPage';
import CheckoutPage from './pages/CheckoutPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import Layout from './components/Layout';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gradient-dark text-white">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/*" element={
              <Layout>
                <Routes>
                  <Route path="/marketplace" element={<MarketplacePage />} />
                  <Route path="/list" element={<ListItemPage />} />
                  <Route path="/visualizer" element={<RoomVisualizerPage />} />
                  <Route path="/auction/:id" element={<CheckoutPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/admin" element={<AdminPage />} />
                </Routes>
              </Layout>
            } />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;