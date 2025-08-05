"use client";

import { useAppSelector } from "@/redux/hooks";
import { TFood } from "@/types/food";
import React from "react";
import CartDetails from "./_components/CartDetails";
import OrderSummary from "./_components/OrderSummary";

const Cart = () => {
  const foods = useAppSelector((state) => state.cart.foods) as TFood[];

  console.log("food", foods);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 items-center">
      <div className="col-span-4">
        {foods.length ? (
          foods.map((food: TFood) => (
            <CartDetails key={food?._id} food={food} />
          ))
        ) : (
          <p className="text-2xl text-red-500 text-center">
            {" "}
            not product found
          </p>
        )}
      </div>
      <div className="col-span-2">
        <OrderSummary />
      </div>
    </div>
  );
};

export default Cart;
