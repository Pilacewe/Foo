import React, { useState } from "react";
import { useAppStore } from "../../store/AppContext";
import {
  ChevronLeft,
  CheckCircle,
  Upload,
  Tag,
  Clock,
  Package,
  Flame,
} from "lucide-react";
import { formatCurrency } from "../../utils/format";
import { motion, AnimatePresence } from "motion/react";
import { SellerBottomNav } from "../../components/SellerBottomNav";

export const SellerAdd = () => {
  const { navigate, addFoodListing } = useAppStore();
  const [nama, setNama] = useState("");
  const [kategori, setKategori] = useState("Roti & Kue");
  const [hargaAsli, setHargaAsli] = useState("");
  const [hargaRescue, setHargaRescue] = useState("");
  const [batasWaktu, setBatasWaktu] = useState("21:00");
  const [stok, setStok] = useState("1");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Auto suggest price when hargaAsli changes and hargaRescue is empty or was auto-suggested
  const handleHargaAsliChange = (val: string) => {
    setHargaAsli(val);
    const parsed = parseInt(val);
    if (!isNaN(parsed) && parsed > 0) {
       // suggest 50% off
       setHargaRescue(Math.floor(parsed * 0.5).toString());
    } else {
       setHargaRescue("");
    }
  };

  const discount =
    hargaAsli && hargaRescue
      ? Math.round((1 - parseInt(hargaRescue) / parseInt(hargaAsli)) * 100)
      : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // add food listing
    addFoodListing({
      name: nama || "New Surplus Menu",
      description: "Delicious meal helping save the planet.",
      originalPrice: parseInt(hargaAsli) || 0,
      rescuePrice: parseInt(hargaRescue) || 0,
      quantityLeft: parseInt(stok) || 1,
      pickupTimeStart: "10:00",
      pickupTimeEnd: batasWaktu,
      image: imagePreview || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1000",
      isHalal: true,
      category: kategori,
      isActive: true,
    });
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => navigate("SELLER_MENU"), 1500);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col h-[100dvh] bg-brand-primary w-full fixed inset-0 items-center justify-center text-brand-cream font-sans z-50">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring" }}
          className="w-24 h-24 bg-brand-cream rounded-full flex items-center justify-center text-brand-primary mb-6 shadow-[0_20px_50px_rgba(44,48,46,0.2)]"
        >
          <CheckCircle size={48} />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold mb-2 tracking-tight"
        >
          Successfully Published!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-brand-cream/80"
        >
          Your menu is now live for buyers.
        </motion.p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F7F8] w-full font-sans pb-10">

      {/* --- MOBILE HEADER --- */}
      <div className="lg:hidden bg-brand-primary px-5 pt-12 pb-6 rounded-b-[32px] shadow-[0_8px_20px_rgba(33,149,111,0.15)] relative overflow-hidden shrink-0 z-20">
         <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
         <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-brand-charcoal/10 rounded-full blur-xl pointer-events-none" />
         
         <div className="flex items-center gap-3 relative z-10">
           <button
             onClick={() => navigate("SELLER_MENU")}
             className="w-11 h-11 flex items-center justify-center text-white bg-white/10 backdrop-blur-md rounded-[16px] shadow-sm border border-white/20 active:scale-95 transition-transform"
           >
             <ChevronLeft size={22} strokeWidth={2.5} />
           </button>
           <div className="flex flex-col">
             <h1 className="text-2xl font-black text-white leading-tight mb-1">Tambah Menu</h1>
             <p className="text-[11px] font-bold text-white/80 tracking-widest uppercase">Menu Inventaris Baru</p>
           </div>
         </div>
      </div>

      {/* --- DESKTOP HEADER --- */}
      <div className="hidden lg:flex pt-32 px-8 pb-4 shrink-0 items-center justify-between relative z-10 w-full lg:w-[calc(100%-2rem)] max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("SELLER_MENU")}
            className="w-11 h-11 flex items-center justify-center text-brand-charcoal bg-white shadow-sm border border-brand-beige rounded-full hover:bg-brand-beige/50 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
             <h1 className="text-3xl font-black text-brand-charcoal tracking-tight">Add New Menu</h1>
             <p className="text-sm font-semibold text-brand-olive mt-1">Publish exciting new listings for the marketplace.</p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-5 lg:px-8 pb-10 relative z-10 w-full lg:w-[calc(100%-2rem)] max-w-7xl mx-auto mt-6 lg:mt-4">
        <form onSubmit={handleSubmit} className="pt-2 lg:grid lg:grid-cols-12 lg:gap-8 lg:items-start space-y-5 lg:space-y-0">
          
          {/* LEFT COLUMN: Main Form */}
          <div className="lg:col-span-8 space-y-5">
            {/* Basic Info */}
            <div className="bg-white p-5 lg:p-8 rounded-[24px] lg:rounded-[32px] border border-brand-beige/80 shadow-[0_4px_20px_rgba(44,48,46,0.02)] space-y-6">
               <h2 className="text-lg font-black text-brand-charcoal mb-4 flex items-center gap-2 tracking-tight"><Tag size={20} className="text-brand-primary" /> Informasi Utama</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                 <div className="relative">
                   <label className="text-[11px] font-bold text-brand-olive uppercase tracking-widest mb-2 block">
                     Nama Makanan
                   </label>
                   <input
                     type="text"
                     value={nama}
                     onChange={e => setNama(e.target.value)}
                     placeholder="Cth: Assorted Pastries (3pcs)"
                     required
                     className="w-full bg-[#f8faf9] border border-brand-beige/50 rounded-2xl px-4 py-3.5 text-[14px] font-bold text-brand-charcoal focus:bg-white focus:border-brand-primary/40 focus:ring-4 focus:ring-brand-primary/5 focus:outline-none transition-all placeholder:text-brand-olive/40"
                   />
                 </div>
                 <div className="relative">
                   <label className="text-[11px] font-bold text-brand-olive uppercase tracking-widest mb-2 block">
                     Kategori Menu
                   </label>
                   <div className="relative">
                     <select 
                       value={kategori}
                       onChange={e => setKategori(e.target.value)}
                       className="w-full bg-[#f8faf9] border border-brand-beige/50 rounded-2xl px-4 py-3.5 text-[14px] font-bold text-brand-charcoal focus:bg-white focus:border-brand-primary/40 focus:ring-4 focus:ring-brand-primary/5 focus:outline-none transition-all appearance-none cursor-pointer">
                       <option>Bakery & Pastries</option>
                       <option>Rice & Meals</option>
                       <option>Beverages</option>
                       <option>Vegetables & Fruits</option>
                       <option>Others</option>
                     </select>
                     <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-brand-olive/80">
                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                     </div>
                   </div>
                 </div>
               </div>
            </div>

            {/* Pricing Tracker */}
            <div className="space-y-5 bg-white p-5 lg:p-8 rounded-[24px] lg:rounded-[32px] border border-brand-beige/80 shadow-[0_4px_20px_rgba(44,48,46,0.02)] relative overflow-hidden">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-accent-orange/10 rounded-[14px] text-accent-orange border border-accent-orange/20">
                  <Tag size={18} strokeWidth={2.5} />
                </div>
                <div>
                   <h3 className="font-bold text-brand-charcoal text-lg tracking-tight mb-1">
                     Harga & Diskon
                   </h3>
                   <p className="text-[11px] font-bold text-brand-olive uppercase tracking-widest">Pricing Strategy</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                <div>
                  <label className="text-[11px] font-bold text-brand-olive tracking-widest uppercase block mb-2">
                    Harga Asli
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[14px] font-bold text-brand-olive/60">
                      Rp
                    </span>
                    <input
                      type="number"
                      required
                      value={hargaAsli}
                      onChange={(e) => handleHargaAsliChange(e.target.value)}
                      className="w-full bg-[#f8faf9] border border-brand-beige/50 rounded-2xl pl-10 pr-4 py-3.5 text-[15px] font-bold text-brand-charcoal focus:bg-white focus:border-brand-primary/40 focus:outline-none transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-accent-orange tracking-widest uppercase block mb-2">
                    Harga Rescue
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[14px] font-bold text-accent-orange/80">
                      Rp
                    </span>
                    <input
                      type="number"
                      required
                      value={hargaRescue}
                      onChange={(e) => setHargaRescue(e.target.value)}
                      className="w-full bg-accent-orange/5 border border-accent-orange/20 rounded-2xl pl-10 pr-4 py-3.5 text-[16px] font-black text-accent-orange focus:bg-white focus:border-accent-orange/50 focus:outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {discount > 0 && (
                  <motion.div
                    key="discount-alert"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-5 bg-brand-charcoal text-white p-4 rounded-[16px] shadow-[0_4px_12px_rgba(29,35,32,0.1)] flex items-center justify-between font-bold overflow-hidden relative border border-white/10"
                  >
                    <div className="flex items-center gap-3 relative z-10">
                      <Flame size={18} className="text-accent-orange animate-pulse" />
                       <span className="text-[14px]">Diskon <span className="text-accent-orange font-black text-[16px]">{discount}%</span></span>
                    </div>
                    <span className="relative z-10 text-[10px] uppercase tracking-widest text-white/50 border border-white/20 px-2 py-1 rounded-md">Deal Menarik!</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT COLUMN: Sidebar (Image, Details) */}
          <div className="lg:col-span-4 space-y-5 lg:space-y-6">
             {/* Image Upload */}
             <div className="relative bg-white p-5 lg:p-6 rounded-[24px] lg:rounded-[32px] border border-brand-beige/80 shadow-[0_4px_20px_rgba(44,48,46,0.02)]">
               <h3 className="font-bold text-brand-charcoal text-lg mb-4 tracking-tight flex items-center gap-2"><Upload size={18} className="text-brand-primary" /> Foto Produk</h3>
               <div className="relative w-full h-[200px] lg:h-[220px]">
                 <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                 />
                 {imagePreview ? (
                   <div className="w-full h-full rounded-[20px] overflow-hidden relative border border-brand-beige group">
                     <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                     <div className="absolute inset-0 bg-brand-charcoal/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                        <div className="bg-white/20 text-white p-3 rounded-full backdrop-blur-md">
                          <Upload size={20} strokeWidth={2.5} />
                        </div>
                        <p className="text-white font-bold text-[13px]">Ganti Foto</p>
                     </div>
                   </div>
                 ) : (
                   <div className="border-2 border-dashed border-brand-olive/30 rounded-[20px] bg-[#f8faf9] h-full flex flex-col items-center justify-center text-center cursor-pointer hover:border-brand-primary/50 hover:bg-brand-primary/5 transition-all group relative overflow-hidden">
                     <div className="w-14 h-14 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-white transition-all shadow-sm">
                       <Upload size={24} strokeWidth={1.5} />
                     </div>
                     <p className="font-black text-brand-charcoal text-[15px] mb-1 relative z-10">
                       Upload Foto Menu
                     </p>
                     <p className="text-[12px] font-medium text-brand-olive relative z-10">
                       (Tap atau Drag foto ke sini)
                     </p>
                   </div>
                 )}
               </div>
             </div>

             {/* Details: Portion & Time */}
             <div className="bg-white p-5 lg:p-6 rounded-[24px] lg:rounded-[32px] border border-brand-beige/80 shadow-[0_4px_20px_rgba(44,48,46,0.02)] space-y-5">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Clock size={16} strokeWidth={2.5} className="text-secondary-blue" />
                    <h3 className="font-bold text-brand-charcoal text-[13px] leading-tight text-center">
                      Batas Waktu Pick-Up
                    </h3>
                  </div>
                  <input
                    type="time"
                    value={batasWaktu}
                    onChange={e => setBatasWaktu(e.target.value)}
                    className="w-full bg-[#f8faf9] border border-brand-beige/50 rounded-2xl px-4 py-3 text-[14px] font-black text-brand-charcoal text-left flex items-center justify-between focus:bg-white focus:border-brand-primary/40 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Package size={16} strokeWidth={2.5} className="text-brand-primary" />
                    <h3 className="font-bold text-brand-charcoal text-[13px] leading-tight text-center">Jumlah Porsi (Stok)</h3>
                  </div>
                  <input
                    type="number"
                    min="1"
                    value={stok}
                    onChange={e => setStok(e.target.value)}
                    className="w-full bg-[#f8faf9] border border-brand-beige/50 rounded-2xl px-4 py-3 text-[16px] font-black text-brand-charcoal text-left focus:bg-white focus:border-brand-primary/40 focus:outline-none transition-all"
                  />
                </div>
             </div>

             <div className="lg:col-span-2 fixed bottom-0 left-0 right-0 p-5 bg-white/80 backdrop-blur-xl border-t border-brand-beige/50 lg:relative lg:bg-transparent lg:border-none lg:p-0 z-50 mt-4">
               <button
                 disabled={isSubmitting}
                 type="submit"
                 className="w-full bg-brand-primary hover:bg-[#1a7f5a] disabled:bg-brand-olive/40 text-white font-bold py-4 rounded-[20px] lg:rounded-[24px] transition-all shadow-[0_8px_20px_rgba(33,149,111,0.25)] hover:shadow-[0_12px_25px_rgba(33,149,111,0.3)] text-base flex justify-center items-center gap-2 mb-4 active:scale-[0.98]"
               >
                 {isSubmitting ? (
                   <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                 ) : (
                   "Publish Menu Sekarang"
                 )}
               </button>
             </div>
          </div>
        </form>
      </div>

    </div>
  );
};
