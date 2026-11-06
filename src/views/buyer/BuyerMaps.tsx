import React, { useState } from "react";
import { useAppStore } from "../../store/AppContext";
import { BuyerBottomNav } from '../../components/BuyerBottomNav';
import { motion, AnimatePresence } from "motion/react";
import {
  MapPin,
  Search,
  Crosshair,
  Navigation2,
  Star,
  Clock,
  Flame,
  SlidersHorizontal,
  ArrowRight,
  X,
  UtensilsCrossed,
} from "lucide-react";
import { formatCurrency } from "../../utils/format";

export const BuyerMaps = () => {
  const { stores, foods, navigate } = useAppStore();
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("Semua");

  const selectedStore = stores.find((s) => s.id === selectedStoreId);
  const storeFoods = selectedStore
    ? foods.filter(
        (f) =>
          f.storeId === selectedStore.id &&
          f.quantityLeft > 0 &&
          f.isActive !== false,
      )
    : [];
  const selectedFood = storeFoods[0]; // just grab the first one for the banner

  // filters
  const filters = [
    "Semua",
    "Roti & Kue",
    "Nasi Kotak",
    "Minuman",
    "Vegetarian",
    "Flash Rescue",
  ];

  // map background
  const mapUrl =
    "https://maps.googleapis.com/maps/api/staticmap?center=-6.2088,106.8456&zoom=14&scale=2&size=600x800&maptype=roadmap&style=feature:poi|visibility:off&style=feature:transit|visibility:off&style=element:labels.icon|visibility:off&style=feature:road|element:geometry|color:0xffffff&style=feature:landscape|element:geometry|color:0xf8fafc&style=feature:water|color:0xc8d7d4&client=gme-googleinc&channel=project-x";

  return (
    <div className="flex flex-col h-[100dvh] w-full overflow-hidden relative bg-[#E5E9EA]">
      {/* MAP AREA */}
      <div className="absolute inset-0 z-0 bg-[#E5E9EA]">
        <motion.div
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-[-5%] z-0"
          style={{
            backgroundImage: `url('${mapUrl}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "contrast(1.1) saturate(1.2)",
          }}
        />
        {/* Soft vignette top & bottom */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#E5E9EA]/80 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black/20 to-transparent pointer-events-none mix-blend-multiply opacity-50" />
      </div>

      {/* Top Floating Controls */}
      <div className="w-full z-20 shrink-0 absolute top-0 left-1/2 -translate-x-1/2 max-w-2xl pointer-events-none">
        {/* Fade overlay so text doesn't clash with map */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#E5E9EA] to-transparent pointer-events-none" />

        <div className="pt-12 lg:pt-10 px-4 relative z-10">
          <div className="flex justify-between items-center mb-4 lg:hidden pointer-events-auto">
             <div className="bg-white/90 backdrop-blur-xl border border-white/50 px-4 py-2 rounded-full shadow-[0_4px_15px_rgba(44,48,46,0.08)] flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-accent-orange animate-pulse" />
                 <h1 className="text-[16px] font-black tracking-tight text-brand-charcoal m-0 uppercase">Live Map</h1>
             </div>
             <button className="bg-brand-primary/10 border border-brand-primary/20 backdrop-blur-md px-3 py-2.5 rounded-full flex items-center gap-1.5 shadow-sm text-brand-primary hover:bg-brand-primary hover:text-white transition-all">
                <MapPin size={14} className="fill-brand-primary/50" />
                <span className="text-[12px] font-bold">Sekitar Anda</span>
             </button>
          </div>

          {/* Search */}
          <div className="bg-white/95 lg:bg-white/95 backdrop-blur-xl rounded-[20px] shadow-[0_8px_30px_rgba(44,48,46,0.1)] lg:shadow-[0_8px_30px_rgba(44,48,46,0.1)] flex items-center px-4 h-14 border border-white focus-within:border-brand-primary transition-colors pointer-events-auto mb-4 ring-1 ring-black/5">
            <Search className="text-brand-olive mr-3" size={20} />
            <input
              type="text"
              placeholder="Cari lokasi atau restoran..."
              className="bg-transparent border-none outline-none w-full text-sm font-bold text-brand-charcoal placeholder:text-brand-olive/70"
            />
            <button className="w-8 h-8 rounded-[12px] bg-brand-primary/10 flex items-center justify-center text-brand-primary ml-2 border border-brand-primary/20 hover:bg-brand-primary hover:text-white transition-colors">
              <SlidersHorizontal size={16} />
            </button>
          </div>

          {/* Filter Chips */}
          <div className="flex gap-2.5 overflow-x-auto hide-scrollbar pb-4 pointer-events-auto px-1 -mx-4 scroll-pl-4">
             {filters.map(f => (
               <button 
                 key={f}
                 onClick={() => setActiveFilter(f)}
                 className={`px-4 py-2.5 rounded-[16px] text-[13px] font-bold whitespace-nowrap shadow-sm transition-all border shrink-0 first:ml-4 last:mr-4 ${activeFilter === f ? 'bg-brand-primary text-white border-brand-primary shadow-md shadow-brand-primary/20' : 'bg-white/90 lg:bg-white/90 backdrop-blur-md text-brand-charcoal border-transparent hover:bg-white hover:shadow-md ring-1 ring-black/5'}`}
               >
                 {f}
               </button>
             ))}
          </div>
        </div>
      </div>

      {/* Map Pins Simulation */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* User Pin */}
        <div className="absolute top-[50%] lg:top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center pointer-events-auto cursor-pointer">
          <div
            className="absolute w-24 h-24 bg-brand-primary/10 rounded-full animate-ping"
            style={{ animationDuration: "3s" }}
          />
          <div className="absolute w-12 h-12 bg-brand-primary/20 rounded-full animate-pulse" />
          <div className="w-5 h-5 bg-white rounded-full border-4 border-brand-primary shadow-lg relative z-10" />
        </div>

        {/* Store Pins */}
        {stores.map((store, i) => {
          const top = 35 + (i % 2 === 0 ? i * 8 : -i * 6);
          const left = 25 + i * 20;
          const isSelected = selectedStoreId === store.id;
          const sFoods = foods.filter(
            (f) =>
              f.storeId === store.id &&
              f.quantityLeft > 0 &&
              f.isActive !== false,
          );
          const maxDiscount =
            sFoods.length > 0
              ? Math.max(
                  ...sFoods.map((f) =>
                    Math.round((1 - f.rescuePrice / f.originalPrice) * 100),
                  ),
                )
              : 0;
          const totalLeft = sFoods.reduce((acc, f) => acc + f.quantityLeft, 0);

          if (totalLeft === 0) return null;

          return (
            <motion.button
              key={store.id}
              onClick={() => setSelectedStoreId(store.id)}
              initial={{ scale: 0, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: "spring", delay: i * 0.15 }}
              className="absolute flex flex-col items-center group pointer-events-auto z-10"
              style={{ top: `${top}%`, left: `${left}%` }}
            >
              <div
                className={`relative flex items-center p-1 rounded-full shadow-xl transition-all duration-300 border-2 ${isSelected ? "bg-white border-accent-orange scale-110 z-30 shadow-accent-orange/30" : "bg-white/95 backdrop-blur-sm border-white hover:scale-105 z-10 hover:border-brand-primary/50"}`}
              >
                {sFoods[0] && (
                  <img
                    src={sFoods[0].image}
                    className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover shrink-0 border border-brand-beige"
                    alt=""
                  />
                )}
                <div className="flex flex-col items-start justify-center pl-2 pr-3 min-w-[64px]">
                  <span
                    className={`text-[10px] lg:text-[11px] font-black leading-none ${isSelected ? "text-accent-orange" : "text-brand-charcoal"}`}
                  >
                    {maxDiscount}% OFF
                  </span>
                  <span className="text-[9px] lg:text-[10px] font-bold text-brand-olive mt-0.5">
                    Sisa {totalLeft}
                  </span>
                </div>
                {totalLeft <= 3 && !isSelected && (
                  <div className="absolute -inset-1 bg-accent-orange/20 rounded-full blur-md -z-10 animate-pulse pointer-events-none" />
                )}
              </div>
              <div
                className={`w-3 h-3 rotate-45 -mt-1.5 border-r border-b shadow-sm transition-colors ${isSelected ? "bg-white border-accent-orange" : "bg-white border-white group-hover:border-brand-primary/50"}`}
              />
            </motion.button>
          );
        })}
      </div>

      {/* Floating Action Buttons */}
      <div className="absolute bottom-[40%] right-4 flex flex-col gap-3 z-20 pointer-events-auto">
        <button className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg flex items-center justify-center text-brand-charcoal hover:bg-white transition-colors border border-brand-beige">
          <Crosshair size={22} />
        </button>
      </div>

      {/* Live Activity Toast on Map */}
      <motion.div
        initial={{ opacity: 0, x: -20, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute top-[30%] lg:top-[25%] left-4 bg-white/90 backdrop-blur-xl px-3 py-2 rounded-[16px] border border-white shadow-xl flex items-center gap-2 pointer-events-none z-20"
      >
        <div className="w-7 h-7 bg-brand-primary/10 rounded-full flex items-center justify-center">
          <Flame size={12} className="text-brand-primary" />
        </div>
        <div>
          <p className="text-[10px] font-bold text-brand-charcoal leading-tight">
            Pastry Surprise Box
          </p>
          <p className="text-[9px] font-bold text-brand-olive mt-0.5">
            Baru saja diselamatkan!
          </p>
        </div>
      </motion.div>

      {/* Bottom Modals / Carousels */}
      <div className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none pb-[100px] lg:pb-8 flex flex-col items-center justify-end h-full">
        <AnimatePresence mode="wait">
          {selectedStore && selectedFood ? (
            <motion.div
              key="store-details"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-2xl bg-[#FCFDF9] rounded-t-[40px] lg:rounded-[40px] shadow-[0_-20px_50px_rgba(0,0,0,0.15)] lg:shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col pointer-events-auto mx-4 max-h-[75vh] lg:max-h-[600px] border border-white/50"
            >
              {/* Sheet Handle */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-white/50 backdrop-blur-md rounded-full z-50 pointer-events-none lg:hidden" />

              {/* Banner Image */}
              <div className="relative h-48 lg:h-56 w-full shrink-0">
                <img
                  src={selectedFood.image}
                  className="w-full h-full object-cover"
                  alt=""
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/95 via-brand-primary/40 to-transparent" />
                <button
                  onClick={() => setSelectedStoreId(null)}
                  className="absolute top-4 right-4 w-9 h-9 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white z-10 hover:bg-white hover:text-brand-primary transition-colors"
                >
                  <X size={18} />
                </button>

                <div className="absolute bottom-5 left-6 right-6">
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="flex gap-2 items-center mb-2.5">
                        <span className="bg-accent-orange text-white text-[10px] font-bold px-2 py-1 rounded-[6px] uppercase tracking-wider flex items-center gap-1 shadow-md">
                          <Flame size={12} /> Sisa {selectedFood.quantityLeft}
                        </span>
                        <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-[6px] flex items-center gap-1">
                          <Clock size={12} /> Pick up{" "}
                          {selectedFood.pickupTimeEnd}
                        </span>
                      </div>
                      <h2 className="text-2xl lg:text-3xl font-black text-white leading-tight mb-1 tracking-tight">
                        {selectedStore.name}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="p-6 pt-5 overflow-y-auto w-full flex-1">
                {/* Info row */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1 bg-white border border-brand-beige/60 shadow-sm rounded-2xl p-3.5 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                      <Navigation2 size={16} className="text-brand-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold text-brand-olive uppercase tracking-widest leading-none mb-1">
                        Jarak ETA
                      </p>
                      <p className="text-xs font-bold text-brand-charcoal leading-tight truncate">
                        {selectedStore.distance} • 12 mnt
                      </p>
                    </div>
                  </div>
                  <div className="flex-1 bg-white border border-brand-beige/60 shadow-sm rounded-2xl p-3.5 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                      <MapPin size={16} className="text-brand-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold text-brand-olive uppercase tracking-widest leading-none mb-1">
                        Lokasi
                      </p>
                      <p className="text-xs font-bold text-brand-charcoal leading-tight truncate">
                        {selectedStore.address}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Food Listing */}
                <div className="space-y-4">
                  <h3 className="font-bold text-brand-charcoal flex items-center gap-2 text-[16px] tracking-tight">
                    Paket Tersedia{" "}
                    <span className="bg-brand-beige/50 text-brand-olive text-[11px] px-2.5 py-0.5 rounded-full">
                      {storeFoods.length}
                    </span>
                  </h3>

                  <AnimatePresence mode="popLayout">
                    {storeFoods.length > 0 ? (
                      storeFoods.map((food) => (
                        <motion.div
                          layout
                          key={food.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9, height: 0 }}
                          className="flex gap-4 items-center group cursor-pointer border border-brand-beige bg-white p-3.5 rounded-2xl shadow-sm hover:border-brand-primary/30 hover:shadow-md transition-all"
                          onClick={() => navigate(`FOOD_DETAIL_${food.id}`)}
                        >
                          <img
                            src={food.image}
                            className="w-16 h-16 rounded-[14px] object-cover shrink-0"
                            alt=""
                          />
                          <div className="flex-1 min-w-0 flex flex-col justify-center">
                            <h4 className="font-bold text-brand-charcoal text-[15px] mb-1 truncate group-hover:text-brand-primary transition-colors">
                              {food.name}
                            </h4>
                            <div className="flex items-center gap-2">
                              <span className="text-[16px] font-black text-accent-orange">
                                {formatCurrency(food.rescuePrice)}
                              </span>
                              <span className="text-[11px] font-medium text-brand-olive line-through">
                                {formatCurrency(food.originalPrice)}
                              </span>
                            </div>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-brand-cream text-brand-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowRight size={16} />
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="py-8 flex flex-col items-center justify-center text-center bg-white rounded-2xl border border-brand-beige border-dashed">
                        <UtensilsCrossed
                          size={32}
                          className="text-brand-olive/50 mb-3"
                        />
                        <p className="text-[15px] font-bold text-brand-charcoal">
                          Semua Makanan Habis
                        </p>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="store-list"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="w-full max-w-[1200px] overflow-x-auto hide-scrollbar flex gap-4 pointer-events-auto snap-x scroll-px-4 pb-4"
              style={{ paddingLeft: "16px", paddingRight: "16px" }}
            >
              {stores
                .filter((s) => {
                  const sf = foods.filter(
                    (f) =>
                      f.storeId === s.id &&
                      f.quantityLeft > 0 &&
                      f.isActive !== false,
                  );
                  return sf.length > 0;
                })
                .map((store) => {
                  const sFoods = foods.filter(
                    (f) =>
                      f.storeId === store.id &&
                      f.quantityLeft > 0 &&
                      f.isActive !== false,
                  );
                  return (
                    <div
                      key={store.id}
                      onClick={() => setSelectedStoreId(store.id)}
                      className="bg-white/95 backdrop-blur-xl rounded-[24px] border border-white p-3.5 shadow-[0_12px_40px_rgba(44,48,46,0.08)] cursor-pointer hover:shadow-[0_16px_50px_rgba(33,149,111,0.15)] hover:-translate-y-1.5 hover:border-brand-primary/30 transition-all flex min-w-[300px] lg:min-w-[340px] max-w-[340px] snap-center shrink-0 items-center overflow-hidden"
                    >
                      <div className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-[16px] overflow-hidden shrink-0 shadow-inner">
                        <img
                          src={sFoods[0]?.image}
                          className="w-full h-full object-cover"
                          alt=""
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-center ml-4 min-w-0">
                        <h3 className="font-bold text-brand-charcoal text-[16px] lg:text-[18px] leading-tight mb-1 truncate">
                          {store.name}
                        </h3>
                        <p className="text-[12px] font-medium text-brand-olive flex items-center gap-1 mb-2 truncate">
                          {store.distance} • {store.address}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-brand-primary bg-brand-primary/10 px-2 py-1 rounded-[8px] flex items-center gap-1">
                            <Flame size={12} /> {sFoods.length} Paket Tersisa
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Bottom Nav */}
      <BuyerBottomNav />
    </div>
  );
};
