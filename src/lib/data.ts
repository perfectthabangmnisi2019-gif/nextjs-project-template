// Data models and storage utilities
export interface Account {
  id: string;
  name: string;
  accountNumber: string;
  createdAt: string;
}

export interface Trade {
  id: string;
  accountId: string;
  tradeType: 'BUY' | 'SELL';
  tradeDate: string;
  instrument: string;
  lotSize: number;
  profitLoss: number; // positive for profit, negative for loss
  notes?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
}

// Local storage keys
const STORAGE_KEYS = {
  ACCOUNTS: 'trading-accounts',
  TRADES: 'trading-trades',
  PROFILE: 'trading-profile',
} as const;

// Default data
export const defaultProfile: UserProfile = {
  name: 'PT_FX',
  email: 'pt.fx@trader.com',
  bio: 'Full-time funded trader',
};

// Storage utilities
export const storage = {
  getAccounts: (): Account[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEYS.ACCOUNTS);
    return data ? JSON.parse(data) : [];
  },

  setAccounts: (accounts: Account[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(accounts));
  },

  getTrades: (): Trade[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEYS.TRADES);
    return data ? JSON.parse(data) : [];
  },

  setTrades: (trades: Trade[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.TRADES, JSON.stringify(trades));
  },

  getProfile: (): UserProfile => {
    if (typeof window === 'undefined') return defaultProfile;
    const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
    return data ? JSON.parse(data) : defaultProfile;
  },

  setProfile: (profile: UserProfile) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  },
};
