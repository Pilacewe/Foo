import React, { useState } from "react";
import { useAppStore } from "../store/AppContext";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  ArrowLeft,
  Mail,
  Lock,
  User as UserIcon,
  Store,
  Leaf,
} from "lucide-react";

const slides = [
  {
    title: "Jangan biarkan\nmakanan enak\nterbuang.",
    description:
      "Discover quality surplus food from your local favorite spots at a fraction of the cost.",
    image:
      "https://images.unsplash.com/photo-1543362906-8c4c78dcb92a?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Makan lebih hemat.\nSelamatkan makanan.",
    description:
      "Enjoy premium meals while actively reducing your environmental footprint.",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Dukung restoran lokal\ndi sekitarmu.",
    description:
      "Support neighborhood businesses by ensuring their crafted meals don't go to waste.",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop",
  },
];

export const OnboardingView = () => {
  const { login } = useAppStore();
  const [step, setStep] = useState(0);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<"LOGIN" | "REGISTER">("LOGIN");
  const [selectedRole, setSelectedRole] = useState<"BUYER" | "SELLER">("BUYER");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const nextStep = () => {
    if (step < slides.length - 1) {
      setStep(step + 1);
    } else {
      setShowAuth(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === "REGISTER") {
      login(selectedRole, formData.name);
    } else {
      login(selectedRole);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black font-sans w-full">
      <AnimatePresence mode="wait">
        {!showAuth ? (
          <motion.div
            key="slides"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col h-full relative"
          >
            {/* Immersive Background Image */}
            <div className="absolute inset-0 z-0 bg-black">
              <AnimatePresence mode="wait">
                <motion.img
                  key={step}
                  src={slides[step].image}
                  initial={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                  animate={{ opacity: 0.6, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  className="w-full h-full object-cover object-center"
                  alt=""
                />
              </AnimatePresence>
              {/* Cinematic Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
            </div>

            <div className="flex-1 flex flex-col justify-end px-8 pb-16 z-10 w-full max-w-xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="mb-8"
                >
                  <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4 leading-[1.1] whitespace-pre-line">
                    {slides[step].title}
                  </h1>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center justify-between mt-4 border-t border-white/20 pt-8">
                <div className="flex gap-2.5">
                  {slides.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 round transition-all duration-500 ease-out ${i === step ? "w-8 bg-white" : "w-3 bg-white/30"}`}
                    />
                  ))}
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={nextStep}
                  className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform"
                >
                  <ArrowRight size={28} strokeWidth={2} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="auth-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col lg:flex-row min-h-screen relative overflow-hidden bg-[#FCFDF9]"
          >
            {/* Desktop Left Image Section */}
            <div className="hidden lg:flex w-1/2 relative bg-brand-charcoal overflow-hidden items-end p-12">
              <div className="absolute inset-0 bg-brand-charcoal">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={authMode}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 0.6, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    src={
                      authMode === "LOGIN"
                        ? "/busmakanan.webp"
                        : "/busmakanan.webp"
                    }
                    className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
                    alt="Food Background"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-brand-charcoal/40 to-brand-primary/20" />
              </div>
              <div className="relative z-10 max-w-lg mb-8">
                <div className="w-12 h-12 bg-brand-primary rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-brand-primary/30">
                  <Leaf className="text-white w-6 h-6" fill="currentColor" />
                </div>
                <h2 className="text-4xl font-black text-white leading-tight mb-4 tracking-tight drop-shadow-sm">
                  {authMode === "LOGIN"
                    ? "Selamat datang \nkembali."
                    : "Mulai langkah \nperubahanmu."}
                </h2>
                <p className="text-white/80 text-lg font-medium leading-relaxed">
                  Gabung bersama ribuan pengguna lain menyelamatkan makanan
                  berkualitas dan jadilah bagian dari solusi.
                </p>
              </div>
            </div>

            {/* Form Section */}
            <div className="flex-1 flex flex-col justify-center px-4 py-8 sm:px-6 lg:px-16 xl:px-24 z-10 relative bg-[#FCFDF9] overflow-y-auto w-full lg:w-1/2">
              {/* Soft background elements for mobile */}
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none transform translate-x-1/3 -translate-y-1/3 lg:hidden" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-olive/5 rounded-full blur-[100px] pointer-events-none transform -translate-x-1/3 translate-y-1/3 lg:hidden" />

              <button
                onClick={() => setShowAuth(false)}
                className="absolute top-6 left-6 w-12 h-12 bg-white lg:bg-brand-cream/50 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.05)] border border-brand-beige/50 flex items-center justify-center text-brand-charcoal z-20 hover:bg-brand-cream hover:scale-105 transition-all lg:top-8 lg:left-8"
              >
                <ArrowLeft size={24} />
              </button>

              <div className="w-full max-w-md mx-auto z-10 pt-16 lg:pt-0">
                <div className="mb-10 lg:mb-12 text-center lg:text-left">
                  <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl lg:text-4xl font-black text-brand-charcoal tracking-tight"
                  >
                    {authMode === "LOGIN" ? "Masuk ke Serene" : "Daftar Akun"}
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-brand-olive mt-3 font-medium text-sm lg:text-base"
                  >
                    {authMode === "LOGIN"
                      ? "Masuk untuk melanjutkan aktivitasmu."
                      : "Buat akun untuk menyelamatkan makanan hari ini."}
                  </motion.p>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
                  className="bg-white p-6 sm:p-10 rounded-[32px] shadow-[0_12px_40px_rgba(33,149,111,0.08)] border border-brand-primary/10 relative overflow-hidden backdrop-blur-xl"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full blur-[40px] pointer-events-none transform translate-x-1/2 -translate-y-1/2" />

                  {/* Role Selector */}
                  <div className="flex p-1.5 bg-brand-cream/80 backdrop-blur-md rounded-2xl mb-8 border border-brand-primary/10 relative z-10">
                    <button
                      type="button"
                      onClick={() => setSelectedRole("BUYER")}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-[12px] text-sm font-bold transition-all duration-300 ${
                        selectedRole === "BUYER"
                          ? "bg-white text-brand-charcoal shadow-sm border border-brand-beige/50 scale-103"
                          : "text-brand-olive/70 hover:text-brand-charcoal scale-95"
                      }`}
                    >
                      <UserIcon
                        size={16}
                        className={
                          selectedRole === "BUYER"
                            ? "text-brand-primary transition-colors"
                            : ""
                        }
                      />
                      Pembeli
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedRole("SELLER")}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-[12px] text-sm font-bold transition-all duration-300 ${
                        selectedRole === "SELLER"
                          ? "bg-white text-brand-charcoal shadow-sm border border-brand-beige/50 scale-103"
                          : "text-brand-olive/70 hover:text-brand-charcoal scale-95"
                      }`}
                    >
                      <Store
                        size={16}
                        className={
                          selectedRole === "SELLER"
                            ? "text-brand-primary transition-colors"
                            : ""
                        }
                      />
                      Penjual
                    </button>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="space-y-5 relative z-10"
                  >
                    <AnimatePresence mode="popLayout">
                      {authMode === "REGISTER" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, y: -10 }}
                          animate={{ opacity: 1, height: "auto", y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -10 }}
                          className="space-y-2 opacity-100"
                        >
                          <label className="text-[13px] font-bold text-brand-charcoal ml-1">
                            {selectedRole === "SELLER"
                              ? "Nama Toko / Restoran"
                              : "Nama Lengkap"}
                          </label>
                          <div className="relative group">
                            <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-olive/50 w-5 h-5 group-focus-within:text-brand-primary transition-colors duration-300 z-10" />
                            <input
                              required
                              type="text"
                              placeholder={
                                selectedRole === "SELLER"
                                  ? "Cth: Warung Kopi Senja"
                                  : "Cth: Budi Santoso"
                              }
                              value={formData.name}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  name: e.target.value,
                                })
                              }
                              className="w-full bg-[#FCFDF9] border border-brand-beige/80 text-brand-charcoal text-[15px] font-medium rounded-2xl pl-12 pr-4 py-3.5 focus:bg-white transition-all outline-none focus:border-brand-primary/50 focus:ring-[4px] focus:ring-brand-primary/10 placeholder:text-brand-olive/40 relative z-0"
                            />
                            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-brand-primary/0 pointer-events-none group-focus-within:ring-brand-primary/20 transition-all"></div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="space-y-2">
                      <label className="text-[13px] font-bold text-brand-charcoal ml-1">
                        Email
                      </label>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-olive/50 w-5 h-5 group-focus-within:text-brand-primary transition-colors duration-300 z-10" />
                        <input
                          required
                          type="email"
                          placeholder="Alamat Email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full bg-[#FCFDF9] border border-brand-beige/80 text-brand-charcoal text-[15px] font-medium rounded-2xl pl-12 pr-4 py-3.5 focus:bg-white transition-all outline-none focus:border-brand-primary/50 focus:ring-[4px] focus:ring-brand-primary/10 placeholder:text-brand-olive/40 relative z-0"
                        />
                        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-brand-primary/0 pointer-events-none group-focus-within:ring-brand-primary/20 transition-all"></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center ml-1">
                        <label className="text-[13px] font-bold text-brand-charcoal">
                          Password
                        </label>
                        {authMode === "LOGIN" && (
                          <a
                            href="#"
                            className="text-[12px] font-bold text-brand-primary hover:underline"
                          >
                            Lupa Password?
                          </a>
                        )}
                      </div>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-olive/50 w-5 h-5 group-focus-within:text-brand-primary transition-colors duration-300 z-10" />
                        <input
                          required
                          type="password"
                          placeholder="Masukkan Password"
                          value={formData.password}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              password: e.target.value,
                            })
                          }
                          className="w-full bg-[#FCFDF9] border border-brand-beige/80 text-brand-charcoal text-[15px] font-medium rounded-2xl pl-12 pr-4 py-3.5 focus:bg-white transition-all outline-none focus:border-brand-primary/50 focus:ring-[4px] focus:ring-brand-primary/10 placeholder:text-brand-olive/40 relative z-0"
                        />
                        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-brand-primary/0 pointer-events-none group-focus-within:ring-brand-primary/20 transition-all"></div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-brand-primary text-white font-bold text-[15px] py-4 rounded-2xl shadow-[0_8px_20px_rgba(33,149,111,0.2)] hover:bg-brand-primary/90 hover:shadow-[0_12px_24px_rgba(33,149,111,0.3)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-6"
                    >
                      {authMode === "LOGIN" ? "Masuk" : "Daftar Sekarang"}
                      <ArrowRight size={18} />
                    </button>
                  </form>

                  <div className="mt-8 text-center bg-brand-primary/5 p-4 rounded-2xl border border-brand-primary/10 relative z-10">
                    <p className="text-[14px] text-brand-olive font-medium">
                      {authMode === "LOGIN"
                        ? "Belum punya akun? "
                        : "Sudah punya akun? "}
                      <button
                        type="button"
                        onClick={() => {
                          setAuthMode(
                            authMode === "LOGIN" ? "REGISTER" : "LOGIN",
                          );
                          setFormData({ name: "", email: "", password: "" });
                        }}
                        className="font-black text-brand-primary hover:text-brand-primary/80 transition-colors ml-1"
                      >
                        {authMode === "LOGIN"
                          ? "Daftar di sini"
                          : "Masuk sekarang"}
                      </button>
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
