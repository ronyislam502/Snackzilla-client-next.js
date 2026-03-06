"use client";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useCreateReservationMutation } from "@/redux/features/reservation/reservationApi";
import { useAppSelector } from "@/redux/hooks";
import { TUser } from "@/redux/features/auth/authSlice";
import { motion } from "framer-motion";
import { CalendarIcon, ClockIcon, UsersIcon, SendIcon } from "@/components/shared/Icons";

const ReservationForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [createReservation, { isLoading }] = useCreateReservationMutation();
  const user = useAppSelector((state) => state.auth.user) as TUser;

  const onSubmit = async (data: Record<string, unknown>) => {
    try {
      const reservationData = {
        ...data,
        user: user?.user,
        email: user?.email,
        status: "PENDING",
      };
      await createReservation(reservationData).unwrap();
      toast.success("Reservation request sent successfully!");
      reset();
    } catch (error) {
      toast.error((error as { data?: { message?: string } })?.data?.message || "Failed to book reservation");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-xl mx-auto bg-[#0a0a0a]/60 backdrop-blur-3xl p-8 rounded-3xl border border-success/20 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden group hover:border-blue-500/40 transition-all duration-500"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-success/5 via-transparent to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div className="relative z-10 space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic">Book a <span className="text-success group-hover:text-blue-400 transition-colors duration-500">Table.</span></h2>
          <p className="text-gray-500 font-bold text-[10px] tracking-[0.2em] uppercase italic">Secure your culinary experience</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest italic ml-1">Guest Name</label>
              <input
                {...register("name", { required: true })}
                placeholder="Rony Islam"
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-success/50 group-hover:focus:border-blue-500/50 transition-all italic placeholder:text-gray-700"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest italic ml-1">Contact Phone</label>
              <input
                {...register("phone", { required: true })}
                placeholder="+88017..."
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-success/50 group-hover:focus:border-blue-500/50 transition-all italic placeholder:text-gray-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest italic ml-1 flex items-center gap-1.5">
                <CalendarIcon size={10} /> Date Selection
              </label>
              <input
                type="date"
                {...register("date", { required: true })}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-success/50 group-hover:focus:border-blue-500/50 transition-all italic [color-scheme:dark]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest italic ml-1 flex items-center gap-1.5">
                <ClockIcon size={10} /> Prime Time
              </label>
              <input
                type="time"
                {...register("time", { required: true })}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-success/50 group-hover:focus:border-blue-500/50 transition-all italic [color-scheme:dark]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest italic ml-1 flex items-center gap-1.5">
                <UsersIcon size={10} /> Party Size
              </label>
              <input
                type="number"
                min="1"
                {...register("guests", { required: true, valueAsNumber: true })}
                placeholder="2"
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-success/50 group-hover:focus:border-blue-500/50 transition-all italic placeholder:text-gray-700"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest italic ml-1">Special Requirements</label>
            <textarea
              {...register("message")}
              placeholder="Any specific table preference or dietary notes?"
              rows={3}
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-success/50 group-hover:focus:border-blue-500/50 transition-all italic placeholder:text-gray-700 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full group/btn relative overflow-hidden bg-success hover:bg-success/90 group-hover:bg-blue-600 transition-all duration-500 py-4 rounded-xl flex items-center justify-center gap-3 disabled:opacity-50 active:scale-[0.98]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
            <span className="font-black text-black group-hover:text-white text-xs uppercase tracking-[0.2em] italic transition-colors">
              {isLoading ? "Processing..." : "Commence Booking"}
            </span>
            <SendIcon size={16} className="text-black group-hover:text-white transition-colors" />
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default ReservationForm;
