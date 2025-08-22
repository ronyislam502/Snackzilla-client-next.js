"use client";

import { useSingleFoodQuery } from "@/redux/features/food/foodApi";
import { use } from "react";

const FoodDetails = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const { data: food, isLoading } = useSingleFoodQuery(id);
  console.log("food", food);
  return (
    <div>
      <h2>food Details</h2>
    </div>
  );
};

export default FoodDetails;
