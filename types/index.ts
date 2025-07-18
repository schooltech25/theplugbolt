export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: 'non-alcoholic' | 'alcoholic' | 'food';
  subcategory?: 'shots' | 'glass' | 'pitcher' | 'bottled';
  image?: string;
  isAvailable: boolean;
  ingredients?: string[];
  description?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  unit: string;
  purchasePrice: number;
  currentStock: number;
  minStock: number;
  maxStock: number;
  supplier?: string;
  lastUpdated: Date;
}

export interface Order {
  id: string;
  items: OrderItem[];
  tableNumber?: string;
  customerType: 'walk-in' | 'table';
  status: 'new' | 'cooking' | 'prepared' | 'in-progress' | 'ready' | 'claimed' | 'on-way' | 'served';
  total: number;
  createdAt: Date;
  updatedAt: Date;
  staffId: string;
  staffName: string;
  claimedBy?: string;
}

export interface OrderItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  modifiers?: string[];
}

export interface Table {
  id: string;
  number: string;
  capacity: number;
  status: 'vacant' | 'occupied' | 'reserved';
  currentOrder?: Order;
  guests?: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'owner' | 'manager' | 'bartender' | 'kitchen' | 'waiter' | 'security' | 'developer';
  isFirstLogin: boolean;
  createdAt: Date;
  lastLogin?: Date;
  isActive: boolean;
}

export interface WastageEntry {
  id: string;
  itemId: string;
  itemName: string;
  quantity: number;
  reason: 'breakage' | 'spilled' | 'wrong-order' | 'spoiled' | 'production-waste';
  weight?: number;
  volume?: number;
  staffId: string;
  staffName: string;
  timestamp: Date;
  cost: number;
}

export interface ProductionBatch {
  id: string;
  itemName: string;
  ingredients: { itemId: string; quantity: number; cost: number }[];
  totalCost: number;
  outputQuantity: number;
  wastage?: number;
  staffId: string;
  timestamp: Date;
}

export interface Voucher {
  id: string;
  code: string;
  type: 'discount' | 'free-item' | 'bogo';
  value: number;
  itemId?: string;
  expirationDate: Date;
  usageLimit: number;
  usedCount: number;
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
}

export interface Reservation {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  date: Date;
  time: string;
  guests: number;
  tableId: string;
  status: 'confirmed' | 'seated' | 'cancelled' | 'no-show';
  isPaid: boolean;
  notes?: string;
  createdAt: Date;
}

export interface PerformanceMetrics {
  userId: string;
  date: Date;
  role: string;
  metrics: {
    ordersProcessed?: number;
    averageServiceTime?: number;
    totalSales?: number;
    customersServed?: number;
    ticketsScanned?: number;
    incidentsLogged?: number;
    wastageReported?: number;
  };
  rating: number;
  notes?: string;
}