import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { UserResponse } from "./types";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    getUser: build.query<UserResponse, null>({
      query: () => `/user`,
    }),
  }),
});

export const { useGetUserQuery } = userApi;
