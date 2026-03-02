"use client";

import TableSkeleton from "@/components/ui/skeleton/TableSkeleton";
import { formatDate } from "@/components/utilities/Date";
import { TUser } from "@/redux/features/auth/authSlice";
import { useMyOrdersQuery } from "@/redux/features/order/orderApi";
import { useAppSelector } from "@/redux/hooks";
import { TOrder } from "@/types/order";
import { useState } from "react";
import CancelOrder from "./_component/CancelOrder";
import AddReview from "./_component/AddReview";
import { motion, AnimatePresence } from "framer-motion";

const Purchase = () => {
    const [page, setPage] = useState(1);
    const [limit] = useState(7);
    const user = useAppSelector((state) => state?.auth?.user) as TUser;

    const { data: purchases, isLoading } = useMyOrdersQuery({
        user,
        page,
        limit,
    });

    const totalPages = purchases?.meta?.totalPage || 1;

    return (
        <div className="p-4 md:p-8 space-y-8 lg:max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-[#0a0a0a]/60 backdrop-blur-3xl p-6 md:p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-success/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-success/10 transition-colors duration-700"></div>
                
                <div className="space-y-1 relative z-10">
                    <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter italic leading-none">My <span className="text-success">Orders.</span></h2>
                    <div className="flex items-center gap-3">
                        <span className="text-gray-500 font-bold text-[10px] tracking-[0.2em] uppercase italic">Acquisition Archive</span>
                        <div className="h-px w-8 bg-success/20"></div>
                        <span className="bg-success/10 text-success border border-success/20 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider italic">
                            {purchases?.meta?.total || 0} Records
                        </span>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-[#0a0a0a]/40 backdrop-blur-3xl rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="table w-full border-separate border-spacing-y-2 px-6">
                        <thead>
                            <tr className="text-gray-500 uppercase text-[9px] font-black tracking-widest italic border-none text-center">
                                <th className="bg-transparent pl-8 text-left">Timeline</th>
                                <th className="bg-transparent">Transaction</th>
                                <th className="bg-transparent">Valuation</th>
                                <th className="bg-transparent">Quantum</th>
                                <th className="bg-transparent">Status</th>
                                <th className="bg-transparent pr-8 text-right">Operational</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {isLoading ? (
                                <TableSkeleton columns={6} rows={limit} />
                            ) : (
                                <AnimatePresence mode="popLayout">
                                    {purchases?.data?.map((order: TOrder, index: number) => (
                                        <motion.tr 
                                            key={order?._id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="group bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 rounded-2xl border border-white/5"
                                        >
                                            <td className="pl-8 py-4 rounded-l-2xl border-none">
                                                <p className="font-black text-white text-sm uppercase tracking-tighter italic">
                                                    {formatDate(order.createdAt)}
                                                </p>
                                            </td>
                                            <td className="border-none py-4 text-center">
                                                <p className="font-black text-success text-[10px] uppercase tracking-widest bg-success/10 border border-success/20 px-3 py-1 rounded-lg inline-block italic">
                                                    #{order?.transactionId?.slice(-8)}
                                                </p>
                                            </td>
                                            <td className="border-none py-4 text-center">
                                                <div className="flex flex-col gap-0.5 items-center">
                                                    <span className="text-gray-500 text-[9px] font-black uppercase tracking-widest italic">Base: ${order?.totalPrice.toFixed(2)}</span>
                                                    <span className="text-gray-500 text-[9px] font-black uppercase tracking-widest italic">Tax: ${order?.tax.toFixed(2)}</span>
                                                </div>
                                            </td>
                                            <td className="border-none py-4 text-center font-black text-white text-sm tracking-tighter italic">
                                                ${order?.grandAmount.toFixed(2)}
                                            </td>
                                            <td className="border-none py-4 text-center">
                                                <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest italic ${
                                                    order?.paymentStatus === "PAID" 
                                                    ? "bg-success/20 text-success border border-success/20" 
                                                    : "bg-warning/20 text-warning border border-warning/20"
                                                }`}>
                                                    {order?.paymentStatus}
                                                </span>
                                            </td>
                                            <td className="rounded-r-2xl border-none pr-8 py-4 text-right">
                                                <div className="flex justify-end items-center gap-3">
                                                    <AddReview id={order?._id} />
                                                    <CancelOrder order={order} />
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
                {totalPages > 1 && (
                    <div className="p-6 border-t border-white/5 flex items-center justify-center gap-8">
                        <button
                            className="p-3 rounded-xl bg-white/5 border border-white/5 text-white hover:bg-success hover:text-black transition-all active:scale-90 disabled:opacity-20"
                            disabled={page <= 1}
                            onClick={() => setPage((prev: number) => Math.max(prev - 1, 1))}
                        >
                            <span className="text-[10px] font-black uppercase tracking-widest italic px-4">Previous Records</span>
                        </button>
                        
                        <div className="text-center">
                            <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest italic mb-0.5">Sequence</p>
                            <span className="text-base font-black text-white italic tracking-tighter">
                                {page} <span className="text-success mx-1">/</span> {totalPages}
                            </span>
                        </div>

                        <button
                            className="p-3 rounded-xl bg-white/5 border border-white/5 text-white hover:bg-success hover:text-black transition-all active:scale-90 disabled:opacity-20"
                            disabled={page >= totalPages}
                            onClick={() => setPage((prev: number) => Math.min(prev + 1, totalPages))}
                        >
                            <span className="text-[10px] font-black uppercase tracking-widest italic px-4">Next Records</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Purchase;
