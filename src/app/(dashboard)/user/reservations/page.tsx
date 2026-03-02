"use client"

import { useGetMyReservationsQuery } from "@/redux/features/reservation/reservationApi";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarIcon, ClockIcon, UsersIcon, CheckCircleIcon, TimerIcon, XCircleIcon } from "@/components/shared/Icons";

const UserReservations = () => {
    const { data: reservations, isLoading } = useGetMyReservationsQuery({});

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "CONFIRMED":
                return "bg-success/10 text-success border-success/20 shadow-[0_0_20px_rgba(34,197,94,0.15)]";
            case "PENDING":
                return "bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.15)]";
            case "CANCELLED":
                return "bg-red-500/10 text-red-400 border-red-500/20";
            default:
                return "bg-gray-500/10 text-gray-400 border-gray-500/20";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "CONFIRMED": return <CheckCircleIcon size={12} />;
            case "PENDING": return <TimerIcon size={12} />;
            case "CANCELLED": return <XCircleIcon size={12} />;
            default: return null;
        }
    };

    return (
    <div className="p-4 md:p-8 space-y-8 lg:max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-[#0a0a0a]/60 backdrop-blur-3xl p-6 md:p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-success/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-success/10 transition-colors duration-700"></div>
          
          <div className="space-y-1 relative z-10">
              <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter italic leading-none">Diplomatic <span className="text-success">Reserves.</span></h2>
              <div className="flex items-center gap-3">
                  <span className="text-gray-500 font-bold text-[10px] tracking-[0.2em] uppercase italic">Engagement Registry</span>
                  <div className="h-px w-8 bg-success/20"></div>
                  <span className="bg-success/10 text-success border border-success/20 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider italic">
                      Operational Status: ACTIVE
                  </span>
              </div>
          </div>

          <div className="relative z-10 px-6 py-4 bg-white/[0.03] border border-white/5 rounded-2xl backdrop-blur-md flex items-center gap-6 group-hover:border-success/20 transition-all duration-500">
             <div className="space-y-0.5">
                <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest italic">Confirmed Assets</p>
                <p className="text-2xl font-black text-white italic tracking-tighter leading-none">
                    {reservations?.data?.filter((r: any) => r.status === 'CONFIRMED').length || 0}
                </p>
             </div>
             <div className="w-px h-8 bg-white/5"></div>
             <div className="space-y-0.5">
                <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest italic">Pending Authorization</p>
                <p className="text-2xl font-black text-success italic tracking-tighter leading-none">
                    {reservations?.data?.filter((r: any) => r.status === 'PENDING').length || 0}
                </p>
             </div>
          </div>
      </div>

      <div className="bg-[#0a0a0a]/40 backdrop-blur-3xl border border-white/5 rounded-3xl overflow-hidden shadow-2xl relative group">
          <div className="absolute inset-0 bg-gradient-to-b from-success/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                  <thead>
                      <tr className="border-b border-white/5 bg-white/[0.01]">
                          <th className="px-8 py-6 text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] italic">Temporal Mapping</th>
                          <th className="px-8 py-6 text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] italic">Unit Engagement</th>
                          <th className="px-8 py-6 text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] italic">Status Vector</th>
                          <th className="px-8 py-6 text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] italic text-right">Operational Directives</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.02]">
                      <AnimatePresence mode="popLayout">
                          {reservations?.data?.map((res: any, idx: number) => (
                              <motion.tr 
                                  key={res._id}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: idx * 0.05 }}
                                  className="group/row hover:bg-white/[0.02] transition-colors"
                              >
                                  <td className="px-8 py-6">
                                      <div className="flex items-center gap-4">
                                          <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-gray-400 group-hover/row:text-success group-hover/row:border-success/30 transition-all">
                                              <CalendarIcon size={16} />
                                          </div>
                                          <div>
                                              <p className="text-sm font-black text-white tracking-tighter uppercase italic">{new Date(res.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                              <div className="flex items-center gap-1.5 text-gray-500 text-[8px] font-black uppercase tracking-widest mt-0.5">
                                                  <ClockIcon size={8} className="text-success" />
                                                  {res.time}
                                              </div>
                                          </div>
                                      </div>
                                  </td>
                                  <td className="px-8 py-6">
                                      <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0f0f0f] rounded-xl border border-white/5 w-fit">
                                          <UsersIcon size={12} className="text-success/50" />
                                          <span className="text-[10px] font-black text-white uppercase italic tracking-tighter">{res.guests} GUESTS</span>
                                      </div>
                                  </td>
                                  <td className="px-8 py-6">
                                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-[0.15em] border italic ${getStatusStyle(res.status)}`}>
                                          {getStatusIcon(res.status)}
                                          {res.status}
                                      </span>
                                  </td>
                                  <td className="px-8 py-6 text-right">
                                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest italic opacity-40 group-hover/row:opacity-100 transition-opacity truncate max-w-[200px] ml-auto">
                                          {res.message ? `IDENT: ${res.message}` : "NO_SPECIAL_DIRECTIVE"}
                                      </p>
                                  </td>
                              </motion.tr>
                          ))}
                      </AnimatePresence>
                  </tbody>
              </table>

              {reservations?.data?.length === 0 && !isLoading && (
                  <div className="p-20 text-center space-y-6">
                      <div className="w-16 h-16 bg-white/[0.02] rounded-2xl flex items-center justify-center mx-auto text-gray-800 border border-white/5">
                          <ClockIcon size={32} />
                      </div>
                      <div className="space-y-1">
                          <h3 className="text-lg font-black text-white uppercase tracking-tighter italic">Silent Grid.</h3>
                          <p className="text-gray-600 font-black uppercase tracking-[0.3em] text-[8px]">Awaiting tactical deployment</p>
                      </div>
                  </div>
              )}

              {isLoading && (
                  <div className="p-20 flex flex-col items-center justify-center gap-4">
                      <div className="w-8 h-8 border-2 border-success border-t-transparent rounded-full animate-spin shadow-[0_0_20px_rgba(34,197,94,0.2)]" />
                      <p className="text-[8px] font-black text-gray-600 uppercase tracking-[0.4em] animate-pulse">Synchronizing Data Feed</p>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};

export default UserReservations;
