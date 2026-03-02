"use client";

import { CreditCardIcon, DeleteIcon } from "@/components/shared/Icons";
import { clearCart } from "@/redux/features/order/orderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

const OrderSummary = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { tax, taxRate, grandTotal, totalPrice, selectedItems } =
    useAppSelector((state) => state.cart);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="w-full bg-[#0a0a0a]/40 backdrop-blur-3xl border border-white/5 p-6 rounded-3xl shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-success/5 via-transparent to-transparent opacity-50" />
      
      {/* Order Summary Title */}
      <div className="mb-6 space-y-1">
        <h2 className="text-xl font-black text-white uppercase tracking-tighter italic leading-none">Order <span className="text-success">Summary.</span></h2>
        <p className="text-gray-500 font-medium tracking-widest uppercase text-[8px] italic">Review your selection</p>
      </div>
 
      {/* Information Grid */}
      <div className="space-y-4 relative z-10">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest italic">Inventory Count</p>
          <p className="text-sm font-black text-white italic tracking-tighter">{selectedItems}</p>
        </div>
        
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest italic">Base Value</p>
          <p className="text-sm font-black text-white italic tracking-tighter">${totalPrice.toFixed(2)}</p>
        </div>

        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="space-y-0.5">
            <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest italic">Levy Allocation</p>
            <p className="text-[8px] font-bold text-gray-600 uppercase italic">Tax contribution {taxRate * 100}%</p>
          </div>
          <p className="text-sm font-black text-white italic tracking-tighter">${tax.toFixed(2)}</p>
        </div>

        <div className="flex items-center justify-between pt-2">
          <p className="text-xs font-black text-success uppercase tracking-[0.2em] italic">Aggregate Sum</p>
          <p className="text-2xl font-black text-white italic tracking-tighter">
            <span className="text-success text-sm mr-1">$</span>
            {grandTotal.toFixed(2)}
          </p>
        </div>
      </div>
 
      {/* Action Buttons */}
      <div className="mt-8 space-y-3 relative z-10">
        <button
          className="group w-full flex items-center justify-between bg-white/5 border border-white/10 p-3.5 rounded-xl text-white hover:bg-success hover:text-black transition-all active:scale-95 shadow-xl"
          onClick={(e) => {
            e.stopPropagation();
            router.push("/cart/checkOut");
          }}
        >
          <span className="text-[10px] font-black uppercase tracking-widest italic">Execute Checkout</span>
          <CreditCardIcon size={16} />
        </button>

        <button
          className="w-full flex items-center justify-between bg-white/[0.02] border border-white/5 p-3.5 rounded-xl text-gray-500 hover:bg-red-500 hover:text-white transition-all active:scale-95 italic"
          onClick={(e) => {
            e.stopPropagation();
            handleClearCart();
          }}
        >
          <span className="text-[10px] font-black uppercase tracking-widest">Wipe Collection</span>
          <DeleteIcon size={14} />
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
