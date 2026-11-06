import React from "react";
import { useAppStore } from "../../store/AppContext";
import {
  Star,
  MapPin,
  Clock,
  Award,
  Leaf,
  TrendingUp,
  Settings,
  ChevronRight,
  Target,
  Check,
  LogOut,
} from "lucide-react";
import { SellerBottomNav } from "../../components/SellerBottomNav";

export const SellerProfile = () => {
  const { stores, currentUser, orders, logout } = useAppStore();
  const myStore = stores.find((s) => s.ownerId === currentUser?.id);

  if (!myStore) return null;

  const myOrders = orders.filter((o) => o.storeId === myStore.id);
  const completedOrders = myOrders.filter((o) => o.status === "COMPLETED");
  
  const totalFoodRescued = completedOrders.reduce((acc, o) => acc + o.quantity, 0);
  const totalRevenue = completedOrders.reduce((acc, o) => acc + o.totalPrice, 0);
  const wastePrevented = (totalFoodRescued * 0.5).toFixed(1);
  const completionRate = myOrders.length > 0 
    ? Math.round((completedOrders.length / myOrders.length) * 100) 
    : 100;

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F7F8] w-full font-sans">
      
      {/* --- MOBILE HERO --- */}
      <div className="lg:hidden relative bg-white pb-6 rounded-b-[32px] shadow-[0_8px_20px_rgba(44,48,46,0.04)] border-b border-brand-beige/50 mb-6 shrink-0 z-10">
         <div className="h-[180px] w-full bg-brand-charcoal relative rounded-b-[32px] overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-60"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
         </div>
         
         <div className="px-5 relative z-10 -mt-14 flex justify-between items-end">
            <div className="w-[90px] h-[90px] bg-white p-1 rounded-[22px] shadow-lg border border-brand-beige/50 relative">
               <img src={myStore.image} className="w-full h-full object-cover rounded-[18px]" alt="store" />
               {myStore.isVerified && (
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-brand-primary text-white rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                     <Check size={14} strokeWidth={3} />
                  </div>
               )}
            </div>
         </div>

         <div className="px-5 mt-4">
            <h1 className="text-2xl font-black text-brand-charcoal leading-tight mb-1 tracking-tight">{myStore.name}</h1>
            <p className="text-[13px] text-brand-olive font-medium leading-relaxed mb-4 line-clamp-2">
               {myStore.description || "Partnering with Serene to reduce food waste by offering surplus meals at a highly discounted price."}
            </p>

            <div className="flex flex-wrap gap-2">
               <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-accent-orange bg-accent-orange/10 px-3 py-1.5 rounded-[12px] border border-accent-orange/20">
                 <Star size={12} className="fill-current animate-pulse" /> {myStore.rating}
               </div>
               <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-[12px] border border-emerald-100">
                 <Leaf size={12} /> Partner Aktif
               </div>
               <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-brand-charcoal bg-[#F5F7F8] px-3 py-1.5 rounded-[12px] border border-brand-beige/50 shadow-sm">
                 <MapPin size={12} className="text-brand-primary" /> {myStore.distance}
               </div>
            </div>
         </div>
      </div>

      <div className="flex-1 pb-32 pt-0 lg:pt-32 w-full max-w-4xl mx-auto px-5 lg:px-8">
        
        {/* --- DESKTOP HERO PROFILE --- */}
        <div className="hidden lg:block bg-white rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgba(44,48,46,0.04)] border border-brand-beige relative mb-8">
          {/* Cover Photo */}
          <div className="h-40 lg:h-56 bg-brand-charcoal relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal to-transparent"></div>
          </div>

          <div className="relative px-6 lg:px-10 pb-8 -mt-16 flex flex-col items-center text-center">
            <div className="w-28 h-28 bg-white p-2 rounded-full shadow-[0_8px_30px_rgba(44,48,46,0.12)] border-4 border-white relative z-20 mb-4 group cursor-pointer">
              <div className="w-full h-full rounded-full overflow-hidden relative">
                <img
                  src={myStore.image}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  alt="store logo"
                />
              </div>
              {myStore.isVerified && (
                <div className="absolute bottom-1 right-1 w-7 h-7 bg-emerald-500 text-white rounded-full flex items-center justify-center border-[3px] border-white shadow-sm" title="Verified Store">
                  <Check size={14} strokeWidth={3} />
                </div>
              )}
            </div>

            <h1 className="text-3xl font-black text-brand-charcoal mb-2 tracking-tight">
              {myStore.name}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
              <div className="flex items-center gap-1.5 text-sm font-bold text-accent-orange bg-accent-orange/10 px-4 py-1.5 rounded-full border border-accent-orange/20">
                <Star size={14} className="fill-current" /> {myStore.rating}
              </div>
              <div className="flex items-center gap-1.5 text-sm font-bold text-emerald-600 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-100">
                <Leaf size={14} /> Total Rescuer
              </div>
            </div>

            <p className="text-brand-olive font-medium px-4 lg:px-12 line-clamp-2 leading-relaxed mb-6 max-w-2xl">
              {myStore.description || "Partnering with Serene to reduce food waste by offering surplus meals at a highly discounted price."}
            </p>

            <div className="flex flex-wrap gap-2 justify-center">
              <div className="flex items-center gap-2 text-sm text-brand-charcoal bg-[#F7F9F8] px-5 py-2 rounded-xl border border-brand-beige font-bold shadow-sm">
                <MapPin size={16} className="text-brand-primary" />
                {myStore.address} ({myStore.distance})
              </div>
              <div className="flex items-center gap-2 text-sm text-brand-charcoal bg-[#F7F9F8] px-5 py-2 rounded-xl border border-brand-beige font-bold shadow-sm">
                <Clock size={16} className="text-accent-orange" />
                Closes at 21:00
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mt-2 lg:mt-0">
          {/* Rescue Impact */}
          <div className="md:col-span-3 bg-brand-charcoal text-white rounded-[24px] lg:rounded-[32px] p-6 lg:p-10 relative overflow-hidden shadow-lg border border-brand-charcoal/80 group">
            {/* Background design elements */}
            <div className="absolute right-0 top-0 w-64 h-64 bg-brand-primary/20 rounded-full blur-[80px] -mr-20 -mt-20"></div>
            <div className="absolute left-0 bottom-0 w-48 h-48 bg-accent-orange/20 rounded-full blur-[60px] -ml-16 -mb-16"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 lg:gap-8">
              <div>
                <div className="flex items-center gap-2 text-emerald-400 text-[10px] lg:text-xs font-bold uppercase tracking-widest mb-3 lg:mb-4">
                  <Leaf size={14} strokeWidth={2.5} /> Total Dampak Lingkungan
                </div>
                <div className="flex items-baseline gap-2 lg:gap-3 mb-1 lg:mb-2">
                  <h2 className="text-4xl lg:text-6xl font-black tracking-tight">{totalFoodRescued}</h2>
                  <span className="text-white/60 font-semibold text-base lg:text-lg">Porsi Makanan</span>
                </div>
                <p className="text-[13px] lg:text-sm text-white/80 font-medium">
                  Berhasil diselamatkan dari pembuangan.
                </p>
              </div>
              
              <div className="w-px h-24 bg-white/10 hidden md:block"></div>
              <div className="h-px w-full bg-white/10 md:hidden my-1"></div>
              
              <div>
                <div className="flex items-center gap-2 text-accent-orange text-[10px] lg:text-xs font-bold uppercase tracking-widest mb-3 lg:mb-4">
                  <Target size={14} strokeWidth={2.5} /> Pencegahan Limbah
                </div>
                <div className="flex items-baseline gap-2 lg:gap-3 mb-1 lg:mb-2">
                  <h2 className="text-3xl lg:text-5xl font-black tracking-tight">{wastePrevented}</h2>
                  <span className="text-white/60 font-semibold text-base lg:text-lg">kg CO₂</span>
                </div>
                <p className="text-[13px] lg:text-sm text-white/80 font-medium">
                  Emisi karbon yang berhasil dicegah.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 lg:gap-6 md:col-span-3">
            <div className="bg-white p-5 lg:p-6 rounded-[24px] lg:rounded-[32px] border border-brand-beige/80 shadow-[0_4px_20px_rgba(44,48,46,0.02)] relative overflow-hidden">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-[14px] lg:rounded-2xl bg-accent-orange/10 text-accent-orange flex items-center justify-center mb-3 lg:mb-5">
                <TrendingUp size={18} strokeWidth={2.5} />
              </div>
              <p className="text-[10px] lg:text-xs font-bold text-brand-olive uppercase tracking-widest mb-1.5 lg:mb-2">
                Pendapatan
              </p>
              <p className="text-[16px] lg:text-2xl font-black text-brand-charcoal tracking-tight leading-none">
                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(totalRevenue)}
              </p>
            </div>
            
            <div className="bg-white p-5 lg:p-6 rounded-[24px] lg:rounded-[32px] border border-brand-beige/80 shadow-[0_4px_20px_rgba(44,48,46,0.02)] relative overflow-hidden">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-[14px] lg:rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-3 lg:mb-5">
                <Check size={18} strokeWidth={3} />
              </div>
              <p className="text-[10px] lg:text-xs font-bold text-brand-olive uppercase tracking-widest mb-1.5 lg:mb-2">
                Tingkat Selesai
              </p>
              <p className="text-[20px] lg:text-2xl font-black text-brand-charcoal tracking-tight leading-none">
                {completionRate}%
              </p>
            </div>

            <div className="col-span-2 md:col-span-1 bg-white p-4 lg:p-6 rounded-[24px] lg:rounded-[32px] border border-brand-beige/80 shadow-[0_4px_20px_rgba(44,48,46,0.02)] relative overflow-hidden flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start">
              <div className="absolute right-0 bottom-0 w-24 h-24 bg-brand-cream/50 rounded-tl-full blur-md -mr-4 -mb-4 pointer-events-none"></div>
              <div className="flex items-center gap-3 lg:gap-4 lg:block relative z-10 w-full">
                 <div className="w-12 h-12 lg:w-12 lg:h-12 shrink-0 rounded-[14px] lg:rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center md:mb-5">
                   <Award size={20} strokeWidth={2.5} />
                 </div>
                 <div>
                   <p className="text-[10px] lg:text-xs font-bold text-brand-olive uppercase tracking-widest mb-1">
                     Kemitraan
                   </p>
                   <p className="text-[16px] lg:text-2xl font-black text-brand-charcoal tracking-tight flex items-center gap-2">
                     Gold Partner
                   </p>
                 </div>
              </div>
            </div>
          </div>

          {/* Settings Menu */}
          <div className="md:col-span-3 bg-white rounded-[24px] lg:rounded-[32px] border border-brand-beige/80 shadow-[0_4px_20px_rgba(44,48,46,0.02)] overflow-hidden mt-1">
            <div className="p-4 lg:p-6 border-b border-brand-beige/50 flex items-center justify-between cursor-pointer hover:bg-brand-cream/30 transition-colors group">
              <div className="flex items-center gap-3 lg:gap-4">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-[14px] lg:rounded-2xl bg-slate-50 border border-brand-beige/80 flex items-center justify-center text-brand-charcoal group-hover:scale-105 transition-transform group-hover:text-brand-primary shadow-sm">
                  <Settings size={18} strokeWidth={2.5} />
                </div>
                <div>
                  <span className="block text-[14px] lg:text-base font-bold text-brand-charcoal leading-none mb-1">
                    Pengaturan Toko
                  </span>
                  <span className="block text-[11px] lg:text-sm font-medium text-brand-olive mt-1">
                    Kelola jam operasional dan detail
                  </span>
                </div>
              </div>
              <ChevronRight size={18} className="text-brand-olive/50 group-hover:text-brand-charcoal transition-colors group-hover:translate-x-1" />
            </div>
            <div className="p-4 lg:p-6 flex items-center justify-between cursor-pointer hover:bg-brand-cream/30 transition-colors group">
              <div className="flex items-center gap-3 lg:gap-4">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-[14px] lg:rounded-2xl bg-slate-50 border border-brand-beige/80 flex items-center justify-center text-brand-charcoal group-hover:scale-105 transition-transform group-hover:text-accent-orange shadow-sm">
                  <Award size={18} strokeWidth={2.5} />
                </div>
                <div>
                  <span className="block text-[14px] lg:text-base font-bold text-brand-charcoal leading-none mb-1">
                    Lencana & Prestasi
                  </span>
                  <span className="block text-[11px] lg:text-sm font-medium text-brand-olive mt-1">
                    Lihat capaian penyelamatan Anda
                  </span>
                </div>
              </div>
              <ChevronRight size={18} className="text-brand-olive/50 group-hover:text-brand-charcoal transition-colors group-hover:translate-x-1" />
            </div>

            {/* Logout Button */}
            <div onClick={logout} className="p-4 lg:p-6 flex items-center justify-between cursor-pointer hover:bg-red-50 transition-colors border-t border-brand-beige/50 group">
              <div className="flex items-center gap-3 lg:gap-4">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-[14px] lg:rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-500 group-hover:scale-105 transition-transform shadow-sm">
                  <LogOut size={18} strokeWidth={2.5} />
                </div>
                <div>
                  <span className="block text-[14px] lg:text-base font-bold text-red-600 leading-none mb-1 group-hover:text-red-700">
                    Keluar Akun
                  </span>
                  <span className="block text-[11px] lg:text-sm font-medium text-red-500/80 mt-1">
                    Akhiri sesi aktif Anda saat ini
                  </span>
                </div>
              </div>
              <ChevronRight size={18} className="text-red-300 group-hover:text-red-500 transition-colors group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </div>

      <SellerBottomNav />
    </div>
  );
};
