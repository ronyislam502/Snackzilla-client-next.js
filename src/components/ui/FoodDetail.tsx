import { addToCart } from "@/redux/features/order/orderSlice";
import { useAppDispatch } from "@/redux/hooks";
import { TFood } from "@/types/food";
import Image from "next/image";
import { MinusIcon, PlusIcon, ShoppingCartIcon, ClockIcon, StarIcon } from "../shared/Icons";
import { toast } from "react-toastify";
import { useState } from "react";
import { motion } from "framer-motion";
import FoodReviewSection from "./FoodReviewSection";

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
        toast.success(`🍽️ ${quantity} × ${food?.name} in your collection!`, {
            autoClose: 1000,
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative"
        >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-success/10 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 blur-[100px] rounded-full -z-10" />

            <div className="flex flex-col lg:flex-row gap-10 items-center bg-[#0a0a0a]/30 p-8 md:p-10 rounded-3xl border border-white/5 backdrop-blur-3xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]">
                {/* Image Showcase */}
                <div className="w-full lg:w-1/2 relative group">
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="relative z-10 rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(34,197,94,0.1)] aspect-square"
                    >
                        {food?.image && (
                            <Image
                                src={food.image}
                                alt={food.name}
                                fill
                                className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                                priority
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    </motion.div>
                </div>

                {/* Details Hub */}
                <div className="w-full lg:w-1/2 space-y-8">
                    <div className="space-y-3">
                        <motion.div 
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="flex items-center gap-2.5"
                        >
                            <span className="px-3 py-1 bg-success text-black text-[8px] font-black uppercase tracking-[0.2em] rounded-full shadow-[0_0_30px_rgba(34,197,94,0.15)] italic">
                                Epicurean Selection
                            </span>
                        </motion.div>
                        
                        <motion.h1 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-[0.95] italic"
                        >
                            {food?.name}
                        </motion.h1>
                    </div>

                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-gray-400 text-sm md:text-[15px] leading-relaxed font-medium italic border-l-2 border-white/10 pl-5"
                    >
                        &quot;{food?.description}&quot;
                    </motion.p>

                    <div className="grid grid-cols-2 gap-6 pb-8 border-b border-white/5">
                        <div className="space-y-1">
                            <p className="text-[8px] font-black text-gray-500 uppercase tracking-[0.2em] italic">Value Entry</p>
                            <p className="text-3xl font-black text-white italic tracking-tighter">
                                <span className="text-success text-lg mr-1 italic">$</span>
                                {food?.price?.toFixed(2)}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[8px] font-black text-gray-500 uppercase tracking-[0.2em] italic">Kitchen Tempo</p>
                            <div className="flex items-center gap-2 text-white">
                                <ClockIcon size={16} className="text-success" />
                                <span className="text-2xl font-black tracking-tighter italic">{food?.preparationTime}min</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-6 pt-1">
                        {/* Custom Incrementer */}
                        <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-xl border border-white/5 shadow-inner">
                            <button
                                onClick={() => handleQuantity("decrement")}
                                className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 text-white hover:bg-red-500 hover:text-white transition-all active:scale-90 border border-white/5"
                            >
                                <MinusIcon size={14} />
                            </button>
                            <span className="w-8 text-center text-lg font-black text-white italic">{quantity}</span>
                            <button
                                onClick={() => handleQuantity("increment")}
                                className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 text-white hover:bg-success hover:text-black transition-all active:scale-90 border border-white/5"
                            >
                                <PlusIcon size={14} />
                            </button>
                        </div>

                        {/* Add to Cart CTA */}
                        <button
                            onClick={handleAddToCart}
                            className="group relative flex-1 w-full sm:w-auto flex items-center justify-center gap-2 bg-success text-black font-black py-4 px-8 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-[0_15px_40px_-10px_rgba(34,197,94,0.3)] overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            <ShoppingCartIcon size={16} />
                            <span className="uppercase tracking-[0.1em] text-[10px] font-black italic">Commence Order</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Cinematic Review Section */}
            <div className="mt-16">
                <FoodReviewSection foodId={food?._id} />
            </div>
        </motion.div>
    );
};

export default FoodDetail;
