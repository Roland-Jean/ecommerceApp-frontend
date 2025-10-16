// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import uiReducer from './uiSlice';
import searchReducer from './searchSlice';
import authentificationReducer from './authentificationSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    ui: uiReducer,
    search: searchReducer,
    auth: authentificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export default store;