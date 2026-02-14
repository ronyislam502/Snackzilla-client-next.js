"use client";

import SectionTitle from "@/components/shared/SectionTitle";
import FoodCard from "@/components/ui/FoodCard";
import CardSkeleton from "@/components/ui/skeleton/CardSkeleton";
import { useAllFoodsQuery } from "@/redux/features/food/foodApi";
import { TFood } from "@/types/food";
import Link from "next/link";

const FeatureFoods = () => {
  const { data: foods, isLoading } = useAllFoodsQuery({});

  return (
    <div className="my-4">
      <SectionTitle subHeading="" heading="Feature Foods" />
      <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-6 my-6">
        {isLoading ? (
          <CardSkeleton count={6} />
        ) : foods?.data?.slice(0, 6).length ? (
          foods.data
            .slice(0, 6)
            .map((food: TFood) => <FoodCard key={food._id} food={food} />)
        ) : (
          <p className="text-center col-span-3">No foods available</p>
        )}
      </div>
      <div className="text-center my-4">
        <Link href="/menu">
          <button className="btn btn-outline btn-success lg:w-1/12 rounded-lg">
            See More
          </button></Link>
      </div>
    </div>
  );
};

export default FeatureFoods;
