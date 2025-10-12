"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
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

  // Zoom animation for category images
  const zoomInVariants:any = {
    hidden: { scale: 1 },
    visible: {
      scale: 1.1,
      transition: {
        duration: 5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror",
      },
    },
  };

  return (
    <div className="my-8">
      <SectionTitle subHeading="" heading="Our Categories" />
      <div className="px-3 sm:px-6 md:px-10">
        <Swiper
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 10 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 30 },
          }}
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
              className="cursor-pointer select-none"
            >
              <div className="relative overflow-hidden rounded-xl h-56 sm:h-64 md:h-72">
                <motion.div
                  variants={zoomInVariants}
                  initial="hidden"
                  animate="visible"
                  className="absolute inset-0"
                >
                  <Image
                    src={category?.icon || ""}
                    alt={category?.name}
                    fill
                    sizes="(max-width: 640px) 100vw,
                           (max-width: 1024px) 50vw,
                           25vw"
                    className="object-cover rounded-xl"
                  />
                </motion.div>

                {/* Overlay Text */}
                <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/60 to-transparent rounded-xl">
                  <h3 className="text-lg sm:text-2xl md:text-3xl font-bold uppercase text-white py-4 px-2 text-center">
                    {category?.name}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Category;
