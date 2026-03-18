"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchIcon, PackageIcon, ShieldCheckIcon, ClockIcon } from "@/components/shared/Icons";
import OrderTimeline from "@/components/ui/OrderTimeline";
import { formatDate } from "@/components/utilities/Date";
import Image from "next/image";
import { useSocket } from "@/hooks/useSocket";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { toast } from "react-toastify";

const UserTrackPage = () => {
    const user = useAppSelector(selectCurrentUser);
    const socket = useSocket(process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000");
    const [trackingInput, setTrackingInput] = useState("");
    const [order, setOrder] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    useEffect(() => {
        if (socket.socket) {
            socket.socket.on("order-details", (data: any) => {
                setOrder(data);
                setIsLoading(false);
            });

            socket.socket.on("order-updated", (updatedOrder: any) => {
                if (order && updatedOrder._id === order._id) {
                    setOrder(updatedOrder);
                    toast.info(`Order Status Synchronized: ${updatedOrder.status}`);
                }
            });
        }

        return () => {
            if (socket.socket) {
                socket.socket.off("order-details");
                socket.socket.off("order-updated");
            }
        };
    }, [socket.socket, order]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!trackingInput.trim()) return;
        
        setIsLoading(true);
        setHasSearched(true);
        socket.socket?.emit("get-order-details", trackingInput.trim());
    };

    return (
        <div className="min-h-screen bg-[#050505] p-6 md:p-10">
            <div className="max-w-4xl mx-auto space-y-12">
                {/* Header Section */}
                <div className="text-center space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/20 text-success text-[10px] font-black uppercase tracking-widest italic"
                    >
                        <ShieldCheckIcon size={12} />
                        Orbital Tracking Protocol
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter italic leading-none"
                    >
                        Secure <span className="text-success">Tracking.</span>
                    </motion.h1>
                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest italic max-w-sm mx-auto">
                        PRIVATE TERMINAL ACCESS // USER: {user?.name || "LOGGED_IN_CLIENT"}
                    </p>
                </div>

                {/* Search Bar */}
                <motion.form 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    onSubmit={handleSearch}
                    className="relative max-w-2xl mx-auto group"
                >
                    <div className="absolute inset-0 bg-success/20 rounded-[2rem] blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-700" />
                    <div className="relative flex items-center bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-2 focus-within:border-success/50 transition-all duration-500">
                        <div className="pl-6 text-gray-500">
                            <SearchIcon size={20} />
                        </div>
                        <input 
                            type="text" 
                            placeholder="INPUT_ID (TRACKING_ID, TRAN_ID, OR ORDER_ID)..."
                            value={trackingInput}
                            onChange={(e) => setTrackingInput(e.target.value)}
                            className="flex-1 bg-transparent border-none outline-none py-4 px-4 text-white font-black italic tracking-widest placeholder:text-gray-800 placeholder:italic text-xs"
                        />
                        <button 
                            type="submit"
                            disabled={isLoading}
                            className="bg-success text-black px-8 py-4 rounded-[1.5rem] font-black uppercase tracking-widest italic text-[11px] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-success/20 disabled:opacity-30 disabled:grayscale"
                        >
                            {isLoading ? "Synchronizing..." : "Initialize Search"}
                        </button>
                    </div>
                </motion.form>

                {/* Results Section */}
                <div className="relative min-h-[400px]">
                    <AnimatePresence mode="wait">
                        {!hasSearched ? (
                            <motion.div 
                                key="idle"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center pt-10 text-center space-y-6 opacity-20"
                            >
                                <div className="w-24 h-24 rounded-3xl border-2 border-dashed border-gray-500 flex items-center justify-center text-3xl">📡</div>
                                <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] italic">Awaiting Payload Identifier</p>
                            </motion.div>
                        ) : isLoading ? (
                            <motion.div 
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center pt-10 space-y-6"
                            >
                                <div className="w-16 h-16 border-4 border-success/20 border-t-success rounded-full animate-spin" />
                                <p className="text-[10px] font-black text-success uppercase tracking-[0.3em] italic animate-pulse">Scanning Orbital Registry...</p>
                            </motion.div>
                        ) : !order ? (
                            <motion.div 
                                key="error"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-red-500/5 border border-red-500/20 rounded-[2.5rem] p-12 text-center space-y-4"
                            >
                                <p className="text-2xl font-black text-red-500 uppercase tracking-tighter italic">Signal Refused.</p>
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest italic">The provided identification key does not match any authorized acquisition in our records.</p>
                            </motion.div>
                        ) : (
                                <motion.div 
                                    key="result"
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -40 }}
                                    className="space-y-8"
                                >
                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                        {/* Main Status Card */}
                                        <div className="lg:col-span-12 bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-96 h-96 bg-success/5 rounded-full blur-[100px] -mr-48 -mt-48 transition-colors duration-1000 group-hover:bg-success/10" />
                                            
                                            <div className="relative z-10 flex flex-col md:flex-row justify-between gap-10">
                                                <div className="space-y-8">
                                                    <div>
                                                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] italic mb-2">Identification</p>
                                                        <h2 className="text-3xl font-black text-white italic tracking-widest">
                                                            {order.trackingId || order.transactionId || order._id}
                                                        </h2>
                                                        <p className="text-[10px] text-success font-bold uppercase tracking-widest mt-1 opacity-60">Status: {order.status}</p>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-10">
                                                        <div>
                                                            <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest italic mb-2">Deployed</p>
                                                            <p className="text-sm font-black text-white italic">{formatDate(order.createdAt)}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest italic mb-2">Payment</p>
                                                            <p className={`text-sm font-black italic ${order.paymentStatus === 'PAID' ? 'text-success' : 'text-warning'}`}>
                                                                {order.paymentStatus}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col items-center md:items-end justify-center gap-4">
                                                    <div className="text-center md:text-right">
                                                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest italic mb-2">Phase Index</p>
                                                        <div className={`px-8 py-4 rounded-2xl border text-xl font-black uppercase italic tracking-widest ${
                                                            order.status === 'DELIVERED' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                                                            order.status === 'SHIPPED' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' :
                                                            'bg-gray-500/10 border-white/10 text-gray-400'
                                                        }`}>
                                                            {order.status}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Items Timeline */}
                                        <div className="lg:col-span-7 bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-8 md:p-10">
                                            <div className="flex items-center gap-3 mb-8">
                                                <PackageIcon size={18} className="text-success" />
                                                <h3 className="text-xs font-black text-white uppercase tracking-widest italic">Manifest Details</h3>
                                            </div>
                                            <div className="space-y-4">
                                                {order.foods.map((item: any, idx: number) => (
                                                    <div key={idx} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/5 relative bg-white/5">
                                                                {item.food.image ? (
                                                                    <Image src={item.food.image} fill alt={item.food.name} className="object-cover" sizes="48px" />
                                                                ) : (
                                                                    <div className="w-full h-full bg-white/5 flex items-center justify-center text-xl">🍽</div>
                                                                )}
                                                            </div>
                                                            <div>
                                                                <h4 className="text-sm font-black text-white italic tracking-tight">{item.food.name}</h4>
                                                                <p className="text-[10px] text-gray-500 font-bold uppercase">Qty: {item.quantity}</p>
                                                            </div>
                                                        </div>
                                                        <p className="font-black text-success italic">${(item.food.price * item.quantity).toFixed(2)}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Status History */}
                                        <div className="lg:col-span-5 bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-8 md:p-10">
                                            <div className="flex items-center gap-3 mb-6">
                                                <ClockIcon size={18} className="text-success" />
                                                <h3 className="text-xs font-black text-white uppercase tracking-widest italic">Temporal Log</h3>
                                            </div>
                                            <OrderTimeline history={order.statusHistory || []} />
                                        </div>
                                    </div>
                                </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default UserTrackPage;
