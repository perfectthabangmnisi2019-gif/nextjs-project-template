"use client";

import React from "react";
import { useTrading } from "../../context/TradingContext";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export const DashboardStats = ({ accounts, trades }: { accounts: any[]; trades: any[] }) => {
  const { trades: allTrades } = useTrading();

  // Calculate stats
  const totalTrades = allTrades.length;
  const profitableTrades = allTrades.filter((trade) => trade.profitLoss > 0).length;
  const losingTrades = allTrades.filter((trade) => trade.profitLoss < 0).length;
  const totalProfit = allTrades.reduce((sum, trade) => sum + Math.max(0, trade.profitLoss), 0);
  const totalLoss = allTrades.reduce((sum, trade) => sum + Math.abs(Math.min(0, trade.profitLoss)), 0);
  const netProfit = totalProfit - totalLoss;

  const stats = [
    { title: "Total Trades", value: totalTrades, color: "text-gray-700" },
    { title: "Profitable Trades", value: profitableTrades, color: "text-blue-600" },
    { title: "Losing Trades", value: losingTrades, color: "text-red-600" },
    { title: "Net Profit", value: `$${netProfit.toFixed(2)}`, color: netProfit >= 0 ? "text-blue-600" : "text-red-600" },
    { title: "Total Profit", value: `$${totalProfit.toFixed(2)}`, color: "text-blue-600" },
    { title: "Total Loss", value: `$${totalLoss.toFixed(2)}`, color: "text-red-600" },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
