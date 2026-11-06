import React, { useMemo } from "react";
import { useAppStore } from "../../store/AppContext";
import { motion } from "motion/react";
import {
  Settings,
  HelpCircle,
  LogOut,
  Award,
  ChevronRight,
  Leaf,
  Shield,
  Heart,
  TrendingUp,
  Moon,
  Wheat,
  Flame,
} from "lucide-react";
import { formatCurrency } from "../../utils/format";
import { BuyerBottomNav } from "../../components/BuyerBottomNav";

export const BuyerProfile = () => {
  const { logout, currentUser, orders, navigate } = useAppStore();

  const stats = useMemo(() => {
    const myOrders = orders.filter(
      (o) => o.buyerId === currentUser?.id && o.status === "COMPLETED",
    );
    const baselineSaved = currentUser?.savedMoney || 0;
    const baselineMeals = currentUser?.mealsRescued || 0;
    const baselineCo2 = currentUser?.co2Saved || 0;

    const extraSaved = myOrders.reduce(
      (acc, order) => acc + (order.savings || 0),
      0,
    );
    const extraMeals = myOrders.reduce((acc, order) => acc + order.quantity, 0);
    const extraCo2 = extraMeals * 0.25; // mock 0.25kg co2 per meal

    return {
      totalSaved: baselineSaved + extraSaved,
      totalMeals: baselineMeals + extraMeals,
      totalCo2: baselineCo2 + extraCo2,
    };
  }, [orders, currentUser]);

  const formatShortValue = (val: number) => {
    if (val >= 1000000) {
      return `Rp ${(val / 1000000).toFixed(1)} Jt`;
    } else if (val >= 10000) {
      return `Rp ${(val / 1000).toFixed(0)} Rb`;
    }
    return formatCurrency(val);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FCFDF9] w-full font-sans pb-6">
      {/* Header & Avatar Cinematic */}
      <div className="pt-[60px] px-6 pb-10 lg:pt-[140px] lg:pb-20 shrink-0 relative overflow-hidden bg-brand-primary lg:bg-brand-primary text-white rounded-b-[40px] lg:rounded-b-[48px] shadow-[0_12px_24px_rgba(33,149,111,0.2)] lg:shadow-[0_10px_40px_rgba(33,149,111,0.25)] z-10 w-full transition-colors">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 lg:bg-white/10 rounded-full blur-[80px] pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 lg:bg-white/10 rounded-full blur-[60px] pointer-events-none transform -translate-x-1/2 translate-y-1/2" />

        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-start mb-8 lg:mb-10 relative z-10">
            <div className="flex gap-4 items-center">
              <div className="w-[72px] h-[72px] lg:w-[84px] lg:h-[84px] rounded-[22px] lg:rounded-[24px] border-2 border-white/20 shadow-2xl overflow-hidden bg-white/10 lg:bg-white/5 flex items-center justify-center p-1 relative group shrink-0">
                <img
                  src={currentUser?.avatar}
                  className="w-full h-full object-cover rounded-[18px] lg:rounded-[20px]"
                  alt=""
                />
                <div className="absolute -bottom-1 -right-1 lg:-bottom-2 lg:-right-2 bg-brand-primary text-white w-7 h-7 lg:w-8 lg:h-8 rounded-full flex items-center justify-center border-[2px] border-white/20 lg:border-brand-primary shadow-sm">
                  <Shield
                    size={12}
                    className="lg:w-3.5 lg:h-3.5"
                    fill="currentColor"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center min-w-0 flex-1">
                <h1 className="text-xl lg:text-2xl font-bold font-sans tracking-tight mb-1 truncate leading-tight pr-2">
                  {currentUser?.name}
                </h1>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 lg:py-1.5 rounded-xl bg-white/15 lg:bg-white/10 backdrop-blur-md border border-white/20 lg:border-white/20 w-fit shadow-sm">
                  <Leaf
                    size={12}
                    className="text-white lg:text-white lg:w-3.5 lg:h-3.5"
                    fill="currentColor"
                  />
                  <p className="text-[10px] lg:text-[11px] font-bold text-white lg:text-white uppercase tracking-widest leading-none pt-px">
                    Eco Hero Lv 4
                  </p>
                </div>
              </div>
            </div>
            <button className="w-10 h-10 lg:w-12 lg:h-12 rounded-[16px] lg:rounded-[20px] bg-white/10 lg:bg-white/5 border border-white/20 lg:border-white/10 flex items-center justify-center text-white/90 lg:text-white/80 hover:text-white hover:bg-white/20 lg:hover:bg-white/10 transition-all backdrop-blur-sm shadow-sm shrink-0">
              <Settings
                size={20}
                className="lg:w-[22px] lg:h-[22px]"
                strokeWidth={1.5}
              />
            </button>
          </div>

          {/* Gamification Stats */}
          <div className="grid grid-cols-3 gap-2.5 lg:gap-3 relative z-10 w-full">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[20px] p-3 lg:p-4 flex flex-col items-center justify-center text-center w-full min-w-0">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mb-1.5 lg:mb-2 shrink-0">
                <TrendingUp size={14} className="text-white" strokeWidth={3} />
              </div>
              <div className="w-full flex justify-center px-1 mb-0.5 lg:mb-1">
                <p className="text-[12px] lg:text-[15px] font-black text-white leading-none truncate block w-full">
                  {formatShortValue(stats.totalSaved)}
                </p>
              </div>
              <p className="text-[8px] lg:text-[9px] text-white/80 font-bold uppercase tracking-widest shrink-0">
                Saved
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[20px] p-3 lg:p-4 flex flex-col items-center justify-center text-center w-full min-w-0">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mb-1.5 lg:mb-2 shrink-0">
                <Leaf
                  size={14}
                  className="text-white"
                  strokeWidth={3}
                  fill="currentColor"
                />
              </div>
              <div className="w-full flex justify-center items-baseline gap-0.5 truncate px-1 mb-0.5 lg:mb-1 text-white">
                <p className="text-[12px] lg:text-[15px] font-black leading-none truncate">
                  {stats.totalMeals}
                </p>
                <span className="text-[9px] lg:text-[10px] text-white/80 font-bold shrink-0">
                  pts
                </span>
              </div>
              <p className="text-[8px] lg:text-[9px] text-white/80 font-bold uppercase tracking-widest shrink-0">
                Rescued
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[20px] p-3 lg:p-4 flex flex-col items-center justify-center text-center w-full min-w-0">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mb-1.5 lg:mb-2 shrink-0">
                <span className="text-white text-[10px] font-black">CO₂</span>
              </div>
              <div className="w-full flex justify-center items-baseline gap-0.5 truncate px-1 mb-0.5 lg:mb-1 text-white">
                <p className="text-[12px] lg:text-[15px] font-black leading-none truncate">
                  {stats.totalCo2.toFixed(1)}
                </p>
                <span className="text-[9px] lg:text-[10px] text-white/80 font-bold shrink-0">
                  kg
                </span>
              </div>
              <p className="text-[8px] lg:text-[9px] text-white/80 font-bold uppercase tracking-widest shrink-0">
                Prevented
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 py-8 pb-32 mt-4 lg:mt-8 w-full max-w-5xl mx-auto relative z-0 lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start space-y-10 lg:space-y-0">
        {/* Achievements Section (Left Column on Desktop) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex justify-between items-center bg-white p-2 rounded-[20px] shadow-sm border border-brand-beige/50">
            <h4 className="font-bold text-brand-charcoal text-lg tracking-tight pl-3 flex items-center gap-2">
              <Award size={20} className="text-accent-orange" /> Milestones
            </h4>
            <button className="text-[12px] font-bold text-brand-primary bg-brand-primary/10 hover:bg-brand-primary/20 px-4 py-2 rounded-[14px] transition-colors">
              View All
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              {
                icon: (
                  <Moon
                    size={28}
                    className="text-indigo-500"
                    fill="currentColor"
                    fillOpacity={0.2}
                    strokeWidth={1.5}
                  />
                ),
                title: "Midnight Saver",
                desc: "Rescued after 9PM",
                lock: false,
                lockBg: "bg-indigo-50 text-indigo-500",
              },
              {
                icon: (
                  <Wheat
                    size={28}
                    className="text-amber-500"
                    strokeWidth={1.5}
                  />
                ),
                title: "Bakery Hunter",
                desc: "5 Bakery rescues",
                lock: stats.totalMeals < 5,
                lockBg: "bg-amber-50 text-amber-500",
              },
              {
                icon: (
                  <Flame
                    size={28}
                    className="text-rose-500"
                    fill="currentColor"
                    fillOpacity={0.2}
                    strokeWidth={1.5}
                  />
                ),
                title: "7-Day Streak",
                desc: "Rescued 1 week",
                lock: true,
                lockBg: "bg-rose-50 text-rose-500",
              },
            ].map((a, i) => (
              <div
                key={i}
                className={`p-5 rounded-[24px] border border-brand-beige relative overflow-hidden flex flex-col items-start transition-all group ${a.lock ? "bg-slate-50 opacity-70 grayscale" : "bg-white hover:shadow-[0_8px_30px_rgba(44,48,46,0.06)] hover:border-brand-primary/30"}`}
              >
                {/* Decorative background shape */}
                {!a.lock && (
                  <div
                    className={`absolute -right-4 -top-4 w-20 h-20 rounded-full blur-2xl opacity-40 transition-opacity group-hover:opacity-70 ${a.lockBg.split(" ")[0]}`}
                  />
                )}

                <div
                  className={`w-14 h-14 rounded-[18px] flex items-center justify-center mb-4 relative z-10 transition-transform group-hover:scale-110 ${a.lock ? "bg-slate-200 text-slate-400" : a.lockBg}`}
                >
                  {a.icon}
                </div>
                <h3 className="font-bold text-brand-charcoal text-[15px] leading-tight mb-1 relative z-10">
                  {a.title}
                </h3>
                <p className="text-[12px] font-medium text-brand-olive relative z-10">
                  {a.desc}
                </p>

                {a.lock && (
                  <div className="absolute top-4 right-4 text-slate-300">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="3"
                        y="11"
                        width="18"
                        height="11"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Environmental Impact Banner */}
          <div className="bg-gradient-to-br from-brand-primary via-[#26A67B] to-emerald-600 rounded-[24px] p-6 text-white shadow-lg overflow-hidden relative mt-8">
            <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2" />
            <div className="relative z-10 flex items-center gap-5">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-[20px] flex items-center justify-center shrink-0 border border-white/20">
                <Leaf
                  size={32}
                  fill="currentColor"
                  className="text-white drop-shadow-md"
                />
              </div>
              <div>
                <h3 className="font-black text-xl mb-1 tracking-tight drop-shadow-sm">
                  You're making an impact!
                </h3>
                <p className="text-sm text-white/90 font-medium leading-relaxed">
                  Your food rescues have prevented a total of{" "}
                  <span className="font-black text-white px-1">
                    {stats.totalCo2.toFixed(1)} kg
                  </span>{" "}
                  of CO₂ emissions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items (Right Column on Desktop) */}
        <div className="lg:col-span-5 space-y-4">
          <h4 className="font-bold text-brand-charcoal text-lg tracking-tight mb-4 ml-2">
            Preferences
          </h4>
          <div className="bg-white rounded-[28px] border border-brand-beige/80 shadow-[0_8px_30px_rgba(44,48,46,0.03)] p-2 space-y-1">
            {[
              {
                icon: (
                  <Heart
                    size={22}
                    className="text-rose-500"
                    fill="currentColor"
                    fillOpacity={0.2}
                    strokeWidth={1.5}
                  />
                ),
                label: "Favorite Stores",
                desc: "Manage your beloved bakeries",
                bg: "bg-rose-50",
              },
              {
                icon: (
                  <Shield
                    size={22}
                    className="text-indigo-600"
                    fill="currentColor"
                    fillOpacity={0.2}
                    strokeWidth={1.5}
                  />
                ),
                label: "Payment Methods",
                desc: "Securely manage your cards",
                bg: "bg-indigo-50",
              },
              {
                icon: (
                  <TrendingUp
                    size={22}
                    className="text-emerald-500"
                    strokeWidth={2}
                  />
                ),
                label: "Impact Data",
                desc: "Detailed environmental stats",
                bg: "bg-emerald-50",
              },
              {
                icon: (
                  <HelpCircle
                    size={22}
                    className="text-amber-500"
                    fill="currentColor"
                    fillOpacity={0.2}
                    strokeWidth={1.5}
                  />
                ),
                label: "Help & Support",
                desc: "FAQ and customer service",
                bg: "bg-amber-50",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 rounded-[20px] transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-14 h-14 rounded-[18px] flex items-center justify-center shadow-sm ${item.bg} group-hover:scale-105 transition-transform duration-300`}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h5 className="text-[15px] font-bold text-brand-charcoal mb-0.5">
                      {item.label}
                    </h5>
                    <p className="text-[12px] font-medium text-brand-olive">
                      {item.desc}
                    </p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-300 group-hover:text-brand-charcoal group-hover:bg-brand-cream shadow-sm transition-all border border-slate-100 group-hover:border-brand-beige">
                  <ChevronRight size={16} strokeWidth={2.5} />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <button
              onClick={logout}
              className="w-full bg-slate-50 border border-slate-200 hover:bg-rose-50 text-slate-600 hover:text-rose-600 hover:border-rose-200 font-bold py-4 rounded-[20px] text-[15px] transition-all flex items-center justify-center gap-2 group"
            >
              <LogOut
                size={18}
                className="group-hover:-translate-x-1 transition-transform stroke-[2]"
              />{" "}
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Floating Bottom Nav */}
      <BuyerBottomNav />
    </div>
  );
};
