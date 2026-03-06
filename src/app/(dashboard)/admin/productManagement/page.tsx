"use client";

import TableSkeleton from "@/components/ui/skeleton/TableSkeleton";
import { useAllFoodsQuery } from "@/redux/features/food/foodApi";
import { TFood } from "@/types/food";
import React, { useState } from "react";
import DeleteFood from "./_component/DeleteFood";
import AddFood from "./_component/AddFood";
import UpdateFood from "./_component/UpdateFood";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const FoodManagement = () => {
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [search, setSearch] = useState("");
    const { data: foods, isLoading } = useAllFoodsQuery({ page, limit, search });
    const totalPages = foods?.meta?.totalPage || 1;

    return (
        <div className="p-2 md:p-6 space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-[#0a0a0a]/60 p-6 rounded-[2rem] border border-white/5 backdrop-blur-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-success/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-blue-500/10 transition-colors duration-700"></div>
                
                <div className="space-y-1 relative z-10">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">Dish Gallery</h2>
                    <div className="flex items-center gap-3">
                        <span className="text-success font-medium text-[10px] tracking-[0.2em] uppercase italic">Inventory Overview</span>
                        <div className="h-px w-12 bg-success/30"></div>
                        <span className="bg-success/10 text-success border border-success/20 px-3 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider italic">
                            {foods?.meta?.total || 0} Total Dishes
                        </span>
                    </div>
                </div>

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <div className="relative group/search w-full md:w-80">
                        <input 
                            type="text" 
                            placeholder="IDENTIFY_SPECIMEN..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-[11px] font-black text-white outline-none focus:border-success/30 transition-all italic placeholder:text-gray-700"
                        />
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within/search:text-success transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        </div>
                    </div>
                    <AddFood />
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-[#0a0a0a]/60 rounded-3xl border border-white/5 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-3xl group hover:border-blue-500/40 hover:shadow-[0_0_50px_rgba(59,130,246,0.15)] transition-all duration-500 relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-success/8 via-success/3 to-transparent transition-opacity duration-700 group-hover:opacity-0 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <div className="relative z-10 overflow-x-auto">
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
                                            className="group relative bg-[#0f0f0f]/40 hover:bg-[#0a0a0a]/60 transition-all duration-500 rounded-xl border border-white/5 hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]"
                                        >
                                            <td className="pl-6 py-5 rounded-l-2xl border-none relative overflow-hidden group/cell">
                                                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-success/0 via-success/30 to-success/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                <div className="flex items-center gap-4 relative z-10">
                                                    <div className="relative w-12 h-12 shrink-0">
                                                        <div className="absolute inset-0 bg-success/10 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                                        <Image 
                                                            src={food?.image || "/placeholder.png"} 
                                                            alt={food?.name || "Dish image"}
                                                            fill
                                                            className="object-cover rounded-xl border border-white/10 relative z-10 shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-700" 
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="border-none py-5 relative group/cell">
                                                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500/30 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                <div className="space-y-1 relative z-10">
                                                    <p className="font-black text-white text-sm group-hover:text-blue-400 transition-colors duration-500 uppercase tracking-tighter italic leading-none">
                                                        {food?.name}
                                                    </p>
                                                    <p className="text-success text-[10px] line-clamp-1 font-bold tracking-widest leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity">
                                                        {food?.description}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="border-none py-5 text-center relative group/cell">
                                                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-success/0 via-success/30 to-success/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                <span className="relative z-10 font-black text-white tracking-tighter text-[13px] italic bg-white/5 px-2 py-1 rounded-lg border border-white/5 group-hover:border-success/20 group-hover:bg-success/5 transition-all">
                                                    ${food?.price?.toFixed(2)}
                                                </span>
                                            </td>
                                            <td className="border-none py-5 text-center relative group/cell">
                                                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500/30 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                <span className="relative z-10 px-3 py-1 bg-white/[0.02] border border-white/5 rounded-full text-gray-500 text-[9px] font-black uppercase tracking-widest group-hover:text-blue-400 group-hover:border-blue-500/20 transition-all italic">
                                                    {food?.category?.name}
                                                </span>
                                            </td>
                                            <td className="border-none py-5 text-center relative group/cell">
                                                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-success/0 via-success/30 to-success/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                <div className="relative z-10 flex justify-center">
                                                    {food?.isDeleted ? (
                                                        <span className="flex items-center gap-1.5 text-error px-3 py-1 bg-error/5 border border-error/10 rounded-full font-black uppercase tracking-[0.2em] text-[8px] italic">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-error shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
                                                            OFFLINE
                                                        </span>
                                                    ) : (
                                                        <span className="flex items-center gap-1.5 text-success px-3 py-1 bg-success/5 border border-success/10 rounded-full font-black uppercase tracking-[0.2em] text-[8px] italic shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-success shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                                                            ACTIVE
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="rounded-r-2xl border-none pr-6 py-5 text-right relative group/cell">
                                                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500/30 to-blue-500/0 group-hover:opacity-100 transition-opacity" />
                                                <div className=" z-10 flex justify-end items-center gap-2">
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
