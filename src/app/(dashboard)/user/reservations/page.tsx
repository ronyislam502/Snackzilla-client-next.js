"use client";

import { useGetMyReservationsQuery, useDeleteReservationMutation } from "@/redux/features/reservation/reservationApi";
import ReservationForm from "@/components/ui/ReservationForm";
import { formatDate } from "@/components/utilities/Date";
import { toast } from "react-toastify";
import { TError } from "@/types/global";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarIcon, ClockIcon, UsersIcon, TrashIcon } from "@/components/shared/Icons";
import TableSkeleton from "@/components/ui/skeleton/TableSkeleton";

const MyReservations = () => {
  const { data: reservations, isLoading } = useGetMyReservationsQuery(undefined);
  const [deleteReservation] = useDeleteReservationMutation();

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to cancel this reservation?")) {
      try {
        await deleteReservation(id).unwrap();
        toast.success("Reservation cancelled successfully");
      } catch (error) {
        const err = error as TError;
        toast.error(err?.data?.message || "Failed to cancel reservation");
      }
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-12 lg:max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-[#0a0a0a]/60 backdrop-blur-3xl p-6 md:p-8 rounded-3xl border border-success/20 relative overflow-hidden group hover:border-blue-500/40 transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-tr from-success/8 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 space-y-1">
          <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter italic">My <span className="text-success group-hover:text-blue-400 transition-colors duration-500">Reservations.</span></h2>
          <div className="flex items-center gap-3">
            <span className="text-gray-500 font-bold text-[10px] tracking-[0.2em] uppercase italic">Booking Registry</span>
            <div className="h-px w-8 bg-success/20 group-hover:bg-blue-500/20 transition-colors duration-500"></div>
            <span className="bg-success/10 text-success border border-success/20 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider italic">
              {reservations?.data?.length || 0} Entries
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
        {/* Booking Form */}
        <div className="xl:col-span-5">
           <ReservationForm />
        </div>

        {/* Reservations List */}
        <div className="xl:col-span-7 space-y-6">
          <div className="bg-[#0a0a0a]/60 backdrop-blur-3xl rounded-3xl border border-success/20 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] group hover:border-blue-500/40 transition-all duration-500">
            <div className="overflow-x-auto">
              <table className="table w-full border-separate border-spacing-y-2 px-6">
                <thead>
                  <tr className="text-gray-500 uppercase text-[9px] font-black tracking-widest italic border-none text-center">
                    <th className="bg-transparent text-left pl-8">Chronology</th>
                    <th className="bg-transparent">Engagement</th>
                    <th className="bg-transparent">Magnitude</th>
                    <th className="bg-transparent">Status</th>
                    <th className="bg-transparent text-right pr-8">Operational</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {isLoading ? (
                    <TableSkeleton columns={5} rows={5} />
                  ) : (
                    <AnimatePresence mode="popLayout">
                      {reservations?.data?.map((res: { _id: string; date: string; time: string; name: string; guests: number; status: string }, index: number) => (
                        <motion.tr
                          key={res?._id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ delay: index * 0.05 }}
                          className="group bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 rounded-2xl border border-white/5"
                        >
                          <td className="pl-8 py-4 rounded-l-2xl border-none">
                            <div className="flex flex-col gap-0.5">
                              <span className="text-white font-black text-xs uppercase tracking-tighter italic flex items-center gap-1.5">
                                <CalendarIcon size={12} className="text-success" /> {res.date}
                              </span>
                              <span className="text-gray-500 text-[10px] font-bold uppercase italic flex items-center gap-1.5">
                                <ClockIcon size={12} /> {res.time}
                              </span>
                            </div>
                          </td>
                          <td className="border-none py-4 text-center">
                            <p className="font-black text-white text-[10px] uppercase tracking-widest italic">
                              {res.name}
                            </p>
                          </td>
                          <td className="border-none py-4 text-center">
                            <div className="flex items-center justify-center gap-1.5 text-gray-500 font-black text-[10px] uppercase italic">
                              <UsersIcon size={12} /> {res.guests} <span className="text-[8px]">Heads</span>
                            </div>
                          </td>
                          <td className="border-none py-4 text-center">
                            <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest italic ${
                              res.status === "CONFIRMED" ? "bg-success/20 text-success border border-success/20" :
                              res.status === "PENDING" ? "bg-warning/20 text-warning border border-warning/20" :
                              "bg-red-500/20 text-red-400 border border-red-500/20"
                            }`}>
                              {res.status}
                            </span>
                          </td>
                          <td className="rounded-r-2xl border-none pr-8 py-4 text-right">
                             <button 
                               onClick={() => handleDelete(res._id)}
                               className="p-2 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all duration-300"
                               title="Cancel Reservation"
                             >
                                <TrashIcon size={14} />
                             </button>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  )}
                  {!isLoading && reservations?.data?.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-20 text-center">
                        <p className="text-gray-500 font-black uppercase tracking-widest italic text-xs">No active bookings detected</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyReservations;
