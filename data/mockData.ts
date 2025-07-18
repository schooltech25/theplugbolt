import { MenuItem, InventoryItem, Table, Order } from '../types';

export const mockMenuItems: MenuItem[] = [
  // Non-Alcoholic Beverages
  {
    id: 'na-1',
    name: 'Coca Cola',
    price: 45,
    category: 'non-alcoholic',
    image: 'https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg',
    isAvailable: true,
  },
  {
    id: 'na-2',
    name: 'Fresh Orange Juice',
    price: 85,
    category: 'non-alcoholic',
    image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg',
    isAvailable: true,
  },
  {
    id: 'na-3',
    name: 'Iced Coffee',
    price: 95,
    category: 'non-alcoholic',
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
    isAvailable: true,
  },
  {
    id: 'na-4',
    name: 'Bottled Water',
    price: 25,
    category: 'non-alcoholic',
    image: 'https://images.pexels.com/photos/327090/pexels-photo-327090.jpeg',
    isAvailable: true,
  },

  // Alcoholic Beverages - Shots
  {
    id: 'al-s-1',
    name: 'Tequila Shot',
    price: 120,
    category: 'alcoholic',
    subcategory: 'shots',
    image: 'https://images.pexels.com/photos/5947043/pexels-photo-5947043.jpeg',
    isAvailable: true,
  },
  {
    id: 'al-s-2',
    name: 'Vodka Shot',
    price: 110,
    category: 'alcoholic',
    subcategory: 'shots',
    image: 'https://images.pexels.com/photos/5946965/pexels-photo-5946965.jpeg',
    isAvailable: true,
  },

  // Alcoholic Beverages - Glass
  {
    id: 'al-g-1',
    name: 'Red Wine',
    price: 180,
    category: 'alcoholic',
    subcategory: 'glass',
    image: 'https://images.pexels.com/photos/434311/pexels-photo-434311.jpeg',
    isAvailable: true,
  },
  {
    id: 'al-g-2',
    name: 'Whiskey on Rocks',
    price: 220,
    category: 'alcoholic',
    subcategory: 'glass',
    image: 'https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg',
    isAvailable: true,
  },

  // Alcoholic Beverages - Pitcher
  {
    id: 'al-p-1',
    name: 'Beer Pitcher',
    price: 450,
    category: 'alcoholic',
    subcategory: 'pitcher',
    image: 'https://images.pexels.com/photos/1552630/pexels-photo-1552630.jpeg',
    isAvailable: true,
  },

  // Alcoholic Beverages - Bottled
  {
    id: 'al-b-1',
    name: 'San Miguel Beer',
    price: 65,
    category: 'alcoholic',
    subcategory: 'bottled',
    image: 'https://images.pexels.com/photos/1552630/pexels-photo-1552630.jpeg',
    isAvailable: true,
  },
  {
    id: 'al-b-2',
    name: 'Red Horse Beer',
    price: 70,
    category: 'alcoholic',
    subcategory: 'bottled',
    image: 'https://images.pexels.com/photos/1552630/pexels-photo-1552630.jpeg',
    isAvailable: true,
  },

  // Food Items
  {
    id: 'f-1',
    name: 'Chicken Wings',
    price: 280,
    category: 'food',
    image: 'https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg',
    isAvailable: true,
  },
  {
    id: 'f-2',
    name: 'Nachos',
    price: 220,
    category: 'food',
    image: 'https://images.pexels.com/photos/1108117/pexels-photo-1108117.jpeg',
    isAvailable: true,
  },
  {
    id: 'f-3',
    name: 'Caesar Salad',
    price: 180,
    category: 'food',
    image: 'https://images.pexels.com/photos/257816/pexels-photo-257816.jpeg',
    isAvailable: true,
  },
  {
    id: 'f-4',
    name: 'Grilled Burger',
    price: 320,
    category: 'food',
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg',
    isAvailable: true,
  },
  {
    id: 'f-5',
    name: 'Fish & Chips',
    price: 380,
    category: 'food',
    image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg',
    isAvailable: true,
  },
];

