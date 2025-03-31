import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "./api/apiSlice";
import datasetReducer from "./dataset/datasetSlice";
import { thunk } from "redux-thunk";

export const store = configureStore({
  reducer: {
    api: apiReducer,
    dataset: datasetReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(thunk)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
