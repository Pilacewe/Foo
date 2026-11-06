import React from 'react';
import { useAppStore } from '../store/AppContext';
import { Compass, ShoppingBag, User, Store } from 'lucide-react';

export const BuyerBottomNav = () => {
  const { currentView, navigate } = useAppStore();

  const navItems = [
    { id: 'BUYER_HOME', icon: Store, label: 'Eksplor' },
    { id: 'BUYER_MAPS', icon: Compass, label: 'Peta' },
    { id: 'BUYER_ORDERS', icon: ShoppingBag, label: 'Pesanan' },
    { id: 'BUYER_PROFILE', icon: User, label: 'Profil' },
  ];

  return (
    <div className="fixed bottom-6 inset-x-0 z-50 flex justify-center lg:hidden pointer-events-none px-5">
       <div className="bg-white/95 backdrop-blur-lg border border-white/60 rounded-full p-2 pointer-events-auto shadow-[0_12px_30px_rgba(33,149,111,0.15)] ring-1 ring-black/5 w-full max-w-[340px]">
          <div className="flex justify-between items-center w-full gap-1">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              const Icon = item.icon;
              
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id as any)}
                  className={`relative flex items-center justify-center h-[52px] transition-all duration-300 active:scale-95 ${isActive ? 'bg-brand-primary text-white w-full rounded-full shadow-[0_4px_12px_rgba(33,149,111,0.25)]' : 'w-[52px] text-brand-olive/50 hover:text-brand-charcoal hover:bg-brand-cream/50 rounded-full shrink-0 group'}`}
                >
                  <div className="flex items-center gap-2">
                    <Icon 
                      size={20} 
                      strokeWidth={isActive ? 2.5 : 2} 
                      className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-white' : 'group-hover:scale-110'}`} 
                    />
                    {isActive && (
                      <span className="text-[14px] font-bold tracking-wide transition-all duration-300 pr-1">
                        {item.label}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
       </div>
    </div>
  );
};

