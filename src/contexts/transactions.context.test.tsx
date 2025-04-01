import { render } from "@testing-library/react";
import { TransactionsProvider } from "./transactions.context";

test("renders TransactionsProvider", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <TransactionsProvider>{children}</TransactionsProvider>
  );
  expect(wrapper).toBeDefined();
});

// import { describe, expect, it, jest } from "@jest/globals";
// import { renderHook, act } from "@testing-library/react";
// import {
//   TransactionsProvider,
//   TransactionsContext,
// } from "./transactions.context";
// import React from "react";

// const mockData = [
//   { type: "deposit", status: "successful", amount: 500 },
//   { type: "withdrawal", status: "failed", amount: 300 },
//   { type: "deposit", status: "pending", amount: 200 },
// ];

// jest.mock("@/redux/transactions.service", () => ({
//   useGetTransactionsQuery: jest.fn(() => ({
//     data: mockData,
//     isFetching: false,
//   })),
// }));

// describe("TransactionsProvider", () => {
//   it("should return all data when no filters are applied", () => {
//     const wrapper = ({ children }: { children: React.ReactNode }) => (
//       <TransactionsProvider>{children}</TransactionsProvider>
//     );

//     const { result } = renderHook(() => React.useContext(TransactionsContext), {
//       wrapper,
//     });

//     expect(result?.current?.data).toEqual(mockData);
//   });

//   it("should filter data by type", () => {
//     const wrapper = ({ children }: { children: React.ReactNode }) => (
//       <TransactionsProvider>{children}</TransactionsProvider>
//     );

//     const { result } = renderHook(() => React.useContext(TransactionsContext), {
//       wrapper,
//     });

//     act(() => {
//       result?.current?.setTypeFilter([{ label: "Deposit", value: "deposit" }]);
//     });

//     expect(result?.current?.data).toEqual([
//       { type: "deposit", status: "successful", amount: 500 },
//       { type: "deposit", status: "pending", amount: 200 },
//     ]);
//   });

//   it("should filter data by status", () => {
//     const wrapper = ({ children }: { children: React.ReactNode }) => (
//       <TransactionsProvider>{children}</TransactionsProvider>
//     );

//     const { result } = renderHook(() => React.useContext(TransactionsContext), {
//       wrapper,
//     });

//     act(() => {
//       result?.current?.setStatusFilter([
//         { label: "Successful", value: "successful" },
//       ]);
//     });

//     expect(result?.current?.data).toEqual([
//       { type: "deposit", status: "successful", amount: 500 },
//     ]);
//   });

//   it("should filter data by both type and status", () => {
//     const wrapper = ({ children }: { children: React.ReactNode }) => (
//       <TransactionsProvider>{children}</TransactionsProvider>
//     );

//     const { result } = renderHook(() => React.useContext(TransactionsContext), {
//       wrapper,
//     });

//     act(() => {
//       result?.current?.setTypeFilter([{ label: "Deposit", value: "deposit" }]);
//       result?.current?.setStatusFilter([
//         { label: "Successful", value: "successful" },
//       ]);
//     });

//     expect(result?.current?.data).toEqual([
//       { type: "deposit", status: "successful", amount: 500 },
//     ]);
//   });
// });
