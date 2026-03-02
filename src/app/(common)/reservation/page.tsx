"use client";

import SZForm from "@/components/form/SZFrom";
import SZInput from "@/components/form/SZInput";
import SZTextarea from "@/components/form/SZTextarea";
import { reservationSchema } from "@/schema/reservation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { CalendarIcon, UsersIcon, ClockIcon, PhoneIcon, MailIcon, UserIcon } from "@/components/shared/Icons";
import { useCreateReservationMutation } from "@/redux/features/reservation/reservationApi";
import { toast } from "react-toastify";
import { useAppSelector } from "@/redux/hooks";
import { TUser } from "@/redux/features/auth/authSlice";

const ReservationPage = () => {
    const user = useAppSelector((state) => state.auth.user) as TUser;
    const [createReservation] = useCreateReservationMutation();

    const methods = useForm({
        resolver: zodResolver(reservationSchema),
        defaultValues: {
            name: user?.name || "",
            email: user?.email || "",
            guests: 2,
        }
    });

    const onSubmit = async (data: FieldValues) => {
        try {
            const res = await createReservation(data).unwrap();
            if (res?.success) {
                toast.success(res?.message || "Reservation requested successfully!", { autoClose: 1000 });
                methods.reset();
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Something went wrong", { autoClose: 1000 });
        }
    };

    return (
        <div className="min-h-screen py-12 px-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-success/[0.02] to-transparent pointer-events-none" />
            
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
                {/* Left Side: Branding & Info */}
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:w-1/2 space-y-8"
                >
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-success/10 text-success text-[10px] font-black uppercase tracking-[0.3em] rounded-full border border-success/20 italic">
                                Reserved Experience
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic leading-[0.9]">
                            Secure Your <br />
                            <span className="text-success">Arrangement.</span>
                        </h1>
                        <p className="text-gray-400 text-lg font-medium max-w-sm leading-relaxed italic">
                            Experience the pinnacle of culinary art. Join us for an unforgettable evening of flavor and atmosphere.
                        </p>
                    </div>
 
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-white/5">
                        <div className="space-y-1">
                            <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest italic">Temporal Window</h4>
                            <p className="text-sm text-white font-black italic tracking-tight">Mon - Sun: 10:00 AM - 11:00 PM</p>
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest italic">Coordinate</h4>
                            <p className="text-sm text-white font-black italic tracking-tight">Saffron Heights, Elite District</p>
                        </div>
                    </div>
                </motion.div>
 
                {/* Right Side: Booking Form */}
                <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:w-1/2 w-full"
                >
                    <div className="bg-[#0a0a0a]/60 backdrop-blur-3xl border border-white/5 p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 opacity-[0.03] pointer-events-none rotate-12">
                            <CalendarIcon size={200} />
                        </div>
 
                        <FormProvider {...methods}>
                            <SZForm onSubmit={onSubmit}>
                                <div className="space-y-6 relative z-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <SZInput 
                                            label="Your Full Identity" 
                                            name="name" 
                                            type="text" 
                                            placeholder="Alexander Pierce" 
                                            icon={<UserIcon size={14} />}
                                        />
                                        <SZInput 
                                            label="Digital Transmission" 
                                            name="email" 
                                            type="email" 
                                            placeholder="alex@elite.com" 
                                            icon={<MailIcon size={14} />}
                                        />
                                    </div>
 
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                        <SZInput 
                                            label="Protocol No." 
                                            name="phone" 
                                            type="text" 
                                            placeholder="+1 555 000" 
                                            icon={<PhoneIcon size={14} />}
                                        />
                                        <SZInput 
                                            label="Sequence Date" 
                                            name="date" 
                                            type="date" 
                                            icon={<CalendarIcon size={14} />}
                                        />
                                        <SZInput 
                                            label="Sequence Time" 
                                            name="time" 
                                            type="time" 
                                            icon={<ClockIcon size={14} />}
                                        />
                                    </div>
 
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                                        <div className="md:col-span-1">
                                            <SZInput 
                                                label="Ensemble" 
                                                name="guests" 
                                                type="number" 
                                                icon={<UsersIcon size={14} />}
                                            />
                                        </div>
                                        <div className="md:col-span-3">
                                            <SZTextarea 
                                                label="Special Requirements (Optional)" 
                                                name="message" 
                                                placeholder="Anniversaries, allergies, preference..." 
                                            />
                                        </div>
                                    </div>
 
                                    <div className="pt-4">
                                        <button
                                            type="submit"
                                            className="w-full group flex items-center justify-center gap-3 bg-success hover:bg-success/90 text-black py-4 rounded-xl text-[11px] font-black uppercase tracking-[0.25em] italic transition-all active:scale-95 shadow-[0_20px_40px_-10px_rgba(34,197,94,0.3)]"
                                        >
                                            Verify & Authorize Booking
                                        </button>
                                    </div>
                                </div>
                            </SZForm>
                        </FormProvider>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ReservationPage;
