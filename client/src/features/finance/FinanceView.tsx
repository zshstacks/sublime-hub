"use client";

import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { BalanceCards } from "@/features/finance/components/BalanceCards";
import { TransactionItem } from "@/features/finance/components/TransactionItem";
import { SpendingCategories } from "@/features/finance/components/SpendingCategories";
import AddTransactionModal from "@/features/finance/components/AddTransactionModal";

const FinanceView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full min-h-full p-8 flex flex-col gap-8">
      {/* Header */}
      <div className="flex justify-between items-center w-full">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Finance
          </h1>
          <p className="text-white/40 text-sm mt-1">
            Keep track of your income and expenses
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen((v) => !v)}
          className="bg-[#4F46E5] hover:bg-[#4338CA] px-6 py-2.5 rounded-xl flex items-center gap-2 font-semibold text-white transition-all shadow-lg shadow-indigo-500/10 cursor-pointer"
        >
          <FiPlus size={20} /> Add Transaction
        </button>
        {isModalOpen && <AddTransactionModal setIsModalOpen={setIsModalOpen} />}
      </div>

      {/* Balance, Income, Expenses */}
      <BalanceCards />

      {/*  Transactions and Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
        {/* Transaction History  */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <TransactionItem
            name="Apple Subscription"
            date="24 Dec 2025"
            category="Entertainment"
            amount={14.99}
            type="expense"
          />

          <TransactionItem
            name="Stripe Payout"
            date="22 Dec 2025"
            category="Salary"
            amount={2400.0}
            type="income"
          />
        </div>

        {/* Categories & Spending  */}
        <div className="lg:col-span-4 space-y-6">
          <SpendingCategories />
        </div>
      </div>
    </div>
  );
};

export default FinanceView;
