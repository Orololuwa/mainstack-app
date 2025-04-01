"use client";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useMemo,
} from "react";
import { useGetTransactionsQuery } from "@/redux/transactions/transactions.service";
import { TransactionResponse } from "@/redux/transactions/types";

type FilterOptions = { label: string; value: string }[];
export interface TransactionsContextType {
  data: TransactionResponse | undefined;
  isFetching: boolean;
  typeFilter: FilterOptions;
  setTypeFilter: React.Dispatch<React.SetStateAction<FilterOptions>>;
  statusFilter: FilterOptions;
  setStatusFilter: React.Dispatch<React.SetStateAction<FilterOptions>>;
}

export const TransactionsContext = createContext<
  TransactionsContextType | undefined
>(undefined);

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const { data, isFetching } = useGetTransactionsQuery(null, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const [typeFilter, setTypeFilter] = useState<FilterOptions>([]);
  const [statusFilter, setStatusFilter] = useState<FilterOptions>([]);

  const filteredData = useMemo(() => {
    if (!data) return [];

    return data.filter((transaction) => {
      const matchesType =
        typeFilter.length === 0 ||
        typeFilter.some((filter) => filter.value === transaction.type);
      const matchesStatus =
        statusFilter.length === 0 ||
        statusFilter.some((filter) => filter.value === transaction.status);

      return matchesType && matchesStatus;
    });
  }, [data, typeFilter, statusFilter]);

  console.log({
    data,
    isFetching,
    typeFilter,
    statusFilter,
  });

  return (
    <TransactionsContext.Provider
      value={{
        data: filteredData,
        isFetching,
        typeFilter,
        setTypeFilter,
        statusFilter,
        setStatusFilter,
      }}
    >
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
