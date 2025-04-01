import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { transactionsApi } from "./transactions/transactions.service";
import { walletApi } from "./wallet/wallet.service";

const store = configureStore({
  reducer: {
    [transactionsApi.reducerPath]: transactionsApi.reducer,
    [walletApi.reducerPath]: walletApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      transactionsApi.middleware,
      walletApi.middleware
    ),
});

setupListeners(store.dispatch);

export default store;
