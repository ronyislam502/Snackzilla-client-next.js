"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { FieldValues } from "react-hook-form";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { StarIcon, XIcon, SendIcon } from "@/components/shared/Icons";
import SZForm from "@/components/form/SZFrom";
import SZTextarea from "@/components/form/SZTextarea";
import { useCreateServiceReviewMutation } from "@/redux/features/serviceReview/serviceReviewApi";
import { TUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";

const ServiceReviewForm = ({ orderId, onSuccess }: { orderId: string, onSuccess?: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const user = useAppSelector((state) => state.auth.user) as TUser;

  const [createReview, { isLoading }] = useCreateServiceReviewMutation();

  useEffect(() => {
    setMounted(true);
  }, []);

  const onSubmit = async (data: FieldValues) => {
    try {
      const reviewData = {
        user: (user as { _id?: string; user?: string })?._id || (user as { _id?: string; user?: string })?.user,
        order: orderId,
        feedback: data?.feedback,
        rating: rating,
      };

      const res = await createReview(reviewData).unwrap();
      if (res.success) {
        toast.success("SERVICE ANALYSIS COMPLETE");
        setIsOpen(false);
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      toast.error((error as { data?: { message?: string } })?.data?.message || "TRANSMISSION FAILURE");
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-2 bg-blue-500/10 text-blue-400 font-black uppercase tracking-widest italic text-[9px] rounded-xl border border-blue-500/20 hover:bg-blue-500 hover:text-black transition-all shadow-xl"
        onClick={() => setIsOpen(true)}
      >
        Service Review
      </motion.button>

      {mounted && createPortal(
        <AnimatePresence>
          {isOpen && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
                className="relative w-full max-w-lg bg-[#0a0a0a]/60 backdrop-blur-3xl border border-success/20 rounded-3xl shadow-2xl overflow-hidden group hover:border-blue-500/40 hover:shadow-[0_0_50px_rgba(59,130,246,0.15)] transition-all duration-500"
              >
                {/* Background Gradients */}
                <div className="absolute inset-0 bg-gradient-to-tr from-success/8 via-success/3 to-transparent transition-opacity duration-700 group-hover:opacity-0 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="p-10 relative z-10 space-y-8">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter italic leading-none">
                        Service <span className="text-blue-400">Intelligence.</span>
                      </h3>
                      <p className="text-gray-500 font-bold uppercase tracking-[0.3em] text-[7px] pl-2 border-l-2 border-blue-500/30">
                        Rate the SnackZilla Experience
                      </p>
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="absolute top-6 right-6 p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all border border-white/5 active:scale-90"
                    >
                      <XIcon size={16} />
                    </button>
                  </div>

                  <SZForm onSubmit={onSubmit}>
                    <div className="space-y-8">
                      <div className="space-y-4">
                        <p className="text-[8px] font-black text-gray-400 uppercase tracking-[0.3em] italic mb-1">Operational Rating</p>
                        <div className="flex gap-3">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <motion.button
                              type="button"
                              key={star}
                              whileHover={{ scale: 1.2, rotate: 10 }}
                              whileTap={{ scale: 0.85 }}
                              className={`p-1 transition-all duration-300 ${rating >= star ? "text-blue-400 filter drop-shadow-[0_0_10px_rgba(59,130,246,0.4)]" : "text-gray-800"}`}
                              onClick={() => setRating(star)}
                            >
                              <FaStar size={32} />
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <SZTextarea
                        name="feedback"
                        label="Service Commentary"
                        placeholder="DELIVERY SPEED, PACKAGING QUALITY, OVERALL VIBE..."
                      />

                      <div className="flex gap-4 pt-2">
                        <button
                          type="button"
                          className="flex-1 py-4 bg-white/5 text-gray-500 font-black uppercase tracking-[0.2em] rounded-xl hover:bg-white/10 transition-all border border-white/5 active:scale-95 italic text-[9px]"
                          onClick={() => setIsOpen(false)}
                        >
                          Abandon
                        </button>
                        <button
                          className="flex-2 py-4 px-8 bg-blue-500 text-black font-black uppercase tracking-[0.2em] rounded-xl hover:scale-[1.03] active:scale-[0.98] transition-all shadow-xl flex items-center justify-center gap-2 group italic text-[9px] disabled:opacity-30"
                          type="submit"
                          disabled={isLoading || rating === 0}
                        >
                          {isLoading ? "Syncing..." : "Upload Intelligence"}
                          <SendIcon size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </SZForm>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default ServiceReviewForm;
