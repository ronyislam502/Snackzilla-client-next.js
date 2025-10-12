"use client";

import { addToCart } from "@/redux/features/order/orderSlice";
import { useAppDispatch } from "@/redux/hooks";
import { TFood } from "@/types/food";
import Image from "next/image";
import { MinusIcon, PlusIcon } from "../shared/Icons";
import { toast } from "react-toastify";
import { useState } from "react";
import { motion } from "framer-motion";

const FoodDetail = ({ food }: { food: TFood }) => {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (type: "increment" | "decrement") => {
    setQuantity((prev) => {
      if (type === "increment") return prev + 1;
      if (type === "decrement" && prev > 1) return prev - 1;
      return prev;
    });
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ ...food, quantity }));
    toast.success(`${quantity} × ${food?.name} added to cart`, {
      autoClose: 1000,
    });
  };

  // Framer Motion Variants
  const containerVariants :any= {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const imageZoomVariants:any = {
    hidden: { scale: 1 },
    visible: {
      scale: 1.05,
      transition: {
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror",
      },
    },
  };

  return (
    <motion.div
      className="p-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
        {/* Animated Food Image */}
        {food?.image && (
          <div className="relative overflow-hidden rounded-xl w-full md:w-1/2">
            <motion.div
              variants={imageZoomVariants}
              initial="hidden"
              animate="visible"
            >
              <Image
                src={food?.image}
                alt={food?.name}
                width={500}
                height={500}
                className="rounded-xl object-cover w-full "
                priority
              />
            </motion.div>
          </div>
        )}

        {/* Food Details */}
        <motion.div
          className="flex flex-col md:w-1/2 text-center md:text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{food?.name}</h1>
          <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base mb-3 text-justify">
            {food?.description}
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-4 text-gray-800 dark:text-gray-200">
            <p>
              <span className="font-semibold">💰 Price:</span> ${food?.price}
            </p>
            <p>
              <span className="font-semibold">⏱️ Time:</span>{" "}
              {food?.preparationTime} min
            </p>
          </div>

          <div className="flex justify-center md:justify-start items-center gap-6 mt-4">
            {/* Quantity Control */}
            <div className="flex items-center gap-2">
              <button
                className="btn btn-sm btn-outline btn-error rounded-md"
                onClick={() => handleQuantity("decrement")}
              >
                <MinusIcon />
              </button>
              <span className="text-lg btn btn-sm btn-outline font-medium rounded-md">
                {quantity}
              </span>
              <button
                className="btn btn-sm btn-outline btn-primary rounded-md"
                onClick={() => handleQuantity("increment")}
              >
                <PlusIcon />
              </button>
            </div>

            {/* Add to Cart */}
            <button
              className="btn btn-sm btn-success btn-outline rounded-md"
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FoodDetail;
