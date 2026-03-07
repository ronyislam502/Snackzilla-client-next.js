"use client";

import { motion } from "framer-motion";
import { ClockIcon } from "../shared/Icons";
import { formatDate } from "@/components/utilities/Date";

const OrderTimeline = ({ history }: { history: { status: string; updatedAt: string }[] }) => {
  if (!history || history.length === 0) return null;

  return (
    <div className="space-y-6 py-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center text-success border border-success/20">
          <ClockIcon size={16} />
        </div>
        <h4 className="text-[11px] font-black text-white uppercase tracking-widest italic">Temporal Sequence</h4>
      </div>

      <div className="relative pl-8 space-y-8">
        <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-success via-success/50 to-transparent" />

        {history.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-black border-2 border-success shadow-[0_0_10px_rgba(34,197,94,0.5)] z-10" />

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-white uppercase tracking-tighter italic">
                  {item.status}
                </span>
                {index === history.length - 1 && (
                  <span className="px-2 py-0.5 rounded-full bg-success/10 text-success text-[7px] font-black uppercase tracking-widest italic border border-success/20 animate-pulse">
                    CURRENT_PHASE
                  </span>
                )}
              </div>
              <p className="text-[8px] font-bold text-gray-500 uppercase tracking-widest italic">
                {formatDate(item.updatedAt)}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OrderTimeline;
