// src/store/uiSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkMode: false,
  sidebarOpen: false,
  selectedCategory: null,
  currentPage: 1,
  itemsPerPage: 9,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.currentPage = 1; // Reset to first page when category changes
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    clearFilters: (state) => {
      state.selectedCategory = null;
      state.currentPage = 1;
    },
  },
});

// Make sure you export ALL the actions
export const { 
  toggleDarkMode, 
  toggleSidebar, 
  setSelectedCategory, 
  setCurrentPage, 
  clearFilters 
} = uiSlice.actions;

export default uiSlice.reducer;