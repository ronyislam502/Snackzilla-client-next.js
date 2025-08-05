"use client";

import { MinusIcon, PlusIcon, TrashIcon } from "@/components/shared/Icons";
import {
  removeFromCart,
  updateQuantity,
} from "@/redux/features/order/orderSlice";
import { useAppDispatch } from "@/redux/hooks";
import { TCartItem } from "@/types/order";

type TProps = {
  food: TCartItem;
};

const CartDetails = ({ food }: TProps) => {
  const dispatch = useAppDispatch();

  const handleQuantity = (type: "increment" | "decrement", _id: string) => {
    dispatch(updateQuantity({ type, _id }));
  };

  const handleRemove = (_id: string) => {
    dispatch(removeFromCart({ _id }));
  };

  return (
    <div className="flex items-center justify-between gap-4 border border-base-300 rounded-lg p-4 bg-base-100 shadow-md hover:shadow-lg hover:scale-105 transition-transform w-full">
      {/* Avatar */}
      <div className="avatar">
        <div className="w-16 h-16 rounded">
          <img src={food.image || ""} alt={food.name} />
        </div>
      </div>

      {/* Product Info */}
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-neutral truncate">
          {food.name}
        </h3>
        <p className="text-lg font-bold text-warning">
          ${(food.price * food.quantity).toFixed(2)}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <button
          className="btn btn-sm btn-error"
          disabled={food.quantity <= 1}
          onClick={() => handleQuantity("decrement", food._id)}
        >
          <MinusIcon />
        </button>
        <span className="text-lg font-semibold">{food.quantity}</span>
        <button
          className="btn btn-sm btn-primary"
          onClick={() => handleQuantity("increment", food._id)}
        >
          <PlusIcon />
        </button>
      </div>

      {/* Remove Button */}
      <button
        className="btn btn-sm btn-error"
        onClick={() => handleRemove(food._id)}
      >
        <TrashIcon />
      </button>
    </div>
  );
};

export default CartDetails;
