import React, { useState } from "react";
import { useAppStore } from "../../store/AppContext";
import { QrCode, MessageCircle, AlertTriangle, Package2, Clock, CheckCircle2, ChevronRight, Check, XCircle, Camera, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { formatCurrency } from "../../utils/format";
import { SellerBottomNav } from "../../components/SellerBottomNav";

export const SellerOrders = () => {
  const { stores, foods, orders, currentUser, updateOrderStatus } =
    useAppStore();
  const [activeTab, setActiveTab] = useState("Perlu Disiapkan");
  const [scanningOrderId, setScanningOrderId] = useState<string | null>(null);

  const myStore = stores.find((s) => s.ownerId === currentUser?.id);
  const myOrders = orders.filter((o) => o.storeId === myStore?.id);

  const orderTabs = ["Perlu Disiapkan", "Siap Diambil", "Selesai", "Dibatalkan"];

  const displayOrders = myOrders.filter((o) => {
    if (activeTab === "Perlu Disiapkan")
      return o.status === "RESERVED" || o.status === "PREPARING";
    if (activeTab === "Siap Diambil") return o.status === "READY";
    if (activeTab === "Selesai") return o.status === "COMPLETED";
    if (activeTab === "Dibatalkan") return o.status === "CANCELLED";
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F7F8] w-full font-sans">
      
      {/* --- DESKTOP HEADER (hidden on mobile) --- */}
      <div className="hidden lg:block pt-32 px-12 pb-4 shrink-0 relative z-10 w-full max-w-7xl mx-auto">
        <div className="flex flex-row justify-between items-end gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary">
                <Package2 size={20} strokeWidth={2.5} />
              </div>
              <span className="text-brand-primary text-sm font-bold uppercase tracking-widest">Store Management</span>
            </div>
            <h1 className="text-5xl font-black text-brand-charcoal tracking-tight leading-tight">
              Active Orders
            </h1>
          </div>
          
          <div className="flex gap-2 overflow-x-auto hide-scrollbar">
            {orderTabs.map((tab) => {
              const isActive = activeTab === tab;
              const hasOrders = tab === "Perlu Disiapkan" && myOrders.filter(o => ["RESERVED", "PREPARING"].includes(o.status)).length > 0;
              
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 text-sm font-bold rounded-full transition-all duration-300 flex items-center gap-2 whitespace-nowrap border ${
                    isActive
                      ? "bg-brand-charcoal text-white border-brand-charcoal shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                      : "bg-white text-brand-olive border-brand-beige/50 hover:bg-slate-50 hover:border-brand-beige"
                  }`}
                >
                  {tab}
                  {hasOrders && (
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${isActive ? 'bg-accent-orange text-white' : 'bg-accent-orange/20 text-accent-orange'}`}>
                      {myOrders.filter(o => ["RESERVED", "PREPARING"].includes(o.status)).length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* --- MOBILE HEADER (hidden on lg) --- */}
      <div className="lg:hidden bg-brand-primary pt-14 pb-5 px-5 rounded-b-[32px] shadow-[0_8px_20px_rgba(33,149,111,0.15)] relative overflow-hidden mb-4 shrink-0 z-20">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-brand-charcoal/10 rounded-full blur-xl pointer-events-none" />
        
        <div className="flex items-center gap-3 mb-6 relative z-10">
           <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-[16px] flex justify-center items-center text-white border border-white/20 shadow-sm">
             <Package2 size={24} strokeWidth={2} />
           </div>
           <div>
             <h1 className="text-2xl font-black text-white leading-tight">
               Pesanan Aktif
             </h1>
             <p className="text-[11px] font-bold text-white/80 mt-0.5 uppercase tracking-widest">
               Kelola Pesanan Pelanggan
             </p>
           </div>
        </div>

        <div className="flex gap-2 overflow-x-auto hide-scrollbar relative z-10 pb-1">
          {orderTabs.map((tab) => {
            const isActive = activeTab === tab;
            const hasOrders = tab === "Perlu Disiapkan" && myOrders.filter(o => ["RESERVED", "PREPARING"].includes(o.status)).length > 0;
            
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-none px-5 py-2.5 text-[13px] font-bold rounded-[14px] transition-all duration-300 border flex items-center gap-2 ${
                  isActive
                    ? "bg-white text-brand-primary border-white shadow-md"
                    : "bg-white/10 text-white border-white/20 backdrop-blur-sm"
                }`}
              >
                {tab}
                {hasOrders && (
                  <span className={`w-[18px] h-[18px] rounded-full flex items-center justify-center text-[9px] font-black ${isActive ? 'bg-accent-orange text-white' : 'bg-red-400 text-white'}`}>
                    {myOrders.filter(o => ["RESERVED", "PREPARING"].includes(o.status)).length}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Scanner Overlay */}
      <AnimatePresence>
        {scanningOrderId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-6"
          >
            <div className="w-full max-w-sm flex flex-col items-center">
              <button 
                onClick={() => setScanningOrderId(null)}
                className="absolute top-8 right-8 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="mb-8 text-center">
                <h3 className="text-3xl font-black text-white mb-2">Scan QR</h3>
                <p className="text-white/60 font-medium">Position the customer's QR code within the frame</p>
              </div>

              <div className="relative w-full aspect-square rounded-[32px] overflow-hidden bg-black border-2 border-brand-primary/50 shadow-[0_0_50px_rgba(33,149,111,0.3)]">
                {/* Mock Camera View */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-luminosity"></div>
                
                {/* Scanning Animation */}
                <motion.div 
                  className="absolute left-0 right-0 h-1 bg-brand-primary shadow-[0_0_20px_#21956f]"
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Viewfinder Corners */}
                <div className="absolute top-8 left-8 w-12 h-12 border-t-4 border-l-4 border-brand-primary rounded-tl-[16px]"></div>
                <div className="absolute top-8 right-8 w-12 h-12 border-t-4 border-r-4 border-brand-primary rounded-tr-[16px]"></div>
                <div className="absolute bottom-8 left-8 w-12 h-12 border-b-4 border-l-4 border-brand-primary rounded-bl-[16px]"></div>
                <div className="absolute bottom-8 right-8 w-12 h-12 border-b-4 border-r-4 border-brand-primary rounded-br-[16px]"></div>
              </div>

              <div className="mt-10 flex gap-4 w-full">
                <button 
                  onClick={() => setScanningOrderId(null)}
                  className="flex-1 py-4 bg-white/10 hover:bg-white/20 text-white rounded-[20px] font-bold transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    updateOrderStatus(scanningOrderId, "COMPLETED");
                    setScanningOrderId(null);
                  }}
                  className="flex-1 py-4 bg-brand-primary hover:bg-[#1a7f5a] text-white rounded-[20px] font-bold transition-all shadow-[0_8px_20px_rgba(33,149,111,0.3)]"
                >
                  Simulate QR Match
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 px-5 lg:px-12 py-2 space-y-4 lg:space-y-0 lg:gap-8 lg:grid lg:grid-cols-2 xl:grid-cols-3 pb-32 relative z-10 w-full max-w-7xl mx-auto">
        <AnimatePresence mode="popLayout">
          {displayOrders.length === 0 ? (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="col-span-full flex flex-col items-center justify-center py-20 lg:py-32 text-center bg-white rounded-[32px] border border-dashed border-brand-beige"
            >
              <div className="w-20 h-20 lg:w-24 lg:h-24 bg-[#F7F9F8] rounded-[24px] flex items-center justify-center mb-6 shadow-inner border border-brand-beige/50">
                <Package2 size={40} className="text-brand-olive/60" strokeWidth={1.5} />
              </div>
              <p className="text-xl lg:text-2xl font-black text-brand-charcoal mb-2">
                Tidak ada pesanan {activeTab.toLowerCase()}
              </p>
              <p className="text-[14px] lg:text-base font-medium text-brand-olive max-w-xs lg:max-w-sm px-4">
                Pesanan dari pelanggan yang {activeTab.toLowerCase()} akan muncul di sini.
              </p>
            </motion.div>
          ) : (
            displayOrders.map((order) => {
              const food = foods.find((f) => f.id === order.foodId);
              if (!food) return null;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  key={order.id}
                  className="bg-white rounded-[24px] lg:rounded-[32px] border border-brand-beige/80 shadow-[0_8px_24px_rgba(44,48,46,0.03)] overflow-hidden transition-all group flex flex-col"
                >
                  {/* Order Header */}
                  <div className="px-5 py-4 lg:p-6 border-b border-brand-beige/50 flex justify-between items-center bg-slate-50/30">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-[14px] overflow-hidden border border-brand-beige shadow-sm">
                        <img
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${order.buyerId}`}
                          alt="buyer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-[14px] lg:text-base font-black text-brand-charcoal leading-none mb-1">
                          Pelanggan
                        </p>
                        <p className="text-[10px] lg:text-[11px] text-brand-olive font-bold uppercase tracking-widest flex items-center gap-1.5">
                          #{order.id.slice(0, 6)} <span className="w-1 h-1 bg-brand-olive/50 rounded-full" /> {new Date(order.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </p>
                      </div>
                    </div>
                    
                    <span
                      className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm border ${
                        order.status === "RESERVED" || order.status === "PREPARING"
                          ? "bg-accent-orange/10 text-accent-orange border-accent-orange/20"
                          : order.status === "READY"
                            ? "bg-brand-primary/10 text-brand-primary border-brand-primary/20"
                            : order.status === "COMPLETED"
                               ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                               : "bg-red-500/10 text-red-500 border-red-500/20"
                      }`}
                    >
                      {order.status === "RESERVED" || order.status === "PREPARING" ? "Siapkan" : 
                       order.status === "READY" ? "Siap Ambil" : 
                       order.status === "COMPLETED" ? "Selesai" : "Batal"}
                    </span>
                  </div>

                  {/* Order Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex gap-4">
                        <div className="w-[70px] h-[70px] rounded-[16px] bg-slate-100 overflow-hidden relative border border-brand-beige/50 shrink-0">
                          <img src={food.image} alt={food.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="flex-1 py-0.5">
                          <h4 className="font-black text-brand-charcoal text-[15px] mb-1.5 leading-snug line-clamp-2">
                            {order.quantity}x {food.name}
                          </h4>
                          <p className="text-brand-olive text-[12px] font-medium leading-snug line-clamp-1">{food.category}</p>
                        </div>
                      </div>

                      <div className="mt-5 flex justify-between items-center p-3 bg-brand-cream/40 rounded-[16px] border border-brand-beige/50">
                        <span className="text-[11px] font-bold text-brand-olive uppercase tracking-widest flex items-center gap-1.5">
                          <CheckCircle2 size={14} className="text-brand-primary"/> Total Pendapatan
                        </span>
                        <span className="text-[16px] font-black text-brand-charcoal">
                          {formatCurrency(order.totalPrice)}
                        </span>
                      </div>
                    </div>

                    {/* Actions based on tab */}
                    <div className="mt-5">
                      {activeTab === "Perlu Disiapkan" && (
                        <div className="flex gap-3">
                          <button className="w-12 h-12 lg:w-14 lg:h-14 rounded-[16px] bg-white border border-brand-beige flex items-center justify-center text-brand-olive hover:text-brand-primary hover:border-brand-primary/30 shadow-sm transition-all active:scale-95">
                            <MessageCircle size={20} strokeWidth={2.5} />
                          </button>
                          <button
                            onClick={() => updateOrderStatus(order.id, "READY")}
                            className="flex-1 bg-brand-primary hover:bg-[#1a7f5a] text-white rounded-[16px] text-[14px] font-bold transition-all shadow-[0_4px_15px_rgba(33,149,111,0.25)] active:scale-95 flex items-center justify-center gap-2"
                          >
                            Siap Diambil <ChevronRight size={16} strokeWidth={3} />
                          </button>
                        </div>
                      )}

                      {activeTab === "Siap Diambil" && (
                        <div className="bg-brand-charcoal rounded-[20px] overflow-hidden shadow-md border border-white/10">
                          <div className="p-4 flex justify-between items-center border-b border-white/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-primary/20 blur-[20px] rounded-full pointer-events-none"></div>
                            <div className="relative z-10">
                              <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1">
                                KODE VERIFIKASI
                              </p>
                              <p className="text-[24px] leading-none font-black tracking-[0.2em] text-white">
                                {order.pickupCode}
                              </p>
                            </div>
                            <button
                              onClick={() => setScanningOrderId(order.id)}
                              className="w-11 h-11 bg-white/10 hover:bg-white/20 rounded-[14px] backdrop-blur-md text-emerald-400 flex justify-center items-center relative z-10 transition-all active:scale-95 shadow-inner border border-white/10"
                            >
                              <Camera size={20} strokeWidth={2.5} />
                            </button>
                          </div>
                          <div className="flex items-center gap-2 p-2 relative z-10 bg-black/20">
                            <button className="w-12 h-11 rounded-[14px] bg-white/5 border border-white/5 flex items-center justify-center text-white/60 hover:text-accent-orange hover:border-accent-orange/30 transition-colors">
                              <AlertTriangle size={16} />
                            </button>
                            <button
                              onClick={() => updateOrderStatus(order.id, "COMPLETED")}
                              className="flex-1 bg-brand-primary/20 hover:bg-brand-primary/30 text-emerald-400 border border-brand-primary/30 rounded-[14px] h-11 text-[13px] font-bold transition-all flex items-center justify-center gap-1.5"
                            >
                              <Check size={16} strokeWidth={3} />
                              Konfirmasi
                            </button>
                          </div>
                        </div>
                      )}

                      {activeTab === "Selesai" && (
                        <div className="bg-emerald-50 rounded-[16px] border border-emerald-100 p-3.5 flex items-center justify-center gap-2 text-emerald-700">
                          <CheckCircle2 size={16} strokeWidth={2.5} />
                          <span className="text-[13px] font-bold">Pesanan berhasil diselesaikan</span>
                        </div>
                      )}

                      {activeTab === "Dibatalkan" && (
                        <div className="bg-red-50 rounded-[16px] border border-red-100 p-3.5 flex items-center justify-center gap-2 text-red-600">
                          <XCircle size={16} strokeWidth={2.5} />
                          <span className="text-[13px] font-bold">Pesanan ini dibatalkan</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      <SellerBottomNav />
    </div>
  );
};

