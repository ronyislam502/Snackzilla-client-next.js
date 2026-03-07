"use client";

import { StarIcon } from "@/components/shared/Icons";
import { TReview } from "@/types/review";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface ReviewListProps {
  reviews: TReview[];
}

const ReviewList = ({ reviews }: ReviewListProps) => {
  const [visibleCount, setVisibleCount] = useState(10);

  if (reviews.length === 0) {
    return (
      <div className="text-center py-20 bg-[#0a0a0a]/20 rounded-3xl border border-dashed border-white/10">
        <p className="text-gray-500 font-black uppercase tracking-widest italic text-xs">
          No cinematic experiences shared yet.
        </p>
      </div>
    );
  }

  const visibleReviews = reviews.slice(0, visibleCount);
  const hasMore = reviews.length > visibleCount;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-black text-white uppercase tracking-tighter italic mb-8 border-l-4 border-success pl-4">
        Top reviews from global patrons
      </h3>
      
      <div className="grid gap-6">
        {visibleReviews.map((review, index) => (
          <motion.div
            key={review._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (index % 10) * 0.1 }}
            className="group bg-[#0a0a0a]/40 p-6 rounded-2xl border border-white/5 hover:border-success/30 transition-all duration-500 shadow-xl"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/10 group-hover:border-success/50 transition-colors">
                <Image
                  src={review?.user?.avatar || "https://i.postimg.cc/85zXp9zH/user.png"}
                  alt={review?.user?.name || "User"}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-black text-white italic uppercase tracking-wider group-hover:text-success transition-colors">
                  {review?.user?.name}
                </p>
                <div className="flex items-center gap-1 text-warning mt-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <StarIcon 
                      key={s} 
                      size={10} 
                      fill={s <= review.rating ? "currentColor" : "none"} 
                      className={s <= review.rating ? "" : "text-gray-800"}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3">
               <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest italic">
                 Reviewed on {new Date(review.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
               </h4>
               <p className="text-gray-300 text-[13px] leading-relaxed italic font-medium border-l border-white/10 pl-4 group-hover:border-success/40 transition-colors">
                 &quot;{review.feedback}&quot;
               </p>
            </div>

            <div className="mt-6 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
               <button className="px-6 py-1.5 bg-white/5 border border-white/10 rounded-full text-[8px] font-black uppercase italic text-gray-400 hover:bg-white/10 hover:text-white transition-all">
                 Helpful
               </button>
               <span className="text-[8px] font-black text-gray-600 uppercase italic">Report Abuse</span>
            </div>
          </motion.div>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center pt-8">
          <button
            onClick={() => setVisibleCount((prev) => prev + 10)}
            className="group relative px-10 py-3 bg-success text-black font-black uppercase text-[10px] tracking-widest italic rounded-xl hover:scale-105 active:scale-95 transition-all shadow-[0_20px_40px_-10px_rgba(34,197,94,0.2)] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            View More Reviews
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewList;
