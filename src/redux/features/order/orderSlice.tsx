import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TCartState } from "@/types/order";
import { TFood } from "@/types/food";

const initialState: TCartState = {
  user: null,
  foods: [],
  selectedItems: 0,
  totalPrice: 0,
  tax: 0,
  taxRate: 0.1,
  grandTotal: 0,
};

// Helper to calculate totals safely
const calculateTotals = (state: TCartState) => {
  state.selectedItems = state.foods.reduce(
    (total, food) => total + (food.quantity || 0),
    0
  );

  state.totalPrice = state.foods.reduce(
    (total, food) => total + (food.quantity || 0) * (food.price || 0),
    0
  );

  state.tax = state.totalPrice * state.taxRate;
  state.grandTotal = state.totalPrice + state.tax;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartUser: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
    },
    addToCart: (state, action: PayloadAction<TFood>) => {
      const existing = state.foods.find(
        (food) => food._id === action.payload._id
      );

      if (!existing) {
        state.foods.push({ ...action.payload, quantity: 1 });
      }

      calculateTotals(state);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ type: "increment" | "decrement"; _id: string }>
    ) => {
      state.foods = state.foods.map((food) =>
        food._id === action.payload._id
          ? {
              ...food,
              quantity:
                action.payload.type === "increment"
                  ? food.quantity + 1
                  : Math.max(food.quantity - 1, 1),
            }
          : food
      );

      calculateTotals(state);
    },

    removeFromCart: (state, action: PayloadAction<{ _id: string }>) => {
      state.foods = state.foods.filter(
        (food) => food._id !== action.payload._id
      );
      calculateTotals(state);
    },

    clearCart: (state) => {
      state.foods = [];
      calculateTotals(state);
    },
  },
});

export const {
  setCartUser,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
