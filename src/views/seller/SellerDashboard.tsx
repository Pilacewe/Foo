import React from "react";
import { useAppStore } from "../../store/AppContext";
import {
  LogOut,
  TrendingUp,
  Package2,
  ShieldCheck,
  Activity,
  Star,
  ChevronRight,
  TrendingDown,
  Clock,
  Zap,
  Leaf,
  Eye,
} from "lucide-react";
import { formatCurrency } from "../../utils/format";
import { motion, AnimatePresence } from "motion/react";
import { SellerBottomNav } from "../../components/SellerBottomNav";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const dummyRevenueData = [
  { name: "Mon", revenue: 0 },
  { name: "Tue", revenue: 0 },
  { name: "Wed", revenue: 0 },
  { name: "Thu", revenue: 0 },
  { name: "Fri", revenue: 0 },
  { name: "Sat", revenue: 0 },
  { name: "Sun", revenue: 0 },
];

export const SellerDashboard = () => {
  const { logout, currentUser, stores, foods, orders, navigate } =
    useAppStore();

  const myStore = stores.find((s) => s.ownerId === currentUser?.id);
  const myFoods = foods.filter((f) => f.storeId === myStore?.id);
  const myOrders = orders.filter((o) => o.storeId === myStore?.id);

  const [isDesktop, setIsDesktop] = React.useState(window.innerWidth >= 1024);
  React.useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const completedOrders = myOrders.filter((o) => o.status === "COMPLETED");
  const totalEarnings = completedOrders.reduce(
    (acc, o) => acc + o.totalPrice,
    0,
  );
  const foodSavedToday = completedOrders.reduce(
    (acc, o) => acc + o.quantity,
    0,
  );

  const activeOrders = myOrders.filter((o) =>
    ["RESERVED", "PREPARING", "READY"].includes(o.status),
  );
  const activeOrderCount = activeOrders.length;
  const wasteReduced = foodSavedToday * 0.5; // kg assumption

  if (!myStore)
    return <div className="p-4">Store not found for this seller account.</div>;

  return (
    <div className="flex flex-col min-h-screen bg-brand-cream lg:bg-[#FCFDF9] w-full font-sans">
      {/* --- DESKTOP HERO & ANALYTICS (hidden on mobile) --- */}
      <div className="hidden lg:flex flex-col w-full max-w-[1400px] mx-auto px-8 pt-36 pb-16 relative z-10">
        {/* Ambient Backgrounds */}
        <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-brand-primary/5 rounded-full blur-[150px] pointer-events-none -translate-y-1/4 translate-x-1/4" />
        <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-accent-sage/10 rounded-full blur-[120px] pointer-events-none translate-y-1/4 -translate-x-1/4" />

        {/* 1. Immersive Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full bg-brand-charcoal rounded-[40px] p-[2px] relative overflow-hidden mb-8 shadow-[0_32px_64px_rgba(20,25,23,0.15)] group"
        >
          {/* Inner Content */}
          <div className="w-full h-[360px] bg-brand-charcoal rounded-[38px] overflow-hidden relative">
            <div className="absolute inset-0 z-0">
              <img
                src="https://loremflickr.com/1200/400/kitchen,restaurant?lock=301"
                className="w-full h-full object-cover opacity-30 mix-blend-luminosity group-hover:scale-105 transition-transform duration-[2s]"
                alt="Store Kitchen"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#171c1a] via-[#171c1a]/95 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#171c1a]/80 to-transparent"></div>
            </div>

            <div className="absolute inset-0 p-12 flex items-center justify-between z-10">
              <div className="max-w-xl">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-sm mb-6 shadow-xl">
                    <Star
                      size={16}
                      className="text-accent-orange fill-accent-orange"
                    />
                    Rating Toko Unggulan (4.8/5)
                  </div>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-5xl font-black text-white leading-[1.1] mb-5 tracking-tight drop-shadow-md"
                >
                  Halo,{" "}
                  <span className="text-accent-sage drop-shadow-[0_0_15px_rgba(205,227,213,0.4)]">
                    {myStore.name}
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-white/70 text-lg font-medium leading-relaxed mb-8 max-w-md"
                >
                  Awasi performa tokomu hari ini. Ada puluhan makanan lezat yang
                  siap kamu selamatkan agar tidak terbuang.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="flex gap-4"
                >
                  <button
                    onClick={() => navigate("SELLER_MENU")}
                    className="bg-white hover:bg-brand-cream text-brand-charcoal px-8 py-4 rounded-[20px] font-bold transition-all shadow-[0_8px_30px_rgba(255,255,255,0.2)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(255,255,255,0.3)] flex items-center gap-2"
                  >
                    <Package2 size={20} />
                    Kelola Menu
                  </button>
                  <button
                    onClick={() => navigate("SELLER_ORDERS")}
                    className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 px-8 py-4 rounded-[20px] font-bold transition-all hover:-translate-y-1 flex items-center gap-2 shadow-lg"
                  >
                    <Activity size={20} />
                    Pesanan Masuk
                    {activeOrderCount > 0 && (
                      <span className="ml-2 bg-accent-orange text-white text-[11px] px-2 py-1 rounded-lg">
                        {activeOrderCount}
                      </span>
                    )}
                  </button>
                </motion.div>
              </div>

              {/* Right side floating stat impact glass */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.6, type: "spring" }}
                className="w-72 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[30px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex flex-col justify-between hidden xl:flex overflow-hidden relative"
              >
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-primary/30 rounded-full blur-[40px] pointer-events-none" />

                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6 border border-white/20 shadow-inner">
                  <Leaf
                    size={24}
                    className="text-brand-primary"
                    fill="currentColor"
                  />
                </div>

                <div>
                  <p className="text-white/60 font-bold uppercase tracking-widest text-xs mb-2">
                    Total Dampak Lingkungan
                  </p>
                  <h3 className="text-4xl font-black text-white leading-none mb-1">
                    {wasteReduced.toFixed(1)}{" "}
                    <span className="text-xl text-white/50">CO₂</span>
                  </h3>
                  <p className="text-brand-primary font-bold text-sm flex items-center gap-1 mt-2">
                    <TrendingUp size={14} /> +0.0 kg minggu ini
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* 2. Bento Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 relative z-10 w-full">
          {[
            {
              title: "Total Pendapatan",
              value: formatCurrency(totalEarnings),
              trend: "0%",
              bg: "bg-white",
              icon: TrendingUp,
              color: "text-brand-primary",
              bgIcon: "bg-brand-primary/10",
            },
            {
              title: "Pesanan Aktif",
              value: activeOrderCount.toString(),
              trend: activeOrderCount > 0 ? "Butuh Aksi" : "Aman",
              bg: "bg-white",
              icon: Activity,
              color: "text-accent-orange",
              bgIcon: "bg-accent-orange/10",
            },
            {
              title: "Porsi Terselamatkan",
              value: foodSavedToday.toString(),
              suffix: "porsi",
              trend: "0 bulan ini",
              bg: "bg-white",
              icon: Zap,
              color: "text-secondary-blue",
              bgIcon: "bg-secondary-blue/10",
            },
            {
              title: "Kunjungan Profil",
              value: "0",
              trend: "-",
              bg: "bg-brand-primary",
              icon: Eye,
              color: "text-white",
              bgIcon: "bg-white/20",
            },
          ].map((stat, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              key={i}
              className={`${stat.bg} ${stat.bg === "bg-white" ? "border-brand-beige/60 text-brand-charcoal hover:border-brand-primary/40" : "text-white border-brand-primary shadow-[0_12px_30px_rgba(33,149,111,0.2)] hover:shadow-[0_16px_40px_rgba(33,149,111,0.3)]"} border rounded-[28px] p-6 shadow-[0_8px_30px_rgba(44,48,46,0.04)] transition-all hover:-translate-y-1 relative overflow-hidden group`}
            >
              <div
                className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[40px] pointer-events-none transition-all duration-700 ${stat.bg === "bg-white" ? stat.bgIcon : "bg-white/20 group-hover:scale-150"}`}
                style={{ opacity: stat.bg === "bg-white" ? 0.3 : 1 }}
              />

              <div className="flex justify-between items-start mb-8 relative z-10">
                <div
                  className={`w-12 h-12 rounded-[18px] flex items-center justify-center ${stat.bgIcon} ${stat.color} shadow-sm group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon size={22} strokeWidth={2.5} />
                </div>
                <span
                  className={`text-[11px] font-bold px-3 py-1.5 rounded-xl backdrop-blur-md ${stat.bg === "bg-white" ? "bg-[#FCFDF9] border border-brand-beige text-brand-olive" : "bg-white/20 border border-white/20 text-white"}`}
                >
                  {stat.trend}
                </span>
              </div>
              <div className="relative z-10">
                <p
                  className={`${stat.bg === "bg-white" ? "text-brand-olive" : "text-white/80"} text-xs font-bold uppercase tracking-widest mb-1.5`}
                >
                  {stat.title}
                </p>
                <p
                  className={`text-3xl font-black ${stat.bg === "bg-white" ? "text-brand-charcoal" : "text-white"} leading-none tracking-tight flex items-baseline gap-1`}
                >
                  {stat.value}{" "}
                  {stat.suffix && (
                    <span
                      className={`text-base font-bold ${stat.bg === "bg-white" ? "text-brand-olive" : "text-white/60"}`}
                    >
                      {stat.suffix}
                    </span>
                  )}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 3. Main Content Columns */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-8 relative z-10 w-full mb-10">
          {/* Left Column: Chart */}
          <div className="flex flex-col gap-8 w-full min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="bg-white rounded-[32px] p-8 lg:p-10 border border-brand-beige/50 shadow-[0_12px_40px_rgba(20,25,23,0.04)] hover:shadow-[0_16px_50px_rgba(20,25,23,0.06)] transition-shadow"
            >
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-2xl font-black text-brand-charcoal tracking-tight mb-1">
                    Tren Pendapatan
                  </h3>
                  <p className="text-brand-olive font-medium text-sm">
                    Berdasarkan pesanan yang sudah selesai
                  </p>
                </div>
                <select className="bg-[#FCFDF9] text-sm font-bold text-brand-charcoal px-5 py-3 rounded-2xl outline-none border border-brand-beige/60 focus:border-brand-primary/30 cursor-pointer shadow-sm hover:bg-white transition-colors">
                  <option>Minggu Ini</option>
                  <option>Bulan Ini</option>
                  <option>Tahun Ini</option>
                </select>
              </div>
              <div className="h-[340px] w-full min-h-[340px]">
                {isDesktop && (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={dummyRevenueData}
                      margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="colorRevenue"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#21956F"
                            stopOpacity={0.25}
                          />
                          <stop
                            offset="95%"
                            stopColor="#21956F"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="4 4"
                        vertical={false}
                        stroke="#EBEBE1"
                      />
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill: "#7C827D",
                          fontSize: 13,
                          fontWeight: 600,
                        }}
                        dy={10}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill: "#7C827D",
                          fontSize: 13,
                          fontWeight: 500,
                        }}
                        tickFormatter={(val) => `Rp ${val / 1000}k`}
                      />
                      <RechartsTooltip
                        cursor={{
                          stroke: "#21956F",
                          strokeWidth: 2,
                          strokeDasharray: "4 4",
                        }}
                        contentStyle={{
                          borderRadius: "20px",
                          border: "1px solid #EBEBE1",
                          boxShadow: "0 12px 30px rgba(20,25,23,0.08)",
                          fontWeight: "bold",
                          padding: "12px 16px",
                        }}
                        formatter={(value: number) => [
                          formatCurrency(value),
                          "Pendapatan",
                        ]}
                      />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#21956F"
                        strokeWidth={4}
                        fillOpacity={1}
                        fill="url(#colorRevenue)"
                        activeDot={{
                          r: 8,
                          fill: "#21956F",
                          stroke: "#fff",
                          strokeWidth: 3,
                        }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-8 w-full">
            {/* 1. Low stock alerts styled beautifully */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="bg-white rounded-[32px] p-8 border border-brand-beige/50 shadow-[0_12px_40px_rgba(20,25,23,0.04)] group"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-brand-charcoal">
                  Status Stok Harian
                </h3>
                <div className="w-10 h-10 bg-brand-cream rounded-xl flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors cursor-pointer">
                  <ChevronRight size={20} />
                </div>
              </div>

              <div className="space-y-4">
                {myFoods.slice(0, 4).map((food) => {
                  const isSoldOut = food.quantityLeft === 0;
                  const isLowStock =
                    food.quantityLeft > 0 && food.quantityLeft <= 2;

                  return (
                    <div
                      key={food.id}
                      className="flex gap-4 items-center p-2 hover:bg-[#FCFDF9] rounded-[24px] pr-4 transition-colors"
                    >
                      <div className="relative shrink-0">
                        <img
                          src={food.image}
                          className={`w-[60px] h-[60px] rounded-[18px] object-cover border border-brand-beige/50 shadow-sm ${isSoldOut ? "grayscale opacity-70" : ""}`}
                        />
                        {isSoldOut && (
                          <div className="absolute inset-0 bg-brand-charcoal/40 rounded-[18px] flex items-center justify-center backdrop-blur-[2px]">
                            <Zap
                              size={16}
                              className="text-white fill-current"
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <div className="flex justify-between items-start mb-1.5">
                          <p className="font-bold text-brand-charcoal text-[15px] truncate max-w-[150px]">
                            {food.name}
                          </p>
                          {isSoldOut ? (
                            <span className="text-[10px] font-black tracking-widest uppercase px-2 py-1 bg-brand-cream/80 text-brand-olive rounded-md border border-brand-beige/60">
                              Habis
                            </span>
                          ) : (
                            <span
                              className={`text-[12px] font-bold leading-none ${isLowStock ? "text-accent-orange" : "text-brand-primary"}`}
                            >
                              {food.quantityLeft}{" "}
                              <span className="text-brand-olive text-[10px] uppercase">
                                sisa
                              </span>
                            </span>
                          )}
                        </div>
                        {!isSoldOut && (
                          <div className="h-2 w-full bg-brand-cream rounded-full overflow-hidden border border-brand-beige/30">
                            <div
                              className={`h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden ${isLowStock ? "bg-gradient-to-r from-accent-orange/80 to-accent-orange" : "bg-gradient-to-r from-brand-primary/80 to-brand-primary"}`}
                              style={{
                                width: `${Math.min((food.quantityLeft / 10) * 100, 100)}%`,
                              }}
                            >
                              <div className="absolute inset-0 bg-white/20 skew-x-[-20deg] animate-[shimmer_2s_infinite]"></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* 2. Popular Items minimal card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="bg-brand-charcoal rounded-[32px] p-8 border border-brand-charcoal shadow-[0_24px_50px_rgba(20,25,23,0.15)] relative overflow-hidden text-white group cursor-pointer hover:-translate-y-1 transition-all duration-300"
            >
              <div className="absolute -top-24 -right-24 w-60 h-60 bg-brand-primary/20 rounded-full blur-[60px] pointer-events-none group-hover:bg-brand-primary/40 transition-colors duration-700" />

              <div className="flex justify-between items-center mb-6 relative z-10">
                <h3 className="text-xl font-bold text-white">Menu Terlaris</h3>
                <div className="text-white/50 group-hover:text-white transition-colors">
                  <Star size={20} className="fill-current" />
                </div>
              </div>

              <div className="space-y-4 relative z-10">
                {myFoods.slice(0, 3).map((food, i) => (
                  <div
                    key={food.id}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm bg-white/10 text-white ${i === 0 ? "border border-brand-primary/50 text-brand-primary" : ""}`}
                      >
                        {i + 1}
                      </div>
                      <p className="font-bold text-sm truncate max-w-[150px]">
                        {food.name}
                      </p>
                    </div>
                    <p className="font-black text-accent-sage text-lg whitespace-nowrap">
                      0{" "}
                      <span className="text-[10px] text-white/50 uppercase tracking-wider font-bold">
                        Terjual
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* --- MOBILE LAYOUT (hidden on desktop) --- */}
      {/* --- MOBILE DASHBOARD (hidden on desktop) --- */}
      <div className="lg:hidden flex flex-col w-full min-h-screen bg-[#FCFDF9] pb-24 font-sans relative overflow-x-hidden">
        {/* Ambient Effects */}
        <div className="fixed top-0 right-0 w-[400px] h-[400px] bg-brand-primary/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/2 z-0" />

        {/* 1. Immersive Header Card */}
        <div className="px-4 pt-6 pb-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full bg-brand-charcoal rounded-[32px] p-[2px] relative overflow-hidden shadow-[0_16px_32px_rgba(20,25,23,0.15)]"
          >
            <div className="w-full bg-brand-charcoal rounded-[30px] overflow-hidden relative pb-6 border border-white/10">
              <div className="absolute inset-0 z-0 opacity-40">
                <img
                  src="https://loremflickr.com/800/400/kitchen,restaurant?lock=301"
                  className="w-full h-full object-cover mix-blend-luminosity scale-105"
                  alt="Store Kitchen"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171c1a] via-[#171c1a]/80 to-transparent"></div>
              </div>

              <div className="relative z-10 px-5 pt-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center font-black text-lg text-white border border-white/20 shadow-inner">
                      {myStore.name.slice(0, 1).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest leading-none mb-1">
                        Beranda Toko
                      </p>
                      <h2 className="text-lg font-black text-white leading-tight flex items-center gap-1.5">
                        {myStore.name}
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-sage animate-pulse" />
                      </h2>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                    <Star
                      size={12}
                      className="text-accent-orange fill-accent-orange"
                    />
                    <span className="text-white font-bold text-[11px]">
                      4.8
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1 flex items-center gap-1">
                      <TrendingUp size={12} /> Pendapatan Hari Ini
                    </p>
                    <p className="text-2xl font-black text-white tracking-tight">
                      {formatCurrency(totalEarnings)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1 flex items-center justify-end gap-1">
                      Terselamatkan <Leaf size={12} />
                    </p>
                    <p className="text-2xl font-black text-white tracking-tight">
                      {foodSavedToday}{" "}
                      <span className="text-xs text-white/50">porsi</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Dashboard Content Grid */}
        <div className="px-4 flex flex-col gap-4 relative z-10 mt-2">
          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              onClick={() => navigate("SELLER_MENU")}
              className="bg-white rounded-[24px] p-5 text-left shadow-[0_8px_20px_rgba(44,48,46,0.04)] border border-brand-beige/60 relative overflow-hidden group active:scale-95 transition-all"
            >
              <div className="absolute -right-4 -bottom-4 text-brand-primary/5 group-hover:scale-110 transition-transform">
                <Package2 size={70} />
              </div>
              <div className="w-10 h-10 bg-brand-primary/10 rounded-[14px] flex items-center justify-center text-brand-primary mb-3">
                <Package2 size={20} strokeWidth={2.5} />
              </div>
              <p className="font-bold text-brand-charcoal text-[13px] mb-0.5">
                Kelola Menu
              </p>
              <p className="text-brand-olive text-[11px] font-semibold">
                {myFoods.length} produk sisa
              </p>
            </motion.button>

            <motion.button
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => navigate("SELLER_ORDERS")}
              className="bg-white rounded-[24px] p-5 text-left shadow-[0_8px_20px_rgba(44,48,46,0.04)] border border-brand-beige/60 relative overflow-hidden group active:scale-95 transition-all flex flex-col justify-between"
            >
              <div className="absolute -right-4 -bottom-4 text-accent-orange/5 group-hover:scale-110 transition-transform">
                <Activity size={70} />
              </div>
              <div className="flex justify-between w-full mb-3">
                <div className="w-10 h-10 bg-accent-orange/10 rounded-[14px] flex items-center justify-center text-accent-orange">
                  <Activity size={20} strokeWidth={2.5} />
                </div>
                {activeOrderCount > 0 && (
                  <span className="bg-accent-orange text-white text-[10px] font-bold px-2 py-1 rounded-lg h-fit shadow-md">
                    +{activeOrderCount}
                  </span>
                )}
              </div>
              <div>
                <p className="font-bold text-brand-charcoal text-[13px] mb-0.5">
                  Pesanan
                </p>
                <p className="text-brand-olive text-[11px] font-semibold">
                  Pantau status
                </p>
              </div>
            </motion.button>
          </div>

          {/* Environmental Impact Minimal Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-brand-primary text-white rounded-[28px] p-5 shadow-[0_12px_24px_rgba(33,149,111,0.2)] flex items-center justify-between relative overflow-hidden border border-brand-primary"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-[20px] pointer-events-none" />
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-[16px] flex items-center justify-center border border-white/20 shadow-inner">
                <Leaf size={20} className="text-white" fill="currentColor" />
              </div>
              <div>
                <p className="text-white/80 font-bold text-[10px] uppercase tracking-widest mb-0.5">
                  Total CO₂ Dihindari
                </p>
                <p className="font-black text-[22px] leading-none">
                  {wasteReduced.toFixed(1)}{" "}
                  <span className="text-[14px] font-bold text-white/70">
                    kg
                  </span>
                </p>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-[14px] px-3 py-2 border border-white/20 text-center shadow-inner relative z-10 w-auto">
              <span className="text-[9px] font-bold text-white/80 uppercase">
                Level
              </span>
              <br />
              <span className="text-[13px] font-black text-white">Baru</span>
            </div>
          </motion.div>

          {/* Low Stock Alerts */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-[28px] p-6 shadow-[0_8px_24px_rgba(44,48,46,0.03)] border border-brand-beige/60"
          >
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-black text-brand-charcoal text-[16px]">
                Status Stok Harian
              </h3>
              <button
                onClick={() => navigate("SELLER_MENU")}
                className="w-8 h-8 flex items-center justify-center bg-brand-cream rounded-full text-brand-primary"
              >
                <ChevronRight size={16} />
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {myFoods.slice(0, 3).map((food) => {
                const isSoldOut = food.quantityLeft === 0;
                const isLow = food.quantityLeft > 0 && food.quantityLeft <= 2;

                return (
                  <div
                    key={food.id}
                    className="flex gap-4 items-center py-2 relative"
                  >
                    <div className="relative shrink-0">
                      <img
                        src={food.image}
                        className={`w-[52px] h-[52px] rounded-[16px] object-cover border border-brand-beige/50 shadow-sm ${isSoldOut ? "grayscale opacity-60" : ""}`}
                      />
                      {isSoldOut && (
                        <div className="absolute inset-0 bg-brand-charcoal/40 flex items-center justify-center rounded-[16px] backdrop-blur-[2px]">
                          <Zap size={14} className="text-white fill-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1.5">
                        <p className="font-bold text-[14px] text-brand-charcoal truncate pr-2 max-w-[140px]">
                          {food.name}
                        </p>
                        {isSoldOut ? (
                          <span className="text-[9px] font-black tracking-widest uppercase bg-brand-cream/80 text-brand-olive px-2 py-0.5 rounded border border-brand-beige/60">
                            Habis
                          </span>
                        ) : (
                          <span
                            className={`text-[12px] font-bold ${isLow ? "text-accent-orange" : "text-brand-primary"}`}
                          >
                            {food.quantityLeft}{" "}
                            <span className="text-[10px] text-brand-olive uppercase">
                              sisa
                            </span>
                          </span>
                        )}
                      </div>
                      {!isSoldOut && (
                        <div className="h-1.5 w-full bg-brand-cream rounded-full overflow-hidden border border-brand-beige/30">
                          <div
                            className={`h-full rounded-full transition-all ${isLow ? "bg-gradient-to-r from-accent-orange/80 to-accent-orange" : "bg-gradient-to-r from-brand-primary/80 to-brand-primary"}`}
                            style={{
                              width: `${Math.min((food.quantityLeft / 10) * 100, 100)}%`,
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      <SellerBottomNav />
    </div>
  );
};
