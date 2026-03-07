"use client";

import SZForm from "@/components/form/SZFrom";
import SZTextarea from "@/components/form/SZTextarea";
import { TUser } from "@/redux/features/auth/authSlice";
import { useCreateReviewMutation } from "@/redux/features/review/reviewApi";
import { useGetUserByEmailQuery } from "@/redux/features/user/userApi";
import { useSingleOrderQuery } from "@/redux/features/order/orderApi";
import { useAppSelector } from "@/redux/hooks";
import { TError } from "@/types/global";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { XIcon, SendIcon } from "@/components/shared/Icons";
import Portal from "@/components/ui/Portal";

const AddReview = ({ id }: { id: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState<number>(0);

  const loggedUser = useAppSelector((state) => state.auth.user) as TUser;
  const { data: userData } = useGetUserByEmailQuery(loggedUser?.email);
  const user = userData?.data?.[0];

  const { data: orderData } = useSingleOrderQuery(id);
  const order = orderData?.data;

  const [createReview, { isLoading }] = useCreateReviewMutation();

  const onSubmit = async (data: FieldValues) => {
    try {
      if (!order?.foods?.length) {
        toast.error("NO ITEMS DETECTED FOR ANALYSIS");
        return;
      }

      const reviewData = {
        user: user?._id || (loggedUser as { user?: string })?.user,
        order: id,
        feedbacks: order.foods.map((f: { food: { _id: string } }) => ({
          food: f.food._id,
          feedback: data?.feedback,
          rating: rating
        }))
      };

      const res = await createReview(reviewData).unwrap();
      if (res.success) {
        toast.success("EXPERIENCE ARCHIVED");
        setIsOpen(false);
      }
    } catch (error) {
      const err = error as TError;
      toast.error(err?.data?.message || "TRANSMISSION FAILURE");
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 bg-warning/10 text-warning font-black uppercase tracking-widest italic text-[9px] rounded-xl border border-warning/20 hover:bg-warning hover:text-black transition-all shadow-xl"
          onClick={() => setIsOpen(true)}
        >
          Review
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <Portal>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
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
                        Cinematic <span className="text-warning">Feedback.</span>
                      </h3>
                      <p className="text-gray-500 font-bold uppercase tracking-[0.3em] text-[7px] pl-2 border-l-2 border-warning/30">
                        Refine our culinary edge
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
                        <p className="text-[8px] font-black text-gray-400 uppercase tracking-[0.3em] italic mb-1">Gastronomic Rating Scoped</p>
                        <div className="flex gap-3">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <motion.button
                              type="button"
                              key={star}
                              whileHover={{ scale: 1.2, rotate: 10 }}
                              whileTap={{ scale: 0.85 }}
                              className={`p-1 transition-all duration-300 ${rating >= star ? "text-warning filter drop-shadow-[0_0_10px_rgba(234,179,8,0.4)]" : "text-gray-800"}`}
                              onClick={() => setRating(star)}
                            >
                              <FaStar size={28} />
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <SZTextarea
                          name="feedback"
                          label="Culinary Commentary"
                          placeholder="ARTICULATE THE FLAVORS, TEXTURES, AND PRESENTATION..."
                        />
                      </div>

                      <div className="flex gap-4 pt-2">
                        <button
                          type="button"
                          className="flex-1 py-4 bg-white/5 text-gray-500 font-black uppercase tracking-[0.2em] rounded-xl hover:bg-white/10 transition-all border border-white/5 active:scale-95 italic text-[9px]"
                          onClick={() => setIsOpen(false)}
                        >
                          Abandon
                        </button>
                        <button
                          className="flex-2 py-4 px-8 bg-warning text-black font-black uppercase tracking-[0.2em] rounded-xl hover:scale-[1.03] active:scale-[0.98] transition-all shadow-xl flex items-center justify-center gap-2 group italic text-[9px] disabled:opacity-30 disabled:grayscale"
                          type="submit"
                          disabled={isLoading || rating === 0}
                        >
                          {isLoading ? "Synchronizing..." : "Submit Experience"}
                          <SendIcon size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </SZForm>

                  <div className="pt-4 border-t border-white/5">
                    <p className="text-[7px] font-black text-gray-600 uppercase tracking-[0.2em] text-center italic">
                      Broadcasted to culinary directorate.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </Portal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddReview;
