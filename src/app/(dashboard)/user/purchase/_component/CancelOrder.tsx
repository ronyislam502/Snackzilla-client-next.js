"use client";

import SZForm from "@/components/form/SZFrom";
import { useState } from "react";

import { toast } from "react-toastify";
import { useUpdateOrderMutation } from "@/redux/features/order/orderApi";
import { TError } from "@/types/global";
import { motion, AnimatePresence } from "framer-motion";
import { XIcon, TrashIcon } from "@/components/shared/Icons";

const CancelOrder = ({ order }: { order: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [updateOrder, { isLoading }] = useUpdateOrderMutation();

  const handleDelete = async (data: any) => {
    try {
      const res = await updateOrder({
        id: order?._id,
        data: { status: "CANCELED" }
      }).unwrap();
      if (res.success) {
        toast.success("MISSION ABORTED");
        setIsOpen(false);
      }
    } catch (error) {
      const err = error as TError;
      toast.error(err?.data?.message || "ABORT FAILURE");
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 bg-error/10 text-error font-black uppercase tracking-widest italic text-[9px] rounded-xl border border-error/20 hover:bg-error hover:text-black transition-all shadow-xl"
          onClick={() => setIsOpen(true)}
          disabled={order?.status === "CANCELED" || order?.status === "DELIVERED"}
        >
          Abort
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="w-full max-w-sm bg-[#0a0a0a]/80 backdrop-blur-3xl border border-white/5 rounded-[2rem] shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-error/[0.05] via-transparent to-transparent opacity-50 transition-opacity" />
              
              <div className="p-8 relative z-10 space-y-6 text-center">
                <div className="mx-auto w-12 h-12 bg-error/10 rounded-2xl flex items-center justify-center text-error mb-4 border border-error/20">
                    <TrashIcon size={24} />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-black text-white uppercase tracking-tighter italic leading-none">
                    Confirm <span className="text-error">Abortion.</span>
                  </h3>
                  <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-[8px] italic">
                      This action will terminate the current sequence
                  </p>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    className="flex-1 py-4 bg-white/5 text-gray-500 font-black uppercase tracking-[0.2em] rounded-xl hover:bg-white/10 transition-all border border-white/5 active:scale-95 italic text-[9px]"
                    onClick={() => setIsOpen(false)}
                  >
                    Hold
                  </button>
                  <button 
                    className="flex-1 py-4 bg-error text-black font-black uppercase tracking-[0.2em] rounded-xl hover:scale-[1.03] active:scale-[0.98] transition-all shadow-xl flex items-center justify-center gap-2 group italic text-[9px] disabled:opacity-30" 
                    onClick={handleDelete}
                    disabled={isLoading}
                  >
                    {isLoading ? "Terminating..." : "Terminate"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CancelOrder;
