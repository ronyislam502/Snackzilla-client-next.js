"use client"

import { useAllReviewsQuery, useDeleteReviewMutation } from "@/redux/features/review/reviewApi";
import { motion, AnimatePresence } from "framer-motion";
import { 
    StarIcon, 
    UserIcon, 
    ClockIcon, 
    DeleteIcon,
    MailIcon,
    SearchIcon
} from "@/components/shared/Icons";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";
import { TError } from "@/types/global";

const AdminReviewManagement = () => {
    const { data: reviews, isLoading } = useAllReviewsQuery({});
    const [deleteReview, { isLoading: isDeleting }] = useDeleteReviewMutation();

    const handleDelete = async (id: string) => {
        if (!window.confirm("EXECUTE PERMANENT REMOVAL?")) return;
        try {
            const res = await deleteReview(id).unwrap();
            if (res.success) {
                toast.success("EXPERIENCE PURGED");
            }
        } catch (error) {
            const err = error as TError;
            toast.error(err?.data?.message || "OPERATION FAILURE");
        }
    };

    const renderStars = (rating: number) => {
        return (
            <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar 
                        key={star} 
                        size={14} 
                        className={star <= rating ? "text-warning drop-shadow-[0_0_8px_rgba(234,179,8,0.4)]" : "text-gray-800"} 
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="p-4 md:p-8 space-y-10 lg:max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 bg-[#0a0a0a]/60 backdrop-blur-3xl p-6 md:p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-success/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-success/10 transition-colors duration-700"></div>
                
                <div className="space-y-1 relative z-10">
                    <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter italic leading-none">
                        Sentiment <span className="text-success">Analysis.</span>
                    </h2>
                    <div className="flex items-center gap-3">
                        <span className="text-gray-500 font-bold text-[10px] tracking-[0.2em] uppercase italic">Intelligence Archive</span>
                        <div className="h-px w-8 bg-success/20"></div>
                        <span className="text-gray-400 font-bold text-[9px] uppercase tracking-widest italic opacity-60">
                            OPERATIONAL GUEST FEEDBACK DATA
                        </span>
                    </div>
                </div>

                <div className="px-6 py-4 bg-white/[0.02] border border-white/5 rounded-2xl relative z-10 group-hover:bg-white/[0.04] transition-colors">
                     <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest mb-0.5 italic">Total Entries</p>
                     <p className="text-2xl font-black text-white italic tracking-tighter">
                        {String(reviews?.data?.length || 0).padStart(2, '0')}
                     </p>
                </div>
            </div>

            {/* Grid Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                    {reviews?.data?.map((review: any, idx: number) => (
                        <motion.div 
                            key={review._id}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.4, delay: idx * 0.05 }}
                            className="group/card bg-[#0a0a0a]/40 backdrop-blur-3xl border border-white/5 rounded-[2rem] p-8 space-y-6 relative overflow-hidden flex flex-col justify-between hover:border-success/20 transition-all duration-500 shadow-2xl"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-success/5 rounded-full blur-[60px] opacity-0 group-hover/card:opacity-100 transition-opacity duration-1000" />
                            
                            <div className="space-y-6 relative z-10">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-white/[0.02] flex items-center justify-center border border-white/5 text-gray-600 group-hover/card:text-success transition-all overflow-hidden relative shadow-inner">
                                            <UserIcon size={18} className="relative z-10" />
                                        </div>
                                        <div className="space-y-0.5">
                                            <p className="text-[11px] font-black text-white uppercase tracking-widest italic">
                                                {review?.user?.name || "Anonymous UNIT"}
                                            </p>
                                            {renderStars(review?.rating)}
                                        </div>
                                    </div>
                                    <div className="text-[8px] font-black text-gray-600 uppercase tracking-[0.2em] flex items-center gap-2 bg-white/5 px-2 py-1 rounded-lg border border-white/5 italic">
                                        {new Date(review?.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    </div>
                                </div>

                                <div className="relative">
                                    <div className="p-4 bg-white/[0.01] border border-white/5 rounded-xl group-hover/card:bg-white/[0.03] transition-colors relative h-full min-h-[80px]">
                                        <div className="absolute -left-[1px] top-3 w-0.5 h-4 bg-success/30 rounded-full" />
                                        <p className="text-[11px] font-bold text-gray-400 leading-relaxed italic uppercase tracking-wider line-clamp-4">
                                            "{review?.feedback}"
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between relative z-10 pt-4 border-t border-white/[0.03] mt-auto">
                                <div className="flex items-center gap-2 text-[8px] font-black text-gray-600 uppercase tracking-[0.2em] italic group-hover/card:text-success/70 transition-colors truncate max-w-[150px]">
                                    {review?.user?.email || "ENCRYPTED_ID"}
                                </div>
                                <button 
                                    onClick={() => handleDelete(review?._id)}
                                    disabled={isDeleting}
                                    className="p-2.5 bg-red-500/5 text-gray-600 rounded-lg hover:bg-red-500 hover:text-white transition-all border border-red-500/10 active:scale-95 disabled:opacity-30 disabled:pointer-events-none group/delete shadow-lg"
                                >
                                    <DeleteIcon size={14} className="group-hover/delete:rotate-12 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Empty/Loading States */}
            {(isLoading || reviews?.data?.length === 0) && (
                <div className="py-24 text-center">
                    {isLoading ? (
                        <div className="flex flex-col items-center gap-6">
                            <div className="w-12 h-12 border-2 border-success border-t-transparent rounded-full animate-spin shadow-[0_0_30px_rgba(34,197,94,0.2)]"></div>
                            <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.5em] animate-pulse italic">Restoring Data Streams</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <motion.div 
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="w-20 h-20 bg-white/[0.02] rounded-[1.5rem] flex items-center justify-center mx-auto text-gray-800 border border-white/5"
                            >
                                <StarIcon size={32} className="opacity-20" />
                            </motion.div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">Signal <span className="text-success">Void.</span></h3>
                                <p className="text-gray-700 font-bold uppercase tracking-[0.3em] text-[8px] italic opacity-60">No intelligence found in core archives</p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminReviewManagement;
