"use client";

import { DeleteIcon, MinusIcon, PlusIcon } from "@/components/shared/Icons";
import {
  removeFromCart,
  updateQuantity,
} from "@/redux/features/order/orderSlice";
import { useAppDispatch } from "@/redux/hooks";
import { TCartItem } from "@/types/order";
import Image from "next/image";

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
    <div className="flex items-center justify-between gap-6 bg-[#0a0a0a]/60 backdrop-blur-3xl border border-success/20 rounded-2xl p-4 transition-all duration-500 hover:border-blue-500/40 shadow-[0_0_50px_rgba(0,0,0,0.5)] hover:shadow-[0_0_50px_rgba(59,130,246,0.15)] mb-4 group/cart-item relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-success/5 via-success/2 to-transparent transition-opacity duration-700 group-hover/cart-item:opacity-0 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-blue-500/5 to-transparent opacity-0 group-hover/cart-item:opacity-100 transition-opacity duration-700 pointer-events-none" />
      {/* Product Image */}
      <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-white/10 shadow-xl group">
        <Image src={food.image || ""} alt={food.name} width={100} height={100} className="object-cover transition-transform duration-700 group-hover:scale-110" />
      </div>

      {/* Product Info */}
      <div className="flex-grow space-y-0.5">
        <h3 className="text-base font-black text-white uppercase tracking-tighter italic leading-none group-hover:text-success transition-colors">
          {food?.name}
        </h3>
        <p className="text-[13px] font-black text-success italic tracking-tight">
          ${(food?.price * food?.quantity).toFixed(2)}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/5 shadow-inner">
        <button
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-white hover:bg-red-500 hover:text-white transition-all active:scale-90 border border-white/5 disabled:opacity-30 disabled:hover:bg-white/5"
          disabled={food?.quantity <= 1}
          onClick={() => handleQuantity("decrement", food?._id)}
        >
          <MinusIcon size={12} />
        </button>
        <span className="w-6 text-center text-sm font-black text-white italic">{food?.quantity}</span>
        <button
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-white hover:bg-success hover:text-black transition-all active:scale-90 border border-white/5"
          onClick={() => handleQuantity("increment", food?._id)}
        >
          <PlusIcon size={12} />
        </button>
      </div>

      {/* Remove Button */}
      <button
        className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 text-gray-500 hover:bg-red-500 hover:text-white transition-all active:scale-95 border border-white/5 shadow-xl"
        onClick={() => handleRemove(food._id)}
      >
        <DeleteIcon size={14} />
      </button>
    </div>
  );
};

export default CartDetails;
