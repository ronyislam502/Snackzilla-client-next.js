import { useState } from "react";
import { toast } from "react-toastify";
import { useUpdateOrderMutation } from "@/redux/features/order/orderApi";
import { TError } from "@/types/global";
import { motion, AnimatePresence } from "framer-motion";
import { XIcon, TrashIcon } from "@/components/shared/Icons";
import Portal from "@/components/ui/Portal";

const CancelOrder = ({ order }: { order: { _id: string; status: string } }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [updateOrder, { isLoading }] = useUpdateOrderMutation();

  const handleDelete = async () => {
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
                className="relative w-full max-w-sm bg-[#0a0a0a]/60 backdrop-blur-3xl border border-success/20 rounded-3xl shadow-2xl overflow-hidden group hover:border-blue-500/40 hover:shadow-[0_0_50px_rgba(59,130,246,0.15)] transition-all duration-500"
              >
                {/* Background Gradients */}
                <div className="absolute inset-0 bg-gradient-to-tr from-success/8 via-success/3 to-transparent transition-opacity duration-700 group-hover:opacity-0 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="p-8 relative z-10 space-y-6 text-center">
                  <div className="mx-auto w-12 h-12 bg-error/10 rounded-2xl flex items-center justify-center text-error mb-4 border border-error/20 relative">
                    <div className="absolute inset-0 bg-error/20 blur-xl opacity-50"></div>
                    <TrashIcon size={24} className="relative z-10" />
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

                <button 
                  onClick={() => setIsOpen(false)}
                  className="absolute top-6 right-6 p-2 rounded-lg bg-white/5 text-gray-600 hover:text-white hover:bg-white/10 transition-all border border-white/5 z-20"
                >
                  <XIcon size={14} />
                </button>
              </motion.div>
            </div>
          </Portal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CancelOrder;
