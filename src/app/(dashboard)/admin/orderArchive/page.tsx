"use client";

import TableSkeleton from "@/components/ui/skeleton/TableSkeleton";
import { formatDate } from "@/components/utilities/Date";
import { useAllOrdersQuery } from "@/redux/features/order/orderApi";
import { TOrder } from "@/types/order";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";


const OrderHistory = () => {
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [search, setSearch] = useState("");
    const { data: orders, isLoading } = useAllOrdersQuery({ page, limit, search });
    const totalPages = orders?.meta?.totalPage || 1;
    const totalRecords = orders?.meta?.total || 0;

    return (
    <div className="p-4 md:p-8 space-y-8 lg:max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-[#0a0a0a]/60 backdrop-blur-3xl p-6 md:p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-success/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-success/10 transition-colors duration-700"></div>
          
          <div className="space-y-1 relative z-10">
              <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter italic leading-none">Archive <span className="text-success">Ledger.</span></h2>
              <div className="flex items-center gap-3">
                  <span className="text-gray-500 font-bold text-[10px] tracking-[0.2em] uppercase italic">Historical Records Access</span>
                  <div className="h-px w-8 bg-success/20"></div>
                  <span className="bg-success/10 text-success border border-success/20 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider italic">
                      {totalRecords} TOTAL RECORDS
                  </span>
              </div>
          </div>

          <div className="relative z-10 w-full md:w-80 group/search">
            <input 
                type="text" 
                placeholder="QUERY_PROTOCOL..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-[11px] font-black text-white outline-none focus:border-success/30 transition-all italic placeholder:text-gray-700"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within/search:text-success transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
          </div>
      </div>

      <div className="bg-[#0a0a0a]/40 backdrop-blur-3xl border border-white/5 rounded-3xl overflow-hidden shadow-2xl relative group">
          <div className="absolute inset-0 bg-gradient-to-b from-success/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
          
          <div className="overflow-x-auto">
              <table className="w-full text-left border-separate border-spacing-0 italic">
                  <thead>
                      <tr className="bg-white/[0.01] border-b border-white/5">
                          <th className="px-8 py-5 text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] italic">Entry Date</th>
                          <th className="px-8 py-5 text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] italic">Transaction</th>
                          <th className="px-8 py-5 text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] italic text-center">Settlement</th>
                          <th className="px-8 py-5 text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] italic text-center">Logistics</th>
                          <th className="px-8 py-5 text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] italic text-right">Revenue</th>
                          <th className="px-8 py-5 text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] italic text-right">Detail</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.02]">
                      {isLoading ? (
                          <TableSkeleton columns={6} rows={limit} />
                      ) : (
                          <AnimatePresence mode="popLayout">
                              {(orders?.data?.length ?? 0) > 0 ? orders?.data?.map((order: TOrder, index: number) => (
                                  <motion.tr 
                                      key={order?._id}
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0, scale: 0.98 }}
                                      transition={{ delay: index * 0.03 }}
                                      className="group bg-[#0f0f0f]/30 hover:bg-white/[0.02] transition-colors"
                                  >
                                      <td className="px-8 py-4">
                                          <p className="font-black text-white text-[11px] uppercase tracking-tighter group-hover:text-success transition-colors">
                                              {formatDate(order.createdAt)}
                                          </p>
                                      </td>
                                      <td className="px-8 py-4">
                                          <p className="font-black text-gray-500 text-[8px] uppercase tracking-widest bg-white/5 border border-white/5 px-2.5 py-1 rounded-lg inline-block">
                                              #{order?.transactionId?.slice(-8)}
                                          </p>
                                      </td>
                                      <td className="px-8 py-4 text-center">
                                          <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-wider ${
                                              order?.paymentStatus === "PAID" 
                                              ? "bg-success/10 text-success border border-success/20 shadow-[0_0_15px_rgba(34,197,94,0.1)]" 
                                              : "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                                          }`}>
                                              {order?.paymentStatus}
                                          </span>
                                      </td>
                                      <td className="px-8 py-4 text-center">
                                          <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-wider ${
                                              order?.status === "SHIPPED" 
                                              ? "bg-success/10 text-success border border-success/20 shadow-[0_0_15px_rgba(34,197,94,0.1)]" 
                                              : order?.status === "CANCELLED"
                                              ? "bg-red-500/10 text-red-500 border border-red-500/20"
                                              : "bg-gray-500/10 text-gray-500 border border-gray-500/20"
                                          }`}>
                                              {order?.status}
                                          </span>
                                      </td>
                                      <td className="px-8 py-4 text-right font-black text-white text-[11px] tracking-tighter">
                                          ${order?.grandAmount.toFixed(2)}
                                      </td>
                                      <td className="px-8 py-4 text-right">
                                          <Link
                                              href={`/admin/orderManagement/${order._id}`}
                                              className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-500 hover:text-white border border-white/10 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all italic"
                                          >
                                              View
                                          </Link>
                                      </td>
                                  </motion.tr>
                              )) : (
                                  <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                      <td colSpan={6} className="py-20 text-center">
                                          <div className="flex flex-col items-center gap-4 opacity-20">
                                              <div className="w-12 h-12 rounded-2xl border-2 border-dashed border-gray-500"></div>
                                              <p className="text-[10px] uppercase font-black tracking-widest italic">No Records Found</p>
                                          </div>
                                      </td>
                                  </motion.tr>
                              )}
                          </AnimatePresence>
                      )}
                  </tbody>
              </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
              <div className="p-8 border-t border-white/5 bg-white/[0.01] flex items-center justify-between">
                  <div className="flex items-baseline gap-1.5 pl-4">
                      <span className="text-xl font-black text-white italic tracking-tighter">{page}</span>
                      <span className="text-[8px] font-black text-gray-600 uppercase">OF</span>
                      <span className="text-sm font-black text-gray-500 italic tracking-tighter">{totalPages}</span>
                      <span className="text-[8px] font-black text-gray-700 uppercase ml-2 italic">
                          ({totalRecords} records)
                      </span>
                  </div>

                  <div className="flex items-center gap-3">
                      {/* Page numbers */}
                      <div className="hidden md:flex items-center gap-1">
                          {Array.from({ length: totalPages }, (_, i) => i + 1)
                              .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                              .reduce<(number | "...")[]>((acc, p, idx, arr) => {
                                  if (idx > 0 && (p as number) - (arr[idx - 1] as number) > 1) acc.push("...");
                                  acc.push(p);
                                  return acc;
                              }, [])
                              .map((p, i) =>
                                  p === "..." ? (
                                      <span key={`ellipsis-${i}`} className="w-8 text-center text-gray-600 text-[9px] font-black">…</span>
                                  ) : (
                                      <button
                                          key={p}
                                          onClick={() => setPage(p as number)}
                                          className={`w-8 h-8 rounded-lg text-[9px] font-black uppercase transition-all duration-300 italic ${
                                              page === p
                                                  ? "bg-success text-black shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                                                  : "bg-white/[0.02] text-gray-500 hover:text-white hover:bg-white/5 border border-white/5"
                                          }`}
                                      >
                                          {p}
                                      </button>
                                  )
                              )}
                      </div>

                      <button
                          className="px-6 py-3 bg-white/[0.02] border border-white/5 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-success hover:border-success/30 hover:bg-success/5 transition-all disabled:opacity-20 disabled:grayscale italic"
                          disabled={page <= 1}
                          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                      >
                          ← Prev
                      </button>
                      <button
                          className="px-6 py-3 bg-success text-black rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-success/10 disabled:opacity-50 disabled:grayscale hover:scale-105 active:scale-95 italic"
                          disabled={page >= totalPages}
                          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                      >
                          Next →
                      </button>
                  </div>
              </div>
          )}
      </div>
    </div>
  );
};

export default OrderHistory;
