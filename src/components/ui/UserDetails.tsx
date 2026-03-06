import { useState } from "react";
import { TUserDetail } from "@/types/user";
import { EyeFilledIcon } from "../shared/Icons";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import Portal from "./Portal";

const UserDetails = ({ user }: { user: TUserDetail }) => {
    const [isOpen, setIsOpen] = useState(false);

    const address = user?.address
        ? `${user?.address?.street}, ${user?.address?.city}-${user?.address?.postalCode}, ${user?.address?.state}, ${user.address.country}`
        : "N/A";

    return (
        <>
            <button
                className="group relative p-2.5 rounded-xl bg-white/5 border border-white/5 text-gray-400 hover:text-success hover:bg-success/10 hover:border-success/20 transition-all duration-300"
                onClick={() => setIsOpen(true)}
            >
                <EyeFilledIcon />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <Portal>
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsOpen(false)}
                                className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
                            />
                            
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                className="relative w-full max-w-2xl bg-[#0a0a0a]/60 backdrop-blur-3xl rounded-[2rem] border border-success/20 shadow-[0_0_100px_rgba(0,0,0,1)] overflow-hidden group hover:border-blue-500/40 hover:shadow-[0_0_80px_rgba(59,130,246,0.2)] transition-all duration-500"
                            >
                                <div className="absolute inset-0 bg-gradient-to-tr from-success/8 via-success/3 to-transparent transition-opacity duration-700 group-hover:opacity-0 pointer-events-none" />
                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                
                                {/* Decorative Elements */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-success/5 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none group-hover:bg-blue-500/10 transition-colors duration-700" />
                                
                                <div className="relative z-10 p-8 md:p-10">
                                    <div className="flex flex-col md:flex-row gap-10 items-start">
                                        {/* Avatar Column */}
                                        <div className="shrink-0 space-y-4 mx-auto md:mx-0">
                                            <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden border border-success/20 group-hover/avatar:border-blue-500/40 transition-colors duration-500 group/avatar">
                                                <Image
                                                    src={user?.avatar || "/avatar.png"}
                                                    alt="avatar"
                                                    fill
                                                    className="object-cover grayscale brightness-75 group-hover/avatar:grayscale-0 group-hover/avatar:brightness-100 group-hover/avatar:scale-105 transition-all duration-700"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                                            </div>
                                            
                                            <div className="text-center">
                                                <span className={`px-4 py-1 rounded-full text-[8px] font-black uppercase tracking-[0.2em] italic border ${
                                                    user?.status === "ACTIVE" 
                                                    ? "bg-success/10 text-success border-success/20" 
                                                    : "bg-red-500/10 text-red-500 border-red-500/20"
                                                }`}>
                                                    SYSTEM {user?.status}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Details Column */}
                                        <div className="flex-1 space-y-8 w-full">
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-success font-black text-[8px] uppercase tracking-widest bg-success/10 border border-success/20 px-2.5 py-1 rounded-lg italic">
                                                        {user?.role} CLEARANCE
                                                    </span>
                                                    <div className="h-px flex-1 bg-white/5" />
                                                </div>
                                                <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter italic leading-tight">
                                                    {user?.name}
                                                </h3>
                                            </div>

                                            <div className="grid grid-cols-1 gap-6">
                                                <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                                                    <div className="space-y-0.5">
                                                        <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest italic">Electronic Address</p>
                                                        <p className="text-[11px] text-white font-bold">{user?.email}</p>
                                                    </div>
                                                    <div className="w-1 h-1 rounded-full bg-success/40 shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
                                                </div>

                                                <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                                                    <div className="space-y-0.5">
                                                        <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest italic">Encrypted Line</p>
                                                        <p className="text-[11px] text-white font-bold">{user?.phone || "NOT REGISTERED"}</p>
                                                    </div>
                                                    <div className="w-1 h-1 rounded-full bg-success/40 shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest italic ml-1">Archive Location</p>
                                                <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                                                    <p className="text-[10px] text-gray-400 leading-relaxed font-bold italic opacity-70">
                                                        {address !== "N/A" ? address : "No physical coordinates found in core database records."}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="pt-4 flex justify-end">
                                                <button
                                                    className="group relative px-6 py-2.5 rounded-xl bg-white/[0.03] text-gray-500 font-black hover:text-white hover:bg-white/10 transition-all border border-white/5 uppercase text-[9px] tracking-widest overflow-hidden italic"
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                                    Close Entry
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </Portal>
                )}
            </AnimatePresence>
        </>
    );
};

export default UserDetails;
