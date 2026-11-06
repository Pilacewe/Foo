import React, { useState } from "react";
import { useAppStore } from "../../store/AppContext";
import { MoreVertical, Edit2, Copy, Power, Plus, Search } from "lucide-react";
import { formatCurrency } from "../../utils/format";
import { motion, AnimatePresence } from "motion/react";
import { SellerBottomNav } from "../../components/SellerBottomNav";

export const SellerMenu = () => {
  const { stores, foods, currentUser, navigate, updateFood } = useAppStore();
  const [activeTab, setActiveTab] = useState("Semua");

  const myStore = stores.find((s) => s.ownerId === currentUser?.id);
  const myFoods = foods.filter((f) => f.storeId === myStore?.id);

  const displayFoods = myFoods.filter((f) => {
    if (activeTab === "Aktif") return f.quantityLeft > 0;
    if (activeTab === "Habis") return f.quantityLeft === 0;
    return true;
  });

  const totalStock = 10;

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F7F8] w-full font-sans">
      
      {/* Container - Desktop uses padding, Mobile uses 0 padding top to allow full-bleed header */}
      <div className="flex-1 w-full lg:w-[calc(100%-2rem)] max-w-7xl mx-auto pt-0 lg:pt-32 pb-32 relative z-10">
        
        {/* --- MOBILE HEADER (hidden on lg) --- */}
        <div className="lg:hidden bg-brand-primary pt-12 pb-6 px-5 rounded-b-[32px] shadow-[0_8px_20px_rgba(33,149,111,0.15)] relative overflow-hidden mb-6 shrink-0">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-brand-charcoal/10 rounded-full blur-xl pointer-events-none" />
          
          <div className="flex justify-between items-center mb-6 relative z-10">
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight leading-tight">
                Menu Anda
              </h1>
              <p className="text-[12px] font-bold text-white/80 mt-1 uppercase tracking-widest">
                Stok Hari Ini
              </p>
            </div>
            
            <button onClick={() => navigate('SELLER_ADD')} className="w-11 h-11 bg-white text-brand-primary rounded-[16px] flex items-center justify-center shadow-[0_4px_12px_rgba(255,255,255,0.2)] active:scale-95 transition-transform relative z-10">
               <Plus size={22} strokeWidth={2.5} />
            </button>
          </div>

          <div className="relative z-10 mb-5">
            <div className="flex items-center bg-white/10 border border-white/20 backdrop-blur-md rounded-[16px] px-4 py-3.5 w-full focus-within:bg-white/20 transition-all shadow-inner">
               <Search size={18} className="text-white/70 mr-3 shrink-0" strokeWidth={2.5} />
               <input type="text" placeholder="Cari menu makanan..." className="w-full bg-transparent outline-none text-[15px] font-bold text-white placeholder:text-white/50" />
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto hide-scrollbar relative z-10">
            {["Semua", "Aktif", "Habis"].map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-none px-6 py-2.5 text-[13px] font-bold rounded-[14px] transition-all duration-300 border ${
                    isActive
                      ? "bg-white text-brand-primary border-white shadow-md"
                      : "bg-white/10 text-white border-white/20 backdrop-blur-sm"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* --- DESKTOP HEADER (hidden on mobile) --- */}
        <div className="hidden lg:block px-6 pb-6 shrink-0 relative z-10 w-full mb-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-black text-brand-charcoal tracking-tight mb-1">
                Menu Anda
              </h1>
              <p className="text-[14px] text-brand-olive font-medium">Kelola stok makanan hari ini</p>
            </div>
            
            <button onClick={() => navigate('SELLER_ADD')} className="flex px-6 py-3 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-xl items-center gap-2 font-bold shadow-md transition-transform hover:-translate-y-0.5">
               <Plus size={18} /> Add New Item
            </button>
          </div>

          <div className="flex flex-row items-center justify-between gap-5">
            <div className="flex gap-2 bg-white/50 p-1.5 rounded-full border border-brand-beige shadow-sm">
              {["Semua", "Aktif", "Habis"].map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-none px-8 py-2 text-[14px] font-bold rounded-full transition-all duration-300 border ${
                      isActive
                        ? "bg-brand-charcoal text-white border-brand-charcoal shadow-md"
                        : "bg-white text-brand-olive border-brand-beige hover:text-brand-charcoal hover:bg-brand-cream/50"
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center bg-white border border-brand-beige rounded-full px-5 py-3 w-80 hover:border-brand-primary/40 focus-within:border-brand-primary/60 focus-within:ring-4 focus-within:ring-brand-primary/10 transition-all shadow-sm">
               <Search size={18} className="text-brand-olive/80 mr-3" strokeWidth={2.5} />
               <input type="text" placeholder="Search your menu..." className="w-full bg-transparent outline-none text-[15px] font-bold text-brand-charcoal placeholder:text-brand-olive/50 placeholder:font-medium" />
            </div>
          </div>
        </div>

        {/* --- MOBILE CARDS (hidden on lg) --- */}
        <div className="lg:hidden flex-1 px-5 space-y-4 pb-24 mt-2">
          <AnimatePresence mode="popLayout">
            {displayFoods.map((food) => {
              const isSoldOut = food.quantityLeft === 0;
              const isLowStock = food.quantityLeft > 0 && food.quantityLeft <= 2;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  key={food.id}
                  className={`bg-white rounded-[24px] p-1 shadow-[0_8px_24px_rgba(44,48,46,0.04)] border ${isSoldOut ? 'border-brand-beige/50 opacity-80' : 'border-brand-beige/80'} overflow-hidden relative`}
                >
                  <div className="p-3 pb-2 flex gap-4">
                    {/* Image with Tag */}
                    <div className="relative shrink-0 w-[110px] h-[110px]">
                      <div className="w-full h-full rounded-[18px] overflow-hidden">
                        <img
                          src={food.image}
                          className={`w-full h-full object-cover transition-transform duration-700 ${isSoldOut ? "filter grayscale opacity-60" : "hover:scale-110"}`}
                          alt=""
                        />
                      </div>
                      
                      {/* Status Overlay Float */}
                      <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {isSoldOut ? (
                          <span className="bg-brand-charcoal/90 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg shadow-sm border border-white/10">
                            Habis
                          </span>
                        ) : food.isActive === false ? (
                          <span className="bg-accent-orange/90 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg shadow-sm border border-white/10">
                            Nonaktif
                          </span>
                        ) : (
                          <span className="bg-brand-primary/95 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg shadow-sm border border-white/10">
                            Aktif
                          </span>
                        )}
                      </div>

                      {!isSoldOut && isLowStock && (
                        <div className="absolute -bottom-2 -right-1 bg-accent-orange text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-[0_4px_10px_rgba(255,140,102,0.4)] border border-white z-10">
                          Stok Menipis
                        </div>
                      )}
                    </div>
  
                    {/* Details Container */}
                    <div className="flex-1 min-w-0 flex flex-col pt-1">
                      {/* Title & Price */}
                      <div className="flex-1">
                        <h3 className={`font-black text-[15px] leading-snug mb-1 ${isSoldOut ? "text-brand-olive/80" : "text-brand-charcoal"}`}>
                          {food.name}
                        </h3>
                        
                        <div className="flex flex-col gap-0.5 mb-2">
                          <span className="text-[11px] font-bold text-brand-olive/50 line-through">
                            {formatCurrency(food.originalPrice)}
                          </span>
                          <span className={`text-[16px] font-black leading-none ${isSoldOut ? "text-brand-olive/60" : "text-brand-primary"}`}>
                            {formatCurrency(food.rescuePrice)}
                          </span>
                        </div>
                      </div>
  
                      {/* Modern Stock Indicator */}
                      <div className="w-full bg-brand-cream/30 p-2 rounded-[14px] border border-brand-beige/50">
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-[10px] font-bold text-brand-olive uppercase tracking-widest">
                            Tersisa {food.quantityLeft}
                          </span>
                          <span className={`text-[11px] font-black ${isSoldOut ? "text-brand-olive/50" : isLowStock ? "text-accent-orange" : "text-brand-charcoal"}`}>
                            {Math.round((food.quantityLeft / totalStock) * 100)}%
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-brand-beige/40 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-1000 relative ${isSoldOut ? "bg-brand-olive/20" : isLowStock ? "bg-accent-orange" : "bg-gradient-to-r from-brand-primary to-[#28B88A]"}`}
                            style={{
                              width: `${Math.min((food.quantityLeft / totalStock) * 100, 100)}%`,
                            }}
                          >
                           {!isSoldOut && (
                             <div className="absolute inset-0 bg-white/20 w-full animate-pulse blur-[1px]" />
                           )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
  
                  {/* Elegant Action Grid */}
                  <div className="px-3 pb-3 flex gap-2">
                    <button className="flex-1 py-3 flex justify-center items-center gap-1.5 text-[12px] font-bold text-brand-charcoal bg-brand-cream/30 hover:bg-brand-cream/80 rounded-[14px] transition-all active:scale-95">
                      <Edit2 size={14} strokeWidth={2.5} /> Edit Menu
                    </button>
                    <button
                      onClick={() => updateFood(food.id, { isActive: food.isActive === false ? true : false })}
                      className={`flex-[1.2] py-3 flex justify-center items-center gap-1.5 text-[12px] font-bold rounded-[14px] transition-all active:scale-95 shadow-sm ${food.isActive === false ? "bg-brand-charcoal text-white hover:bg-black shadow-[0_4px_12px_rgba(0,0,0,0.15)]" : "bg-white text-accent-orange border border-accent-orange/20 hover:bg-accent-orange/5"}`}
                    >
                      <Power size={14} strokeWidth={2.5} /> {food.isActive === false ? "Aktifkan" : "Nonaktifkan"}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* --- DESKTOP TABLE HYBRID (hidden on mobile) --- */}
        <div className="hidden lg:block px-6">
           <div className="bg-white rounded-[40px] p-4 shadow-[0_12px_40px_rgba(44,48,46,0.03)] border border-brand-beige/80">
             
             {/* Table Header */}
             <div className="grid grid-cols-[2fr_1fr_1.5fr_1fr_auto] gap-6 px-10 py-6 border-b border-brand-beige/50 text-brand-olive text-xs font-bold uppercase tracking-widest">
               <div>Item Detail</div>
               <div>Pricing</div>
               <div>Stock Level</div>
               <div>Status</div>
               <div className="w-32 text-right">Actions</div>
             </div>

             {/* Table Body */}
             <div className="divide-y divide-brand-beige/30">
               <AnimatePresence>
                 {displayFoods.map((food) => {
                   const isSoldOut = food.quantityLeft === 0;
                   const isLowStock = food.quantityLeft > 0 && food.quantityLeft <= 2;
                   
                   return (
                     <motion.div 
                       layout
                       initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }}
                       key={food.id}
                       className="grid grid-cols-[2fr_1fr_1.5fr_1fr_auto] gap-6 items-center px-6 py-5 hover:bg-slate-50 transition-colors rounded-[32px] group"
                     >
                        {/* Item */}
                        <div className="flex items-center gap-5 px-4">
                           <div className="relative">
                              <img src={food.image} className={`w-20 h-20 rounded-[20px] object-cover shadow-sm ${isSoldOut ? "filter grayscale brightness-90" : "border border-brand-beige/50"}`} />
                              {isSoldOut && (
                                <div className="absolute inset-0 bg-brand-charcoal/40 rounded-[20px] flex items-center justify-center backdrop-blur-[2px]">
                                </div>
                              )}
                           </div>
                           <div>
                              <p className={`font-black text-lg mb-1 leading-tight ${isSoldOut ? "text-brand-olive" : "text-brand-charcoal"}`}>{food.name}</p>
                              <p className="text-xs text-brand-olive/80 font-bold tracking-wide uppercase">Meals &bull; 250g</p>
                           </div>
                        </div>

                        {/* Price */}
                        <div>
                           <p className={`text-[17px] font-black mb-1 ${isSoldOut ? "text-brand-olive" : "text-brand-primary"}`}>{formatCurrency(food.rescuePrice)}</p>
                           <p className="text-xs font-bold text-brand-olive/50 line-through">{formatCurrency(food.originalPrice)}</p>
                        </div>

                        {/* Stock Indicator */}
                        <div className="pr-10">
                           <div className="flex justify-between items-end mb-2.5">
                             <p className={`text-[15px] font-black tracking-wide ${isSoldOut ? 'text-brand-olive/50' : isLowStock ? 'text-accent-orange' : 'text-brand-charcoal'}`}>{food.quantityLeft} <span className="text-xs font-bold text-brand-olive">remaining</span></p>
                             <p className="text-[11px] font-bold text-brand-olive uppercase tracking-widest">{Math.round((totalStock - food.quantityLeft)/totalStock * 100)}% sold</p>
                           </div>
                           <div className="h-2.5 w-full bg-brand-beige/30 rounded-full overflow-hidden shadow-inner">
                              <div
                                className={`h-full rounded-full transition-all duration-1000 ${isSoldOut ? "bg-brand-beige" : isLowStock ? "bg-[#FF8C66] shadow-[0_0_10px_rgba(255,140,102,0.5)]" : "bg-brand-primary shadow-[0_0_10px_rgba(33,149,111,0.3)]"}`}
                                style={{ width: `${Math.min((food.quantityLeft / totalStock) * 100, 100)}%` }}
                              />
                            </div>
                        </div>

                        {/* Status */}
                        <div>
                           {isSoldOut ? (
                             <span className="px-4 py-2 rounded-xl bg-brand-beige/50 text-brand-olive font-black text-[11px] uppercase tracking-widest">Sold Out</span>
                           ) : food.isActive === false ? (
                             <span className="px-4 py-2 rounded-xl bg-accent-orange/10 border border-accent-orange/20 text-accent-orange font-black text-[11px] uppercase tracking-widest">Paused</span>
                           ) : (
                             <span className="px-4 py-2 rounded-xl bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-black text-[11px] uppercase tracking-widest">Active</span>
                           )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-3 pr-4 opacity-0 group-hover:opacity-100 transition-opacity">
                           <button className="w-12 h-12 rounded-[16px] bg-white border border-brand-beige text-brand-charcoal hover:text-brand-primary hover:border-brand-primary/30 flex items-center justify-center transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5" title="Edit">
                             <Edit2 size={18} strokeWidth={2.5} />
                           </button>
                           <button className="w-12 h-12 rounded-[16px] bg-white border border-brand-beige text-brand-charcoal hover:text-brand-primary hover:border-brand-primary/30 flex items-center justify-center transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5" title="Duplicate">
                             <Copy size={18} strokeWidth={2.5} />
                           </button>
                           {/* Quick Pause/Resume */}
                           <button 
                             onClick={() => updateFood(food.id, { isActive: food.isActive === false ? true : false })}
                             className={`w-12 h-12 rounded-[16px] flex items-center justify-center transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 border ${food.isActive === false ? 'bg-brand-primary text-white border-brand-primary hover:bg-[#1a7f5a]' : 'bg-white text-brand-charcoal border-brand-beige hover:border-accent-orange/30 hover:text-accent-orange'}`}
                             title={food.isActive === false ? "Resume" : "Pause"}
                           >
                             <Power size={18} strokeWidth={2.5} />
                           </button>
                        </div>

                     </motion.div>
                   )
                 })}
               </AnimatePresence>
             </div>
           </div>
        </div>

      </div>

      <SellerBottomNav />
    </div>
  );
};
