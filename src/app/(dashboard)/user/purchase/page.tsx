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
import OrderTimeline from "@/components/ui/OrderTimeline";
import ServiceReviewForm from "@/components/ui/ServiceReviewForm";
import { ChevronDownIcon, ChevronUpIcon, ShieldCheckIcon, DownloadIcon } from "@/components/shared/Icons";

const Purchase = () => {
    const [page, setPage] = useState(1);
    const [limit] = useState(7);
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
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
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-[#0a0a0a]/60 backdrop-blur-3xl p-6 md:p-8 rounded-3xl border border-success/20 relative overflow-hidden group hover:border-blue-500/40 hover:shadow-[0_0_50px_rgba(59,130,246,0.15)] transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-tr from-success/8 via-success/3 to-transparent transition-opacity duration-700 group-hover:opacity-0 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-success/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-blue-500/10 transition-colors duration-700"></div>
                
                <div className="space-y-1 relative z-10">
                    <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter italic leading-none">My <span className="text-success group-hover:text-blue-400 transition-colors duration-500">Orders.</span></h2>
                    <div className="flex items-center gap-3">
                        <span className="text-gray-500 font-bold text-[10px] tracking-[0.2em] uppercase italic">Acquisition Archive</span>
                        <div className="h-px w-8 bg-success/20 group-hover:bg-blue-500/20 transition-colors duration-500"></div>
                        <span className="bg-success/10 text-success border border-success/20 group-hover:bg-blue-500/10 group-hover:text-blue-400 group-hover:border-blue-500/30 transition-colors duration-500 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider italic">
                            {purchases?.meta?.total || 0} Records
                        </span>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-[#0a0a0a]/60 backdrop-blur-3xl rounded-3xl border border-success/20 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] relative group hover:border-blue-500/40 hover:shadow-[0_0_50px_rgba(59,130,246,0.15)] transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-tr from-success/8 via-success/3 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                <div className="overflow-x-auto relative z-10">
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
                                    {purchases?.data?.map((order: TOrder, index: number) => [
                                        <motion.tr 
                                            key={order._id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ delay: index * 0.05 }}
                                            className={`group bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 rounded-2xl border border-white/5 cursor-pointer ${expandedOrder === order._id ? 'bg-white/[0.05]' : ''}`}
                                            onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                                        >
                                            <td className="pl-8 py-4 rounded-l-2xl border-none">
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-1.5 rounded-lg border transition-all ${expandedOrder === order._id ? 'bg-success border-success text-black' : 'bg-white/5 border-white/10 text-gray-500 group-hover:border-success/30 group-hover:text-success'}`}>
                                                        {expandedOrder === order._id ? <ChevronUpIcon size={12} /> : <ChevronDownIcon size={12} />}
                                                    </div>
                                                    <p className="font-black text-white text-sm uppercase tracking-tighter italic">
                                                        {formatDate(order.createdAt)}
                                                    </p>
                                                </div>
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
                                                <div className="flex justify-end items-center gap-3" onClick={(e) => e.stopPropagation()}>
                                                    {order.status === "DELIVERED" && (
                                                        <ServiceReviewForm orderId={order._id} />
                                                    )}
                                                    {order.invoiceLink && (
                                                        <a 
                                                            href={order.invoiceLink} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500 hover:text-white transition-all duration-300"
                                                            title="Download Invoice"
                                                        >
                                                            <DownloadIcon size={14} />
                                                        </a>
                                                    )}
                                                    <AddReview id={order?._id} />
                                                    <CancelOrder order={order} />
                                                </div>
                                            </td>
                                        </motion.tr>,
                                        <AnimatePresence key={`expanded-${order._id}`}>
                                            {expandedOrder === order._id && (
                                                <motion.tr
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="bg-white/[0.01]"
                                                >
                                                    <td colSpan={6} className="px-12 py-6 border-none">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                                            <OrderTimeline history={order.statusHistory || []} />
                                                            <div className="space-y-4">
                                                                <div className="flex items-center gap-3 mb-4">
                                                                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                                                                        <ShieldCheckIcon size={16} />
                                                                    </div>
                                                                    <h4 className="text-[11px] font-black text-white uppercase tracking-widest italic">Verification Status</h4>
                                                                </div>
                                                                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-4 shadow-inner">
                                                                    <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest italic">
                                                                        <span className="text-gray-500">Global Identification:</span>
                                                                        <span className="text-white">{order._id}</span>
                                                                    </div>
                                                                    <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest italic">
                                                                        <span className="text-gray-500">Operation Status:</span>
                                                                        <span className="text-success">{order.status}</span>
                                                                    </div>
                                                                    <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest italic">
                                                                        <span className="text-gray-500">Financial Clearance:</span>
                                                                        <span className="text-success">{order.paymentStatus}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </motion.tr>
                                            )}
                                        </AnimatePresence>
                                    ])}
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