export const mockInventoryItems: InventoryItem[] = [
  {
    id: 'inv-1',
    name: 'Coca Cola Syrup',
    category: 'Beverages',
    unit: 'Liters',
    purchasePrice: 180,
    currentStock: 25,
    minStock: 5,
    maxStock: 50,
    supplier: 'Coca Cola Philippines',
    lastUpdated: new Date(),
  },
  {
    id: 'inv-2',
    name: 'Tequila',
    category: 'Spirits',
    unit: 'Bottles',
    purchasePrice: 850,
    currentStock: 8,
    minStock: 3,
    maxStock: 20,
    supplier: 'Premium Spirits Co.',
    lastUpdated: new Date(),
  },
  {
    id: 'inv-3',
    name: 'Chicken Wings',
    category: 'Food',
    unit: 'Kilograms',
    purchasePrice: 320,
    currentStock: 15,
    minStock: 5,
    maxStock: 30,
    supplier: 'Fresh Meat Suppliers',
    lastUpdated: new Date(),
  },
  {
    id: 'inv-4',
    name: 'Red Wine',
    category: 'Wine',
    unit: 'Bottles',
    purchasePrice: 450,
    currentStock: 12,
    minStock: 4,
    maxStock: 25,
    supplier: 'Wine Distributors Inc.',
    lastUpdated: new Date(),
  },
  {
    id: 'inv-5',
    name: 'Beer Bottles',
    category: 'Beer',
    unit: 'Cases',
    purchasePrice: 1200,
    currentStock: 6,
    minStock: 2,
    maxStock: 15,
    supplier: 'San Miguel Corporation',
    lastUpdated: new Date(),
  },
];

export const mockTables: Table[] = [
  { id: 't1', number: 'T1', capacity: 4, status: 'occupied', guests: 3 },
  { id: 't2', number: 'T2', capacity: 2, status: 'vacant' },
  { id: 't3', number: 'T3', capacity: 6, status: 'occupied', guests: 5 },
  { id: 't4', number: 'T4', capacity: 4, status: 'reserved' },
  { id: 't5', number: 'T5', capacity: 2, status: 'occupied', guests: 2 },
  { id: 't6', number: 'T6', capacity: 8, status: 'vacant' },
  { id: 't7', number: 'T7', capacity: 4, status: 'vacant' },
  { id: 't8', number: 'T8', capacity: 2, status: 'occupied', guests: 2 },
];

export const mockOrders: Order[] = [
  {
    id: 'ord-1',
    items: [
      { menuItemId: 'f-1', name: 'Chicken Wings', price: 280, quantity: 1 },
      { menuItemId: 'al-b-1', name: 'San Miguel Beer', price: 65, quantity: 2 },
    ],
    tableNumber: 'T1',
    customerType: 'table',
    status: 'cooking',
    total: 410,
    createdAt: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    updatedAt: new Date(Date.now() - 10 * 60 * 1000),
    staffId: 'waiter-1',
    staffName: 'Maria Santos',
  },
  {
    id: 'ord-2',
    items: [
      { menuItemId: 'al-s-1', name: 'Tequila Shot', price: 120, quantity: 3 },
    ],
    customerType: 'walk-in',
    status: 'ready',
    total: 360,
    createdAt: new Date(Date.now() - 8 * 60 * 1000), // 8 minutes ago
    updatedAt: new Date(Date.now() - 2 * 60 * 1000),
    staffId: 'bartender-1',
    staffName: 'Juan Cruz',
  },
  {
    id: 'ord-3',
    items: [
      { menuItemId: 'f-4', name: 'Grilled Burger', price: 320, quantity: 1 },
      { menuItemId: 'f-2', name: 'Nachos', price: 220, quantity: 1 },
    ],
    tableNumber: 'T3',
    customerType: 'table',
    status: 'prepared',
    total: 540,
    createdAt: new Date(Date.now() - 25 * 60 * 1000), // 25 minutes ago
    updatedAt: new Date(Date.now() - 5 * 60 * 1000),
    staffId: 'waiter-2',
    staffName: 'Ana Reyes',
  },
]