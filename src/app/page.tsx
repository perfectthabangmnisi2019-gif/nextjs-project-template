"use client";

import React from "react";
import { useTrading } from "../context/TradingContext";
import { DashboardStats } from "../components/dashboard/DashboardStats";
import { DashboardCharts } from "../components/dashboard/DashboardCharts";

export default function DashboardPage() {
  const { accounts, trades } = useTrading();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Track your trading performance across all accounts</p>
      </div>

      <DashboardStats accounts={accounts} trades={trades} />
      <DashboardCharts trades={trades} />
    </div>
  );
}
