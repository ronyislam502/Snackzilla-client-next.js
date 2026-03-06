import { TCategory } from "@/types/food";
import React from "react";
import { motion } from "framer-motion";

const CategoryCard = ({ category }: { category: TCategory }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group relative overflow-hidden bg-[#0a0a0a]/60 backdrop-blur-3xl border border-success/20 rounded-2xl shadow-2xl transition-all duration-500 hover:border-blue-500/40 hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.2)] flex flex-col h-full"
    >
      {/* Default: success gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-success/8 via-success/3 to-transparent transition-opacity duration-700 group-hover:opacity-0 pointer-events-none" />
      {/* Hover: blue gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div className="relative h-40 overflow-hidden">
        <motion.img
          src={category?.icon}
          alt={category?.name}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 brightness-[0.4] group-hover:brightness-75 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-success/20 group-hover:bg-blue-500/20 backdrop-blur-md rounded-full border border-success/20 group-hover:border-blue-500/30 transition-colors duration-500">
          <span className="text-[7px] font-black text-white uppercase tracking-[0.2em]">Registry</span>
        </div>
      </div>

      <div className="p-6 text-center space-y-2 relative z-10">
        <h2 className="text-xl font-black text-white uppercase tracking-tighter italic group-hover:text-blue-400 transition-all duration-500">
          {category?.name}
        </h2>
        <div className="flex flex-col items-center gap-1.5">
          <p className="text-[8px] font-bold text-gray-500 uppercase tracking-[0.3em] italic">
            Sector Management
          </p>
          <div className="w-6 h-px bg-success/30 rounded-full group-hover:w-12 group-hover:bg-blue-400 transition-all duration-500" />
        </div>
      </div>

      {/* Ambient Backglow - blue on hover */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-success/[0.05] rounded-full blur-[60px] opacity-100 group-hover:bg-blue-500/[0.08] transition-colors duration-700 pointer-events-none" />
    </motion.div>
  );
};

export default CategoryCard;
