import { TOrder } from "@/types/order";
import { formatDate, orderTime, TimeAgo } from "../utilities/Date";
import { useUpdateOrderMutation } from "@/redux/features/order/orderApi";
import { toast } from "react-toastify";
import { TError } from "@/types/global";
import Link from "next/link";
import Image from "next/image";

const OrderTable = ({ order }: { order: TOrder }) => {
    const [updateOrder, { isLoading }] = useUpdateOrderMutation();

    const handleStatusUpdate = async (newStatus: string) => {
        try {
            const res = await updateOrder({
                id: order._id,
                data: { status: newStatus }
            }).unwrap();
            if (res.success) {
                toast.success(`Order ${newStatus.toLowerCase()} successfully`);
            }
        } catch (error) {
            const err = error as TError;
            toast.error(err?.data?.message || "Failed to update order");
        }
    };

    return (
        <>
            <td className="px-8 py-5">
                <div className="space-y-1">
                    <p className="font-black text-white text-[11px] uppercase tracking-tighter italic">
                        {TimeAgo(order?.createdAt)}
                    </p>
                    <div className="flex items-center gap-2 text-[8px] text-gray-500 font-bold uppercase tracking-widest italic opacity-50">
                        <span>{formatDate(order?.createdAt)}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                        <span>{orderTime(order?.createdAt)}</span>
                    </div>
                </div>
            </td>
            <td className="px-8 py-5">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-success/40 shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
                    <p className="font-black text-white text-[10px] uppercase tracking-widest bg-white/[0.03] border border-white/5 px-2.5 py-1 rounded-lg italic">
                        TRAN_ID <span className="text-gray-500 ml-1">#{order?.transactionId?.slice(-8)}</span>
                    </p>
                </div>
            </td>
            <td className="px-8 py-5">
                <div className="flex flex-col gap-3">
                    {order?.foods?.map((item, index: number) => (
                        <div className="flex items-center gap-3 group/item" key={item?.food?._id || `food-${index}`}>
                            <div className="relative w-10 h-10 shrink-0">
                                {item?.food?.image ? (
                                    <Image 
                                        src={item?.food?.image} 
                                        alt={item?.food?.name || "Food Item"}
                                        fill
                                        className="object-cover rounded-xl border border-white/10 relative z-10 brightness-75 group-hover/item:brightness-100 transition-all bg-[#0a0a0a]" 
                                    />
                                ) : (
                                    <div className="w-full h-full rounded-xl border border-white/10 relative z-10 bg-white/5 flex items-center justify-center text-center">
                                        <span className="text-[7px] text-gray-500 font-bold uppercase leading-tight italic">No<br/>Img</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-success/10 rounded-xl blur-md opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                            </div>
                            <div className="space-y-0.5">
                                <p className="text-[10px] font-black text-white uppercase tracking-tighter group-hover/item:text-success transition-colors italic">
                                    {item?.food?.name}
                                </p>
                                <p className="text-[8px] text-gray-500 font-bold uppercase tracking-widest italic">
                                    QTY {item?.quantity} <span className="mx-1 opacity-20">|</span> UNIT ${item?.food?.price}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </td>
            <td className="px-8 py-5 text-right">
                    <div className="flex flex-col items-end gap-3">
                        <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-wider italic border transition-all duration-500 ${
                            order?.status === "SHIPPED" 
                            ? "bg-success/10 text-success border-success/30 shadow-[0_0_15px_rgba(34,197,94,0.1)]" 
                            : order?.status === "CANCELLED"
                            ? "bg-red-500/10 text-red-500 border-red-500/20"
                            : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                        }`}>
                            {order?.status}
                        </span>
                        
                        <div className="flex gap-2 opacity-0 group-hover/row:opacity-100 transition-opacity duration-300">
                            <Link
                                href={`/admin/orderManagement/${order._id}`}
                                className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all italic"
                            >
                                View Details
                            </Link>
                            {order?.status === "UNSHIPPED" && (
                                <button 
                                    onClick={() => handleStatusUpdate("SHIPPED")}
                                    disabled={isLoading}
                                    className="px-3 py-1.5 bg-success/10 hover:bg-success text-success hover:text-black border border-success/20 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all italic"
                                >
                                    DEPLOY UNIT
                                </button>
                            )}
                            {order?.status === "SHIPPED" && (
                                <button 
                                    onClick={() => handleStatusUpdate("DELIVERED")}
                                    disabled={isLoading}
                                    className="px-3 py-1.5 bg-white/5 hover:bg-white hover:text-black border border-white/10 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all italic"
                                >
                                    FINALIZED
                                </button>
                            )}
                            {(order?.status === "UNSHIPPED" || order?.status === "PENDING") && (
                                <button 
                                    onClick={() => handleStatusUpdate("CANCELLED")}
                                    disabled={isLoading}
                                    className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all italic"
                                >
                                    TERMINATE
                                </button>
                            )}
                        </div>
                    </div>
            </td>
        </>
    );
};

export default OrderTable;
