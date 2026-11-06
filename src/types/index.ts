export type UserRole = 'BUYER' | 'SELLER' | null;

export interface Store {
  id: string;
  name: string;
  type: string;
  rating: number;
  distance: string;
  image: string;
  address: string;
  isOpen: boolean;
  ownerId: string;
}

export interface FoodItem {
  id: string;
  storeId: string;
  name: string;
  description: string;
  originalPrice: number;
  rescuePrice: number;
  quantityLeft: number;
  pickupTimeStart: string;
  pickupTimeEnd: string;
  image: string;
  isHalal: boolean;
  category: string;
  isActive?: boolean;
}

export interface Order {
  id: string;
  buyerId: string;
  storeId: string;
  foodId: string;
  quantity: number;
  status: 'RESERVED' | 'PREPARING' | 'READY' | 'COMPLETED' | 'CANCELLED' | 'EXPIRED';
  totalPrice: number;
  savings: number;
  createdAt: string;
  pickupCode: string;
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
  savedMoney?: number;
  mealsRescued?: number;
  co2Saved?: number;
}
