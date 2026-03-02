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
      <SectionTitle subHeading="Signature dishes you can’t miss" heading="Feature Foods" />
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
        {isLoading ? (
          <CardSkeleton count={6} />
        ) : foods?.data?.slice(0, 6).length ? (
          foods.data
            .slice(0, 6)
            .map((food: TFood) => <FoodCard key={food._id} food={food} />)
        ) : (
          <p className="text-center col-span-3 text-gray-500 font-bold italic text-xs uppercase tracking-widest">No culinary creations found</p>
        )}
      </div>
      <div className="text-center mb-10">
        <Link href="/menu">
          <button className="px-8 py-2.5 bg-white/5 border border-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-success hover:border-success hover:text-black transition-all active:scale-95 italic">
            Behold All Creations
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FeatureFoods;
