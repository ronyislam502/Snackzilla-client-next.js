"use client";

import FoodCard from "@/components/ui/FoodCard";
import FoodDetail from "@/components/ui/FoodDetail";
import { useAllFoodsByCategoriesQuery } from "@/redux/features/category/categoryApi";
import { useSingleFoodQuery } from "@/redux/features/food/foodApi";
import { TFood } from "@/types/food";
import { use } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";


const FoodDetails = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const { data: food } = useSingleFoodQuery(id);
  const categoryId = food?.data?.category?._id;
  const { data: relatedFoods } = useAllFoodsByCategoriesQuery(categoryId);

  const foods =
    relatedFoods?.data?.filter((item: TFood) => item._id !== food?.data?._id) ||
    [];

  return (
    <div>
      <FoodDetail food={food?.data} />
      <div className="mt-16">
        <h2 className="font-black text-3xl text-white uppercase tracking-tighter italic mb-6 leading-none">
          Related <br />
          <span className="text-success text-xl tracking-widest">Creations.</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {foods?.map((food: TFood) => (
            <FoodCard key={food?._id} food={food} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
