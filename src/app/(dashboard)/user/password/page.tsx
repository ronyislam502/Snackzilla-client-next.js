"use client";

import ChangePassword from "@/components/ui/ChangePassword";

const Password = () => {
  return (
    <div className="p-4 md:p-8 space-y-8 lg:max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-[#0a0a0a]/60 backdrop-blur-3xl p-6 md:p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-success/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-success/10 transition-colors duration-700"></div>
          
          <div className="space-y-1 relative z-10">
              <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter italic leading-none">Access <span className="text-success">Vault.</span></h2>
              <div className="flex items-center gap-3">
                  <span className="text-gray-500 font-bold text-[10px] tracking-[0.2em] uppercase italic">Credential Management</span>
                  <div className="h-px w-8 bg-success/20"></div>
                  <span className="bg-success/10 text-success border border-success/20 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider italic">
                      Secure Authentication Module
                  </span>
              </div>
          </div>
      </div>

      <ChangePassword />
    </div>
  );
};

export default Password;
