"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { addToCart } from "@/redux/features/order/orderSlice";
import { TFood } from "@/types/food";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { StarIcon, ShoppingCartIcon, ClockIcon } from "@/components/shared/Icons";

const FoodCard = ({ food }: { food: TFood }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (food: TFood) => {
    dispatch(addToCart(food));
    toast.success(`🍽️ ${food?.name} in your collection!`, {
      autoClose: 1000,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group relative bg-[#0a0a0a]/40 backdrop-blur-2xl border border-success/20 rounded-3xl p-3 transition-all duration-500 hover:border-blue-500/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] overflow-hidden"
    >
      {/* Default: success gradient always visible */}
      <div className="absolute inset-0 bg-gradient-to-br from-success/10 via-success/5 to-transparent transition-opacity duration-700 group-hover:opacity-0 pointer-events-none" />
      {/* Hover: blue gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Image Section */}
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 border border-success/10 group-hover:border-blue-500/20 transition-colors duration-500">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1] }}
          className="w-full h-full"
        >
          <Image
            src={food?.image}
            alt={food?.name}
            fill
            className="object-cover brightness-90 group-hover:brightness-110 transition-all duration-700"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </motion.div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <div className="px-3 py-1.5 bg-black/60 backdrop-blur-md border border-success/20 group-hover:border-blue-500/30 rounded-full text-[9px] font-black text-white uppercase tracking-widest flex items-center gap-2 transition-colors duration-500">
            <ClockIcon size={10} className="text-success group-hover:text-blue-400 transition-colors duration-500" />
            {food?.preparationTime} MIN
          </div>
        </div>

        {/* Add to Cart Button */}
        <div
          className="absolute bottom-3 right-3 h-10 w-10 bg-success group-hover:bg-blue-500 text-black rounded-xl flex items-center justify-center shadow-2xl scale-0 group-hover:scale-100 transition-all duration-500 hover:rotate-12 cursor-pointer"
          onClick={() => handleAddToCart(food)}
        >
          <ShoppingCartIcon size={18} />
        </div>
      </div>

      {/* Content Section */}
      <div className="px-2 pb-2 space-y-4 relative z-10">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <p className="text-[8px] font-black text-success/70 group-hover:text-blue-400/70 uppercase tracking-[0.2em] italic transition-colors duration-500">Signature</p>
            <div className="flex items-center gap-1 text-warning">
              <StarIcon size={7} />
              <span className="text-[8px] font-black italic">4.8</span>
            </div>
          </div>
          <Link href={`/menu/${food?._id}`}>
            <h3 className="text-lg font-black text-white uppercase tracking-tighter italic group-hover:text-blue-400 transition-colors duration-300 leading-tight">
              {food?.name}
            </h3>
          </Link>
        </div>

        <div className="flex items-end justify-between border-t border-success/10 group-hover:border-blue-500/10 pt-3 transition-colors duration-500">
          <div className="space-y-0.5">
            <p className="text-[8px] font-black text-gray-500 uppercase tracking-[0.2em] italic">Value</p>
            <p className="text-lg font-black text-white italic tracking-tighter">
              <span className="text-success group-hover:text-blue-400 text-[10px] mr-0.5 italic transition-colors duration-500">$</span>
              {food?.price}
            </p>
          </div>

          <Link href={`/menu/${food?._id}`}>
            <button className="h-8 px-5 bg-success/10 border border-success/20 rounded-lg text-[8px] font-black text-success uppercase tracking-widest group-hover:bg-blue-500/10 group-hover:border-blue-500/30 group-hover:text-blue-400 transition-all duration-500 active:scale-95 italic">
              Explore
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default FoodCard;
