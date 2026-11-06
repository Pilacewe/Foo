import React, { useState } from "react";
import { useAppStore } from "../../store/AppContext";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ShieldCheck,
  MapPin,
  Clock,
  Wallet,
  Check,
  Flame,
  Leaf,
  ArrowRight,
} from "lucide-react";
import { formatCurrency } from "../../utils/format";

export const FoodDetailView = ({
  foodId,
  onBack,
}: {
  foodId: string;
  onBack: () => void;
}) => {
  const { foods, stores, placeOrder } = useAppStore();
  const [quantity, setQuantity] = useState(1);
  const [showPayment, setShowPayment] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const food = foods.find((f) => f.id === foodId);
  if (!food) return <div>Food not found</div>;

  const store = stores.find((s) => s.id === food.storeId);

  const total = food.rescuePrice * quantity;
  const savings = (food.originalPrice - food.rescuePrice) * quantity;
  const discountPercent = Math.round(
    (1 - food.rescuePrice / food.originalPrice) * 100,
  );

  const handleCheckout = () => {
    setShowPayment(true);
  };

  const confirmPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      placeOrder(food.id, quantity, "QRIS");
      setIsProcessing(false);
      setPaymentSuccess(true);
    }, 2000);
  };

  if (paymentSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-[#0E1513] flex flex-col items-center justify-center p-6 text-white z-50 overflow-hidden font-sans"
      >
        <div className="absolute inset-0 bg-brand-primary/10 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/20 rounded-full blur-[100px] transform translate-x-1/3 -translate-y-1/3" />

        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="w-32 h-32 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-brand-primary shadow-[0_20px_50px_rgba(33,149,111,0.2)] mb-8 relative z-10 border border-brand-primary/20"
        >
          <Check size={64} strokeWidth={2.5} className="text-white" />
        </motion.div>

        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-black mb-2 relative z-10 text-center tracking-tight"
        >
          Order Confirmed
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-white/70 font-medium mb-12 text-center text-[15px] max-w-[280px] relative z-10"
        >
          Show your QR code or order details to the restaurant staff during
          pickup time.
        </motion.p>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full max-w-sm bg-white rounded-[32px] p-8 text-brand-charcoal shadow-2xl relative z-10"
        >
          <p className="text-[11px] text-brand-olive font-bold uppercase tracking-widest mb-2 text-center">
            Pickup Code
          </p>
          <p className="text-5xl font-mono font-black tracking-widest text-center mb-6 text-brand-primary">
            {Math.floor(1000 + Math.random() * 9000).toString()}
          </p>

          <div className="bg-[#FCFDF9] rounded-2xl p-5 border border-brand-beige mb-8 shadow-inner">
            <p className="text-[15px] font-bold mb-1 text-brand-charcoal">
              {food.name}
            </p>
            <p className="text-sm text-brand-olive flex justify-between items-center mt-2">
              <span className="font-medium">
                {quantity}x {formatCurrency(food.rescuePrice)}
              </span>
              <span className="font-black text-brand-charcoal text-lg">
                {formatCurrency(total)}
              </span>
            </p>
          </div>

          <button
            onClick={onBack}
            className="w-full bg-brand-charcoal hover:bg-black text-white font-bold py-4 rounded-[18px] transition-all shadow-lg text-[15px]"
          >
            Return to Home
          </button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-[#FCFDF9] z-40 flex flex-col font-sans relative pt-0 lg:pt-[120px] pb-0 lg:pb-32"
    >
      <div className="flex-1 w-full max-w-5xl mx-auto px-0 lg:px-8 flex flex-col">
        {/* Back Button (Desktop) */}
        <div className="hidden lg:block px-4 lg:px-0">
          <button
            onClick={onBack}
            className="mb-4 lg:mb-8 flex items-center gap-2 text-brand-olive hover:text-brand-charcoal transition-colors font-bold text-sm bg-white border border-brand-beige/80 px-4 py-2 rounded-full w-max shadow-sm hover:shadow-md"
          >
            <ChevronLeft size={18} strokeWidth={2.5} /> Back to explore
          </button>
        </div>

        {/* Premium Card Layout */}
        <div className="bg-white lg:rounded-[40px] overflow-hidden lg:shadow-[0_8px_40px_rgba(44,48,46,0.06)] lg:border border-brand-beige lg:grid lg:grid-cols-2 flex flex-col relative w-full flex-1">
          {/* Back Button (Mobile Floating) */}
          <button
            onClick={onBack}
            className="lg:hidden absolute top-8 left-4 z-50 w-11 h-11 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-brand-charcoal shadow-md border border-black/5 active:scale-95 transition-transform"
          >
            <ChevronLeft size={24} strokeWidth={2.5} className="-ml-0.5" />
          </button>

          {/* Left: Image & Visual Info */}
          <div className="relative h-[320px] sm:h-[400px] lg:h-auto lg:min-h-[600px] w-full bg-slate-100 shrink-0">
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-full object-cover"
            />

            {/* Mobile Gradient (Fades to white for seamless sheet effect) */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/40 to-transparent lg:hidden pointer-events-none" />

            {/* Desktop Gradient */}
            <div className="hidden lg:block absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-brand-charcoal/90 via-brand-charcoal/40 to-transparent pointer-events-none" />

            {/* Image Overlay Info */}
            <div className="absolute bottom-6 left-5 right-5 lg:bottom-10 lg:left-10 lg:right-10 z-10 lg:text-white">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 lg:gap-3 mb-3 lg:mb-4">
                <span className="bg-[#FFECE5] lg:bg-brand-primary text-[#E07941] lg:text-white text-[11px] lg:text-[12px] font-black tracking-wide px-2.5 py-1.5 lg:px-4 lg:py-2 rounded-[8px] lg:rounded-xl flex items-center gap-1.5 lg:gap-2 shadow-sm lg:shadow-lg">
                  <Flame
                    size={12}
                    className="lg:w-3.5 lg:h-3.5"
                    strokeWidth={2.5}
                  />{" "}
                  Sisa {food.quantityLeft}
                </span>
                <span className="bg-white/80 lg:bg-white/20 backdrop-blur-md text-brand-charcoal lg:text-white text-[11px] lg:text-[12px] font-bold px-2.5 py-1.5 lg:px-4 lg:py-2 rounded-[8px] lg:rounded-xl flex items-center gap-1.5 lg:gap-2 border border-black/5 lg:border-white/20 shadow-sm lg:shadow-none">
                  <Clock size={12} className="lg:w-3.5 lg:h-3.5" />{" "}
                  {food.pickupTimeStart} - {food.pickupTimeEnd}
                </span>
                {food.isHalal && (
                  <span className="bg-[#E8F5E9] lg:bg-emerald-500/20 backdrop-blur-md text-[#2E7D32] lg:text-emerald-300 text-[11px] lg:text-[12px] border border-[#2E7D32]/20 lg:border-emerald-500/30 font-bold px-2.5 py-1.5 lg:px-4 lg:py-2 rounded-[8px] lg:rounded-xl flex items-center gap-1.5 lg:gap-2 shadow-sm lg:shadow-none">
                    <ShieldCheck size={12} className="lg:w-3.5 lg:h-3.5" />{" "}
                    Halal
                  </span>
                )}
              </div>
              {/* Desktop Title & Location (Hidden on mobile) */}
              <div className="hidden lg:block">
                <h1 className="text-4xl xl:text-5xl font-black text-white leading-tight mb-4 tracking-tight drop-shadow-lg">
                  {food.name}
                </h1>
                <p className="text-white/90 text-[15px] font-medium flex items-center gap-2 drop-shadow-md">
                  <MapPin size={18} className="text-brand-primary" />{" "}
                  {store?.name} • {store?.distance} Away
                </p>
              </div>
            </div>
          </div>

          {/* Right/Bottom: Content & Checkout */}
          <div className="px-5 pb-6 pt-0 lg:p-10 flex flex-col flex-1 bg-white relative lg:static -mt-4 lg:mt-0 rounded-t-[24px] lg:rounded-none z-20">
            <div className="space-y-6 lg:space-y-8 flex-1">
              {/* Mobile Title & Location (Hidden on desktop) */}
              <div className="lg:hidden pt-2">
                <h1 className="text-[24px] font-black text-brand-charcoal leading-tight mb-1.5 tracking-tight">
                  {food.name}
                </h1>
                <p className="text-[#6B7280] text-[13px] font-medium flex items-center gap-1.5">
                  <MapPin size={14} className="text-[#6B7280]" /> {store?.name}{" "}
                  • {store?.distance} Away
                </p>
              </div>

              {/* Pricing Section */}
              <div className="flex items-center justify-between p-4 lg:p-5 bg-white lg:bg-[#FCFDF9] border border-brand-beige/80 lg:border-brand-beige/80 rounded-[16px] xl:rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] lg:shadow-sm">
                <div>
                  <p className="text-[11px] lg:text-[13px] font-bold text-brand-olive/80 lg:text-brand-olive uppercase tracking-widest mb-0.5 lg:mb-2">
                    Harga Rescue
                  </p>
                  <div className="flex items-end gap-2.5 lg:gap-3">
                    <span className="text-[26px] lg:text-4xl font-black text-[#4CAF50] lg:text-accent-orange leading-none">
                      {formatCurrency(food.rescuePrice)}
                    </span>
                    <span className="text-[12px] lg:text-base font-semibold text-[#9CA3AF] lg:text-brand-olive line-through decoration-2 decoration-[#9CA3AF]/40 lg:decoration-brand-olive/30 pb-[3px] lg:pb-0.5">
                      {formatCurrency(food.originalPrice)}
                    </span>
                  </div>
                </div>
                <div className="bg-[#E8F5E9] lg:bg-brand-primary/10 border lg:border border-[#4CAF50]/20 lg:border-brand-primary/20 text-[#2E7D32] lg:text-brand-primary font-black px-3 py-1.5 lg:px-4 lg:py-3 rounded-[10px] lg:rounded-[14px] flex flex-col items-center justify-center">
                  <span className="text-[10px] lg:text-sm leading-tight">
                    Hemat
                  </span>
                  <span className="text-[16px] lg:text-xl leading-tight">
                    {discountPercent}%
                  </span>
                </div>
              </div>

              {/* Mobile Specifik: Contoh isi pesanan */}
              <div className="lg:hidden space-y-3 px-1 pt-2">
                <h3 className="font-bold text-[17px] text-brand-charcoal tracking-tight">Contoh Menu</h3>
                <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-6 scrollbar-hide snap-x">
                  {[
                    "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&q=80",
                    "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80",
                    "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=400&q=80",
                    "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?w=400&q=80",
                  ].map((img, idx) => (
                    <div key={idx} className="w-[120px] h-[120px] shrink-0 rounded-[16px] overflow-hidden snap-start shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-brand-beige/50">
                      <img src={img} alt={`Contoh ${idx + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              {/* What's in the box? */}
              <div className="space-y-2 lg:space-y-3 px-1 lg:px-2">
                <h3 className="font-bold text-[17px] lg:text-2xl text-brand-charcoal tracking-tight">
                  Apa isinya?
                </h3>
                <p className="text-[14px] lg:text-[15px] leading-relaxed text-[#4B5563] lg:text-brand-charcoal/80">
                  {food.description}
                </p>
                <div className="flex items-center gap-1.5 text-[13px] font-bold text-brand-primary pt-1 cursor-pointer hover:underline">
                  <Leaf size={14} /> Lihat bahan & alergen
                </div>
              </div>

              <hr className="border-brand-beige/40 lg:border-brand-beige/60 my-5 lg:my-0" />

              {/* Store & Policy Badges */}
              <div className="space-y-3 lg:space-y-4">
                <div className="flex gap-3.5 lg:gap-4 p-3 lg:p-4 rounded-[16px] lg:rounded-[20px] border border-black/5 lg:border-brand-beige/40 bg-[#FAFAFA] lg:bg-slate-50/50 hover:bg-slate-50 transition-colors group cursor-pointer">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-[12px] lg:rounded-[14px] bg-white border border-black/5 lg:border-brand-beige shadow-[0_2px_8px_rgba(0,0,0,0.04)] lg:shadow-sm flex items-center justify-center text-brand-charcoal lg:text-brand-primary shrink-0 group-hover:scale-105 transition-transform">
                    <MapPin
                      size={20}
                      strokeWidth={2}
                      className="lg:w-[22px] lg:h-[22px]"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <p className="font-bold text-brand-charcoal text-[14px] lg:text-[15px] leading-tight mb-0.5 group-hover:text-brand-primary transition-colors truncate">
                      {store?.name}
                    </p>
                    <p className="text-[12px] lg:text-[13px] text-[#6B7280] lg:text-brand-olive leading-snug truncate">
                      {store?.address}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3.5 lg:gap-4 p-3 lg:p-4 rounded-[16px] lg:rounded-[20px] border border-black/5 lg:border-brand-beige/40 bg-[#FAFAFA] lg:bg-slate-50/50">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-[12px] lg:rounded-[14px] bg-[#E8F5E9] lg:bg-accent-sage/10 text-[#2E7D32] lg:text-emerald-600 border border-[#2E7D32]/10 lg:border-emerald-100 flex items-center justify-center shrink-0">
                    <ShieldCheck
                      size={20}
                      strokeWidth={2}
                      className="lg:w-[22px] lg:h-[22px]"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <p className="font-bold text-brand-charcoal text-[14px] lg:text-[15px] leading-tight mb-0.5">
                      Kualitas Terjamin
                    </p>
                    <p className="text-[12px] lg:text-[13px] text-[#6B7280] lg:text-brand-olive leading-snug">
                      Makanan berlebih yang aman dikonsumsi dan berkualitas
                      baik.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bottom Area */}
            <div className="mt-8 lg:mt-8 pt-5 lg:pt-6 border-t border-brand-beige/50 lg:border-brand-beige/60 sticky bottom-0 bg-white pb-6 lg:pb-0 z-30 shadow-[0_-15px_30px_-15px_rgba(0,0,0,0.05)] lg:shadow-none -mx-5 px-5 lg:mx-0 lg:px-0">
              <AnimatePresence mode="wait">
                {!showPayment ? (
                  <motion.div
                    key="reserve"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between px-1 lg:px-2 mb-3 lg:mb-2">
                      <div className="flex items-center">
                        <span className="text-[12px] lg:text-[13px] font-bold text-brand-charcoal uppercase tracking-widest">
                          Kuantitas
                        </span>
                      </div>

                      <div className="flex items-center bg-[#F3F4F6] lg:bg-brand-cream rounded-[12px] lg:rounded-[16px] p-1 border border-black/5 lg:border-brand-beige shadow-inner">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          disabled={quantity <= 1}
                          className="w-8 h-8 lg:w-10 lg:h-10 rounded-[10px] lg:rounded-[12px] bg-white flex items-center justify-center disabled:opacity-50 text-brand-charcoal shadow-[0_2px_4px_rgba(0,0,0,0.05)] lg:shadow-sm transition-all hover:bg-slate-50 active:scale-95"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lg:w-4 lg:h-4"
                          >
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                        </button>
                        <span className="font-bold text-[15px] lg:text-lg min-w-[36px] lg:min-w-[40px] text-center text-brand-charcoal">
                          {quantity}
                        </span>
                        <button
                          onClick={() =>
                            setQuantity(
                              Math.min(food.quantityLeft, quantity + 1),
                            )
                          }
                          disabled={quantity >= food.quantityLeft}
                          className="w-8 h-8 lg:w-10 lg:h-10 rounded-[10px] lg:rounded-[12px] bg-brand-charcoal text-white flex items-center justify-center disabled:opacity-50 shadow-md transition-all hover:bg-black active:scale-95"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lg:w-4 lg:h-4"
                          >
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={handleCheckout}
                      className="w-full bg-brand-primary hover:bg-[#218A66] text-white font-bold py-3.5 lg:py-5 rounded-[16px] lg:rounded-[20px] text-[15px] lg:text-[16px] shadow-[0_8px_20px_rgba(33,149,111,0.25)] hover:shadow-[0_12px_25px_rgba(33,149,111,0.3)] hover:-translate-y-0.5 flex items-center justify-between px-5 lg:px-8 transition-all group"
                    >
                      <span>Pesan Sekarang</span>
                      <div className="flex items-center gap-3 lg:gap-4">
                        <span>{formatCurrency(total)}</span>
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors hidden lg:flex">
                          <ArrowRight
                            strokeWidth={3}
                            size={14}
                            className="group-hover:translate-x-0.5 transition-transform"
                          />
                        </div>
                      </div>
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-brand-charcoal text-[16px] lg:text-lg">
                        Detail Checkout
                      </h3>
                      <span className="text-[18px] lg:text-xl font-black text-brand-charcoal">
                        {formatCurrency(total)}
                      </span>
                    </div>

                    <label className="flex items-center justify-between p-3.5 lg:p-4 border-2 border-brand-primary rounded-[16px] lg:rounded-[20px] bg-[#F2F9F6] lg:bg-brand-primary/5 cursor-pointer shadow-[0_2px_8px_rgba(33,149,111,0.1)] lg:shadow-sm">
                      <div className="flex items-center gap-3 lg:gap-4">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-[12px] lg:rounded-[14px] bg-white shadow-[0_2px_4px_rgba(0,0,0,0.05)] lg:shadow-sm flex items-center justify-center border border-brand-beige">
                          <Wallet
                            size={18}
                            className="text-brand-primary lg:w-5 lg:h-5"
                            strokeWidth={2}
                          />
                        </div>
                        <span className="font-bold text-[14px] lg:text-[15px] text-brand-charcoal">
                          E-Wallet / QRIS
                        </span>
                      </div>
                      <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full border-[5px] lg:border-[6px] border-brand-primary bg-white shadow-sm"></div>
                    </label>

                    <div className="flex gap-2.5 lg:gap-3 mt-4">
                      <button
                        onClick={() => setShowPayment(false)}
                        className="px-5 py-3.5 lg:px-6 lg:py-4 rounded-[14px] lg:rounded-[20px] bg-[#F3F4F6] lg:bg-brand-cream border border-black/5 lg:border-brand-beige text-brand-charcoal font-bold text-[14px] lg:text-[15px] hover:bg-slate-100 transition-colors"
                      >
                        Batal
                      </button>
                      <button
                        onClick={confirmPayment}
                        disabled={isProcessing}
                        className="flex-1 bg-brand-charcoal hover:bg-black disabled:bg-slate-400 text-white font-bold py-3.5 lg:py-4 rounded-[14px] lg:rounded-[20px] transition-all shadow-[0_8px_20px_rgba(0,0,0,0.15)] text-[15px] lg:text-[16px] active:scale-[0.98] flex items-center justify-center gap-2 lg:gap-3"
                      >
                        {isProcessing ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{
                                repeat: Infinity,
                                duration: 1,
                                ease: "linear",
                              }}
                              className="w-4 h-4 lg:w-5 lg:h-5 border-2 border-white/30 border-t-white rounded-full"
                            />
                            Memproses...
                          </>
                        ) : (
                          `Bayar Sekarang`
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
