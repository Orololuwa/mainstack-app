"use client";

import { useGetWalletQuery } from "@/redux/wallet/wallet.service";
import { Button, InfoIcon } from "mainstack-library";
import DummyChart from "./dummy-chart";

export default function Wallet() {
  const { data, isFetching } = useGetWalletQuery(null, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  if (isFetching) return <WalletSkeleton />;

  return (
    <div className="grid grid-cols-2 w-full  max-w-6xl">
      <div className="mb-12">
        <div className="flex items-center gap-20 mb-12">
          <div>
            <p className="text-gray-500 text-sm mb-1">Available Balance</p>
            <span className="text-3xl font-bold mb-4">
              USD {data?.balance.toLocaleString()}
            </span>
          </div>
          <Button size="lg">Withdraw</Button>
        </div>
        <DummyChart />
      </div>
      <div className="grid grid-cols-2 gap-8 mb-12">
        <div></div>
        <div className="space-y-8">
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-500 text-sm mr-1">Ledger Balance</p>
              <InfoIcon />
            </div>
            <span className="text-2xl font-bold">
              USD {data?.ledger_balance.toLocaleString()}
            </span>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-500 text-sm mr-1">Total Payout</p>
              <InfoIcon />
            </div>
            <span className="text-2xl font-bold">
              USD {data?.total_payout.toLocaleString()}
            </span>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-500 text-sm mr-1">Total Revenue</p>
              <InfoIcon />
            </div>
            <span className="text-2xl font-bold">
              USD {data?.total_revenue.toLocaleString()}
            </span>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-500 text-sm mr-1">Pending Payout</p>
              <InfoIcon />
            </div>
            <span className="text-2xl font-bold">
              USD {data?.pending_payout.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
function WalletSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-8 w-full max-w-6xl animate-pulse">
      <div className="gap-8 mb-12">
        <div className="grid grid-cols-2">
          <div className="">
            <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
            <div className="h-8 w-48 bg-gray-200 rounded mb-4"></div>
          </div>
          <div>
            <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
            <div className="h-8 w-48 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="mt-12">
          <div className="h-64 w-full bg-gray-200 rounded"></div>
          <div className="flex justify-between mt-2">
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
      <div className="ml-auto gap-8 mb-12">
        <div className="space-y-8">
          {Array(4)
            .fill(0)
            .map((i) => (
              <div key={i}>
                <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
                <div className="h-8 w-48 bg-gray-200 rounded"></div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
