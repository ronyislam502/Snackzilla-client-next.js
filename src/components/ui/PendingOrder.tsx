import React from "react";
import { formatDate, orderTime, TimeAgo } from "../utilities/Date";
import { TOrder } from "@/types/order";
import Image from "next/image";

const PendingOrder = ({ order }: { order: TOrder }) => {
    console.log("or", order)
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
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40 shadow-[0_0_8px_rgba(59,130,246,0.4)]"></div>
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
                                        width={100}
                                        height={100}
                                        className="object-cover rounded-xl border border-white/10 relative z-10 brightness-75 group-hover/item:brightness-100 transition-all bg-[#0a0a0a]"
                                    />
                                ) : (
                                    <div className="w-full h-full rounded-xl border border-white/10 relative z-10 bg-white/5 flex items-center justify-center text-center">
                                        <span className="text-[7px] text-gray-500 font-bold uppercase leading-tight italic">No<br />Img</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-blue-500/10 rounded-xl blur-md opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                            </div>
                            <div className="space-y-0.5">
                                <p className="text-[10px] font-black text-white uppercase tracking-tighter group-hover/item:text-blue-400 transition-colors italic">
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
            <td className="px-8 py-5 text-right relative group/actions">
                <div className="flex flex-col items-end gap-2">
                    <span className="px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.1)] animate-pulse italic group-hover/actions:opacity-0 transition-opacity">
                        PENDING SETTLEMENT
                    </span>

                    <div className="absolute inset-y-0 right-8 flex items-center opacity-0 group-hover/actions:opacity-100 transition-all duration-300 translate-x-4 group-hover/actions:translate-x-0">
                        <a
                            href={`${process.env.NEXT_PUBLIC_BASE_URL}/orders/invoice/${order._id}`}
                            download={`invoice-${order.transactionId}.html`}
                            className="px-4 py-2 bg-blue-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:scale-105 active:scale-95 transition-all italic flex items-center gap-2"
                        >
                            RECEIPT_DOWNLOAD
                        </a>
                    </div>
                </div>
            </td>
        </>
    );
};

export default PendingOrder;
