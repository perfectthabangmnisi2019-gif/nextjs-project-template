"use client";

import React from "react";
import { useTrading } from "../../context/TradingContext";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const COLORS = {
  profit: "#3B82F6", // blue
  loss: "#EF4444",   // red
};

export const DashboardCharts = ({ trades }: { trades: any[] }) => {
  const { trades: allTrades } = useTrading();

  // Pie chart data: profit vs loss
  const profitLossData = [
    {
      name: "Profit",
      value: allTrades.filter((trade) => trade.profitLoss > 0).reduce((sum, trade) => sum + trade.profitLoss, 0),
    },
    {
      name: "Loss",
      value: Math.abs(allTrades.filter((trade) => trade.profitLoss < 0).reduce((sum, trade) => sum + trade.profitLoss, 0)),
    },
  ];

  // Bar chart data: profit/loss per instrument
  const instrumentData = allTrades.reduce((acc, trade) => {
    const existing = acc.find((item) => item.instrument === trade.instrument);
    if (existing) {
      existing.profit += Math.max(0, trade.profitLoss);
      existing.loss += Math.abs(Math.min(0, trade.profitLoss));
    } else {
      acc.push({
        instrument: trade.instrument,
        profit: Math.max(0, trade.profitLoss),
        loss: Math.abs(Math.min(0, trade.profitLoss)),
      });
    }
    return acc;
  }, [] as { instrument: string; profit: number; loss: number }[]);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Profit vs Loss Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={profitLossData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {profitLossData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? COLORS.profit : COLORS.loss} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Performance by Instrument</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={instrumentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="instrument" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="profit" fill={COLORS.profit} name="Profit" />
              <Bar dataKey="loss" fill={COLORS.loss} name="Loss" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
