"use client";

import { motion, AnimatePresence } from "framer-motion";
import { XIcon, ShieldCheckIcon, DownloadIcon, PackageIcon, CreditCardIcon, HashIcon } from "@/components/shared/Icons";
import Portal from "@/components/ui/Portal";
import { TOrder } from "@/types/order";
import OrderTimeline from "@/components/ui/OrderTimeline";
import { formatDate } from "@/components/utilities/Date";
import Image from "next/image";

interface OrderDetailsModalProps {
  order: TOrder | null;
  isOpen: boolean;
  onClose: () => void;
}

const OrderDetailsModal = ({ order, isOpen, onClose }: OrderDetailsModalProps) => {
  if (!order) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <Portal>
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 120 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-[#0a0a0a]/80 backdrop-blur-3xl border border-success/20 rounded-[2.5rem] shadow-[0_0_100px_rgba(34,197,94,0.1)] overflow-hidden flex flex-col group hover:border-blue-500/30 transition-all duration-700"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-success/5 rounded-full blur-[120px] -mr-48 -mt-48 group-hover:bg-blue-500/10 transition-colors duration-1000" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-success/5 rounded-full blur-[120px] -ml-48 -mb-48 group-hover:bg-purple-500/10 transition-colors duration-1000" />

              {/* Header */}
              <div className="p-8 border-b border-white/5 relative z-10 flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic leading-none">
                    Order <span className="text-success group-hover:text-blue-400 transition-colors duration-500">Manifest.</span>
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 font-bold text-[9px] tracking-[0.2em] uppercase italic">Deployment Details</span>
                    <div className="h-px w-6 bg-success/20 group-hover:bg-blue-500/20 transition-colors duration-500"></div>
                    <span className="text-success group-hover:text-blue-400 transition-colors duration-500 text-[9px] font-black uppercase tracking-widest italic tracking-tighter">
                      {order.transactionId}
                    </span>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-3 rounded-2xl bg-white/5 text-gray-500 hover:text-white hover:bg-white/10 border border-white/10 transition-all active:scale-95"
                >
                  <XIcon size={18} />
                </button>
              </div>

              {/* Content - Scrollable */}
              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                  
                  {/* Left Column: Items & Summary */}
                  <div className="lg:col-span-7 space-y-8">
                    {/* Items List */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 mb-2">
                        <PackageIcon size={16} className="text-success group-hover:text-blue-400 transition-colors" />
                        <h4 className="text-[11px] font-black text-white uppercase tracking-widest italic">Inventory Breakdown</h4>
                      </div>
                      <div className="space-y-3">
                        {order.foods.map((item, idx) => (
                          <motion.div 
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + idx * 0.05 }}
                            className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center justify-between group/item hover:bg-white/10 transition-all"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 bg-black">
                                <Image 
                                  src={item.food.image || ""} 
                                  alt={item.food.name} 
                                  width={48} 
                                  height={48} 
                                  className="object-cover w-full h-full group-hover/item:scale-110 transition-transform duration-500"
                                />
                              </div>
                              <div>
                                <h5 className="text-sm font-black text-white uppercase tracking-tighter italic">{item.food.name}</h5>
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest italic">Unit Price: ${item.food.price.toFixed(2)}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-xs font-black text-white italic">x{item.quantity}</span>
                              <p className="text-xs font-black text-success group-hover/item:text-blue-400 transition-colors italic">${(item.food.price * item.quantity).toFixed(2)}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Financial Summary */}
                    <div className="bg-success/5 border border-success/10 group-hover:border-blue-500/20 transition-all rounded-[2rem] p-8 space-y-6">
                      <div className="flex items-center gap-3 mb-2">
                        <CreditCardIcon size={16} className="text-success group-hover:text-blue-400" />
                        <h4 className="text-[11px] font-black text-white uppercase tracking-widest italic">Valuation protocol</h4>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest italic">
                          <span className="text-gray-500">Subtotal Sequence:</span>
                          <span className="text-white">${order.totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest italic">
                          <span className="text-gray-500">Tax computation (10%):</span>
                          <span className="text-white">${order.tax.toFixed(2)}</span>
                        </div>
                        <div className="h-px bg-white/5" />
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-black text-white uppercase tracking-tighter italic">Grand Total:</span>
                          <span className="text-2xl font-black text-success group-hover:text-blue-400 transition-colors italic tracking-tighter">${order.grandAmount.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Tracking & Status */}
                  <div className="lg:col-span-5 space-y-8">
                    {/* Status Overview */}
                    <div className="bg-white/5 border border-white/5 rounded-[2rem] p-8 space-y-6">
                      <div className="flex items-center gap-3 mb-2">
                        <ShieldCheckIcon size={16} className="text-success group-hover:text-blue-400" />
                        <h4 className="text-[11px] font-black text-white uppercase tracking-widest italic">Verification Metrics</h4>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-black/40 rounded-2xl border border-white/5">
                          <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest italic mb-1">Status</p>
                          <p className="text-xs font-black text-success uppercase italic">{order.status}</p>
                        </div>
                        <div className="p-4 bg-black/40 rounded-2xl border border-white/5">
                          <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest italic mb-1">Payment</p>
                          <p className="text-xs font-black text-blue-400 uppercase italic">{order.paymentStatus}</p>
                        </div>
                        {order.trackingId && (
                          <div className="col-span-2 p-4 bg-black/40 rounded-2xl border border-white/5">
                            <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest italic mb-1">Tracking ID</p>
                            <p className="text-xs font-black text-purple-400 uppercase italic">{order.trackingId}</p>
                          </div>
                        )}
                        <div className="col-span-2 p-4 bg-black/40 rounded-2xl border border-white/5 relative overflow-hidden group/status">
                           <div className="absolute inset-0 bg-success/5 animate-pulse opacity-50" />
                           <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest italic mb-1 relative z-10">Deployment Timestamp</p>
                           <p className="text-xs font-black text-white uppercase italic relative z-10">{formatDate(order.createdAt)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="bg-white/5 border border-white/5 rounded-[2rem] p-8">
                      <OrderTimeline history={order.statusHistory || []} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer / Actions */}
              <div className="p-8 border-t border-white/5 bg-black/40 relative z-10 flex flex-wrap gap-4 items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-success/10 text-success flex items-center justify-center border border-success/20 group-hover:border-blue-500/30 group-hover:text-blue-400 transition-all">
                    <HashIcon size={20} />
                  </div>
                  <div>
                    <h5 className="text-[10px] font-black text-gray-500 uppercase tracking-widest italic">Internal ID</h5>
                    <p className="text-xs font-black text-white tracking-widest">{order._id}</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  {order.invoiceLink && (
                    <motion.a
                      href={order.invoiceLink}
                      target="_blank"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-2xl font-black uppercase tracking-widest italic text-[11px] flex items-center gap-2 hover:bg-blue-500 hover:text-white transition-all shadow-xl shadow-blue-500/5"
                    >
                      <DownloadIcon size={14} />
                      Invoice
                    </motion.a>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="px-8 py-3 bg-success text-black border border-success/20 rounded-2xl font-black uppercase tracking-widest italic text-[11px] hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] transition-all shadow-xl"
                  >
                    Close Protocol
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </Portal>
      )}
    </AnimatePresence>
  );
};

export default OrderDetailsModal;
