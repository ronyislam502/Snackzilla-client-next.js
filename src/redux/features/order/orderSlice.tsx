/* eslint-disable @typescript-eslint/no-explicit-any */
import { TFood } from "@/types/food";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  foods: [],
  selectedItems: 0,
  totalPrice: 0,
  tax: 0,
  taxRate: 0.1,
  grandTotal: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state: any, action: any) => {
      const isExist = state.foods.find(
        (food: TFood) => food._id === action.payload._id
      );

      if (!isExist) {
        state.foods.push({ ...action.payload, quantity: 1 });
      }

      state.selectedItems = selectSelectedItems(state);
      state.totalPrice = selectTotalPrice(state);
      state.tax = selectTax(state);
      state.grandTotal = selectGrandTotal(state);
    },
    updateQuantity: (state: any, action) => {
      const foods = state.foods.map((food: any) => {
        if (food._id === action.payload._id) {
          if (action.payload.type === "increment") {
            food.quantity += 1;
          } else if (action.payload.type === "decrement") {
            food.quantity -= 1;
          }
        }

        return food;
      });

      state.foods = foods.filter((food: any) => food.quantity > 0);

      state.selectedItems = selectSelectedItems(state);
      state.totalPrice = selectTotalPrice(state);
      state.tax = selectTax(state);
      state.grandTotal = selectGrandTotal(state);
    },
    removeFromCart: (state, action) => {
      state.foods = state.foods.filter(
        (food: TFood) => food._id !== action.payload._id
      );
      state.selectedItems = selectSelectedItems(state);
      state.totalPrice = selectTotalPrice(state);
      state.tax = selectTax(state);
      state.grandTotal = selectGrandTotal(state);
    },
    clearCart: (state) => {
      state.foods = [];
      state.selectedItems = 0;
      state.totalPrice = 0;
      state.tax = 0;
      state.grandTotal = 0;
    },
  },
});

export const selectSelectedItems = (state: any) =>
  state.foods.reduce((total: number, food: any) => {
    return Number(total + food.quantity);
  }, 0);

export const selectTotalPrice = (state: any) =>
  state.foods.reduce((total: number, food: any) => {
    return Number(total + food.quantity * food.price);
  }, 0);

export const selectTax = (state: any) =>
  selectTotalPrice(state) * state.taxRate;

export const selectGrandTotal = (state: any) => {
  return selectTotalPrice(state) + selectTotalPrice(state) * state.taxRate;
};

export const { addToCart, updateQuantity, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
