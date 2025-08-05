"use client";

import { CreditCardIcon, TrashIcon } from "@/components/shared/Icons";
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
    <div className="w-full h-full bg-base-200 border-l-4 border-primary p-4 rounded-lg shadow-lg">
      {/* Order Summary Title */}
      <h2 className="text-2xl font-bold text-center mb-4">Order Summary</h2>

      {/* Table */}
      <table className="table w-full">
        <tbody>
          <tr>
            <td className="text-base">Total Quantity:</td>
            <td className="text-base text-right font-semibold">
              {selectedItems}
            </td>
          </tr>
          <tr>
            <td className="text-base">Total Price:</td>
            <td className="text-base text-right font-semibold">
              ${totalPrice.toFixed(2)}
            </td>
          </tr>
          <tr>
            <td className="text-base">Tax ({taxRate * 100}%):</td>
            <td className="text-base text-right font-semibold">
              ${tax.toFixed(2)}
            </td>
          </tr>
          <tr>
            <td className="text-lg font-bold pt-4">Grand Total:</td>
            <td className="text-lg font-bold text-right pt-4">
              ${grandTotal.toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Action Buttons */}
      <div className="mt-6 space-y-3">
        <button
          className="btn btn-error w-full flex justify-between"
          onClick={(e) => {
            e.stopPropagation();
            handleClearCart();
          }}
        >
          <span>Clear Cart</span>
          <TrashIcon />
        </button>

        <button
          className="btn btn-primary w-full flex justify-between"
          onClick={(e) => {
            e.stopPropagation();
            router.push("/cart/checkOut");
          }}
        >
          <span>Proceed Checkout</span>
          <CreditCardIcon />
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
