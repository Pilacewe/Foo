import React, { createContext, useContext, useState, ReactNode } from "react";
import { User, Store, FoodItem, Order } from "../types";
import { mockUsers, mockStores, mockFoods, mockOrders } from "../data/mocks";

interface AppState {
  currentUser: User | null;
  stores: Store[];
  foods: FoodItem[];
  orders: Order[];
  currentView: string; // Used for simple routing
}

interface AppContextType extends AppState {
  login: (role: "BUYER" | "SELLER", name?: string) => void;
  logout: () => void;
  navigate: (view: string) => void;
  placeOrder: (foodId: string, quantity: number, paymentMethod: string) => void;
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;
  addFoodListing: (food: Omit<FoodItem, "id" | "storeId">) => void;
  updateFood: (foodId: string, updates: Partial<FoodItem>) => void;
  deleteFood: (foodId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppState>({
    currentUser: null,
    stores: mockStores,
    foods: mockFoods,
    orders: mockOrders,
    currentView: "ONBOARDING",
  });

  const login = (role: "BUYER" | "SELLER", name?: string) => {
    const defaultUser = mockUsers.find((u) => u.role === role) || mockUsers[0];
    const user = name ? { ...defaultUser, name } : defaultUser;

    setState((s) => {
      let newStores = s.stores;
      if (role === "SELLER" && name) {
        newStores = s.stores.map((st) =>
          st.ownerId === user.id ? { ...st, name } : st,
        );
      }
      return {
        ...s,
        currentUser: user,
        stores: newStores,
        currentView: role === "BUYER" ? "BUYER_HOME" : "SELLER_DASHBOARD",
      };
    });
  };

  const logout = () => {
    setState((s) => ({ ...s, currentUser: null, currentView: "ONBOARDING" }));
  };

  const navigate = (view: string) => {
    setState((s) => ({ ...s, currentView: view }));
  };

  const placeOrder = (
    foodId: string,
    quantity: number,
    paymentMethod: string,
  ) => {
    const food = state.foods.find((f) => f.id === foodId);
    if (!food || !state.currentUser) return;

    // Simple state mutation for MVP simulation
    const newOrder: Order = {
      id: `ORD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      buyerId: state.currentUser.id,
      storeId: food.storeId,
      foodId: food.id,
      quantity,
      status: "RESERVED",
      totalPrice: food.rescuePrice * quantity,
      savings: (food.originalPrice - food.rescuePrice) * quantity,
      createdAt: new Date().toISOString(),
      pickupCode: Math.floor(1000 + Math.random() * 9000).toString(),
    };

    setState((s) => ({
      ...s,
      orders: [newOrder, ...s.orders],
      foods: s.foods.map((f) =>
        f.id === foodId ? { ...f, quantityLeft: f.quantityLeft - quantity } : f,
      ),
    }));
  };

  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    setState((s) => ({
      ...s,
      orders: s.orders.map((o) => (o.id === orderId ? { ...o, status } : o)),
    }));
  };

  const addFoodListing = (foodData: Omit<FoodItem, "id" | "storeId">) => {
    if (!state.currentUser || state.currentUser.role !== "SELLER") return;

    // Try to find seller's store or use default
    const store =
      state.stores.find((s) => s.ownerId === state.currentUser!.id) ||
      state.stores[0];

    const newFood: FoodItem = {
      ...foodData,
      id: `food_${Date.now()}`,
      storeId: store.id,
    };

    setState((s) => ({
      ...s,
      foods: [newFood, ...s.foods],
    }));
  };

  const updateFood = (foodId: string, updates: Partial<FoodItem>) => {
    setState((s) => ({
      ...s,
      foods: s.foods.map((f) => (f.id === foodId ? { ...f, ...updates } : f)),
    }));
  };

  const deleteFood = (foodId: string) => {
    setState((s) => ({
      ...s,
      foods: s.foods.filter((f) => f.id !== foodId),
    }));
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        login,
        logout,
        navigate,
        placeOrder,
        updateOrderStatus,
        addFoodListing,
        updateFood,
        deleteFood,
      }}
    >
      <div className="min-h-screen bg-[#FDFBF7] text-slate-900 font-sans antialiased overflow-hidden w-full">
        <div className="w-full bg-white min-h-screen relative flex flex-col mx-auto overflow-hidden">
          {children}
        </div>
      </div>
    </AppContext.Provider>
  );
};

export const useAppStore = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppStore must be used within AppProvider");
  return context;
};
