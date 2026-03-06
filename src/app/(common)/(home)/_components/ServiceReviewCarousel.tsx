"use client"

import { useGetAllServiceReviewsQuery } from "@/redux/features/serviceReview/serviceReviewApi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { motion } from "framer-motion";

const ServiceReviewCarousel = () => {
    const { data: reviews, isLoading } = useGetAllServiceReviewsQuery({});

    if (isLoading || !reviews?.data?.length) return null;

    return (
        <section className="py-20 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-success/5 rounded-full blur-[120px] -z-10"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] -z-10"></div>

            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16 space-y-4">
                    <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-success font-black uppercase tracking-[0.3em] text-[10px] italic bg-success/10 px-4 py-1.5 rounded-full border border-success/20"
                    >
                        Customer Testimonials
                    </motion.span>
                    <motion.h2 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter italic"
                    >
                        Echoes of <span className="text-success">Excellence.</span>
                    </motion.h2>
                    <div className="flex justify-center">
                        <div className="h-1 w-20 bg-gradient-to-r from-transparent via-success to-transparent rounded-full"></div>
                    </div>
                </div>

                <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
                    spaceBetween={30}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    className="pb-16"
                >
                    {reviews?.data?.map((review: { _id: string; rating: number; feedback: string; user: { name: string } }, index: number) => (
                        <SwiperSlide key={review._id}>
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white/[0.03] backdrop-blur-2xl border border-white/5 rounded-[2.5rem] p-8 h-full flex flex-col relative group hover:border-success/20 transition-all duration-500"
                            >
                                <div className="absolute top-6 right-8 text-success/20 group-hover:text-success/40 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C20.1216 16 21.017 16.8954 21.017 18V21H14.017ZM14.017 21C14.017 22.1046 14.9124 23 16.017 23H19.017C20.1216 23 21.017 22.1046 21.017 21V18M3 21L3 18C3 16.8954 3.89543 16 5 16H8C9.10457 16 10 16.8954 10 18V21H3ZM3 21C3 22.1046 3.89543 23 5 23H8C9.10457 23 10 22.1046 10 21V18M10 8C10 4.68629 7.31371 2 4 2V5C5.65685 5 7 6.34315 7 8H10ZM21 8C21 4.68629 18.3137 2 15 2V5C16.6569 5 18 6.34315 18 8H21Z" /></svg>
                                </div>
                                
                                <div className="rating rating-xs mb-6 pointer-events-none">
                                    {[...Array(5)].map((_, i) => (
                                        <input 
                                            key={i}
                                            type="radio" 
                                            name={`rating-${review._id}`} 
                                            className={`mask mask-star-2 ${i < review.rating ? "bg-success" : "bg-gray-700"}`} 
                                            checked={i + 1 === review.rating}
                                            readOnly 
                                        />
                                    ))}
                                </div>

                                <p className="text-gray-400 text-sm italic leading-relaxed mb-8 flex-1">
                                    &quot;{review?.feedback || "No feedback provided."}&quot;
                                </p>

                                <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                                    <div className="avatar placeholder">
                                        <div className="bg-gradient-to-br from-success/20 to-blue-500/20 text-white font-black italic rounded-2xl w-12 border border-white/10 shadow-lg">
                                            <span>{(review?.user?.name || "Member").charAt(0)}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-black uppercase tracking-tight italic text-sm group-hover:text-success transition-colors">
                                            {review?.user?.name || "Anonymous Member"}
                                        </h4>
                                        <div className="badge badge-outline border-white/10 text-gray-500 text-[8px] font-bold tracking-widest italic h-auto py-0.5">
                                            Verified Diner
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            
            <style jsx global>{`
                .swiper-pagination-bullet {
                    background: rgba(255, 255, 255, 0.2) !important;
                    width: 6px !important;
                    height: 6px !important;
                    transition: all 0.3s ease !important;
                }
                .swiper-pagination-bullet-active {
                    background: #22c55e !important;
                    width: 24px !important;
                    border-radius: 4px !important;
                    box-shadow: 0 0 15px rgba(34, 197, 94, 0.4);
                }
            `}</style>
        </section>
    );
};

export default ServiceReviewCarousel;
