"use client";

import SectionTitle from "@/components/shared/SectionTitle";
import FoodCard from "@/components/ui/FoodCard";
import { useAllFoodsQuery } from "@/redux/features/food/foodApi";
import { TFood } from "@/types/food";

const FeatureFoods = () => {
  const { data: foods, isLoading } = useAllFoodsQuery({});

  return (
    <div className="my-4">
      <SectionTitle subHeading="" heading="Feature Foods" />
      <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-6">
        {foods?.data?.slice(0, 6).map((food: TFood) => (
          <FoodCard key={food?._id} food={food} />
        ))}
      </div>
    </div>
  );
};

export default FeatureFoods;
