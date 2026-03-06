"use client"

import { useTopSellingFoodsQuery } from "@/redux/features/statistics/statisticsApi";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const TopSellingFoods = () => {
    const { data: foods, isLoading } = useTopSellingFoodsQuery({}, {
        pollingInterval: 300000, // 5 minutes refresh
        refetchOnFocus: true
    });

    if (isLoading) return null; // Let skeleton handling be elsewhere if needed, or quiet return
    if (!foods?.data || !Array.isArray(foods.data) || foods.data.length === 0) return null;

    return (
        <section className="py-20 relative">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div className="space-y-4">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-blue-400 font-black uppercase tracking-[0.3em] text-[10px] italic bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20"
                        >
                            Most Wanted
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter italic leading-none"
                        >
                            Culinary <span className="text-blue-500">Hall of Fame.</span>
                        </motion.h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 text-gray-400 font-bold uppercase tracking-widest text-[9px] italic"
                    >
                        <span>Ranked by Popularity</span>
                        <div className="h-px w-12 bg-white/10"></div>
                        <span className="text-blue-500">Real-time stats</span>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {foods?.data?.slice(0, 8).map((food: { foodId: string; image: string; foodName: string; price: number; totalQuantity: number }, index: number) => (
                        <motion.div
                            key={food?.foodId || index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative"
                        >
                            <div className="absolute inset-0 bg-blue-500/5 rounded-[2.5rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                            <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[2.5rem] overflow-hidden p-6 hover:border-blue-500/20 transition-all duration-500 relative z-10">
                                <div className="relative h-48 mb-6 rounded-3xl overflow-hidden shadow-2xl bg-[#0a0a0a]">
                                    <Image
                                        src={food?.image || "https://i.ibb.co/L8N9Xm4/fallback-food.png"}
                                        alt={food?.foodName || "Culinary Creation"}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                                    <div className="absolute top-4 left-4">
                                        <div className="badge badge-neutral bg-black/60 backdrop-blur-md border border-white/10 gap-2 h-auto py-1.5 px-3">
                                            <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)] animate-pulse"></span>
                                            <span className="text-[10px] font-black text-white italic uppercase tracking-tighter">
                                                #{index + 1} Best Seller
                                            </span>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-4 right-4 text-white font-black italic text-xl drop-shadow-lg">
                                        ${(food?.price || 0).toFixed(2)}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-start gap-2">
                                        <h3 className="text-lg font-black text-white uppercase tracking-tighter italic leading-tight group-hover:text-blue-400 transition-colors truncate">
                                            {food?.foodName || "Unnamed Delicacy"}
                                        </h3>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                        <div className="flex items-center gap-3">
                                            <div className="indicator">
                                                <span className="indicator-item badge badge-blue-500 w-2 h-2 p-0 border-none group-hover:scale-110 transition-transform"></span>
                                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-white font-bold text-xs italic">{food?.totalQuantity || 0}</p>
                                                <p className="text-[8px] text-gray-500 uppercase font-black tracking-widest italic leading-none">Sold</p>
                                            </div>
                                        </div>

                                        <Link
                                            href={`/menu/${food?.foodId || ""}`}
                                            className="btn btn-xs h-9 rounded-xl px-4 bg-white/5 hover:bg-blue-500 border-white/10 hover:border-blue-500 text-white hover:text-black font-black uppercase italic tracking-widest transition-all"
                                        >
                                            Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <Link
                        href="/menu"
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-[11px] font-black uppercase tracking-[0.3em] italic group"
                    >
                        View Full Menu
                        <span className="w-8 h-px bg-gray-800 group-hover:w-12 group-hover:bg-blue-500 transition-all"></span>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default TopSellingFoods;
