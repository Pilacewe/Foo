import React, { useState } from "react";
import { useAppStore } from "../../store/AppContext";
import { BuyerBottomNav } from "../../components/BuyerBottomNav";
import { motion, AnimatePresence } from "motion/react";
import {
  QrCode,
  Navigation,
  MapPin,
  X,
  CheckCircle2,
  Clock,
  Leaf,
} from "lucide-react";
import { formatCurrency } from "../../utils/format";

export const BuyerOrders = () => {
  const { orders, foods, stores, currentUser, updateOrderStatus, navigate } =
    useAppStore();
  const [activeTab, setActiveTab] = useState<"ACTIVE" | "HISTORY">("ACTIVE");
  const [selectedQrOrder, setSelectedQrOrder] = useState<string | null>(null);

  const myOrders = orders.filter((o) => o.buyerId === currentUser?.id);
  const activeOrders = myOrders.filter((o) =>
    ["RESERVED", "PREPARING", "READY"].includes(o.status),
  );
  const historyOrders = myOrders.filter((o) =>
    ["COMPLETED", "CANCELLED", "EXPIRED"].includes(o.status),
  );

  const displayOrders = activeTab === "ACTIVE" ? activeOrders : historyOrders;

  const handleSimulatePickup = (orderId: string) => {
    updateOrderStatus(orderId, "COMPLETED");
    setSelectedQrOrder(null);
  };

  const qrOrder = myOrders.find((o) => o.id === selectedQrOrder);

  return (
    <div className="flex flex-col min-h-screen bg-[#FCFDF9] w-full font-sans">
      {/* Page Header */}
      <div className="pt-10 px-6 lg:pt-32 lg:px-10 shrink-0 z-20 w-full max-w-5xl mx-auto mb-2">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between w-full">
          <div className="mb-6 lg:mb-0">
            <h1 className="text-3xl lg:text-4xl font-black font-sans text-brand-charcoal tracking-tight mb-2">
              My Orders
            </h1>
            <p className="text-sm font-medium text-brand-olive">
              Track your food rescues and history
            </p>
          </div>

          <div className="flex bg-brand-cream/50 lg:bg-brand-cream/50 p-1.5 rounded-2xl border border-brand-beige/80 lg:w-[400px] shadow-inner">
            <button
              onClick={() => setActiveTab("ACTIVE")}
              className={`flex-1 py-2.5 text-[14px] font-bold rounded-[14px] transition-all relative ${activeTab === "ACTIVE" ? "bg-brand-primary text-white shadow-md shadow-brand-primary/20 border border-brand-primary/10 lg:bg-white lg:text-brand-charcoal lg:shadow-sm lg:border-white" : "text-brand-olive hover:text-brand-charcoal hover:bg-brand-cream/50 lg:text-brand-olive"}`}
            >
              Active
              {activeOrders.length > 0 && (
                <span
                  className={`ml-2 px-2 py-0.5 rounded-[8px] text-[10px] ${activeTab === "ACTIVE" ? "bg-white text-brand-primary lg:bg-brand-primary lg:text-white shadow-sm" : "bg-brand-beige text-brand-olive"}`}
                >
                  {activeOrders.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("HISTORY")}
              className={`flex-1 py-2.5 text-[14px] font-bold rounded-[14px] transition-all border border-transparent ${activeTab === "HISTORY" ? "bg-brand-primary text-white shadow-md shadow-brand-primary/20 border border-brand-primary/10 lg:bg-white lg:text-brand-charcoal lg:shadow-sm lg:border-white" : "text-brand-olive hover:text-brand-charcoal hover:bg-brand-cream/50 lg:text-brand-olive"}`}
            >
              History
            </button>
          </div>
        </div>
      </div>

      {/* Modern Order Timeline List */}
      <div className="flex-1 px-6 py-4 pb-32 lg:py-8 lg:pb-32 space-y-6 lg:space-y-6 flex flex-col lg:items-center w-full max-w-[1200px] mx-auto lg:px-8">
        <AnimatePresence mode="popLayout">
          {displayOrders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center pt-20 lg:pt-32 w-full"
            >
              <div className="w-24 h-24 mb-6 relative">
                <div className="absolute inset-0 bg-brand-beige rounded-full blur-xl opacity-50"></div>
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center border border-brand-beige shadow-sm relative z-10">
                  <Clock size={32} className="text-brand-olive/40" />
                </div>
              </div>
              <h3 className="font-bold text-brand-charcoal text-xl mb-2 tracking-tight">
                No {activeTab.toLowerCase()} orders
              </h3>
              <p className="text-sm font-medium text-brand-olive mb-8 text-center max-w-[240px] leading-relaxed">
                {activeTab === "ACTIVE"
                  ? "You don't have any active food rescues right now."
                  : "Your past rescued meals will appear here."}
              </p>
              {activeTab === "HISTORY" && (
                <button
                  onClick={() => navigate("BUYER_HOME")}
                  className="bg-brand-charcoal hover:bg-black text-white px-8 py-3.5 rounded-2xl text-[13px] font-bold transition-transform hover:scale-105 active:scale-95 shadow-[0_8px_20px_rgba(44,48,46,0.15)]"
                >
                  Find Rescues
                </button>
              )}
            </motion.div>
          ) : (
            displayOrders.map((order, idx) => {
              const food = foods.find((f) => f.id === order.foodId);
              const store = stores.find((s) => s.id === order.storeId);
              if (!food || !store) return null;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.05 }}
                  key={order.id}
                  className="relative group w-full lg:max-w-5xl"
                >
                  {/* Timeline Line indicator */}
                  {idx !== displayOrders.length - 1 && (
                    <div className="absolute left-[20px] top-[60px] bottom-[-40px] w-px bg-brand-primary/20 lg:hidden z-0"></div>
                  )}

                  <div className="flex gap-3 lg:gap-0 relative z-10 w-full">
                    {/* Timeline Dot */}
                    <div className="w-10 h-10 lg:hidden rounded-full bg-brand-primary/10 lg:bg-white border-4 border-[#FCFDF9] flex items-center justify-center shadow-sm shrink-0 mt-2">
                      {order.status === "COMPLETED" ? (
                        <CheckCircle2
                          size={16}
                          className="text-brand-primary"
                          strokeWidth={3}
                        />
                      ) : order.status === "RESERVED" ||
                        order.status === "READY" ? (
                        <div className="w-3 h-3 bg-accent-orange rounded-full animate-pulse"></div>
                      ) : (
                        <X size={16} className="text-red-400" strokeWidth={3} />
                      )}
                    </div>

                    {/* MOBILE Order Card */}
                    <div className="lg:hidden flex-1 bg-white rounded-[24px] shadow-[0_12px_24px_rgba(33,149,111,0.08)] border border-brand-primary/15 overflow-hidden relative w-full">
                      {/* Inner gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white to-brand-primary/5 pointer-events-none" />
                      {order.status === "COMPLETED" && (
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 rounded-full blur-[40px] pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
                      )}
                      <div className="p-4.5 relative z-10">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-[10px] font-bold text-brand-charcoal/60 bg-black/5 px-2.5 py-1 rounded-full uppercase tracking-widest">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                          <span
                            className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${
                              order.status === "COMPLETED"
                                ? "text-white bg-brand-primary shadow-sm"
                                : ["RESERVED", "READY"].includes(order.status)
                                  ? "text-white bg-accent-orange shadow-sm"
                                  : "text-brand-charcoal bg-brand-beige"
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>

                        <div className="flex gap-3 mb-4">
                          <div className="w-20 h-20 shrink-0 rounded-[18px] overflow-hidden shadow-sm ring-1 ring-black/5 relative">
                            <img
                              src={food.image}
                              className="w-full h-full object-cover"
                              alt=""
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            <div className="absolute bottom-1 right-1.5 opacity-90">
                              <Leaf
                                size={12}
                                className="text-white drop-shadow-md"
                                fill="white"
                              />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-black text-[15px] text-brand-charcoal leading-tight mb-1 line-clamp-2">
                              {food.name}
                            </h3>
                            <p className="text-[12px] font-semibold text-brand-olive mb-1 flex items-center gap-1.5">
                              <MapPin
                                size={12}
                                className="text-brand-primary"
                              />{" "}
                              {store.name}
                            </p>
                            <p className="text-[16px] font-black text-brand-primary pt-0.5">
                              {formatCurrency(order.totalPrice)}{" "}
                              <span className="text-[11px] font-semibold text-brand-olive ml-0.5">
                                ({order.quantity}x)
                              </span>
                            </p>
                          </div>
                        </div>

                        {activeTab === "ACTIVE" && (
                          <div className="flex gap-2 pt-3 border-t border-brand-primary/10 mt-1">
                            <button
                              onClick={() => setSelectedQrOrder(order.id)}
                              className="flex-1 bg-brand-primary shadow-[0_4px_12px_rgba(33,149,111,0.25)] hover:bg-brand-primary/90 text-white rounded-[16px] py-3 text-[13px] font-black flex items-center justify-center gap-2 transition-transform active:scale-95"
                            >
                              <QrCode size={16} /> Pickup QR
                            </button>
                            <button className="w-12 bg-white shadow-sm border border-brand-primary/20 text-brand-primary rounded-[16px] flex items-center justify-center transition-colors hover:bg-brand-cream active:scale-95">
                              <Navigation size={18} />
                            </button>
                          </div>
                        )}

                        {activeTab === "HISTORY" &&
                          order.status === "COMPLETED" && (
                            <div className="bg-brand-primary text-white p-3.5 rounded-[16px] shadow-[0_4px_15px_rgba(33,149,111,0.2)] flex justify-between items-center relative z-10 mt-2">
                              <div className="flex flex-col">
                                <span className="text-[10px] text-white/80 font-semibold mb-0.5 uppercase tracking-widest">
                                  You Saved
                                </span>
                                <span className="text-[14px] font-black flex items-center gap-1.5">
                                  <Leaf
                                    size={14}
                                    fill="currentColor"
                                    className="text-brand-cream"
                                  />{" "}
                                  {formatCurrency(order.savings)}
                                </span>
                              </div>
                              <button
                                onClick={() =>
                                  navigate(`FOOD_DETAIL_${food.id}`)
                                }
                                className="text-[12px] font-black text-brand-charcoal bg-white px-4 py-2.5 rounded-[12px] hover:bg-brand-cream transition-transform active:scale-95 shadow-sm"
                              >
                                Re-Rescue
                              </button>
                            </div>
                          )}
                      </div>
                    </div>

                    {/* DESKTOP Order Card */}
                    <div className="hidden lg:flex flex-1 flex-row bg-white rounded-[32px] p-6 shadow-[0_8px_30px_rgba(44,48,46,0.03)] border border-transparent hover:border-brand-primary/20 hover:shadow-[0_16px_40px_rgba(33,149,111,0.08)] transition-all overflow-hidden relative items-stretch gap-8 w-full group">
                      {order.status === "COMPLETED" && (
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-[60px] pointer-events-none transform translate-x-1/3 -translate-y-1/3 z-0"></div>
                      )}

                      <div className="w-44 h-44 shrink-0 rounded-[28px] overflow-hidden shadow-sm relative bg-brand-cream/50 z-10">
                        <img
                          src={food.image}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                          alt=""
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
                        {activeTab === "HISTORY" &&
                          order.status === "COMPLETED" && (
                            <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md p-2 rounded-2xl shadow-[0_4px_12px_rgba(33,149,111,0.2)]">
                              <CheckCircle2
                                size={20}
                                className="text-brand-primary"
                                strokeWidth={3}
                              />
                            </div>
                          )}
                      </div>

                      <div className="flex-1 min-w-0 pr-4 flex flex-col justify-center z-10 py-2">
                        <div className="flex items-center gap-3 mb-3">
                          <span
                            className={`text-[11px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest ${
                              order.status === "COMPLETED"
                                ? "text-brand-primary bg-brand-primary/10 shadow-sm"
                                : ["RESERVED", "READY"].includes(order.status)
                                  ? "text-accent-orange bg-accent-orange/10 shadow-sm"
                                  : "text-brand-charcoal bg-brand-beige shadow-sm"
                            }`}
                          >
                            {order.status}
                          </span>
                          <span className="text-[12px] font-bold text-brand-olive uppercase tracking-widest border-l-2 border-brand-beige pl-3">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <h3 className="font-black text-[26px] text-brand-charcoal tracking-tight leading-tight mb-3 truncate group-hover:text-brand-primary transition-colors">
                          {food.name}
                        </h3>

                        <div className="flex items-center gap-4 text-[13px] font-semibold text-brand-olive mb-4">
                          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f6f7f6] rounded-xl text-brand-charcoal">
                            <MapPin size={16} className="text-brand-primary" />
                            {store.name}
                          </div>
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-beige"></div>
                          <div className="uppercase tracking-widest text-[11px] font-bold">
                            {order.quantity}{" "}
                            {order.quantity === 1 ? "Portion" : "Portions"}
                          </div>
                        </div>

                        <div className="flex items-baseline gap-2 mt-auto">
                          <p className="text-3xl font-black text-brand-primary tracking-tight">
                            {formatCurrency(order.totalPrice)}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 shrink-0 w-[240px] border-l-2 border-brand-beige/50 pl-8 justify-center items-center relative z-10">
                        {activeTab === "ACTIVE" ? (
                          <>
                            <button
                              onClick={() => setSelectedQrOrder(order.id)}
                              className="w-full bg-brand-charcoal hover:bg-black text-white rounded-2xl py-4 text-[14px] font-extrabold flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-[0_8px_20px_rgba(44,48,46,0.15)]"
                            >
                              <QrCode size={18} /> Pickup QR
                            </button>
                            <button className="w-full bg-white hover:bg-brand-cream border-2 border-brand-beige text-brand-charcoal rounded-2xl py-3.5 text-[14px] font-bold flex items-center justify-center gap-2 transition-colors">
                              <Navigation
                                size={18}
                                className="text-brand-charcoal"
                              />{" "}
                              Get Directions
                            </button>
                          </>
                        ) : (
                          order.status === "COMPLETED" && (
                            <>
                              <div className="w-full bg-gradient-to-br from-brand-primary to-[#187a5a] text-white p-4 rounded-2xl mb-2 flex flex-col items-center justify-center text-center shadow-[0_8px_20px_rgba(33,149,111,0.2)]">
                                <div className="flex items-center gap-1.5 mb-1.5">
                                  <Leaf
                                    size={16}
                                    fill="currentColor"
                                    className="text-white/80"
                                  />
                                  <span className="text-[11px] font-bold uppercase tracking-widest text-white/90">
                                    Avoided CO2
                                  </span>
                                </div>
                                <p className="text-2xl font-black">
                                  {((order.savings / 20000) * 1.5).toFixed(1)}{" "}
                                  <span className="text-sm">kg</span>
                                </p>
                              </div>
                              <button
                                onClick={() =>
                                  navigate(`FOOD_DETAIL_${food.id}`)
                                }
                                className="w-full bg-white hover:bg-brand-cream border-2 border-brand-beige text-brand-charcoal font-bold py-3 text-[14px] rounded-2xl transition-transform active:scale-95"
                              >
                                Re-Rescue
                              </button>
                            </>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* QR Modal - Modern cinematic style */}
      <AnimatePresence>
        {qrOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-brand-charcoal/80 backdrop-blur-md flex items-center justify-center p-6 font-sans"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.3 }}
              className="bg-[#FCFDF9] rounded-[32px] w-full max-w-sm p-6 relative shadow-2xl overflow-hidden"
            >
              {/* Decorative glow */}
              <div className="absolute top-0 inset-x-0 h-32 bg-brand-primary/20 blur-[50px]"></div>

              <div className="flex justify-between items-center mb-6 relative z-10">
                <h3 className="font-bold text-brand-charcoal text-xl tracking-tight">
                  QR Pickup Code
                </h3>
                <button
                  onClick={() => setSelectedQrOrder(null)}
                  className="w-8 h-8 bg-white border border-brand-beige rounded-full flex items-center justify-center text-brand-charcoal hover:bg-brand-cream transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="bg-white border-2 border-brand-beige rounded-[24px] p-6 text-center mb-6 relative z-10 shadow-sm">
                <div className="w-48 h-48 mx-auto bg-white flex items-center justify-center mb-6">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${qrOrder.id}`}
                    alt="QR"
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </div>
                <p className="text-[10px] font-bold text-brand-olive tracking-widest uppercase mb-1">
                  Code
                </p>
                <p className="text-4xl font-mono font-black tracking-widest text-brand-charcoal">
                  {qrOrder.pickupCode}
                </p>
              </div>

              <button
                onClick={() => handleSimulatePickup(qrOrder.id)}
                className="w-full bg-brand-charcoal hover:bg-black text-white font-bold py-4 rounded-[20px] text-[13px] transition-all relative z-10 active:scale-95"
              >
                Simulate Cashier Scan
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Bottom Nav */}
      <BuyerBottomNav />
    </div>
  );
};
