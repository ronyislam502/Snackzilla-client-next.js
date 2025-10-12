"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { addToCart } from "@/redux/features/order/orderSlice";
import { TFood } from "@/types/food";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const FoodCard = ({ food }: { food: TFood }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (food: TFood) => {
    dispatch(addToCart(food));
    toast.success(`${food?.name} added to cart successfully!`, {
      autoClose: 1000,
    });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.02, boxShadow: "0px 6px 20px rgba(0,0,0,0.15)" },
  };

  const zoomInVariants: any = {
    hidden: { scale: 1 },
    visible: {
      scale: 1.1,
      transition: {
        duration: 6,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror",
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="bg-base-300 shadow-md rounded-lg cursor-pointer transition-all duration-300"
    >
      {/* ✅ Fixed image container with overflow-hidden */}
      <div className="relative w-full h-56 sm:h-64 md:h-72 rounded-t-lg overflow-hidden">
        <motion.div
          variants={zoomInVariants}
          initial="hidden"
          animate="visible"
          className="absolute inset-0"
        >
          <Image
            src={food?.image}
            alt={food?.name}
            height={300}
            width={500}
            className="object-cover w-full h-full brightness-95"
            sizes="(max-width: 640px) 100vw,
                   (max-width: 1024px) 50vw,
                   33vw"
            priority={false}
          />
        </motion.div>
      </div>

      {/* Text & Button */}
      <div className="p-4 text-center space-y-2">
        <Link href={`/menu/${food?._id}`}>
          <motion.h2
            whileHover={{ color: "#1d4ed8", scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="text-lg sm:text-lg md:text-lg font-semibold text-gray-800 dark:text-gray-100"
          >
            {food?.name}
          </motion.h2>
        </Link>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-8 text-sm md:text-base text-gray-600 dark:text-gray-300">
          <p>💰 Price: ${food?.price}</p>
          <p>⏱️ {food?.preparationTime} min</p>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{
            backgroundColor: "#16a34a",
            color: "#fff",
          }}
          onClick={() => handleAddToCart(food)}
          className="btn btn-outline btn-success rounded-lg px-6 py-2 text-sm md:text-base font-semibold mt-2"
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
};

export default FoodCard;
