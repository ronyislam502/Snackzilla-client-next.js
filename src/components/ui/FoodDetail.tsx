"use client";

import { addToCart, updateQuantity } from "@/redux/features/order/orderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TFood } from "@/types/food";
import Image from "next/image";
import { MinusIcon, PlusIcon } from "../shared/Icons";
import { toast } from "react-toastify";
import { useState } from "react";

const FoodDetail = ({ food }: { food: TFood }) => {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (type: "increment" | "decrement") => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1);
    } else {
      if (quantity > 1) setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ ...food, quantity }));
    toast.success(
      `${quantity} item(s)
        ${food?.name} added to cart`,
      { autoClose: 1000 }
    );
  };

  return (
    <div className="p-4">
      <div className="flex gap-6">
        {food?.image && (
          <Image
            src={food?.image}
            alt={food?.name}
            height={500}
            width={500}
            className="rounded-xl"
          />
        )}
        <div>
          <h1 className="text-2xl font-bold">{food?.name}</h1>
          <p className="text-justify">{food?.description}</p>
          <div className="flex gap-6 mt-4">
            <p>
              <span className="font-bold">Price: $</span>
              {food?.price}
            </p>
            <p>
              <span className="font-bold">Time: </span>
              {food?.preparationTime} min
            </p>
          </div>
          <div className="flex gap-6 mt-2">
            <div className="flex gap-2">
              <button
                className="btn btn-sm btn-outline btn-error"
                onClick={() => handleQuantity("decrement")}
              >
                <MinusIcon />
              </button>
              <span className="text-lg btn btn-sm btn-outline font-medium">
                {quantity}
              </span>
              <button
                className="btn btn-sm btn-outline btn-primary"
                onClick={() => handleQuantity("increment")}
              >
                <PlusIcon />
              </button>
            </div>
            <button
              className="btn btn-sm btn-success btn-outline"
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetail;
