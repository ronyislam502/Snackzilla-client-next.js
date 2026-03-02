"use client";

import React, { useState } from "react";
import SectionTitle from "@/components/shared/SectionTitle";
import TableSkeleton from "@/components/ui/skeleton/TableSkeleton";
import AddBlog from "./_component/createBlog";
import { useAllBlogsQuery } from "@/redux/features/blog/blogApi";
import UpdateBlog from "./_component/UpdateBlog";
import DeleteBlog from "./_component/DeleteBlog";
import { motion, AnimatePresence } from "framer-motion";

const truncateText = (text: string, length = 30) => {
    if (!text) return "";
    return text.length > length ? text.slice(0, length) + "..." : text;
};

const BlogManagement = () => {
    const [page, setPage] = useState(1);
    const [limit] = useState(7);

    const { data: blogs, isLoading } = useAllBlogsQuery({ page, limit });
    const totalPages = blogs?.meta?.totalPage || 1;

    return (
    <div className="p-4 md:p-8 space-y-8 lg:max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-[#0a0a0a]/60 backdrop-blur-3xl p-6 md:p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-success/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-success/10 transition-colors duration-700"></div>
          
          <div className="space-y-1 relative z-10">
              <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter italic leading-none">Insights <span className="text-success">Hub.</span></h2>
              <div className="flex items-center gap-3">
                  <span className="text-gray-500 font-bold text-[10px] tracking-[0.2em] uppercase italic">Content Asset Management</span>
                  <div className="h-px w-8 bg-success/20"></div>
                  <span className="bg-success/10 text-success border border-success/20 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider italic">
                      {blogs?.meta?.total || 0} PUBLISHED ARTICLES
                  </span>
              </div>
          </div>

          <div className="relative z-10">
              <AddBlog />
          </div>
      </div>

      <div className="bg-[#0a0a0a]/40 backdrop-blur-3xl border border-white/5 rounded-3xl overflow-hidden shadow-2xl relative group">
          <div className="absolute inset-0 bg-gradient-to-b from-success/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
          
          <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                  <thead>
                      <tr className="border-b border-white/5 bg-white/[0.01]">
                          <th className="px-8 py-5 text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] italic">Curator</th>
                          <th className="px-8 py-5 text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] italic">Article Digest</th>
                          <th className="px-8 py-5 text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] italic text-center">Status</th>
                          <th className="px-8 py-5 text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] italic text-right pl-8 pr-10">Directives</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.02]">
                      {isLoading ? (
                          <TableSkeleton columns={4} rows={limit} />
                      ) : (
                          <AnimatePresence mode="popLayout">
                              {blogs?.data?.map((blog: any, index: number) => (
                                  <motion.tr 
                                      key={blog?._id}
                                      initial={{ opacity: 0, scale: 0.98 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      exit={{ opacity: 0, scale: 0.98 }}
                                      transition={{ delay: index * 0.05 }}
                                      className="group/row bg-[#0f0f0f]/30 hover:bg-white/[0.02] transition-colors"
                                  >
                                      <td className="px-8 py-4">
                                          <div className="flex items-center gap-4">
                                              <div className="relative w-8 h-8 shrink-0">
                                                  <img
                                                      src={blog?.user?.avatar || "/avatar.png"}
                                                      alt="author"
                                                      className="w-full h-full object-cover rounded-xl border border-white/10 group-hover/row:border-success/30 transition-colors"
                                                  />
                                              </div>
                                              <p className="text-[10px] font-black text-white uppercase tracking-widest italic group-hover/row:text-success transition-all">
                                                  {blog?.user?.name || "Anonymous Unit"}
                                              </p>
                                          </div>
                                      </td>
                                      <td className="px-8 py-4">
                                          <div className="flex items-center gap-4">
                                              <div className="relative w-12 h-9 shrink-0">
                                                  <img
                                                      src={blog?.image || "/placeholder.png"}
                                                      alt="blog"
                                                      className="w-full h-full object-cover rounded-lg border border-white/10 brightness-75 group-hover/row:brightness-100 transition-all"
                                                  />
                                              </div>
                                              <div className="space-y-0.5">
                                                  <p className="font-black text-white text-[11px] uppercase tracking-tighter group-hover:text-success transition-colors duration-300 line-clamp-1 italic">
                                                      {blog?.title}
                                                  </p>
                                                  <p className="text-gray-500 text-[8px] line-clamp-1 font-black uppercase tracking-widest leading-relaxed italic opacity-60">
                                                      {truncateText(blog?.description, 40)}
                                                  </p>
                                              </div>
                                          </div>
                                      </td>
                                      <td className="px-8 py-4 text-center">
                                          <div className="flex justify-center items-center gap-2">
                                              {blog?.isDeleted ? (
                                                  <>
                                                      <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse"></div>
                                                      <span className="text-red-500 font-black uppercase tracking-widest text-[8px] italic">Terminated</span>
                                                  </>
                                              ) : (
                                                  <>
                                                      <div className="w-1 h-1 rounded-full bg-success shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                                                      <span className="text-success font-black uppercase tracking-widest text-[8px] italic">Operational</span>
                                                  </>
                                              )}
                                          </div>
                                      </td>
                                      <td className="px-8 py-4 text-right pr-6">
                                          <div className="flex justify-end items-center gap-2">
                                              <UpdateBlog blog={blog} />
                                              <DeleteBlog blog={blog} />
                                          </div>
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
                              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                          >
                              Previous Cycle
                          </button>
                          <button
                              className="px-6 py-3 bg-success text-black rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-success/10 disabled:opacity-50 disabled:grayscale hover:scale-105 active:scale-95 italic"
                              disabled={page >= totalPages}
                              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
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

export default BlogManagement;
