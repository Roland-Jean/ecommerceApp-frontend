import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: !!localStorage.getItem("authToken"),
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
};

export const authentificationSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.loading = false;
      state.error = null;
      // localStorage wird im Service gehandhabt
    },
    loginFailure: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.loading = false;
      state.error = null;
      // localStorage wird im Service gehandhabt
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateUser,
  clearError,
} = authentificationSlice.actions;

export default authentificationSlice.reducer;
