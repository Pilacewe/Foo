/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useAppStore } from './store/AppContext';
import { OnboardingView } from './views/OnboardingView';
import { BuyerHome } from './views/buyer/BuyerHome';
import { BuyerOrders } from './views/buyer/BuyerOrders';
import { BuyerMaps } from './views/buyer/BuyerMaps';
import { BuyerProfile } from './views/buyer/BuyerProfile';
import { SellerDashboard } from './views/seller/SellerDashboard';
import { SellerMenu } from './views/seller/SellerMenu';
import { SellerOrders } from './views/seller/SellerOrders';
import { SellerProfile } from './views/seller/SellerProfile';
import { SellerAdd } from './views/seller/SellerAdd';
import { FoodDetailView } from './views/buyer/FoodDetailView';

import { motion, AnimatePresence } from 'motion/react';
import { Home, Receipt, Map, User, LayoutDashboard, Utensils, Navigation, Store, PlusCircle, Leaf, Search, Bell } from 'lucide-react';

const DesktopTopNav = ({ type }: { type: 'BUYER' | 'SELLER' }) => {
  const { currentView, navigate } = useAppStore();
  
  const buyerLinks = [
    { id: 'BUYER_HOME', label: 'Explore', icon: <Home size={18} /> },
    { id: 'BUYER_MAPS', label: 'Map View', icon: <Map size={18} /> },
    { id: 'BUYER_ORDERS', label: 'Orders', icon: <Receipt size={18} /> },
  ];

  const sellerLinks = [
    { id: 'SELLER_DASHBOARD', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { id: 'SELLER_MENU', label: 'Inventory', icon: <Utensils size={18} /> },
    { id: 'SELLER_ORDERS', label: 'Orders', icon: <Receipt size={18} /> },
    { id: 'SELLER_PROFILE', label: 'Store', icon: <Store size={18} /> },
  ];

  const links = type === 'BUYER' ? buyerLinks : sellerLinks;

  return (
    <div className="hidden lg:flex fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-7xl z-50 bg-white/80 backdrop-blur-2xl border border-brand-beige/50 shadow-[0_8px_40px_rgba(44,48,46,0.08)] rounded-[24px] px-6 py-3 items-center justify-between">
      {/* Brand */}
      <div className="flex items-center gap-3 cursor-pointer group shrink-0" onClick={() => navigate(type === 'BUYER' ? 'BUYER_HOME' : 'SELLER_DASHBOARD')}>
        <div className="w-10 h-10 rounded-2xl bg-brand-charcoal text-brand-cream flex items-center justify-center font-black group-hover:scale-105 transition-transform shadow-[0_4px_12px_rgba(29,35,32,0.15)] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/20 to-transparent"></div>
          <Leaf fill="currentColor" size={18} className="relative z-10" />
        </div>
        <span className="text-xl font-bold text-brand-charcoal tracking-tight font-sans">Serene</span>
      </div>

      {/* Center Nav */}
      <nav className="flex items-center gap-1 bg-brand-cream/50 p-1.5 rounded-2xl border border-brand-beige/50">
        {links.map((link) => {
          const isActive = currentView === link.id || (link.id === 'BUYER_HOME' && currentView.startsWith('FOOD_DETAIL_'));
          return (
            <button
              key={link.id}
              onClick={() => navigate(link.id as any)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-[14px] transition-all text-[14px] font-bold ${
                isActive 
                  ? 'bg-white text-brand-charcoal shadow hover:shadow-md border border-brand-beige' 
                  : 'text-brand-olive hover:text-brand-charcoal hover:bg-brand-cream'
              }`}
            >
              <div className={isActive ? 'text-brand-primary' : ''}>{link.icon}</div>
              {link.label}
            </button>
          );
        })}
      </nav>

      {/* Right Controls */}
      <div className="flex items-center gap-4 shrink-0">
        {type === 'BUYER' && (
          <div className="relative group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-olive/70 w-4 h-4 group-focus-within:text-brand-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-brand-cream/50 border border-brand-beige text-brand-charcoal text-sm font-semibold rounded-[16px] pl-10 pr-4 py-2.5 w-48 focus:w-64 transition-all outline-none focus:border-brand-primary/30 focus:bg-white placeholder:text-brand-olive/50 shadow-inner"
            />
          </div>
        )}
        <button className="w-10 h-10 rounded-[16px] bg-brand-cream flex items-center justify-center text-brand-olive hover:text-brand-charcoal hover:bg-brand-beige/50 transition-colors relative border border-brand-beige/50">
          <Bell size={18} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-accent-orange rounded-full border-2 border-brand-cream"></span>
        </button>
        <button onClick={() => navigate(type === 'BUYER' ? 'BUYER_PROFILE' : 'SELLER_PROFILE')} className="w-10 h-10 rounded-[16px] border border-brand-beige/50 overflow-hidden hover:scale-105 transition-transform shadow-sm relative">
          <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile" className="w-full h-full object-cover" />
        </button>
        {type === 'SELLER' && (
          <button onClick={() => navigate('SELLER_ADD')} className="bg-brand-charcoal text-brand-cream px-5 py-2.5 rounded-[16px] text-sm font-bold flex items-center gap-2 hover:bg-black transition-colors shadow-[0_4px_12px_rgba(29,35,32,0.2)]">
            <PlusCircle size={16} /> New Menu
          </button>
        )}
      </div>
    </div>
  );
};

const AppRouter = () => {
  const { currentView, navigate } = useAppStore();

  const isBuyer = currentView.startsWith('BUYER_') || currentView.startsWith('FOOD_DETAIL_');
  const isSeller = currentView.startsWith('SELLER_');

  return (
    <div className="w-full h-screen relative flex flex-col bg-[#FCFDF9] overflow-hidden">
      {isBuyer && <DesktopTopNav type="BUYER" />}
      {isSeller && <DesktopTopNav type="SELLER" />}

      <div className="flex-1 w-full relative h-full overflow-y-auto overflow-x-hidden">
        {currentView === 'ONBOARDING' && <OnboardingView />}
        {currentView === 'BUYER_HOME' && <BuyerHome />}
        {currentView === 'BUYER_ORDERS' && <BuyerOrders />}
        {currentView === 'BUYER_MAPS' && <BuyerMaps />}
        {currentView === 'BUYER_PROFILE' && <BuyerProfile />}
        {currentView === 'SELLER_DASHBOARD' && <SellerDashboard />}
        {currentView === 'SELLER_MENU' && <SellerMenu />}
        {currentView === 'SELLER_ORDERS' && <SellerOrders />}
        {currentView === 'SELLER_PROFILE' && <SellerProfile />}
        {currentView === 'SELLER_ADD' && <SellerAdd />}
        {currentView.startsWith('FOOD_DETAIL_') && (
          <FoodDetailView 
            foodId={currentView.replace('FOOD_DETAIL_', '')} 
            onBack={() => navigate('BUYER_HOME')}
          />
        )}
        
        {/* Fallback for undefined routes during MVP dev */}
        {currentView !== 'ONBOARDING' && 
         currentView !== 'BUYER_HOME' && 
         currentView !== 'BUYER_ORDERS' && 
         currentView !== 'BUYER_MAPS' && 
         currentView !== 'BUYER_PROFILE' && 
         currentView !== 'SELLER_DASHBOARD' && 
         currentView !== 'SELLER_MENU' && 
         currentView !== 'SELLER_ORDERS' && 
         currentView !== 'SELLER_PROFILE' && 
         currentView !== 'SELLER_ADD' && 
         !currentView.startsWith('FOOD_DETAIL_') && (
          <div className="flex items-center justify-center h-full p-4 text-center">
            <p className="text-slate-500 text-sm">View {currentView} is under construction</p>
            <button onClick={() => window.location.reload()} className="ml-4 text-green-600 font-medium">Reset</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}
