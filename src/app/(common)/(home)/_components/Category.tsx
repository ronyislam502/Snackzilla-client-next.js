"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";
import { motion, Variants } from "framer-motion";
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
  const zoomInVariants: Variants = {
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
    <div className="my-10">
      <SectionTitle subHeading="Handpicked categories for every taste" heading="Our Categories" />
      <div className="px-3 sm:px-6 md:px-10">
        <Swiper
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 15 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 25 },
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
              <div className="relative overflow-hidden rounded-3xl h-48 sm:h-56 md:h-60 border border-success/20 bg-[#0a0a0a]/60 backdrop-blur-3xl group hover:border-blue-500/40 hover:shadow-[0_0_50px_rgba(59,130,246,0.15)] transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-tr from-success/8 via-success/3 to-transparent transition-opacity duration-700 group-hover:opacity-0 pointer-events-none z-20" />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20" />
                
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
                    className="object-cover brightness-[0.6] transition-all duration-700 group-hover:brightness-75"
                  />
                </motion.div>

                {/* Overlay Text */}
                <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/80 via-black/20 to-transparent z-30">
                  <h3 className="text-xl sm:text-2xl font-black uppercase text-white pb-6 px-4 text-center tracking-tighter italic leading-none group-hover:text-blue-400 transition-colors duration-500">
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
