"use client";

import CategoryCard from "@/components/ui/CategoryCard";
import { useAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { TCategory } from "@/types/food";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CategoryManagement = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const { data: categories, isLoading } = useAllCategoriesQuery({
    page,
    limit,
  });
  const totalPages = categories?.meta?.totalPage || 1;

  return (
    <div className="p-4 md:p-8 space-y-10 lg:max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 bg-[#0a0a0a]/60 backdrop-blur-3xl p-6 md:p-8 rounded-3xl border border-success/20 relative overflow-hidden group hover:border-blue-500/40 hover:shadow-[0_0_50px_rgba(59,130,246,0.15)] transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-tr from-success/8 via-success/3 to-transparent transition-opacity duration-700 group-hover:opacity-0 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-success/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-blue-500/10 transition-colors duration-700 pointer-events-none"></div>
          
          <div className="space-y-1 relative z-10">
              <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter italic leading-none">
                Menu <span className="text-success group-hover:text-blue-400 transition-colors duration-500">Layers.</span>
              </h2>
              <div className="flex items-center gap-3">
                  <span className="text-gray-500 font-bold text-[10px] tracking-[0.2em] uppercase italic">Architecture Management</span>
                  <div className="h-px w-8 bg-success/20"></div>
                  <span className="text-gray-400 font-bold text-[9px] uppercase tracking-widest italic opacity-60">
                      SYSTEM STATUS: OPTIMIZED
                  </span>
              </div>
          </div>

          <div className="relative z-10 px-6 py-4 bg-white/[0.02] border border-white/5 rounded-2xl group-hover:bg-white/[0.04] transition-colors">
             <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest mb-0.5 italic">Total Units</p>
             <p className="text-2xl font-black text-white italic tracking-tighter">
                {String(categories?.meta?.total || 0).padStart(2, '0')}
             </p>
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {categories?.data?.map((category: TCategory, idx: number) => (
            <motion.div
              key={category?._id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <CategoryCard category={category} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {isLoading && (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="h-48 bg-white/[0.02] rounded-2xl animate-pulse border border-white/5" />
            ))}
         </div>
      )}

      {(categories?.meta?.total as number) > limit && (
        <div className="flex items-center justify-center gap-8 pt-10 border-t border-white/5">
          <button
            className="flex items-center gap-2 px-6 py-2.5 bg-white/[0.02] border border-white/5 rounded-xl text-[9px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-success hover:border-success/30 transition-all disabled:opacity-20 italic"
            disabled={page <= 1}
            onClick={() => setPage((prev: number) => Math.max(prev - 1, 1))}
          >
            PREVIOUS CYCLE
          </button>
          
          <div className="flex items-center gap-4">
             <div className="h-px w-6 bg-white/5"></div>
             <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-black text-white italic tracking-tighter">{page}</span>
                <span className="text-[8px] font-black text-gray-600 uppercase italic">OF</span>
                <span className="text-[12px] font-black text-gray-500 italic tracking-tighter">{totalPages}</span>
             </div>
             <div className="h-px w-6 bg-white/5"></div>
          </div>

          <button
            className="flex items-center gap-2 px-6 py-2.5 bg-white/[0.02] border border-white/5 rounded-xl text-[9px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-success hover:border-success/30 transition-all disabled:opacity-20 italic"
            disabled={page >= totalPages}
            onClick={() =>
              setPage((prev: number) => Math.min(prev + 1, totalPages))
            }
          >
            NEXT HORIZON
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;
