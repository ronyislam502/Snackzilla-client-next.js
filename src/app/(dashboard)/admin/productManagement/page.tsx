"use client";

import TableSkeleton from "@/components/ui/skeleton/TableSkeleton";
import { useAllFoodsQuery } from "@/redux/features/food/foodApi";
import { TFood } from "@/types/food";
import React, { useState } from "react";
import DeleteFood from "./_component/DeleteFood";
import AddFood from "./_component/AddFood";
import UpdateFood from "./_component/UpdateFood";
import { motion, AnimatePresence } from "framer-motion";

const FoodManagement = () => {
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const { data: foods, isLoading } = useAllFoodsQuery({ page, limit });
    const totalPages = foods?.meta?.totalPage || 1;

    return (
        <div className="p-2 md:p-6 space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-neutral/20 p-6 rounded-3xl border border-white/5 backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-success/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-success/10 transition-colors duration-700"></div>
                
                <div className="space-y-1 relative z-10">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">Dish Gallery</h2>
                    <div className="flex items-center gap-3">
                        <span className="text-success font-medium text-[10px] tracking-[0.2em] uppercase">Inventory Overview</span>
                        <div className="h-px w-12 bg-success/30"></div>
                        <span className="bg-success text-black px-3 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                            {foods?.meta?.total || 0} Total Dishes
                        </span>
                    </div>
                </div>
            </div>
             <div className="relative z-10 -top-20 right-0 bottom-140 left-240">
                    <AddFood />
            </div>

            {/* Table Section */}
            <div className="bg-neutral/10 rounded-3xl border border-white/5 overflow-hidden shadow-2xl backdrop-blur-sm shadow-inner">
                <div className="overflow-x-auto">
                    <table className="table w-full border-separate border-spacing-y-2 px-4">
                        <thead>
                            <tr className="text-gray-500 uppercase text-[9px] font-black tracking-[0.2em] border-none">
                                <th className="bg-transparent pl-6">Identity</th>
                                <th className="bg-transparent">Details</th>
                                <th className="bg-transparent text-center">Price</th>
                                <th className="bg-transparent text-center">Category</th>
                                <th className="bg-transparent text-center">Status</th>
                                <th className="bg-transparent text-right pr-6">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {isLoading ? (
                                <TableSkeleton columns={6} rows={limit} />
                            ) : (
                                <AnimatePresence mode="popLayout">
                                    {foods?.data?.map((food: TFood, index: number) => (
                                        <motion.tr 
                                            key={food?._id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="group bg-[#0f0f0f] hover:bg-neutral/40 transition-all duration-300 rounded-xl shadow-sm border border-white/5"
                                        >
                                            <td className="pl-6 py-4 rounded-l-xl border-none">
                                                <div className="flex items-center gap-4">
                                                    <div className="relative w-12 h-12 shrink-0">
                                                        <div className="absolute inset-0 bg-success/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                                        <img 
                                                            src={food?.image} 
                                                            alt={food?.name}
                                                            className="w-full h-full object-cover rounded-xl border border-white/10 relative z-10 shadow-lg group-hover:scale-105 transition-transform duration-500" 
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="border-none py-4">
                                                <div className="space-y-0.5">
                                                    <p className="font-black text-white text-sm group-hover:text-success transition-colors duration-300 uppercase tracking-tighter italic">
                                                        {food?.name}
                                                    </p>
                                                    <p className="text-gray-500 text-[9px] line-clamp-1 font-medium max-w-xs uppercase tracking-widest leading-relaxed">
                                                        {food?.description}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="border-none py-4 text-center font-black text-white tracking-tighter text-sm italic">
                                                ${food?.price?.toFixed(2)}
                                            </td>
                                            <td className="border-none py-4 text-center">
                                                <span className="px-2.5 py-0.5 bg-white/5 border border-white/5 rounded-md text-gray-400 text-[9px] font-black uppercase tracking-widest group-hover:bg-white/10 transition-colors italic">
                                                    {food?.category?.name}
                                                </span>
                                            </td>
                                            <td className="border-none py-4 text-center">
                                                <div className="flex justify-center">
                                                    {food?.isDeleted ? (
                                                        <span className="flex items-center gap-1 text-error font-black uppercase tracking-[0.15em] text-[8px]">
                                                            <div className="w-1 h-1 rounded-full bg-error animate-pulse"></div>
                                                            Deleted
                                                        </span>
                                                    ) : (
                                                        <span className="flex items-center gap-1 text-success font-black uppercase tracking-[0.15em] text-[8px]">
                                                            <div className="w-1 h-1 rounded-full bg-success"></div>
                                                            Active
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="rounded-r-xl border-none pr-6 py-4 text-right">
                                                <div className="flex justify-end items-center gap-2">
                                                    <UpdateFood food={food} />
                                                    <DeleteFood food={food} />
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Section */}
                {Number(foods?.meta?.total) > limit && (
                    <div className="p-6 border-t border-white/5 bg-neutral/5 flex items-center justify-between">
                        <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">
                            Page <span className="text-white">{page}</span> of <span className="text-white">{totalPages}</span>
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                className="group relative px-4 py-1.5 rounded-lg bg-white/5 text-gray-400 font-bold hover:text-white hover:bg-white/10 transition-all border border-white/5 disabled:opacity-30 disabled:pointer-events-none uppercase text-[9px] tracking-widest overflow-hidden"
                                disabled={page <= 1}
                                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                Prev
                            </button>
                            <button
                                className="group relative px-4 py-1.5 rounded-lg bg-success text-black font-black hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(34,197,94,0.2)] disabled:opacity-30 disabled:pointer-events-none uppercase text-[9px] tracking-widest overflow-hidden"
                                disabled={page >= totalPages}
                                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FoodManagement;
