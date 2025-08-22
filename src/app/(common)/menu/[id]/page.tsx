"use client";

import FoodCard from "@/components/ui/FoodCard";
import FoodDetail from "@/components/ui/FoodDetail";
import { useAllFoodsByCategoriesQuery } from "@/redux/features/category/categoryApi";
import { useSingleFoodQuery } from "@/redux/features/food/foodApi";
import { TFood } from "@/types/food";
import { use } from "react";

const FoodDetails = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const { data: food, isLoading } = useSingleFoodQuery(id);
  const categoryId = food?.data?.category?._id;
  const { data: relatedFoods } = useAllFoodsByCategoriesQuery(categoryId);

  const foods =
    relatedFoods?.data?.filter((item: TFood) => item._id !== food?.data?._id) ||
    [];

  console.log("related", foods);

  return (
    <div>
      <FoodDetail food={food?.data} />
      {/* <div className="flex gap-2">
        {relatedFoods?.data?.map((food: TFood) => (
          <FoodCard key={food._id} food={food} />
        ))}
      </div> */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {foods.map((food: TFood) => (
          <FoodCard key={food._id} food={food} />
        ))}
      </div>
    </div>
  );
};

export default FoodDetails;
