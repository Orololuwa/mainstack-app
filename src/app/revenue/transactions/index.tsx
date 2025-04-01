"use client";

import { useTransactions } from "@/contexts/transactions.context";
import { TransactionType } from "@/redux/transactions/types";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  CaretDownIcon,
  DownloadIcon,
  Button,
} from "mainstack-library";
import { useState } from "react";
import FilterDrawer from "./filter";

export default function Transactions() {
  const { data, isFetching } = useTransactions();

  const [isOpen, setOpen] = useState(false);
  function onOpen() {
    setOpen(true);
  }
  function onClose() {
    setOpen(false);
  }

  return (
    <div className="w-full max-w-6xl">
      <div>
        <div className="flex justify-between items-center mb-2">
          <div>
            <h3 className="text-2xl! font-bold">{data?.length} Transactions</h3>
            <p className="text-gray-500 text-sm">
              Your transactions for the last 7 days
            </p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="secondary"
              className="flex items-center px-4 py-2 bg-gray-100 rounded-full gap-2"
              onClick={onOpen}
            >
              <p>Filter</p>
              <CaretDownIcon />
            </Button>
            <Button
              variant="secondary"
              className="flex items-center px-4 py-2 bg-gray-100 rounded-full gap-2"
            >
              <p>Export list</p>
              <DownloadIcon />
            </Button>
          </div>
        </div>

        <div className="">
          {isFetching && <Skeleton />}
          {!isFetching &&
            data?.map((transaction, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center p-4 border-t"
              >
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 ${
                      transaction.type === TransactionType.DEPOSIT
                        ? "bg-green-100"
                        : "bg-red-100"
                    } rounded-full flex items-center justify-center mr-4`}
                  >
                    {transaction.type === TransactionType.DEPOSIT ? (
                      <ArrowDownIcon className="text-green-500 rotate-180" />
                    ) : (
                      <ArrowUpIcon className="text-red-500 rotate-180" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">
                      {transaction.type === TransactionType.DEPOSIT
                        ? transaction.metadata?.product_name ??
                          transaction.metadata?.email
                        : "Cash Withdrawal"}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {transaction.metadata?.name ?? transaction.status}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">USD {transaction.amount}</p>
                  <p className="text-gray-500 text-sm">
                    {new Date(transaction.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <FilterDrawer isOpen={isOpen} onClose={onClose} />
    </div>
  );
}

function Skeleton() {
  const skeletonItems = Array(5).fill(0);

  return (
    <div className="w-full py-4">
      <div>
        <div className="space-y-4">
          {skeletonItems.map((_, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-4 border-t animate-pulse"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <div className="h-5 w-32 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div className="text-right">
                <div className="h-5 w-24 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
