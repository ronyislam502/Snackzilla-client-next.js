"use client"

import { useGetAllReservationsQuery, useUpdateReservationStatusMutation, useDeleteReservationMutation } from "@/redux/features/reservation/reservationApi";
import { motion, AnimatePresence } from "framer-motion";
import { 
    CalendarIcon, 
    ClockIcon, 
    UsersIcon, 
    CheckCircleIcon, 
    TimerIcon, 
    XCircleIcon, 
    DeleteIcon,
    MailIcon,
    PhoneIcon,
    UserIcon
} from "@/components/shared/Icons";
import { toast } from "react-toastify";

const AdminReservations = () => {
    const { data: reservations, isLoading } = useGetAllReservationsQuery({});
    const [updateStatus] = useUpdateReservationStatusMutation();
    const [deleteReservation] = useDeleteReservationMutation();

    const handleStatusUpdate = async (id: string, status: string) => {
        try {
            const res = await updateStatus({ id, status }).unwrap();
            if (res.success) {
                toast.success(`RESERVATION ${status}`);
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "UPDATE FAILED");
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("EXECUTE PERMANENT PURGE?")) return;
        try {
            const res = await deleteReservation(id).unwrap();
            if (res.success) {
                toast.success("RECORD DELETED");
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "OPERATION FAILED");
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "CONFIRMED": return "text-success bg-success/10 border-success/20 shadow-[0_0_30px_rgba(34,197,94,0.2)]";
            case "PENDING": return "text-blue-400 bg-blue-500/10 border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.2)]";
            case "CANCELLED": return "text-red-400 bg-red-500/10 border-red-500/20";
            default: return "text-gray-500 bg-gray-500/10 border-gray-500/20";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "CONFIRMED": return <CheckCircleIcon size={14} />;
            case "PENDING": return <TimerIcon size={14} />;
            case "CANCELLED": return <XCircleIcon size={14} />;
            default: return null;
        }
    };

    return (
        <div className="p-4 md:p-8 space-y-10 lg:max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 bg-[#0a0a0a]/60 backdrop-blur-3xl p-6 md:p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-success/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-success/10 transition-colors duration-700"></div>
                
                <div className="space-y-1 relative z-10">
                    <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter italic leading-none">
                        Booking <span className="text-success">Authority.</span>
                    </h2>
                    <div className="flex items-center gap-3">
                        <span className="text-gray-500 font-bold text-[10px] tracking-[0.2em] uppercase italic">Culinary Floor Control</span>
                        <div className="h-px w-8 bg-success/20"></div>
                        <span className="text-gray-400 font-bold text-[9px] uppercase tracking-widest italic opacity-60">
                            MANAGEMENT OF PHYSICAL RESERVES
                        </span>
                    </div>
                </div>

                <div className="px-6 py-4 bg-white/[0.02] border border-white/5 rounded-2xl relative z-10 group-hover:bg-white/[0.04] transition-colors">
                     <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest mb-0.5 italic">Queue Depth</p>
                     <p className="text-2xl font-black text-white italic tracking-tighter">
                        {String(reservations?.data?.length || 0).padStart(2, '0')}
                     </p>
                </div>
            </div>

            <div className="relative overflow-hidden bg-[#0a0a0a]/40 backdrop-blur-3xl border border-white/5 rounded-[2rem] shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-b from-success/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/[0.01]">
                                <th className="px-8 py-5 text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] italic pl-10">Client Identity</th>
                                <th className="px-8 py-5 text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] italic">Schedule Mapping</th>
                                <th className="px-8 py-5 text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] italic text-center">Status Mapping</th>
                                <th className="px-8 py-5 text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] italic text-right pl-8 pr-10">Directives</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.02]">
                            <AnimatePresence mode="popLayout">
                                {reservations?.data?.map((res: any, idx: number) => (
                                    <motion.tr 
                                        key={res._id}
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.98 }}
                                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                                        className="group/row bg-[#0f0f0f]/30 hover:bg-white/[0.02] transition-colors"
                                    >
                                        <td className="px-8 py-5 pl-10">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-gray-600 group-hover/row:text-success group-hover/row:border-success/20 transition-all shadow-inner">
                                                    <UserIcon size={18} />
                                                </div>
                                                <div>
                                                    <p className="text-[11px] font-black text-white tracking-widest uppercase italic group-hover/row:text-success transition-all">{res.name}</p>
                                                    <div className="flex items-center gap-2 text-gray-500 text-[8px] font-black uppercase tracking-widest mt-1 italic opacity-60">
                                                        <MailIcon size={10} className="text-success/50" />
                                                        {res.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="space-y-1.5">
                                                <div className="flex items-center gap-2 px-3 py-1 bg-white/[0.03] rounded-lg border border-white/5 w-fit">
                                                    <CalendarIcon size={12} className="text-success" />
                                                    <span className="text-[10px] font-black text-white uppercase italic tracking-tighter">
                                                        {new Date(res.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-500 text-[8px] font-black uppercase tracking-widest pl-1 italic opacity-60">
                                                    <ClockIcon size={10} className="text-success/50" />
                                                    {res.time} • {res.guests} GUESTS
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-center">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-[0.2em] border backdrop-blur-md transition-all group-hover/row:scale-105 italic ${getStatusStyle(res.status)}`}>
                                                {getStatusIcon(res.status)}
                                                {res.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-right pr-6">
                                            <div className="flex justify-end items-center gap-2">
                                                {res.status === 'PENDING' && (
                                                    <button 
                                                        onClick={() => handleStatusUpdate(res._id, 'CONFIRMED')}
                                                        className="p-2.5 bg-white/5 text-gray-600 rounded-lg hover:bg-success/10 hover:text-success transition-all border border-white/5 shadow-lg active:scale-90"
                                                        title="AUTHORIZE"
                                                    >
                                                        <CheckCircleIcon size={16} />
                                                    </button>
                                                )}
                                                {res.status !== 'CANCELLED' && (
                                                    <button 
                                                        onClick={() => handleStatusUpdate(res._id, 'CANCELLED')}
                                                        className="p-2.5 bg-white/5 text-gray-600 rounded-lg hover:bg-red-500/10 hover:text-red-500 transition-all border border-white/5 shadow-lg active:scale-90"
                                                        title="TERMINATE"
                                                    >
                                                        <XCircleIcon size={16} />
                                                    </button>
                                                )}
                                                <button 
                                                    onClick={() => handleDelete(res._id)}
                                                    className="p-2.5 bg-white/5 text-gray-700 rounded-lg hover:bg-white hover:text-black transition-all border border-white/5 active:scale-90 opacity-60 hover:opacity-100"
                                                    title="PURGE"
                                                >
                                                    <DeleteIcon size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                    
                    {(isLoading || reservations?.data?.length === 0) && (
                        <div className="py-24 text-center">
                            {isLoading ? (
                                <div className="flex flex-col items-center gap-6">
                                    <div className="w-12 h-12 border-2 border-success border-t-transparent rounded-full animate-spin shadow-[0_0_30px_rgba(34,197,94,0.2)]"></div>
                                    <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.5em] animate-pulse italic">Syncing Control Matrices</p>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <motion.div 
                                        initial={{ rotate: -10, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        className="w-20 h-20 bg-white/[0.02] rounded-[1.5rem] flex items-center justify-center mx-auto text-gray-800 border border-white/5 shadow-inner"
                                    >
                                        <CalendarIcon size={32} className="opacity-20" />
                                    </motion.div>
                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic leading-none">Grid <span className="text-success">Vacant.</span></h3>
                                        <p className="text-gray-700 font-bold uppercase tracking-[0.3em] text-[8px] italic opacity-60">No incoming intelligence detected</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminReservations;
