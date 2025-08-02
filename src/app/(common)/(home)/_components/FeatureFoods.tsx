"use client";

import SectionTitle from "@/components/shared/SectionTitle";
import FoodCard from "@/components/ui/FoodCard";
import { useAllFoodsQuery } from "@/redux/features/food/foodApi";

const FeatureFoods = () => {
  const { data: foods, isLoading } = useAllFoodsQuery({});

  return (
    <div>
      <SectionTitle subHeading="" heading="Feature Foods" />
      <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-6">
        {foods?.data?.slice(0, 6).map((food: any) => (
          <FoodCard key={food?._id} food={food} />
        ))}
      </div>
    </div>
  );
};

export default FeatureFoods;
