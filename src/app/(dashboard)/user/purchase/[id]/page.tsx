"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSingleOrderQuery } from "@/redux/features/order/orderApi";
import { useSocket } from "@/hooks/useSocket";
import { formatDate, orderTime, TimeAgo } from "@/components/utilities/Date";
import { 
  PackageIcon, 
  TruckIcon, 
  CheckCircleIcon, 
  ClockIcon, 
  ShieldCheckIcon,
  ChevronRightIcon
} from "lucide-react";
import TableSkeleton from "@/components/ui/skeleton/TableSkeleton";

const OrderTracking = () => {
  const { id } = useParams();
  const { data: orderData, isLoading, refetch } = useSingleOrderQuery(id);
  const order = orderData?.data;
  const socket = useSocket(process.env.NEXT_PUBLIC_SERVER_URL as string || "http://localhost:5000");

  useEffect(() => {
    if (!socket.isConnected || !id) return;

    const handleOrderUpdated = (updatedOrder: any) => {
      if (updatedOrder._id === id) {
        refetch();
      }
    };

    socket.on("order-updated", handleOrderUpdated);
    return () => {
      socket.off("order-updated", handleOrderUpdated);
    };
  }, [socket.isConnected, id, refetch]);

  if (isLoading) {
    return (
      <div className="p-8 space-y-8 max-w-5xl mx-auto">
        <div className="h-32 bg-white/5 rounded-3xl animate-pulse" />
        <div className="h-[400px] bg-white/5 rounded-3xl animate-pulse" />
      </div>
    );
  }

  if (!order) return <div className="text-center p-20 text-gray-500">Order not found.</div>;

  const steps = [
    { status: "PENDING", label: "Order Placed", icon: <ClockIcon size={18} />, desc: "Waiting for confirmation" },
    { status: "UNSHIPPED", label: "Confirmed", icon: <PackageIcon size={18} />, desc: "Preparing your items" },
    { status: "SHIPPED", label: "In Transit", icon: <TruckIcon size={18} />, desc: "Package is on its way" },
    { status: "DELIVERED", label: "Delivered", icon: <CheckCircleIcon size={18} />, desc: "Arrived at destination" },
  ];

  const currentStepIndex = steps.findIndex(s => s.status === order.status);

  return (
    <div className="p-4 md:p-8 space-y-12 lg:max-w-6xl mx-auto pb-20">
      {/* Dynamic Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-[#0a0a0a]/60 backdrop-blur-3xl p-8 md:p-10 rounded-[2.5rem] border border-success/20 relative overflow-hidden group shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-success/10 via-transparent to-transparent opacity-50 pointer-events-none" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-success/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
        
        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] italic">Operation Logistics</span>
            <div className="h-px w-8 bg-success/20"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter italic leading-none">
            Tracking <span className="text-success">Manifest.</span>
          </h2>
          <div className="flex items-center gap-4 pt-2">
            <span className="bg-success/10 text-success border border-success/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest italic">
              ID: #{order.transactionId?.slice(-8)}
            </span>
            <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest italic opacity-60">
              {formatDate(order.createdAt)} • {orderTime(order.createdAt)}
            </span>
          </div>
        </div>

        <div className="relative z-10 text-right">
          <p className="text-[10px] font-black text-success uppercase tracking-widest italic mb-2">Live Sequence Status</p>
          <div className="inline-flex items-center gap-3 bg-success text-black px-6 py-3 rounded-2xl font-black text-xs uppercase italic shadow-xl shadow-success/20 hover:scale-105 transition-transform">
             {order.status}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Vertical Timeline */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#0a0a0a]/40 backdrop-blur-2xl rounded-[2rem] border border-white/5 p-8 relative overflow-hidden">
            <h3 className="text-xs font-black text-white uppercase tracking-widest italic mb-10 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-success"></span>
              Timeline Protocol
            </h3>
            
            <div className="relative space-y-12">
              <div className="absolute left-4 top-2 bottom-2 w-px bg-white/5" />
              
              {steps.map((step, idx) => {
                const isCompleted = idx <= currentStepIndex;
                const isCurrent = idx === currentStepIndex;
                
                return (
                  <div key={step.status} className="relative flex items-start gap-6 group">
                    <div className={`relative z-10 w-8 h-8 rounded-xl flex items-center justify-center border transition-all duration-500 ${
                      isCompleted ? 'bg-success border-success text-black shadow-lg shadow-success/20' : 'bg-[#0a0a0a] border-white/10 text-gray-500'
                    }`}>
                      {step.icon}
                    </div>
                    
                    <div className="flex-1 space-y-1 pt-0.5">
                      <p className={`text-[11px] font-black uppercase tracking-widest italic transition-colors ${isCompleted ? 'text-white' : 'text-gray-600'}`}>
                        {step.label}
                      </p>
                      <p className="text-[9px] text-gray-500 font-medium italic leading-relaxed opacity-60">
                        {step.desc}
                      </p>
                      {isCurrent && (
                        <motion.div 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="pt-2 flex items-center gap-2"
                        >
                           <span className="w-1.5 h-1.5 rounded-full bg-success animate-ping"></span>
                           <span className="text-[8px] font-black text-success uppercase italic">Active Phase</span>
                        </motion.div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Middle/Right: Detailed Manifest */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-[#0a0a0a]/40 backdrop-blur-2xl rounded-[2rem] border border-white/5 p-8 md:p-10 space-y-10">
            {/* User Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                    <ShieldCheckIcon size={16} />
                  </div>
                  <h4 className="text-[11px] font-black text-white uppercase tracking-widest italic">Recipient Identity</h4>
                </div>
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-4">
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest italic">
                    <span className="text-gray-500">Subject:</span>
                    <span className="text-white">{order.user?.name}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest italic">
                    <span className="text-gray-500">Contact:</span>
                    <span className="text-white">{order.user?.phone || 'N/A'}</span>
                  </div>
                  <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
                    <span className="text-[10px] text-gray-500 font-bold uppercase italic">Destination Matrix:</span>
                    <span className="text-[10px] text-white italic leading-relaxed">
                      {order.user?.address?.street}, {order.user?.address?.city}, {order.user?.address?.state} {order.user?.address?.postalCode}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Summation */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400 border border-orange-500/20">
                    <ClockIcon size={16} />
                  </div>
                  <h4 className="text-[11px] font-black text-white uppercase tracking-widest italic">Temporal Data</h4>
                </div>
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-4">
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest italic">
                    <span className="text-gray-500">Timestamp:</span>
                    <span className="text-white">{formatDate(order.createdAt)}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest italic">
                    <span className="text-gray-500">Duration Ago:</span>
                    <span className="text-white">{TimeAgo(order.createdAt)}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest italic pt-2 border-t border-white/5">
                    <span className="text-gray-500">Final Valuation:</span>
                    <span className="text-success font-black text-sm">${order.grandAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Goods Manifest */}
            <div className="space-y-6">
              <h4 className="text-[11px] font-black text-white uppercase tracking-widest italic">Goods Manifest</h4>
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="p-4 text-[9px] font-black uppercase tracking-widest italic text-gray-500">Item Description</th>
                      <th className="p-4 text-[9px] font-black uppercase tracking-widest italic text-gray-500 text-center">Quantity</th>
                      <th className="p-4 text-[9px] font-black uppercase tracking-widest italic text-gray-500 text-right">Valuation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {order.foods?.map((item: any, idx: number) => (
                      <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4 text-[10px] font-bold text-white italic">{item.food?.name}</td>
                        <td className="p-4 text-[10px] font-black text-white text-center italic">{item.quantity}</td>
                        <td className="p-4 text-[10px] font-black text-success text-right italic">${(item.food?.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
