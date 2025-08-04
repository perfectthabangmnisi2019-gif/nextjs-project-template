"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Account, Trade, UserProfile, storage, defaultProfile } from "../lib/data";
import { v4 as uuidv4 } from "uuid";

interface TradingContextType {
  accounts: Account[];
  trades: Trade[];
  profile: UserProfile;
  addAccount: (name: string, accountNumber: string) => void;
  updateAccount: (account: Account) => void;
  deleteAccount: (id: string) => void;
  addTrade: (trade: Omit<Trade, "id">) => void;
  updateTrade: (trade: Trade) => void;
  deleteTrade: (id: string) => void;
  updateProfile: (profile: UserProfile) => void;
}

const TradingContext = createContext<TradingContextType | undefined>(undefined);

export const TradingProvider = ({ children }: { children: ReactNode }) => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);

  useEffect(() => {
    setAccounts(storage.getAccounts());
    setTrades(storage.getTrades());
    setProfile(storage.getProfile());
  }, []);

  useEffect(() => {
    storage.setAccounts(accounts);
  }, [accounts]);

  useEffect(() => {
    storage.setTrades(trades);
  }, [trades]);

  useEffect(() => {
    storage.setProfile(profile);
  }, [profile]);

  const addAccount = (name: string, accountNumber: string) => {
    const newAccount: Account = {
      id: uuidv4(),
      name,
      accountNumber,
      createdAt: new Date().toISOString(),
    };
    setAccounts((prev) => [...prev, newAccount]);
  };

  const updateAccount = (updatedAccount: Account) => {
    setAccounts((prev) =>
      prev.map((acc) => (acc.id === updatedAccount.id ? updatedAccount : acc))
    );
  };

  const deleteAccount = (id: string) => {
    setAccounts((prev) => prev.filter((acc) => acc.id !== id));
    setTrades((prev) => prev.filter((trade) => trade.accountId !== id));
  };

  const addTrade = (trade: Omit<Trade, "id">) => {
    const newTrade: Trade = {
      id: uuidv4(),
      ...trade,
    };
    setTrades((prev) => [...prev, newTrade]);
  };

  const updateTrade = (updatedTrade: Trade) => {
    setTrades((prev) =>
      prev.map((trade) => (trade.id === updatedTrade.id ? updatedTrade : trade))
    );
  };

  const deleteTrade = (id: string) => {
    setTrades((prev) => prev.filter((trade) => trade.id !== id));
  };

  const updateProfile = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile);
  };

  return (
    <TradingContext.Provider
      value={{
        accounts,
        trades,
        profile,
        addAccount,
        updateAccount,
        deleteAccount,
        addTrade,
        updateTrade,
        deleteTrade,
        updateProfile,
      }}
    >
      {children}
    </TradingContext.Provider>
  );
};

export const useTrading = (): TradingContextType => {
  const context = useContext(TradingContext);
  if (!context) {
    throw new Error("useTrading must be used within a TradingProvider");
  }
  return context;
};
