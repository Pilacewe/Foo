import React from "react";
import { useAppStore } from "../store/AppContext";
import {
  LayoutDashboard,
  Package2,
  PlusCircle,
  Bell,
  Store,
} from "lucide-react";
import { motion } from "motion/react";

export const SellerBottomNav = () => {
  const { currentView, navigate, orders, currentUser, stores } = useAppStore();

  const myStore = stores.find((s) => s.ownerId === currentUser?.id);
  const myOrders = orders.filter((o) => o.storeId === myStore?.id);
  const pendingPickup = myOrders.filter((o) =>
    ["RESERVED", "PREPARING", "READY"].includes(o.status),
  ).length;

  const navItems = [
    { id: "SELLER_DASHBOARD", icon: LayoutDashboard, label: "Dash" },
    { id: "SELLER_MENU", icon: Package2, label: "Menu" },
    { id: "SELLER_ADD", icon: PlusCircle, label: "Add", center: true },
    { id: "SELLER_ORDERS", icon: Bell, label: "Order", badge: pendingPickup },
    { id: "SELLER_PROFILE", icon: Store, label: "Merchant" },
  ];

  return (
    <div className="fixed bottom-6 inset-x-0 z-50 flex justify-center lg:hidden pointer-events-none px-4">
      <div className="bg-white/95 backdrop-blur-lg border border-white/60 rounded-full p-2 pointer-events-auto shadow-[0_12px_30px_rgba(33,149,111,0.15)] ring-1 ring-black/5 w-full max-w-[380px]">
        <div className="flex justify-between items-center w-full gap-1">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            const Icon = item.icon;

            if (item.center) {
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id as any)}
                  className="relative flex items-center justify-center w-[52px] h-[52px] shrink-0 pointer-events-none"
                >
                  <div className="pointer-events-auto absolute bottom-4 flex items-center justify-center w-14 h-14 bg-brand-primary text-white rounded-full shadow-[0_8px_20px_rgba(33,149,111,0.3)] transition-transform hover:scale-105 active:scale-95 z-20">
                    <Icon size={28} strokeWidth={2.5} />
                  </div>
                </button>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => navigate(item.id as any)}
                className={`relative flex items-center justify-center h-[52px] transition-all duration-300 active:scale-95 ${isActive ? "bg-brand-primary text-white w-full rounded-full shadow-[0_4px_12px_rgba(33,149,111,0.25)]" : "w-[52px] text-brand-olive/50 hover:text-brand-charcoal hover:bg-brand-cream/50 rounded-full shrink-0 group"}`}
              >
                <div className="flex items-center justify-center gap-1.5 w-full px-1.5">
                  <div className="relative flex items-center">
                    <Icon
                      size={20}
                      strokeWidth={isActive ? 2.5 : 2}
                      className={`transition-colors duration-300 ${isActive ? "text-white" : "group-hover:scale-110"}`}
                    />
                    {!!item.badge && item.badge > 0 ? (
                      !isActive ? (
                        <span className="absolute -top-1 -right-1.5 w-2.5 h-2.5 bg-accent-orange rounded-full border-2 border-white" />
                      ) : (
                        <span className="absolute -top-1 -right-1.5 w-2.5 h-2.5 bg-accent-orange rounded-full border-2 border-brand-primary" />
                      )
                    ) : null}
                  </div>
                  {isActive && (
                    <span className="text-[13px] font-bold tracking-wide transition-all duration-300 whitespace-nowrap min-w-0 truncate">
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
