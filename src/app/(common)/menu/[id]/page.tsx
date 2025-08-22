"use client";

import FoodCard from "@/components/ui/FoodCard";
import FoodDetail from "@/components/ui/FoodDetail";
import { useAllFoodsByCategoriesQuery } from "@/redux/features/category/categoryApi";
import { useSingleFoodQuery } from "@/redux/features/food/foodApi";
import { TFood } from "@/types/food";
import { use } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";

const FoodDetails = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const { data: food, isLoading } = useSingleFoodQuery(id);
  const categoryId = food?.data?.category?._id;
  const { data: relatedFoods } = useAllFoodsByCategoriesQuery(categoryId);

  const foods =
    relatedFoods?.data?.filter((item: TFood) => item._id !== food?.data?._id) ||
    [];

  return (
    <div>
      <FoodDetail food={food?.data} />
      <div>
        <h2 className="font-bold text-2xl">Related Category Foods</h2>
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          centeredSlides={true}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          {foods?.map((food: TFood) => (
            <SwiperSlide key={food?._id}>
              <FoodCard key={food?._id} food={food} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default FoodDetails;
