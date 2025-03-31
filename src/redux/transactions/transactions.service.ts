import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { TransactionResponse } from "./types";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export const transactionsApi = createApi({
  reducerPath: "transactionsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    getTransactions: build.query<TransactionResponse, null>({
      query: () => `/transactions`,
    }),
  }),
});

export const { useGetTransactionsQuery } = transactionsApi;
