import { Fragment, useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogPanel,
  Transition,
} from "@headlessui/react";
import { CloseIcon, RadioDropdown } from "mainstack-library";
import { TransactionStatus, TransactionType } from "@/redux/transactions/types";
import { useTransactions } from "@/contexts/transactions.context";
import { formatISODate } from "@/utils/date-formatter";
import moment from "moment";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const txTypeOptions = [
  { label: "Withdrawals", value: TransactionType.WITHDRAWAL },
  { label: "Deposit", value: TransactionType.DEPOSIT },
];
const txStatusOptions = [
  { label: "Pending", value: TransactionStatus.PENDING },
  { label: "Successful", value: TransactionStatus.SUCCESSFUL },
  { label: "Failed", value: TransactionStatus.FAILED },
];

export default function FilterDrawer({ isOpen, onClose }: DrawerProps) {
  const {
    typeFilter,
    statusFilter,
    setTypeFilter,
    setStatusFilter,
    dateRange,
    setDateRange,
  } = useTransactions();

  const [selectedTimeframe, setSelectedTimeframe] = useState<string | null>(
    null
  );

  const timeframes = [
    { id: "today", label: "Today" },
    { id: "last7days", label: "Last 7 days" },
    { id: "thismonth", label: "This month" },
    { id: "last3months", label: "Last 3 months" },
  ];

  const getDateRange = (timeframeId: string) => {
    const now = moment();
    switch (timeframeId) {
      case "today":
        return {
          startDate: now.startOf("day"),
          endDate: now.endOf("day"),
        };
      case "last7days":
        return {
          startDate: now.subtract(7, "days").startOf("day"),
          endDate: moment().endOf("day"),
        };
      case "thismonth":
        return {
          startDate: now.startOf("month"),
          endDate: now.endOf("month"),
        };
      case "last3months":
        return {
          startDate: now.subtract(3, "months").startOf("month"),
          endDate: moment().endOf("month"),
        };
      default:
        return {
          startDate: "",
          endDate: "",
        };
    }
  };

  useEffect(() => {
    if (selectedTimeframe) {
      const range = getDateRange(selectedTimeframe);
      setDateRange({
        startDate: formatISODate(range.startDate.toLocaleString()),
        endDate: formatISODate(range.endDate.toLocaleString()),
      });
    } else {
      setDateRange({ startDate: "", endDate: "" });
    }
  }, [selectedTimeframe]);

  return (
    <>
      <Transition
        as={Fragment}
        show={isOpen}
        enter="ease-in-out duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in-out duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className="fixed inset-0 bg-gray-500/30 transition-opacity"
          onClick={onClose}
        />
      </Transition>
      <Transition
        show={isOpen}
        enter="transform transition ease-in-out duration-500"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transform transition ease-in-out duration-500"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 overflow-hidden right-0 flex max-w-full px-2 rounded-3xl">
                <DialogPanel className="pointer-events-auto w-screen max-w-md py-4">
                  <div className="flex h-full flex-col overflow-y-scroll overflow-x-hidden bg-white rounded-3xl shadow-lg scrollbar-hide">
                    <div className="px-4 py-6 sm:px-6">
                      <div className="flex items-center justify-between">
                        <DialogTitle className="text-lg font-semibold">
                          Filter
                        </DialogTitle>
                        <button
                          type="button"
                          className="rounded-md text-gray-400 hover:text-gray-500"
                          onClick={onClose}
                        >
                          <span className="sr-only">Close panel</span>
                          <CloseIcon />
                        </button>
                      </div>
                    </div>
                    <div className="relative flex-1 px-1">
                      <div className="px-4 py-3 max-w-xl">
                        <div className="flex gap-1 mb-6">
                          {timeframes.map((timeframe) => (
                            <button
                              key={timeframe.id}
                              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap border ${
                                selectedTimeframe === timeframe.id
                                  ? "bg-gray-100 text-gray-800 border-gray-100"
                                  : "bg-white text-gray-800 border-gray-700"
                              }`}
                              onClick={() =>
                                setSelectedTimeframe(() =>
                                  selectedTimeframe === timeframe.id
                                    ? null
                                    : timeframe.id
                                )
                              }
                            >
                              {timeframe.label}
                            </button>
                          ))}
                        </div>

                        <div className="mb-6">
                          <h3 className="text-base font-medium mb-2">
                            Date Range
                          </h3>
                          <div className="flex gap-3">
                            <div className="relative w-full flex justify-between gap-2">
                              <input
                                type="date"
                                className="cursor-pointer flex items-center justify-between bg-gray-100 rounded-lg px-4 py-3 w-full"
                                onChange={(e) =>
                                  setDateRange((prev) => ({
                                    ...prev,
                                    startDate: e.target.value,
                                  }))
                                }
                                value={dateRange.startDate}
                              />
                              <input
                                type="date"
                                className="cursor-pointer flex items-center justify-between bg-gray-100 rounded-lg px-4 py-3 w-full"
                                onChange={(e) =>
                                  setDateRange((prev) => ({
                                    ...prev,
                                    endDate: e.target.value,
                                  }))
                                }
                                value={dateRange.endDate}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="mb-6">
                          <h3 className="text-base font-bold pb-2">
                            Transaction Type
                          </h3>
                          <RadioDropdown
                            options={txTypeOptions}
                            defaultSelectedOptions={typeFilter}
                            onChange={(selected) => setTypeFilter(selected)}
                          />
                        </div>

                        <div className="mb-6">
                          <h3 className="text-base font-bold pb-2">
                            Transaction Status
                          </h3>
                          <RadioDropdown
                            options={txStatusOptions}
                            defaultSelectedOptions={statusFilter}
                            onChange={(selected) => setStatusFilter(selected)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogPanel>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
