"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import Link from "next/link";
import SectionTitle from "../../shared/SectionTitle";

const Category = () => {
  const { data: categories, isLoading } = useAllCategoriesQuery({});

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div>
      <SectionTitle subHeading="Choice your" heading="category" />
      <div className="px-4">
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          centeredSlides={true}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {categories?.data?.map((category: any) => (
            <SwiperSlide key={category?._id}>
              <Link href={`/category/${category?._id}`}>
                <img
                  src={category?.icon || ""}
                  alt={category?.name}
                  className="rounded-xl w-50% h-64 object-cover"
                />
                <h3 className="text-2xl md:text-3xl font-bold uppercase text-center -mt-12 text-white bg-black bg-opacity-50 py-2">
                  {category?.name}
                </h3>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Category;
