"use client";

import { TUser } from "@/redux/features/auth/authSlice";
import { useGetUserByEmailQuery } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hooks";
import Update from "../_components/Edit";
import { motion } from "framer-motion";
import { UserIcon, MailIcon, PhoneIcon, MapPinIcon, ShieldCheckIcon } from "@/components/shared/Icons";
import Image from "next/image";

const Profile = () => {
  const loggedUser = useAppSelector((state) => state?.auth?.user) as TUser;
  const { data: userData, isLoading } = useGetUserByEmailQuery(
    loggedUser?.email
  );

  const user = userData?.data;

  if (isLoading) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-success"></span>
      </div>
    );
  }

  const address = user?.address
    ? `${user?.address?.street}, ${user?.address?.city}-${user?.address?.postalCode}, ${user?.address?.state}, ${user.address.country}`
    : "No address provided";

  const infoItems = [
    { icon: <UserIcon size={20} />, label: "Full Name", value: user?.name, color: "text-success" },
    { icon: <MailIcon size={20} />, label: "E-mail Address", value: user?.email, color: "text-info" },
    { icon: <PhoneIcon size={20} />, label: "Phone Number", value: user?.phone, color: "text-warning" },
    { icon: <MapPinIcon size={20} />, label: "Residential Address", value: address, color: "text-error" },
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 lg:max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-[#0a0a0a]/60 backdrop-blur-3xl p-6 md:p-8 rounded-3xl border border-success/20 relative overflow-hidden group hover:border-blue-500/40 hover:shadow-[0_0_50px_rgba(59,130,246,0.15)] transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-tr from-success/8 via-success/3 to-transparent transition-opacity duration-700 group-hover:opacity-0 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-success/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-blue-500/10 transition-colors duration-700"></div>
          
          <div className="space-y-1 relative z-10">
              <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter italic leading-none">Security <span className="text-success group-hover:text-blue-400 transition-colors duration-500">Dossier.</span></h2>
              <div className="flex items-center gap-3">
                  <span className="text-gray-500 font-bold text-[10px] tracking-[0.2em] uppercase italic">Personnel Archive</span>
                  <div className="h-px w-8 bg-success/20 group-hover:bg-blue-500/20 transition-colors duration-500"></div>
                  <span className="bg-success/10 text-success border border-success/20 group-hover:bg-blue-500/10 group-hover:text-blue-400 group-hover:border-blue-500/30 transition-colors duration-500 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider italic">
                      Verified Identity
                  </span>
              </div>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Col: Avatar & Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-4 space-y-6"
        >
          <div className="bg-[#0a0a0a]/60 backdrop-blur-3xl p-8 rounded-3xl border border-success/20 flex flex-col items-center text-center relative overflow-hidden group hover:border-blue-500/40 hover:shadow-[0_0_50px_rgba(59,130,246,0.15)] transition-all duration-500">
             <div className="absolute inset-0 bg-gradient-to-tr from-success/8 via-success/3 to-transparent transition-opacity duration-700 group-hover:opacity-0 pointer-events-none" />
             <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
             
             <div className="relative z-10 w-40 h-40 mb-6 p-1 rounded-full border border-dashed border-success/20 group-hover:border-blue-500/50 transition-colors duration-500">
                <div className="w-full h-full rounded-full overflow-hidden bg-neutral-900 flex items-center justify-center ring-4 ring-[#0a0a0a] shadow-2xl relative">
                    {user?.avatar ? (
                        <Image src={user.avatar} fill alt="avatar" className="object-cover transform group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-neutral-950">
                            <UserIcon size={64} className="text-success/10 group-hover:text-blue-500/20 transition-colors duration-500" />
                        </div>
                    )}
                </div>
                <div className="absolute bottom-2 right-2 w-5 h-5 bg-success group-hover:bg-blue-400 transition-colors duration-500 rounded-full border-4 border-[#0a0a0a] shadow-[0_0_15px_rgba(34,197,94,0.3)] anim-pulse"></div>
             </div>
             
             <div className="relative z-10">
                <h3 className="text-xl font-black text-white mb-2 tracking-tighter italic uppercase group-hover:text-blue-400 transition-colors duration-500">{user?.name}</h3>
                <div className="flex items-center justify-center gap-2 text-success group-hover:text-blue-400 text-[8px] font-black uppercase tracking-[0.2em] bg-success/10 group-hover:bg-blue-500/10 px-4 py-1.5 rounded-xl border border-success/10 group-hover:border-blue-500/20 transition-colors duration-500">
                    <ShieldCheckIcon size={12} />
                    {user?.role} Entity
                </div>
             </div>
          </div>

          <div className="bg-[#0a0a0a]/60 backdrop-blur-3xl p-6 rounded-3xl border border-success/20 relative overflow-hidden group hover:border-blue-500/40 hover:shadow-[0_0_50px_rgba(59,130,246,0.15)] transition-all duration-500">
             <div className="absolute inset-0 bg-gradient-to-tr from-success/8 via-success/3 to-transparent transition-opacity duration-700 group-hover:opacity-0 pointer-events-none" />
             <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <ShieldCheckIcon size={32} className="text-success group-hover:text-blue-400 transition-colors duration-500" />
             </div>
             <p className="relative z-10 text-[9px] text-success group-hover:text-blue-400 font-black uppercase tracking-widest mb-2 flex items-center gap-2 italic transition-colors duration-500">
                <span className="w-1 h-1 rounded-full bg-success group-hover:bg-blue-400 transition-colors duration-500"></span>
                Security Protocol
            </p>
            <p className="relative z-10 text-[11px] text-gray-500 leading-relaxed font-bold italic">Preserve account integrity through persistent credential rotation and authorization vigilance.</p>
          </div>
          
          <Update user={user} />
        </motion.div>

        {/* Right Col: Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-8 bg-[#0a0a0a]/60 backdrop-blur-3xl p-8 md:p-10 rounded-3xl border border-success/20 relative overflow-hidden h-fit group hover:border-blue-500/40 hover:shadow-[0_0_50px_rgba(59,130,246,0.15)] transition-all duration-500"
        >
           <div className="absolute inset-0 bg-gradient-to-tr from-success/8 via-success/3 to-transparent transition-opacity duration-700 group-hover:opacity-0 pointer-events-none" />
           <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
           
           <h3 className="relative z-10 text-sm font-black text-white mb-10 uppercase tracking-[0.2em] flex items-center gap-4 italic group-hover:text-blue-400 transition-colors duration-500">
               Attribute Matrix
               <div className="h-px flex-1 bg-gradient-to-r from-success/20 to-transparent group-hover:from-blue-500/20 transition-colors duration-500"></div>
           </h3>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              {infoItems.map((item, idx) => (
                <motion.div 
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className="flex flex-col gap-2 group"
                >
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl bg-[#0f0f0f] border border-white/5 text-gray-400 group-hover:text-success group-hover:border-success/30 transition-all duration-300`}>
                            {item.icon}
                        </div>
                        <label className="text-[9px] text-gray-500 uppercase font-bold tracking-[0.2em] italic">{item.label}</label>
                    </div>
                    <p className="text-base font-black text-white group-hover:text-success transition-colors duration-300 leading-tight italic tracking-tighter">
                        {item.value || "PENDING_INPUT"}
                    </p>
                </motion.div>
              ))}
           </div>

          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-success/[0.02] rounded-full blur-[100px] pointer-events-none"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
