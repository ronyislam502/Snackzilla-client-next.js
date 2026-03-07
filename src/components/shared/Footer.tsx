import Image from "next/image";
import React from "react";
import { FacebookIcon, TwitterIcon, MailIcon, MapPinIcon, PhoneIcon } from "./Icons";

const Footer = () => {
  return (
    <footer className="mt-10 px-4 pb-10">
      <div className="bg-[#0a0a0a]/60 backdrop-blur-3xl border border-success/20 rounded-3xl p-8 md:p-10 overflow-hidden relative group hover:border-blue-500/40 hover:shadow-[0_0_50px_rgba(59,130,246,0.15)] transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-tr from-success/8 via-success/3 to-transparent transition-opacity duration-700 group-hover:opacity-0 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10">
          {/* Brand Identity */}
          <aside className="space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-40 h-14 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src="https://i.postimg.cc/gjhSbS06/resturent.png"
                  width={140}
                  height={40}
                  className="object-cover"
                  alt="logo"
                />
            </div>
            <p className="text-gray-500 font-medium italic leading-relaxed pl-3 border-l-2 border-white/5 text-[11px]">
              &quot;Redefining gastronomy through culinary excellence and architectural design.&quot;
            </p>
            <div className="flex gap-2.5 pl-3">
              {[FacebookIcon, TwitterIcon, MailIcon].map((Icon, i) => (
                <a key={i} className="w-8 h-8 bg-white/5 border border-white/5 rounded-lg flex items-center justify-center text-gray-400 hover:bg-success hover:text-black transition-all cursor-pointer">
                  <Icon size={14} />
                </a>
              ))}
              </div>
            </div>
          </aside>

          {/* Core Services */}
          <nav className="space-y-5">
            <h6 className="text-[8px] font-black text-gray-400 uppercase tracking-[0.3em] mb-3 italic">The Experience</h6>
            <div className="flex flex-col gap-2.5">
              {["Exclusive Menu", "Private Dining", "Wine Selection", "Gourmet Catering"].map((item) => (
                <a key={item} className="text-[11px] font-bold text-gray-600 hover:text-success uppercase tracking-widest transition-colors cursor-pointer italic">{item}</a>
              ))}
            </div>
          </nav>

          {/* Company Hub */}
          <nav className="space-y-5">
            <h6 className="text-[8px] font-black text-gray-400 uppercase tracking-[0.3em] mb-3 italic">Our World</h6>
            <div className="flex flex-col gap-2.5">
              {["Our Heritage", "Master Chefs", "Opportunities", "Sustainability"].map((item) => (
                <a key={item} className="text-[11px] font-bold text-gray-600 hover:text-success uppercase tracking-widest transition-colors cursor-pointer italic">{item}</a>
              ))}
            </div>
          </nav>

          {/* Contact Details */}
          <div className="space-y-5">
            <h6 className="text-[8px] font-black text-gray-400 uppercase tracking-[0.3em] mb-3 italic">Reservation Desk</h6>
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 group">
                 <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-success group-hover:scale-110 transition-transform">
                    <PhoneIcon size={14} />
                 </div>
                 <p className="text-[11px] font-black text-white italic tracking-wider">+1 (555) 888-0000</p>
              </div>
              <div className="flex items-center gap-2.5 group">
                 <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-success group-hover:scale-110 transition-transform">
                    <MapPinIcon size={14} />
                 </div>
                 <p className="text-[11px] font-black text-white italic tracking-wider">7th Avenue, NY District</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
          <p className="text-[7px] font-black text-gray-600 uppercase tracking-[0.3em] italic">
            © 2026 EliteDine Gastronomy Group. All rights reserved.
          </p>
          <div className="flex gap-5">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <a key={item} className="text-[7px] font-black text-gray-600 hover:text-white uppercase tracking-widest transition-colors cursor-pointer italic">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
