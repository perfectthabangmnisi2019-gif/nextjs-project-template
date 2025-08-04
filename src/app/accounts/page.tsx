"use client";

import React, { useState } from "react";
import { useTrading } from "../../context/TradingContext";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

export default function AccountsPage() {
  const { accounts, addAccount, deleteAccount } = useTrading();
  const [name, setName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const handleAdd = () => {
    if (name.trim() && accountNumber.trim()) {
      addAccount(name.trim(), accountNumber.trim());
      setName("");
      setAccountNumber("");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Accounts</h1>
        <p className="text-gray-600">Manage your funded trading accounts</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add New Account</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 max-w-md">
            <input
              type="text"
              placeholder="Account Name (e.g. FundedNext)"
              className="rounded border border-gray-300 px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Account Number (e.g. 127856957)"
              className="rounded border border-gray-300 px-3 py-2"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
            <Button onClick={handleAdd} disabled={!name || !accountNumber}>
              Add Account
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account) => (
          <Card key={account.id}>
            <CardHeader>
              <CardTitle>{account.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Account Number: {account.accountNumber}</p>
              <p>Created: {new Date(account.createdAt).toLocaleDateString()}</p>
              <button
                className="mt-2 rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                onClick={() => deleteAccount(account.id)}
              >
                Delete
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
