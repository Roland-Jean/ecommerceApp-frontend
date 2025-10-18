import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  total: 0,
  itemCount: 0,
  isOpen: false,
};

// Helper function to extract price
const getPrice = (price) => {
  if (typeof price === "number") {
    return price;
  }
  if (typeof price === "string") {
    // Remove currency symbols and convert to number
    return parseFloat(price.replace(/[^0-9.-]+/g, "")) || 0;
  }
  return 0;
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      // Recalculate totals - FIXED
      state.itemCount = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      state.total = state.items.reduce((sum, item) => {
        const price = getPrice(item.price);
        return sum + price * item.quantity;
      }, 0);
    },

    removeItem: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter((i) => i.id !== action.payload.id);
      }

      // Recalculate totals - FIXED
      state.itemCount = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      state.total = state.items.reduce((sum, item) => {
        const price = getPrice(item.price);
        return sum + price * item.quantity;
      }, 0);
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        item.quantity = quantity;
      }

      // Recalculate totals - FIXED
      state.itemCount = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      state.total = state.items.reduce((sum, item) => {
        const price = getPrice(item.price);
        return sum + price * item.quantity;
      }, 0);
    },

    deleteItem: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);

      // Recalculate totals - FIXED
      state.itemCount = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      state.total = state.items.reduce((sum, item) => {
        const price = getPrice(item.price);
        return sum + price * item.quantity;
      }, 0);
    },

    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },

    openCart: (state) => {
      state.isOpen = true;
    },

    closeCart: (state) => {
      state.isOpen = false;
    },

    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.itemCount = 0;
    },

    // Original actions with fixed price handling
    increment: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      state.itemCount = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      state.total = state.items.reduce((sum, item) => {
        const price = getPrice(item.price);
        return sum + price * item.quantity;
      }, 0);
    },

    decrement: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter((i) => i.id !== action.payload.id);
      }

      state.itemCount = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      state.total = state.items.reduce((sum, item) => {
        const price = getPrice(item.price);
        return sum + price * item.quantity;
      }, 0);
    },

    update: (state, action) => {
      const index = state.items.findIndex((i) => i.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }

      state.itemCount = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      state.total = state.items.reduce((sum, item) => {
        const price = getPrice(item.price);
        return sum + price * item.quantity;
      }, 0);
    },

    reset: (state) => {
      state.items = [];
      state.total = 0;
      state.itemCount = 0;
    },
  },
});

export const {
  addItem,
  removeItem,
  updateQuantity,
  deleteItem,
  toggleCart,
  openCart,
  closeCart,
  clearCart,
  increment,
  decrement,
  update,
  reset,
} = cartSlice.actions;

export default cartSlice.reducer;
