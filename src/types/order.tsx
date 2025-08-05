import { TFood } from "./food";

export type TCartItem = TFood;

export type TCartState = {
  user: string | null;
  foods: TCartItem[];
  selectedItems: number;
  totalPrice: number;
  tax: number;
  taxRate: number;
  grandTotal: number;
};
