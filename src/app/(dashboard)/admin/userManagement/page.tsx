"use client";

import TableSkeleton from "@/components/ui/skeleton/TableSkeleton";
import UserDetails from "@/components/ui/UserDetails";
import { useAllUsersQuery } from "@/redux/features/user/userApi";
import { TUserDetail } from "@/types/user";
import Image from "next/image";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const UserManagement = () => {
    const [page, setPage] = useState(1);
    const [limit] = useState(8);
    const { data: users, isLoading } = useAllUsersQuery({ page, limit });
    const totalPages = users?.meta?.totalPage || 1;

    return (
    <div className="p-4 md:p-8 space-y-8 lg:max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-[#0a0a0a]/60 backdrop-blur-3xl p-6 md:p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-success/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-success/10 transition-colors duration-700"></div>
          
          <div className="space-y-1 relative z-10">
              <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter italic leading-none">Community <span className="text-success">Hub.</span></h2>
              <div className="flex items-center gap-3">
                  <span className="text-gray-500 font-bold text-[10px] tracking-[0.2em] uppercase italic">Personnel Database Management</span>
                  <div className="h-px w-8 bg-success/20"></div>
                  <span className="bg-success/10 text-success border border-success/20 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider italic">
                      {users?.meta?.total || 0} REGISTERED UNITS
                  </span>
              </div>
          </div>
      </div>

      <div className="bg-[#0a0a0a]/40 backdrop-blur-3xl border border-white/5 rounded-3xl overflow-hidden shadow-2xl relative group">
          <div className="absolute inset-0 bg-gradient-to-b from-success/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
          
          <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                  <thead>
                      <tr className="border-b border-white/5 bg-white/[0.01]">
                          <th className="px-8 py-5 text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] italic">Identity</th>
                          <th className="px-8 py-5 text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] italic">Electronic Comms</th>
                          <th className="px-8 py-5 text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] italic text-center">Clearance</th>
                          <th className="px-8 py-5 text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] italic text-center">Vitality</th>
                          <th className="px-8 py-5 text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] italic text-right pl-8 pr-10">Directives</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.02]">
                      {isLoading ? (
                          <TableSkeleton columns={5} rows={limit} />
                      ) : (
                          <AnimatePresence mode="popLayout">
                              {users?.data?.map((user: TUserDetail, index: number) => (
                                  <motion.tr 
                                      key={user?._id}
                                      initial={{ opacity: 0, scale: 0.98 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      exit={{ opacity: 0, scale: 0.98 }}
                                      transition={{ delay: index * 0.05 }}
                                      className="group/row bg-[#0f0f0f]/30 hover:bg-white/[0.02] transition-colors"
                                  >
                                      <td className="px-8 py-4">
                                          <div className="flex items-center gap-4">
                                              <div className="relative w-9 h-9 shrink-0">
                                                  <div className="w-full h-full rounded-xl border border-white/10 overflow-hidden bg-neutral-900 flex items-center justify-center group-hover/row:border-success/30 transition-colors">
                                                      {user?.avatar ? (
                                                          <Image src={user?.avatar} width={36} height={36} alt="avatar" className="object-cover w-full h-full grayscale group-hover/row:grayscale-0 group-hover/row:scale-110 transition-all duration-500" />
                                                      ) : (
                                                          <div className="text-[7px] text-gray-600 font-black uppercase italic">Null</div>
                                                      )}
                                                  </div>
                                              </div>
                                              <p className="font-black text-white text-[11px] uppercase tracking-tighter group-hover:text-success transition-all italic">
                                                  {user?.name}
                                              </p>
                                          </div>
                                      </td>
                                      <td className="px-8 py-4">
                                          <div className="space-y-0.5 pointer-events-none">
                                              <p className="text-white font-bold text-[10px] tracking-tight">{user?.email}</p>
                                              <p className="text-gray-500 text-[8px] font-black uppercase tracking-[0.2em] italic">{user?.phone || "UNREGISTERED"}</p>
                                          </div>
                                      </td>
                                      <td className="px-8 py-4 text-center">
                                          <span className={`px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-[8px] font-black uppercase tracking-widest italic ${user?.role === "ADMIN" ? "text-success border-success/20 bg-success/5 shadow-[0_0_15px_rgba(34,197,94,0.1)]" : "text-gray-500"}`}>
                                              {user?.role}
                                          </span>
                                      </td>
                                      <td className="px-8 py-4 text-center">
                                          <div className="flex justify-center items-center gap-2">
                                              <div className={`w-1 h-1 rounded-full ${user?.status === "BLOCKED" ? "bg-red-500 animate-pulse" : "bg-success shadow-[0_0_8px_rgba(34,197,94,0.5)]"}`}></div>
                                              <span className={`font-black uppercase tracking-widest text-[8px] italic ${user?.status === "BLOCKED" ? "text-red-500" : "text-success"}`}>
                                                  {user?.status}
                                              </span>
                                          </div>
                                      </td>
                                      <td className="px-8 py-4 text-right pr-6">
                                          <UserDetails user={user} />
                                      </td>
                                  </motion.tr>
                              ))}
                          </AnimatePresence>
                      )}
                  </tbody>
              </table>

              {totalPages > 1 && (
                  <div className="p-8 border-t border-white/5 bg-white/[0.01] flex items-center justify-between">
                       <div className="flex items-baseline gap-1.5 pl-4">
                          <span className="text-xl font-black text-white italic tracking-tighter">{page}</span>
                          <span className="text-[8px] font-black text-gray-600 uppercase">OF</span>
                          <span className="text-sm font-black text-gray-500 italic tracking-tighter">{totalPages}</span>
                       </div>
                      
                      <div className="flex items-center gap-4">
                          <button
                              className="px-6 py-3 bg-white/[0.02] border border-white/5 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-success hover:border-success/30 hover:bg-success/5 transition-all disabled:opacity-20 disabled:grayscale italic"
                              disabled={page <= 1}
                              onClick={() => setPage((prev: number) => Math.max(prev - 1, 1))}
                          >
                              Previous Cycle
                          </button>
                          <button
                              className="px-6 py-3 bg-success text-black rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-success/10 disabled:opacity-50 disabled:grayscale hover:scale-105 active:scale-95 italic"
                              disabled={page >= totalPages}
                              onClick={() => setPage((prev: number) => Math.min(prev + 1, totalPages))}
                          >
                              Next Horizon
                          </button>
                      </div>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};

export default UserManagement;
