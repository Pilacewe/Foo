import React, { useMemo, useState } from "react";
import { useAppStore } from "../../store/AppContext";
import { BuyerBottomNav } from "../../components/BuyerBottomNav";
import {
  Search,
  MapPin,
  Bell,
  Zap,
  Clock,
  Leaf,
  Sparkles,
  Wheat,
  Utensils,
  Coffee,
  Clock3,
  Timer,
  LayoutDashboard,
  Compass,
  Map as MapIcon,
  ShoppingBag,
  Heart,
  User,
  LogOut,
  ChevronRight,
  TrendingUp,
  Store,
  ArrowRight,
  Flame,
  Croissant,
  ShoppingBasket,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { formatCurrency } from "../../utils/format";

export const BuyerHome = () => {
  const { logout, currentUser, foods, stores, orders, navigate } =
    useAppStore();
  const [activeCategory, setActiveCategory] = useState("All");

  const discountFoods = foods
    .filter((f) => f.quantityLeft > 0 && f.isActive !== false)
    .map((f) => {
      const store = stores.find((s) => s.id === f.storeId);
      const savings = f.originalPrice - f.rescuePrice;
      const savingsPercent = Math.round((savings / f.originalPrice) * 100);
      return { ...f, store, savingsPercent };
    });

  const stats = useMemo(() => {
    const myOrders = orders.filter(
      (o) => o.buyerId === currentUser?.id && o.status === "COMPLETED",
    );
    const baselineSaved = currentUser?.savedMoney || 0;
    const baselineMeals = currentUser?.mealsRescued || 0;

    const extraSaved = myOrders.reduce(
      (acc, order) => acc + (order.savings || 0),
      0,
    );
    const extraMeals = myOrders.reduce((acc, order) => acc + order.quantity, 0);

    return {
      totalSaved: baselineSaved + extraSaved,
      totalMeals: baselineMeals + extraMeals,
      savingsPercent: myOrders.length > 0 ? 65 : 60,
    };
  }, [orders, currentUser]);

  const expiringSoonFoods = useMemo(() => {
    return discountFoods.filter((f) => f.quantityLeft <= 3).slice(0, 5);
  }, [discountFoods]);

  const categories = [
    {
      name: "Fruits",
      image:
        "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=200&q=80",
      icon: <Leaf className="w-5 h-5 lg:w-6 lg:h-6" />,
    },
    {
      name: "Drinks",
      image:
        "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=200&q=80",
      icon: <Coffee className="w-5 h-5 lg:w-6 lg:h-6" />,
    },
    {
      name: "All",
      image:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=200&q=80",
      icon: <Sparkles className="w-5 h-5 lg:w-6 lg:h-6" />,
    },
    {
      name: "Snack",
      image:
        "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=200&q=80",
      icon: <Croissant className="w-5 h-5 lg:w-6 lg:h-6" />,
    },
    {
      name: "Food",
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&q=80",
      icon: <Utensils className="w-5 h-5 lg:w-6 lg:h-6" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#FCFDF9] w-full font-sans overflow-x-hidden">
      {/* 
        ======== MAIN CONTENT AREA ======== 
      */}
      <div className="flex-1 flex flex-col h-[100dvh] overflow-y-auto relative w-full scrollbar-hide scroll-smooth">
        {/* Background Context (Desktop only) */}
        <div className="hidden lg:block absolute top-0 inset-x-0 h-[400px] bg-gradient-to-b from-brand-primary/10 via-brand-primary/5 to-transparent pointer-events-none" />
        <div className="hidden lg:block absolute -top-32 -right-32 w-96 h-96 bg-brand-primary/15 rounded-full blur-[100px] pointer-events-none" />

        {/* --- MOBILE HERO HEADER --- */}
        <div className="block lg:hidden w-full relative z-20">
          <div className="bg-brand-primary rounded-b-[40px] px-6 pt-12 pb-16 relative overflow-hidden shadow-sm">
            {/* Background Decorations */}
            <div className="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-x-12 translate-y-4">
              <Leaf size={180} strokeWidth={1.5} />
            </div>

            {/* Top Bar: Profile & Notification */}
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div
                className="flex items-center gap-4 cursor-pointer"
                onClick={() => navigate("BUYER_PROFILE")}
              >
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/20 shrink-0">
                  <User size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-white font-bold text-[17px] leading-tight mb-0.5">
                    Halo, {currentUser?.name?.split(" ")[0] || "Guest"}
                  </h2>
                  <div className="flex items-center gap-1.5 text-white/90">
                    <MapPin size={14} className="text-white" />
                    <span className="text-sm font-semibold tracking-wide">
                      Kemang, Jakarta
                    </span>
                  </div>
                </div>
              </div>
              <button className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/20 shrink-0 relative hover:bg-white/30 transition-colors">
                <Bell size={22} className="text-white" />
                <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-accent-orange border-2 border-[#38a169] rounded-full"></span>
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative z-10">
              <div className="w-full bg-white rounded-full flex items-center px-5 py-3.5 shadow-[0_8px_20px_rgba(33,149,111,0.2)]">
                <Search
                  size={20}
                  className="text-brand-olive/60 mr-3 shrink-0"
                />
                <input
                  type="text"
                  placeholder="Cari makanan yang bisa diselamatkan..."
                  className="w-full bg-transparent outline-none text-[15px] font-semibold text-brand-charcoal placeholder:text-brand-olive/50 placeholder:font-medium"
                />
              </div>
            </div>
          </div>

          {/* Overlapping Impact Card */}
          <div className="px-6 -mt-8 relative z-30 mb-8">
            <div className="bg-white rounded-[24px] p-5 flex items-center justify-between shadow-[0_12px_30px_rgba(44,48,46,0.06)] border border-brand-beige/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-[16px] bg-brand-primary/10 flex items-center justify-center shrink-0">
                  <Leaf size={24} className="text-brand-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-brand-olive uppercase tracking-widest mb-0.5">
                    Dampakmu
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-black text-brand-charcoal leading-none">
                      {stats.totalMeals}{" "}
                      <span className="text-sm font-semibold text-brand-olive">
                        Porsi
                      </span>
                    </span>
                    <span className="text-[13px] font-bold text-emerald-500">
                      +{((stats.totalMeals || 0) * 2.5).toFixed(0)}kg CO₂
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate("BUYER_PROFILE")}
                className="bg-[#ebf5f0] text-brand-primary font-bold px-5 py-2.5 rounded-full text-sm hover:bg-[#d6eae2] transition-colors"
              >
                Lihat
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Grid padding */}
        <div className="flex-1 w-full max-w-[1600px] mx-auto pb-32 pt-0 lg:pt-36">
          <div className="hidden lg:flex flex-col xl:flex-row gap-8 xl:gap-10 px-6 lg:px-10 mb-8 lg:mb-10">
            {/* ====== LEFT COLUMN (Listings) ====== */}
            <div className="flex-1 min-w-0 flex flex-col">
              {/* --- DESKTOP HERO SECTION (hidden on mobile) --- */}
              <div className="hidden lg:flex flex-col h-full">
                <div className="w-full bg-[#171c1a] rounded-[36px] xl:rounded-[48px] min-h-[380px] h-full p-10 xl:p-16 relative overflow-hidden shadow-[0_32px_60px_rgba(20,25,23,0.25)] flex items-center justify-between border border-[#2b3531]">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-primary/15 via-[#171c1a] to-[#121614] z-0" />

                  {/* Decorative Orbs */}
                  <div className="absolute top-[-10%] right-[5%] w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-[140px] pointer-events-none z-0" />
                  <div className="absolute bottom-[-20%] left-[10%] w-[500px] h-[500px] bg-[#FF8C66]/5 rounded-full blur-[120px] pointer-events-none z-0" />

                  <div className="relative z-10 max-w-[580px] flex flex-col justify-center">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-8 shadow-sm">
                        <div className="w-5 h-5 rounded-full bg-brand-primary/20 flex items-center justify-center">
                          <Leaf size={12} className="text-brand-primary" />
                        </div>
                        <span className="text-[11px] font-black text-white/90 uppercase tracking-[0.2em]">
                          Sustainability Mission
                        </span>
                      </div>

                      <h1 className="text-[48px] xl:text-[64px] font-black text-white tracking-tight leading-[1.05] mb-6 drop-shadow-sm">
                        Save food, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-[#26A67B] to-emerald-400">
                          protect the planet.
                        </span>
                      </h1>

                      <p className="text-white/60 text-lg xl:text-xl font-medium mb-12 leading-[1.6] max-w-[500px]">
                        Join thousands of food heroes rescuing perfectly good
                        surplus food from high-end restaurants in Jakarta.
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.2,
                        ease: "easeOut",
                      }}
                      className="flex items-center gap-5"
                    >
                      <button className="bg-brand-primary hover:bg-[#1f8a65] text-white px-8 py-4 xl:px-10 xl:py-5 rounded-[24px] font-bold shadow-[0_8px_25px_rgba(33,149,111,0.3)] transition-all hover:-translate-y-1 active:translate-y-0 text-lg flex items-center gap-3">
                        Rescue Now <ArrowRight size={20} strokeWidth={2.5} />
                      </button>
                      <button className="bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 text-white px-8 py-4 xl:px-10 xl:py-5 rounded-[24px] font-bold transition-all text-lg hover:-translate-y-1 active:translate-y-0 shadow-sm">
                        How it works
                      </button>
                    </motion.div>
                  </div>

                  {/* Floating Hero Visual Right Side */}
                  <div className="relative z-10 hidden lg:flex items-center justify-end flex-1 pr-6 xl:pr-16">
                    <div className="relative w-full max-w-[480px] aspect-square flex items-center justify-center">
                      <div className="absolute inset-0 bg-brand-primary/5 rounded-full border border-white/5 animate-[pulse_6s_ease-in-out_infinite]" />

                      {/* Primary Card */}
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[320px] bg-[#1a211e]/80 backdrop-blur-xl border border-white/10 rounded-[32px] p-5 shadow-[0_30px_60px_rgba(0,0,0,0.4)] transform -rotate-[6deg] hover:rotate-0 hover:-translate-y-4 hover:scale-[1.03] transition-all duration-500 cursor-pointer z-20 group">
                        <div className="w-full h-[180px] rounded-[24px] overflow-hidden mb-5 relative shadow-inner">
                          <img
                            src="https://loremflickr.com/600/400/food,pastry?lock=302"
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            alt="Fresh Food"
                          />
                          <div className="absolute top-4 right-4 bg-brand-primary backdrop-blur-md text-white text-[13px] font-black tracking-widest px-4 py-2 rounded-[14px] shadow-lg">
                            SAVE 65%
                          </div>
                        </div>
                        <h4 className="text-white font-bold text-[22px] leading-tight mb-3 truncate">
                          Premium Pastry Box
                        </h4>
                        <div className="flex justify-between items-center bg-white/5 rounded-2xl p-3.5 border border-white/5 group-hover:bg-white/10 transition-colors">
                          <p className="text-white/70 text-[15px] font-medium truncate flex items-center gap-2">
                            <Store size={16} className="text-brand-primary" />{" "}
                            <span>The Artisan Bakery</span>
                          </p>
                          <p className="text-accent-orange font-black text-xl">
                            Rp 35.000
                          </p>
                        </div>
                      </div>

                      {/* Secondary Card Background */}
                      <div className="absolute left-4 bottom-[5%] w-[260px] bg-[#1a211e]/60 backdrop-blur-md border border-white/5 rounded-[28px] p-4 shadow-2xl transform rotate-[8deg] opacity-80 z-10 pointer-events-none">
                        <div className="w-full h-[140px] rounded-[20px] overflow-hidden mb-4 grayscale opacity-60">
                          <img
                            src="https://loremflickr.com/600/400/food,salad?lock=303"
                            className="w-full h-full object-cover"
                            alt="Salad"
                          />
                        </div>
                        <div className="w-3/4 h-5 bg-white/10 rounded-lg mb-3"></div>
                        <div className="w-1/2 h-4 bg-white/5 rounded-md"></div>
                      </div>

                      {/* Floating Stats Badge */}
                      <div className="absolute -top-6 right-[10%] bg-white rounded-[24px] p-4 shadow-[0_20px_40px_rgba(0,0,0,0.2)] transform rotate-[10deg] z-30 flex items-center gap-4 animate-[floating_5s_ease-in-out_infinite]">
                        <div className="w-12 h-12 bg-emerald-50 rounded-[16px] flex items-center justify-center">
                          <TrendingUp size={24} className="text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1.5">
                            Total Impact
                          </p>
                          <p className="text-[17px] font-black text-slate-800 leading-none">
                            12.5k kg saved
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ====== RIGHT COLUMN (Utility Panel) ====== */}
            <div className="hidden xl:flex w-[340px] shrink-0">
              <div className="bg-white rounded-[32px] p-8 border border-brand-beige/50 shadow-[0_8px_30px_rgba(44,48,46,0.03)] w-full h-full flex flex-col justify-between">
                <div className="flex flex-col gap-6 h-full">
                  <h3 className="text-xl font-bold text-brand-charcoal tracking-tight">
                    Your Impact
                  </h3>

                  <div className="bg-accent-sage/15 rounded-[24px] p-5 border border-accent-sage/30 flex items-center justify-between flex-1">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-brand-primary mb-1">
                        Money Saved
                      </p>
                      <p className="text-2xl font-black text-brand-charcoal">
                        {formatCurrency(stats.totalSaved)}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-brand-primary">
                      <TrendingUp size={24} />
                    </div>
                  </div>

                  <div className="bg-brand-cream/50 rounded-[24px] p-5 border border-brand-beige flex items-center justify-between flex-1">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-brand-olive mb-1">
                        Meals Rescued
                      </p>
                      <p className="text-2xl font-black text-brand-charcoal">
                        {stats.totalMeals}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-brand-olive">
                      <ShoppingBag size={24} />
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-brand-primary to-[#187a5a] rounded-[24px] p-5 text-white shadow-[0_8px_20px_rgba(33,149,111,0.2)] flex-1 flex flex-col justify-center">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-white/80 mb-2">
                      CO2 Avoided
                    </p>
                    <p className="text-3xl font-black mb-1">
                      {(stats.totalMeals * 2.5).toFixed(1)}{" "}
                      <span className="text-lg font-medium text-white/80">
                        kg
                      </span>
                    </p>
                    <div className="w-full h-1.5 bg-black/20 rounded-full mt-3 overflow-hidden">
                      <div className="h-full bg-white rounded-full w-[0%]"></div>
                    </div>
                    <p className="text-[10px] font-bold text-white/70 mt-3 text-right">
                      Hero Level: Beginner
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ====== MAIN CONTENT ROWS (Categories, Flash Sale, Discover) ====== */}
          <div className="flex flex-col gap-8 lg:gap-10 px-6 lg:px-10">
            {/* --- PREMIUM CATEGORY SELECTOR --- */}
            <div className="relative pt-1 pb-2 lg:pt-0 lg:pb-0 z-20 overflow-visible mix-blend-normal -mx-6 lg:mx-0 mt-0 lg:mt-0 mb-2 lg:mb-0">
              {/* Mobile Arc Background Connecting Top & Bottom */}
              <div className="absolute top-[0.6rem] left-1/2 w-[125%] h-[90px] bg-gradient-to-b from-white from-30% via-white/60 to-transparent rounded-t-[100%] -translate-x-1/2 lg:hidden z-0 shadow-[0_-4px_20px_rgba(0,0,0,0.04)] border-t border-[#E8EAE8]" />

              <div className="relative z-10 flex justify-between lg:justify-center lg:gap-6 overflow-visible pb-2 pt-2 lg:pb-0 lg:pt-0 px-5 lg:px-0 items-start lg:items-center min-h-[90px] w-full flex-wrap">
                {categories.map((c, i) => {
                  const isActive = activeCategory === c.name;
                  const activeIndex = categories.findIndex(
                    (cat) => cat.name === activeCategory,
                  );
                  const distance = Math.abs(activeIndex - i);

                  // Perfect physical arc calculations for 5 static items
                  const phyDist = Math.abs(2 - i); // Distance from center item (index 2)
                  const phyMobileY =
                    phyDist === 0 ? -4 : phyDist === 1 ? 6 : 20;

                  // We modify the scale/opacity based on distance from active
                  const mobileScale =
                    distance === 0 ? 1.15 : distance === 1 ? 0.95 : 0.85;
                  const physicalRotate =
                    i === 0
                      ? -14
                      : i === 1
                        ? -7
                        : i === 2
                          ? 0
                          : i === 3
                            ? 7
                            : 14;
                  const activeRotate = distance === 0 ? 0 : physicalRotate;

                  return (
                    <button
                      key={i}
                      onClick={() => {
                        setActiveCategory(c.name);
                      }}
                      className={`group relative outline-none flex-1 lg:flex-none flex justify-center transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isActive ? "scale-105" : "scale-100"}`}
                    >
                      {/* Mobile Layout (Arc) */}
                      <div
                        className="lg:hidden flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] w-full origin-bottom"
                        style={{
                          transform: `translateY(${phyMobileY}px) scale(${mobileScale}) rotate(${activeRotate}deg)`,
                        }}
                      >
                        <div
                          className={`w-[52px] h-[52px] rounded-full overflow-hidden flex items-center justify-center transition-all duration-500 ease-out bg-white mb-2 ${
                            isActive
                              ? "shadow-[0_8px_20px_rgba(33,149,111,0.2)] ring-[3px] ring-brand-primary"
                              : "shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] ring-[1px] ring-black/5"
                          }`}
                        >
                          <img
                            src={c.image}
                            alt={c.name}
                            className={`w-full h-full object-cover transition-all duration-500 ease-out bg-white rounded-full ${!isActive ? "opacity-60 grayscale-[30%]" : "opacity-100 scale-110"}`}
                          />
                        </div>

                        <span
                          className={`text-[12px] tracking-[0.02em] transition-all duration-500 ease-out whitespace-nowrap ${isActive ? "font-black text-brand-primary drop-shadow-sm scale-110" : "font-semibold text-brand-olive/70 scale-100"}`}
                        >
                          {c.name}
                        </span>

                        {/* Active Underline Indicator */}
                        <div
                          className={`h-[4px] w-8 rounded-full transition-all duration-500 ease-out absolute -bottom-[2px] ${isActive ? "bg-brand-primary opacity-100 scale-100" : "bg-transparent opacity-0 scale-75"}`}
                        />
                      </div>

                      {/* Desktop Layout (Elegant Pills with Image) */}
                      <div
                        className={`hidden lg:flex items-center gap-3 pr-6 pl-2 py-2 rounded-full border whitespace-nowrap transition-all hover:-translate-y-1 active:translate-y-0 ${
                          isActive
                            ? "bg-brand-charcoal border-brand-charcoal shadow-[0_8px_24px_rgba(29,35,32,0.25)]"
                            : "bg-white border-brand-beige/80 hover:bg-brand-cream/30 hover:border-brand-primary/30 shadow-[0_4px_12px_rgba(44,48,46,0.02)] hover:shadow-[0_8px_20px_rgba(44,48,46,0.05)]"
                        }`}
                      >
                        <div
                          className={`w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 shadow-sm ${isActive ? "border-brand-charcoal bg-brand-charcoal" : "border-white bg-white"}`}
                        >
                          <img
                            src={c.image}
                            alt={c.name}
                            className={`w-full h-full object-cover transition-all ${isActive ? "opacity-100 scale-110" : "opacity-90 group-hover:opacity-100 group-hover:scale-105"}`}
                          />
                        </div>
                        <span
                          className={`text-[16px] tracking-wide transition-colors ${isActive ? "font-black text-white" : "font-bold text-brand-charcoal group-hover:text-brand-primary"}`}
                        >
                          {c.name}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* --- WAKTU HAMPIR HABIS / FLASH SALE --- */}
            {expiringSoonFoods.length > 0 && (
              <div className="w-full mt-6 lg:mt-0">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end mb-4 lg:mb-8 gap-2 lg:gap-4">
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-black text-brand-charcoal tracking-tight leading-none mb-2 flex items-center gap-3">
                      Waktu Hampir Habis
                    </h2>
                    <p className="text-sm lg:text-base font-semibold text-brand-olive tracking-wide">
                      Selamatkan porsi premium sebelum tutup
                    </p>
                  </div>
                  <button className="hidden lg:flex items-center gap-1.5 text-brand-primary font-bold text-sm hover:bg-brand-primary/10 px-4 py-2 rounded-xl transition-colors">
                    Lihat Semua <ChevronRight size={16} />
                  </button>
                </div>

                {/* Horizontal Scroll for Mobile, Grid for Desktop */}
                <div className="flex lg:grid lg:grid-cols-3 xl:grid-cols-4 lg:gap-6 overflow-x-auto lg:overflow-visible pb-8 pt-2 scrollbar-hide snap-x snap-mandatory lg:snap-none lg:pb-2 cursor-grab active:cursor-grabbing transition-all gap-4 lg:gap-6 px-6 lg:px-0 -mx-6 lg:mx-0 scroll-smooth scroll-px-6">
                  {expiringSoonFoods.map((food, idx) => (
                    <div
                      key={food.id}
                      className="snap-center lg:snap-none shrink-0 lg:shrink flex w-[260px] lg:w-full"
                    >
                      {/* Mobile Card Design (AI Easy Food style) */}
                      <div
                        onClick={() => navigate(`FOOD_DETAIL_${food.id}`)}
                        className="lg:hidden w-full h-[340px] rounded-[32px] overflow-hidden relative shadow-[0_8px_24px_rgba(0,0,0,0.08)] group transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer flex flex-col justify-end border-2 border-transparent hover:border-accent-orange/30 active:scale-95"
                      >
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 -translate-x-[150%] animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-20 pointer-events-none skew-x-12" />

                        <img
                          src={food.image}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                          alt=""
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1c1b] via-[#1a1c1b]/40 to-transparent z-0" />
                        <div className="absolute inset-0 bg-gradient-to-bl from-accent-orange/20 via-transparent to-transparent z-0 opacity-70 mix-blend-overlay" />

                        <div className="absolute top-4 left-4 bg-gradient-to-r from-accent-orange to-red-500 text-white text-[12px] font-black tracking-widest px-3 py-1.5 rounded-xl shadow-[0_4px_12px_rgba(255,107,0,0.4)] border border-white/20 z-10 flex items-center gap-1.5">
                          <Flame
                            size={12}
                            className="fill-white animate-pulse"
                          />
                          {food.savingsPercent}% OFF
                        </div>
                        <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-[12px] font-bold border border-white/20 flex items-center gap-1.5 z-10 shadow-sm">
                          <span className="w-1.5 h-1.5 bg-accent-orange rounded-full animate-pulse shadow-[0_0_8px_rgba(255,107,0,0.8)]"></span>
                          {food.quantityLeft} Porsi
                        </div>

                        <div className="relative z-10 p-5 pt-0 pb-5">
                          <div className="bg-white/10 backdrop-blur-md self-start text-white/95 text-[11px] font-bold px-2.5 py-1.5 rounded-lg mb-3 inline-flex items-center gap-1.5 border border-white/20 shadow-sm">
                            <Timer size={12} className="text-accent-orange" />
                            SISA{" "}
                            <span className="text-accent-orange">01:24:12</span>
                          </div>
                          <h3 className="font-black text-[24px] text-white leading-[1.1] mb-1.5 line-clamp-2 drop-shadow-md">
                            {food.name}
                          </h3>
                          <p className="text-white/80 text-[13px] font-medium mb-4 truncate flex items-center gap-1.5">
                            <Store size={14} className="opacity-80" />{" "}
                            {food.store?.name}
                          </p>

                          <div className="flex justify-between items-end mt-2">
                            <div className="flex flex-col">
                              <span className="text-[12px] text-white/60 font-medium line-through decoration-white/40 mb-1 leading-none tracking-wide">
                                {formatCurrency(food.originalPrice)}
                              </span>
                              <span className="text-[24px] font-black text-accent-orange leading-none tracking-tight drop-shadow-sm">
                                {formatCurrency(food.rescuePrice)}
                              </span>
                            </div>
                            <div className="w-[44px] h-[44px] bg-white shadow-[0_8px_20px_rgba(0,0,0,0.2)] rounded-2xl flex items-center justify-center text-brand-charcoal transform transition-transform group-active:scale-90">
                              <ShoppingBag
                                size={20}
                                strokeWidth={2.5}
                                className="group-hover:text-brand-primary transition-colors duration-300"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Desktop Card Design */}
                      <div
                        onClick={() => navigate(`FOOD_DETAIL_${food.id}`)}
                        className="hidden lg:flex w-full h-[260px] rounded-[32px] overflow-hidden relative shadow-[0_12px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgba(29,35,32,0.25)] group border border-brand-charcoal/10 hover:-translate-y-2 transition-all duration-300 cursor-pointer flex-col"
                      >
                        {/* Image (Background) */}
                        <img
                          src={food.image}
                          className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                          alt=""
                        />

                        {/* Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/60 to-transparent pointer-events-none hidden lg:block" />
                        <div className="absolute inset-0 bg-gradient-to-bl from-accent-orange/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none hidden lg:block" />

                        {/* Desktop Tags */}
                        <div className="absolute top-5 left-5 hidden lg:block bg-brand-primary text-white text-[14px] font-black tracking-tight px-4 py-2 rounded-xl shadow-[0_4px_15px_rgba(33,149,111,0.4)] backdrop-blur-md">
                          {food.savingsPercent}% OFF
                        </div>
                        <div className="absolute top-5 right-5 hidden lg:flex bg-brand-charcoal/80 text-white backdrop-blur-md text-[12px] font-bold px-3 py-1.5 rounded-xl border border-white/20 shadow-lg items-center gap-1.5">
                          <span className="w-1.5 h-1.5 bg-accent-orange rounded-full animate-pulse shadow-[0_0_8px_rgba(255,107,0,0.8)]"></span>
                          {food.quantityLeft} Porsi
                        </div>

                        <div className="absolute bottom-4 lg:bottom-6 inset-x-4 lg:inset-x-6 flex flex-col justify-end hidden lg:flex">
                          {/* Desktop Content */}
                          <div className="self-start bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-lg px-3 py-1.5 mb-3 flex items-center gap-2 shadow-[0_4px_12px_rgba(0,0,0,0.2)] group-hover:bg-accent-orange/20 group-hover:border-accent-orange/40 transition-colors">
                            <Timer
                              size={14}
                              className="text-accent-orange"
                              strokeWidth={2.5}
                            />
                            <span className="text-[12px] font-black tracking-widest text-[#FDFBF7]">
                              Sisa Waktu 01:24:12
                            </span>
                          </div>

                          <div className="flex justify-between items-end">
                            <div className="flex-1 min-w-0 pr-4 flex flex-col">
                              <h3 className="font-bold font-sans text-[28px] text-white leading-tight truncate mb-2 drop-shadow-md">
                                {food.name}
                              </h3>

                              <div className="flex items-center gap-2 text-[14px] text-white/80 font-medium mb-1 drop-shadow-sm">
                                <Store
                                  size={16}
                                  className="text-brand-primary"
                                />
                                <span className="truncate text-white">
                                  {food.store?.name}
                                </span>
                                <span className="text-white/40">&bull;</span>
                                <span>{food.store?.distance || "1.2 km"}</span>
                              </div>
                            </div>

                            <div className="flex flex-col items-end shrink-0 lg:pt-0 bg-black/40 backdrop-blur-md px-4 py-2.5 rounded-[16px] border border-white/10 shadow-lg group-hover:-translate-y-1 transition-transform">
                              <span className="text-[13px] font-medium line-through text-white/60 mb-0.5">
                                {formatCurrency(food.originalPrice)}
                              </span>
                              <span className="text-[24px] font-black text-accent-orange tracking-tight leading-none drop-shadow-lg">
                                {formatCurrency(food.rescuePrice)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* --- DISCOVER / RESCUE NEAR YOU --- */}
            <div className="mb-0">
              <div className="flex justify-between items-end mb-6 lg:mb-8">
                <div>
                  <h2 className="text-2xl lg:text-3xl font-black text-brand-charcoal tracking-tight leading-none mb-1.5 flex items-center gap-3">
                    Discover Rescues
                  </h2>
                  <p className="text-sm lg:text-base font-semibold text-brand-olive tracking-wide">
                    Available for pickup today
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-6">
                {discountFoods.slice(0, 10).map((food, i) => (
                  <div
                    key={food.id}
                    onClick={() => navigate(`FOOD_DETAIL_${food.id}`)}
                    className="bg-white rounded-[20px] lg:rounded-[32px] p-3 lg:p-4 flex flex-col shadow-[0_2px_8px_rgba(0,0,0,0.04)] lg:shadow-[0_8px_30px_rgba(44,48,46,0.04)] border border-brand-beige/50 cursor-pointer overflow-hidden group hover:shadow-[0_16px_40px_rgba(44,48,46,0.08)] hover:-translate-y-2 hover:border-brand-primary/30 transition-all duration-300 relative gap-2 lg:gap-0"
                  >
                    {/* Desktop Only Zap Tag */}
                    <div className="absolute top-6 right-6 bg-white/95 text-brand-primary text-[12px] font-black px-3 py-2 rounded-xl z-20 items-center gap-1.5 border border-white/60 shadow-[0_4px_12px_rgba(33,149,111,0.2)] backdrop-blur-md hidden lg:flex">
                      <Zap
                        size={12}
                        className="text-brand-primary fill-current"
                      />
                      {food.savingsPercent}% OFF
                    </div>

                    {/* Image Container */}
                    <div className="w-full h-[150px] lg:h-[220px] rounded-[14px] lg:rounded-[24px] overflow-hidden shrink-0 relative mb-1 lg:mb-5">
                      <img
                        src={food.image}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out"
                        alt=""
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden lg:block" />

                      {/* Bottom tags */}
                      <div className="absolute bottom-3 lg:bottom-4 left-3 lg:left-4 bg-brand-charcoal/80 text-white backdrop-blur-md text-[11px] lg:text-[12px] font-bold px-2.5 lg:px-3 py-1.5 lg:py-2 rounded-[10px] lg:rounded-xl border border-white/20 shadow-lg items-center gap-1.5 flex z-10">
                        <span className="w-1.5 lg:w-2 h-1.5 lg:h-2 bg-accent-orange rounded-full animate-pulse shadow-[0_0_8px_rgba(255,107,0,0.8)]"></span>
                        {food.quantityLeft} Porsi
                      </div>
                    </div>

                    {/* Content Container */}
                    <div className="flex-1 flex flex-col pt-1 pb-1 lg:px-2 min-w-0">
                      {/* Header Row: Title & Discount */}
                      <div className="flex justify-between items-start mb-1 lg:mb-2">
                        <h3 className="font-bold text-[17px] lg:text-[22px] font-sans text-brand-charcoal tracking-tight leading-tight truncate group-hover:text-brand-primary transition-colors pr-2 drop-shadow-sm">
                          {food.name}
                        </h3>

                        {/* Mobile Discount Tag */}
                        <div className="bg-[#E8F5E9] text-[#2E7D32] text-[11px] font-black px-2 py-1 rounded-[8px] lg:hidden shrink-0 border border-[#2E7D32]/20">
                          -{food.savingsPercent}%
                        </div>
                      </div>

                      {/* Store Info */}
                      <div className="flex items-center gap-1.5 mb-2 lg:mb-4">
                        <img
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                            food.store?.name || "Store",
                          )}&background=21956F&color=fff&size=32`}
                          className="w-4 h-4 lg:w-6 lg:h-6 rounded-full shadow-sm"
                          alt=""
                        />
                        <p className="text-[12px] lg:text-[14px] text-brand-olive font-medium truncate flex-1 flex items-center gap-1.5">
                          {food.store?.name}{" "}
                          <span className="opacity-50">&bull;</span>{" "}
                          {food.store?.distance || "1.5 km"}
                        </p>
                      </div>

                      <div className="mt-auto flex justify-between items-end lg:pt-2">
                        <div className="flex flex-col">
                          <span className="text-[11px] lg:text-[13px] font-medium text-brand-olive line-through mb-0.5 lg:mb-1 opacity-70">
                            {formatCurrency(food.originalPrice)}
                          </span>
                          <span className="text-[16px] lg:text-[24px] font-black text-brand-charcoal leading-none tracking-tight">
                            {formatCurrency(food.rescuePrice)}
                          </span>
                        </div>

                        {/* Mobile Time Limit */}
                        <div className="lg:hidden flex items-center gap-1.5 bg-[#F3F4F6] px-2.5 py-1.5 rounded-[6px] text-[#4B5563]">
                          <Clock3 size={11} className="shrink-0" />
                          <span className="text-[10px] font-semibold whitespace-nowrap">
                            Batas: 21:00
                          </span>
                        </div>

                        {/* Desktop Arrow */}
                        <button className="hidden lg:flex w-12 h-12 bg-white border-2 border-brand-charcoal hover:bg-brand-charcoal text-brand-charcoal hover:text-white rounded-full justify-center items-center transform transition-colors shadow-sm">
                          <ShoppingBag className="w-5 h-5" strokeWidth={2.5} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Nav (Universal) */}
      <BuyerBottomNav />
    </div>
  );
};
