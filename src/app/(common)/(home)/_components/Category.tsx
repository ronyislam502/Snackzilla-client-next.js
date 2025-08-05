"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay"; // autoplay এর জন্য
import { Pagination, Autoplay } from "swiper/modules"; // Autoplay module ইম্পোর্ট
import { useAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import SectionTitle from "@/components/shared/SectionTitle";
import Image from "next/image";
import CategorySkeleton from "@/components/ui/skeleton/CategorySkeleton";
import { TCategory } from "@/types/food";
import { useRouter } from "next/navigation";

const Category = () => {
  const router = useRouter();
  const { data: categories, isLoading } = useAllCategoriesQuery({});

  if (isLoading) return <CategorySkeleton />;

  return (
    <div className="my-6">
      <SectionTitle subHeading="" heading="our categories" />
      <div className="px-4">
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
          {categories?.data?.map((category: TCategory) => (
            <SwiperSlide
              key={category?._id}
              onClick={() => router.push(`/menu?category=${category._id}`)}
              className="cursor-pointer"
            >
              <Image
                src={category?.icon || ""}
                alt={category?.name}
                height={500}
                width={500}
                className="rounded-xl w-50% h-64 object-cover"
              />
              <h3 className="text-2xl md:text-3xl font-bold uppercase text-center -mt-12 mr-4 text-white bg-black bg-opacity-50 py-2">
                {category?.name}
              </h3>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Category;
