"use client";

import { DeleteIcon, XIcon } from "@/components/shared/Icons";
import { useDeleteBlogMutation } from "@/redux/features/blog/blogApi";
import { TError } from "@/types/global";
import { useState } from "react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const DeleteBlog = ({ blog }: { blog: any }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [deleteBlog] = useDeleteBlogMutation();

    const handleDelete = async () => {
        try {
            const res = await deleteBlog(blog?._id).unwrap();
            if (res?.success) {
                toast.success(res?.message || "Blog entry removed", { autoClose: 1000 });
                setIsOpen(false);
            }
        } catch (error) {
            const err = error as TError;
            toast.error(err?.data?.message || "Operation failed", { autoClose: 1000 });
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 rounded-lg bg-red-500/5 text-red-500 hover:bg-red-500 hover:text-white transition-all border border-red-500/10 hover:border-red-500/30 group/del"
            >
                <DeleteIcon size={16} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
                        />
                        
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="relative w-full max-w-sm bg-[#0a0a0a] border border-white/10 rounded-[2rem] shadow-[0_0_100px_rgba(0,0,0,1)] overflow-hidden p-8 text-center"
                        >
                            <div className="w-16 h-16 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20 mx-auto mb-6 relative">
                                <div className="absolute inset-0 bg-red-500/20 blur-xl opacity-50"></div>
                                <DeleteIcon size={24} className="relative z-10" />
                            </div>

                            <h3 className="text-xl font-black text-white uppercase tracking-tighter italic mb-2 leading-none">Authorization <span className="text-red-500">Required.</span></h3>
                            <p className="text-[10px] text-gray-400 font-bold uppercase italic tracking-widest leading-relaxed mb-8 opacity-70">
                                Confirm the terminal extraction of <span className="text-white italic">{blog?.title}</span> from core archives? This operation cannot be reversed.
                            </p>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="flex-1 px-6 py-2.5 rounded-xl bg-white/5 text-gray-500 font-black hover:text-white transition-all border border-white/5 uppercase text-[9px] tracking-widest italic"
                                >
                                    Abort
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="flex-1 bg-red-500 text-white px-6 py-2.5 rounded-xl font-black hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(239,68,68,0.1)] uppercase text-[9px] tracking-widest italic"
                                >
                                    Confirm Purge
                                </button>
                            </div>

                            <button 
                                onClick={() => setIsOpen(false)}
                                className="absolute top-6 right-6 p-2 rounded-lg bg-white/5 text-gray-600 hover:text-white transition-colors border border-white/5"
                            >
                                <XIcon size={14} />
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DeleteBlog;
