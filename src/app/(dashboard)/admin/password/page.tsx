"use client";

import ChangePassword from "@/components/ui/ChangePassword";
import { KeyIcon } from "@/components/shared/Icons";

const Password = () => {
  return (
    <div className="p-4 md:p-8 space-y-10 lg:max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 bg-[#0a0a0a]/60 backdrop-blur-3xl p-6 md:p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-success/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-success/10 transition-colors duration-700"></div>
          
          <div className="space-y-1 relative z-10 w-full text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter italic leading-none">Security <span className="text-success">Protocol.</span></h2>
              <div className="flex flex-col md:flex-row md:items-center gap-3 mt-2 md:mt-0">
                  <span className="text-gray-500 font-bold text-[10px] tracking-[0.2em] uppercase italic">Credential Management</span>
                  <div className="hidden md:block h-px w-8 bg-success/20"></div>
                  <span className="text-gray-400 font-bold text-[9px] uppercase tracking-widest italic opacity-60">
                      FORTIFYING THE ADMINISTRATIVE GATEWAY
                  </span>
              </div>
          </div>
      </div>

      <div className="relative z-10">
        <ChangePassword />
      </div>

      <div className="fixed bottom-0 right-0 p-20 opacity-5 pointer-events-none">
          <KeyIcon size={200} className="rotate-12" />
      </div>
    </div>
  );
};

export default Password;