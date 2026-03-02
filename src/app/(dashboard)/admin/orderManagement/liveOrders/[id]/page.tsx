"use client";

import { useSingleOrderQuery, useUpdateOrderMutation } from "@/redux/features/order/orderApi";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { toast } from "react-toastify";
import { useState } from "react";
import { formatDate } from "@/components/utilities/Date";
import Link from "next/link";

const ORDER_STATUSES = ["UNSHIPPED", "SHIPPED", "DELIVERED", "CANCELLED"] as const;
type OrderStatus = typeof ORDER_STATUSES[number];

const statusConfig: Record<string, { color: string; bg: string; border: string; glow: string }> = {
    PENDING:    { color: "text-yellow-400",  bg: "bg-yellow-400/10",  border: "border-yellow-400/20",  glow: "shadow-[0_0_20px_rgba(250,204,21,0.15)]" },
    UNSHIPPED:  { color: "text-blue-400",    bg: "bg-blue-400/10",    border: "border-blue-400/20",    glow: "shadow-[0_0_20px_rgba(96,165,250,0.15)]" },
    SHIPPED:    { color: "text-success",     bg: "bg-success/10",     border: "border-success/20",     glow: "shadow-[0_0_20px_rgba(34,197,94,0.15)]" },
    DELIVERED:  { color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20", glow: "shadow-[0_0_20px_rgba(52,211,153,0.15)]" },
    CANCELLED:  { color: "text-red-400",     bg: "bg-red-400/10",     border: "border-red-400/20",     glow: "shadow-[0_0_20px_rgba(248,113,113,0.15)]" },
    PAID:       { color: "text-success",     bg: "bg-success/10",     border: "border-success/20",     glow: "" },
    FAILED:     { color: "text-red-400",     bg: "bg-red-400/10",     border: "border-red-400/20",     glow: "" },
    CANCELED:   { color: "text-red-400",     bg: "bg-red-400/10",     border: "border-red-400/20",     glow: "" },
    REFUNDED:   { color: "text-purple-400",  bg: "bg-purple-400/10",  border: "border-purple-400/20",  glow: "" },
};

const StatusBadge = ({ status }: { status: string }) => {
    const cfg = statusConfig[status] ?? { color: "text-gray-400", bg: "bg-gray-400/10", border: "border-gray-400/20", glow: "" };
    return (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${cfg.color} ${cfg.bg} ${cfg.border} ${cfg.glow}`}>
            {status}
        </span>
    );
};

const SingleOrderPage = () => {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const { data, isLoading } = useSingleOrderQuery(id);
    const [updateOrder, { isLoading: isUpdating }] = useUpdateOrderMutation();
    const [selectedStatus, setSelectedStatus] = useState<OrderStatus | "">("");

    const order = data?.data;
    const user = order?.user as any;

    const handleUpdateStatus = async () => {
        if (!selectedStatus) return;
        try {
            await updateOrder({ id: order?._id, data: { status: selectedStatus } }).unwrap();
            toast.success(`Order status updated to ${selectedStatus}`);
            setSelectedStatus("");
        } catch {
            toast.error("Failed to update order status");
        }
    };

    if (isLoading) {
        return (
            <div className="p-8 space-y-6 lg:max-w-5xl mx-auto animate-pulse">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-40 bg-white/[0.02] rounded-3xl border border-white/5" />
                ))}
            </div>
        );
    }

    if (!order) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl border-2 border-dashed border-white/10 flex items-center justify-center">
                    <span className="text-2xl">📦</span>
                </div>
                <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest italic">Order Not Found</p>
                <Link href="/admin/orderManagement" className="text-success text-[9px] font-black uppercase tracking-widest hover:underline italic">
                    ← Back to Orders
                </Link>
            </div>
        );
    }

    const deliveryDate = order.dueDate
        ? new Date(order.dueDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
        : "—";

    const shippingTime = order.updatedAt && order.createdAt
        ? (() => {
            const diff = new Date(order.updatedAt).getTime() - new Date(order.createdAt).getTime();
            const hours = Math.floor(diff / 3600000);
            return hours > 0 ? `${hours}h processing` : "Just placed";
          })()
        : "—";

    return (
        <div className="p-4 md:p-8 space-y-6 lg:max-w-5xl mx-auto">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-[#0a0a0a]/60 backdrop-blur-3xl p-6 md:p-8 rounded-3xl border border-white/5 relative overflow-hidden group"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-success/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-success/10 transition-colors duration-700 pointer-events-none" />
                <div className="relative z-10 space-y-1">
                    <div className="flex items-center gap-3 mb-2">
                        <button
                            onClick={() => router.back()}
                            className="text-gray-500 hover:text-success transition-colors text-[9px] font-black uppercase tracking-widest italic flex items-center gap-1.5"
                        >
                            ← Back
                        </button>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter italic leading-none">
                        Order <span className="text-success">Detail.</span>
                    </h2>
                    <p className="text-gray-500 font-bold text-[10px] tracking-[0.2em] uppercase italic">
                        #{order?.transactionId?.toUpperCase()}
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 relative z-10">
                    <StatusBadge status={order.paymentStatus} />
                    <StatusBadge status={order.status} />
                    <span className="text-gray-600 text-[9px] font-bold uppercase tracking-widest italic">
                        {formatDate(order.createdAt)}
                    </span>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - User + Timeline */}
                <div className="space-y-6">
                    {/* Customer Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-[#0a0a0a]/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 space-y-5"
                    >
                        <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] italic border-b border-white/5 pb-3">
                            Customer Profile
                        </p>
                        {/* Avatar + name */}
                        <div className="flex items-center gap-4">
                            <div className="relative w-14 h-14 rounded-2xl border border-success/20 overflow-hidden flex-shrink-0">
                                {user?.avatar ? (
                                    <Image src={user.avatar} fill alt="avatar" className="object-cover" sizes="56px" />
                                ) : (
                                    <div className="w-full h-full bg-success/10 flex items-center justify-center text-success font-black text-lg">
                                        {user?.name?.[0] ?? "?"}
                                    </div>
                                )}
                            </div>
                            <div>
                                <p className="font-black text-white text-[13px] uppercase tracking-tight italic leading-tight">{user?.name ?? "—"}</p>
                                <p className="text-[9px] text-success font-bold uppercase tracking-widest italic">Customer</p>
                            </div>
                        </div>
                        {/* Details */}
                        {[
                            { label: "Email", value: user?.email },
                            { label: "Phone", value: user?.phone ?? "—" },
                            { label: "Address", value: user?.address ?? "—" },
                        ].map(({ label, value }) => (
                            <div key={label} className="space-y-0.5">
                                <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest italic">{label}</p>
                                <p className="text-[11px] font-bold text-white break-all">{value}</p>
                            </div>
                        ))}
                    </motion.div>

                    {/* Delivery Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-[#0a0a0a]/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 space-y-4"
                    >
                        <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] italic border-b border-white/5 pb-3">
                            Logistics
                        </p>
                        {[
                            { icon: "📅", label: "Delivery Date", value: deliveryDate },
                            { icon: "⏱", label: "Shipping Time", value: shippingTime },
                            { icon: "📋", label: "PO Reference", value: order.po ?? "—" },
                            { icon: "🆔", label: "Transaction ID", value: `#${order.transactionId?.slice(-10)}` },
                        ].map(({ icon, label, value }) => (
                            <div key={label} className="flex items-start gap-3">
                                <span className="text-base w-5 flex-shrink-0 mt-0.5">{icon}</span>
                                <div>
                                    <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest italic">{label}</p>
                                    <p className="text-[11px] font-bold text-white">{value}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Right Column - Foods + Pricing + Status update */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Food Items */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="bg-[#0a0a0a]/40 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden"
                    >
                        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                            <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] italic">Order Items</p>
                            <span className="text-[9px] font-black text-gray-600 italic">{order.totalQuantity} unit(s)</span>
                        </div>
                        <div className="divide-y divide-white/[0.03]">
                            <AnimatePresence>
                                {(order.foods as any[])?.map((item: any, i: number) => {
                                    const food = item.food;
                                    return (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 + i * 0.05 }}
                                            className="flex items-center gap-4 px-6 py-4 hover:bg-white/[0.015] transition-colors"
                                        >
                                            {/* Food image */}
                                            <div className="relative w-14 h-14 rounded-xl border border-white/10 overflow-hidden flex-shrink-0 bg-white/5">
                                                {food?.image ? (
                                                    <Image src={food.image} fill alt={food.name} className="object-cover" sizes="56px" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-2xl">🍽</div>
                                                )}
                                            </div>
                                            {/* Info */}
                                            <div className="flex-1 min-w-0">
                                                <p className="font-black text-white text-[12px] uppercase tracking-tight italic truncate">{food?.name ?? "Unknown Item"}</p>
                                                {food?.category?.name && (
                                                    <p className="text-[8px] font-bold text-success uppercase tracking-widest italic">{food.category.name}</p>
                                                )}
                                                <p className="text-[9px] text-gray-500 font-bold mt-0.5">
                                                    ${food?.price?.toFixed(2)} × {item.quantity}
                                                </p>
                                            </div>
                                            {/* Subtotal */}
                                            <p className="font-black text-white text-[13px] tracking-tight flex-shrink-0">
                                                ${((food?.price ?? 0) * item.quantity).toFixed(2)}
                                            </p>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    {/* Pricing Summary */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        className="bg-[#0a0a0a]/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 space-y-3"
                    >
                        <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] italic border-b border-white/5 pb-3">
                            Pricing Breakdown
                        </p>
                        {[
                            { label: "Subtotal", value: `$${order.totalPrice?.toFixed(2)}` },
                            { label: "Tax (10%)", value: `$${order.tax?.toFixed(2)}` },
                        ].map(({ label, value }) => (
                            <div key={label} className="flex items-center justify-between">
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest italic">{label}</p>
                                <p className="text-[11px] font-black text-gray-300">{value}</p>
                            </div>
                        ))}
                        <div className="flex items-center justify-between pt-3 border-t border-white/5">
                            <p className="text-[11px] font-black text-white uppercase tracking-widest italic">Grand Total</p>
                            <p className="text-xl font-black text-success tracking-tight">${order.grandAmount?.toFixed(2)}</p>
                        </div>
                    </motion.div>

                    {/* Status Update */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-[#0a0a0a]/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 space-y-4"
                    >
                        <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] italic border-b border-white/5 pb-3">
                            Update Order Status
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {ORDER_STATUSES.map((status) => {
                                const cfg = statusConfig[status] ?? { color: "text-gray-400", bg: "", border: "border-white/10", glow: "" };
                                const isActive = selectedStatus === status;
                                return (
                                    <button
                                        key={status}
                                        onClick={() => setSelectedStatus(isActive ? "" : status)}
                                        className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all duration-300 border italic ${
                                            isActive
                                                ? `${cfg.bg} ${cfg.color} ${cfg.border} ${cfg.glow} scale-105`
                                                : "bg-transparent text-gray-500 border-white/5 hover:border-white/10 hover:text-white"
                                        }`}
                                    >
                                        {status}
                                    </button>
                                );
                            })}
                        </div>
                        <button
                            onClick={handleUpdateStatus}
                            disabled={!selectedStatus || isUpdating}
                            className="w-full py-3 bg-success text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-success/20 disabled:opacity-30 disabled:grayscale disabled:scale-100 italic"
                        >
                            {isUpdating ? "Updating..." : selectedStatus ? `Confirm → ${selectedStatus}` : "Select a Status"}
                        </button>
                    </motion.div>

                    {/* Invoice */}
                    {order.invoiceLink && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35 }}
                            className="bg-success/5 border border-success/10 rounded-3xl p-5 flex items-center justify-between gap-4"
                        >
                            <div>
                                <p className="text-[9px] font-black text-success uppercase tracking-widest italic">Invoice Available</p>
                                <p className="text-[10px] text-gray-400 font-bold mt-0.5">Download the PDF invoice for this order</p>
                            </div>
                            <a
                                href={order.invoiceLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-5 py-2.5 bg-success text-black text-[9px] font-black uppercase tracking-widest rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-success/20 italic flex-shrink-0"
                            >
                                Download PDF
                            </a>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SingleOrderPage;
