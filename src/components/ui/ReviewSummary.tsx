"use client";

import { StarIcon } from "@/components/shared/Icons";
import { TReview } from "@/types/review";
import { motion } from "framer-motion";

interface ReviewSummaryProps {
  reviews: TReview[];
  averageRating: number;
  totalReviews: number;
}

const ReviewSummary = ({ reviews, averageRating, totalReviews }: ReviewSummaryProps) => {

  const ratingCounts = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((rev) => Math.round(rev.rating) === star).length;
    const percentage = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
    return { star, percentage };
  });

  return (
    <div className="space-y-6 bg-[#0a0a0a]/40 p-8 rounded-3xl border border-white/5 backdrop-blur-3xl h-full">
      <div className="space-y-1">
        <h3 className="text-xl font-black text-white uppercase tracking-tighter italic">Customer reviews</h3>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-warning">
            {[1, 2, 3, 4, 5].map((s) => (
              <StarIcon 
                key={s} 
                size={18} 
                fill={s <= Math.round(Number(averageRating)) ? "currentColor" : "none"} 
                className={s <= Math.round(Number(averageRating)) ? "" : "text-gray-700"}
              />
            ))}
          </div>
          <p className="text-lg font-black text-white italic">{averageRating} out of 5</p>
        </div>
        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest italic">
          {totalReviews} global ratings
        </p>
      </div>

      <div className="space-y-4">
        {ratingCounts.map(({ star, percentage }) => (
          <div key={star} className="flex items-center gap-4 group">
            <span className="w-12 text-[10px] font-black text-blue-400 uppercase italic tracking-wider hover:underline cursor-pointer">
              {star} star
            </span>
            <div className="flex-1 h-6 bg-white/5 rounded-md border border-white/5 overflow-hidden relative shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange-600 to-orange-400 group-hover:from-success group-hover:to-success/80 transition-colors duration-500"
              />
            </div>
            <span className="w-10 text-[10px] font-black text-blue-400 italic text-right">
              {percentage}%
            </span>
          </div>
        ))}
      </div>

      <div className="pt-6 border-t border-white/5">
        <div className="flex items-center justify-between group cursor-pointer">
           <p className="text-[10px] font-black text-blue-400 uppercase italic tracking-widest group-hover:text-success transition-colors">
             How customer reviews and ratings work
           </p>
           <motion.div
             whileHover={{ y: 2 }}
             className="text-blue-400 group-hover:text-success"
           >
             <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
             </svg>
           </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSummary;
