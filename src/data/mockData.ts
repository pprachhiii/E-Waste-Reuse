// Mock data for the component reusability platform

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'consumer' | 'business';
  avatar?: string;
  verified?: boolean;
  location?: string;
}

export interface Component {
  id: string;
  title: string;
  description: string;
  condition: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  location: string;
  images: string[];
  category: string;
  aiCategory: string;
  uploadDate: string;
  views: number;
  status: 'Active' | 'Reserved' | 'Sold';
  consumerId: string;
  consumerName: string;
}

export interface Transaction {
  id: string;
  componentId: string;
  componentTitle: string;
  consumerId: string;
  consumerName: string;
  businessId: string;
  businessName: string;
  status: 'Pending' | 'Completed' | 'Cancelled';
  date: string;
  amount: string,
  receipt?: string;
}

export interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: string;
}

export interface Chat {
  id: string;
  participants: string[];
  participantNames: string[];
  messages: ChatMessage[];
  lastMessage: string;
  lastMessageTime: string;
}

export interface Impact {
  ewasteSavedKg: number;
  co2ReducedKg: number;
  successfulReuses: number;
  totalComponents?: number;
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'c123',
    name: 'Aarav Mehta',
    email: 'aarav.mehta@gmail.com',
    role: 'consumer',
    location: 'Mumbai, MH'
  },
  {
    id: 'c124',
    name: 'Priya Sharma',
    email: 'priya.sharma@outlook.com',
    role: 'consumer',
    location: 'Bengaluru, KA'
  },
  {
    id: 'b789',
    name: 'EcoReclaim Pvt Ltd',
    email: 'contact@ecoreclaim.in',
    role: 'business',
    verified: true,
    location: 'Delhi, DL'
  },
  {
    id: 'b790',
    name: 'GreenLoop Recycling',
    email: 'support@greenloop.in',
    role: 'business',
    verified: true,
    location: 'Hyderabad, TS'
  }
];


// Mock Components
export const mockComponents: Component[] = [
  {
    id: 'l001',
    title: 'Samsung Galaxy S20 Motherboard',
    description: 'Motherboard pulled from a Galaxy S20. Phone had display issues, but the board is still in working condition. Good for repairs.',
    condition: 'Good',
    location: 'Mumbai, MH',
    images: ['/placeholder.svg'],
    category: 'Motherboard',
    aiCategory: 'Motherboard - 80% reusable components',
    uploadDate: '2025-09-20',
    views: 12,
    status: 'Active',
    consumerId: 'c123',
    consumerName: 'Aarav Mehta'
  },
  {
    id: 'l002',
    title: 'Samsung DDR4 RAM 8GB (x2)',
    description: 'Two Samsung DDR4 8GB RAM sticks. Removed during a laptop upgrade. Still in excellent condition.',
    condition: 'Excellent',
    location: 'Bengaluru, KA',
    images: ['/placeholder.svg'],
    category: 'Memory',
    aiCategory: 'RAM - 90% reusable',
    uploadDate: '2025-09-18',
    views: 8,
    status: 'Active',
    consumerId: 'c124',
    consumerName: 'Priya Sharma'
  },
  {
    id: 'l003',
    title: 'Samsung Galaxy Note 10 Logic Board',
    description: 'Logic board from a Note 10. Battery was swollen and damaged the phone, but board is intact. Can be used for spares.',
    condition: 'Fair',
    location: 'Delhi, DL',
    images: ['/placeholder.svg'],
    category: 'Logic Board',
    aiCategory: 'Logic Board - 70% reusable components',
    uploadDate: '2025-09-15',
    views: 15,
    status: 'Reserved',
    consumerId: 'c123',
    consumerName: 'Aarav Mehta'
  }
];

// Mock Transactions
export const mockTransactions: Transaction[] = [
  {
    id: 't101',
    componentId: 'l003',
    componentTitle: 'Samsung Galaxy Note 10 Logic Board',
    consumerId: 'c123',
    consumerName: 'Aarav Mehta',
    businessId: 'b789',
    businessName: 'TechCare Electronics',
    status: 'Completed',
    date: '2025-09-22',
    amount: '₹4,500',
    receipt: 'receipt_t101.pdf'
  }
];

// Mock Chats
export const mockChats: Chat[] = [
  {
    id: 'ch001',
    participants: ['c123', 'b789'],
    participantNames: ['Aarav Mehta', 'EcoReclaim Pvt Ltd'],
    messages: [
      {
        id: 'm001',
        chatId: 'ch001',
        senderId: 'b789',
        senderName: 'EcoReclaim Pvt Ltd',
        message: 'Hello Aarav, I saw your listing for the Samsung Galaxy Note 10 Logic Board. Is it still available?',
        timestamp: '2025-09-20T14:32:00Z'
      },
      {
        id: 'm002',
        chatId: 'ch001',
        senderId: 'c123',
        senderName: 'Aarav Mehta',
        message: 'Hi! Yes, it’s available. Do you want me to ship it or would you prefer a local pickup in Mumbai?',
        timestamp: '2025-09-20T14:35:00Z'
      },
      {
        id: 'm003',
        chatId: 'ch001',
        senderId: 'b789',
        senderName: 'EcoReclaim Pvt Ltd',
        message: 'Pickup works. Can we schedule it for Sunday afternoon, say around 2 PM?',
        timestamp: '2025-09-20T14:38:00Z'
      }
    ],
    lastMessage: 'Pickup works. Can we schedule it for Sunday afternoon, say around 2 PM?',
    lastMessageTime: '2025-09-20T14:38:00Z'
  }
];

// Mock Impact Data
export const mockConsumerImpact: Record<string, Impact> = {
  'c123': {
    ewasteSavedKg: 3.6,
    co2ReducedKg: 2.4,
    successfulReuses: 2
  },
  'c124': {
    ewasteSavedKg: 2.1,
    co2ReducedKg: 1.5,
    successfulReuses: 1
  }
};

export const mockBusinessImpact: Record<string, Impact> = {
  'b789': {
    ewasteSavedKg: 14.2,
    co2ReducedKg: 9.5,
    successfulReuses: 3,
    totalComponents: 18
  },
  'b790': {
    ewasteSavedKg: 9.8,
    co2ReducedKg: 6.7,
    successfulReuses: 2,
    totalComponents: 12
  }
};

// Mock Wishlist Items
export const mockWishlist: Record<string, string[]> = {
  'b789': ['Samsung Display Panels', 'DDR4 RAM Modules', 'Logic Boards'],
  'b790': ['Laptop Motherboards', 'SSD Drives', 'Power Supply Units']
};
