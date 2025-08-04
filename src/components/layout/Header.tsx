"use client";

import React from "react";
import { useTrading } from "../../context/TradingContext";

export const Header = () => {
  const { profile } = useTrading();

  return (
    <header className="border-b bg-white">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">PT_FX Trading Dashboard</h1>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <div className="text-sm">
            <p className="font-medium">{profile.name}</p>
            <p className="text-gray-500">{profile.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
};
