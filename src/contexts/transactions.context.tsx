"use client";
import React, { createContext, useContext, ReactNode } from "react";
import { useGetTransactionsQuery } from "@/redux/transactions/transactions.service";
import { TransactionResponse } from "@/redux/transactions/types";

interface TransactionsContextType {
  data: TransactionResponse | undefined;
  isFetching: boolean;
}

const TransactionsContext = createContext<TransactionsContextType | undefined>(
  undefined
);

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const { data, isFetching } = useGetTransactionsQuery(null, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  return (
    <TransactionsContext.Provider value={{ data, isFetching }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);
  if (context === undefined) {
    throw new Error(
      "useTransactions must be used within a TransactionsProvider"
    );
  }
  return context;
}
