import React from "react";
import "@testing-library/jest-dom";
import { beforeEach, describe, expect, it } from "@jest/globals";
import { renderHook, act, waitFor } from "@testing-library/react";
import {
  TransactionsProvider,
  TransactionsContext,
  TransactionsContextType,
} from "./transactions.context";
import { Provider } from "react-redux";
import { transactionsApi } from "@/redux/transactions/transactions.service";
import { setupApiStore } from "@/tests/mock-store";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

const mockData = [
  { type: "deposit", status: "successful", amount: 500 },
  { type: "withdrawal", status: "failed", amount: 300 },
  { type: "deposit", status: "pending", amount: 200 },
];

describe("TransactionsProvider", () => {
  const { store } = setupApiStore(transactionsApi);

  beforeEach(() => {
    fetchMock.resetMocks();
    fetchMock.mockResponseOnce(JSON.stringify(mockData));
  });

  it("should return all data when no filters are applied", async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>
        <TransactionsProvider>{children}</TransactionsProvider>
      </Provider>
    );

    let result: any;
    await act(async () => {
      const rendered = renderHook(() => React.useContext(TransactionsContext), {
        wrapper,
      });
      result = rendered.result;
    });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData);
    });
  });

  it("should properly filter data by transaction type", async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>
        <TransactionsProvider>{children}</TransactionsProvider>
      </Provider>
    );

    let result: {
      current: TransactionsContextType | undefined;
    } = { current: undefined };
    await act(async () => {
      const rendered = renderHook(() => React.useContext(TransactionsContext), {
        wrapper,
      });
      result = rendered.result;
    });

    await waitFor(() => {
      expect(result.current?.data).toBeDefined();
    });

    act(() => {
      result.current?.setTypeFilter([{ label: "Deposit", value: "deposit" }]);
    });

    await waitFor(() => {
      expect(result.current?.data).toEqual([
        { type: "deposit", status: "successful", amount: 500 },
        { type: "deposit", status: "pending", amount: 200 },
      ]);
    });
  });

  it("should properly filter data by transaction status", async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>
        <TransactionsProvider>{children}</TransactionsProvider>
      </Provider>
    );

    let result: {
      current: TransactionsContextType | undefined;
    } = { current: undefined };
    await act(async () => {
      const rendered = renderHook(() => React.useContext(TransactionsContext), {
        wrapper,
      });
      result = rendered.result;
    });

    await waitFor(() => {
      expect(result.current?.data).toBeDefined();
    });

    act(() => {
      result.current?.setStatusFilter([
        { label: "Successful", value: "successful" },
      ]);
    });

    await waitFor(() => {
      expect(result.current?.data).toEqual([
        { type: "deposit", status: "successful", amount: 500 },
      ]);
    });
  });
});
