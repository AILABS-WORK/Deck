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
      <Router basename={import.meta.env.DEV ? '/' : '/Deck'}>
        <div className="min-h-screen bg-gradient-dark text-white">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/marketplace" element={
              <Layout>
                <MarketplacePage />
              </Layout>
            } />
            <Route path="/list" element={
              <Layout>
                <ListItemPage />
              </Layout>
            } />
            <Route path="/visualizer" element={
              <Layout>
                <RoomVisualizerPage />
              </Layout>
            } />
            <Route path="/auction/:id" element={
              <Layout>
                <CheckoutPage />
              </Layout>
            } />
            <Route path="/profile" element={
              <Layout>
                <ProfilePage />
              </Layout>
            } />
            <Route path="/admin" element={
              <Layout>
                <AdminPage />
              </Layout>
            } />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;