import { configureStore } from "@reduxjs/toolkit";
import treeSlice from "./services/slice";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        [treeSlice.reducerPath]: treeSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(treeSlice.middleware),
})

setupListeners(store.dispatch);
