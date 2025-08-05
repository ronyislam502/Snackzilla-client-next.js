// components/ui/skeleton/CategorySwiperSkeleton.tsx
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const CategorySkeleton = () => {
  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={30}
      centeredSlides={true}
      pagination={{ clickable: true }}
      modules={[Pagination]}
      className="mySwiper"
    >
      {Array.from({ length: 4 }).map((_, idx) => (
        <SwiperSlide key={idx}>
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-64 w-full rounded-xl bg-gray-300"></div>
            <div className="mt-2 h-6 w-3/4 rounded bg-gray-300"></div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CategorySkeleton;
