import { TUser } from "@/redux/features/auth/authSlice";
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

export type TOrder = {
  _id: string;
  user: TUser;
  foods: TFood[];
  tax: number;
  totalPrice: number;
  totalQuantity: number;
  grandAmount: number;
  status: string;
  paymentStatus: string;
  transactionId: string;
  createdAt: string;
  updatedAt: string;
};
