"use client"

import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";

const AddressMap = () => {
    const address = "House 15, Road 2, Sector 7, Uttara, Dhaka-1230, Bangladesh";
    const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

    return (
        <section className="bg-black text-white py-16 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12 space-y-3">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic text-white"
                    >
                        Visit Our <span className="text-success">Sanctuary.</span>
                    </motion.h2>
                    <p className="text-gray-500 font-medium tracking-[0.3em] uppercase text-[8px] italic max-w-xl mx-auto">
                        Experience precision in a vibrant atmosphere
                    </p>
                </div>
 
                <div className="grid lg:grid-cols-3 gap-6 items-stretch">
                    {/* Contact Info */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="bg-[#0a0a0a]/60 backdrop-blur-3xl p-8 rounded-3xl border border-white/5 flex flex-col justify-between"
                    >
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-2.5 bg-success/10 border border-success/20 rounded-xl text-success">
                                    <FaMapMarkerAlt size={16} />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-[10px] font-black text-white uppercase tracking-widest italic">Our Coordinate</h4>
                                    <p className="text-gray-400 text-[12px] font-medium leading-relaxed italic">{address}</p>
                                </div>
                            </div>
 
                            <div className="flex items-start gap-4">
                                <div className="p-2.5 bg-success/10 border border-success/20 rounded-xl text-success">
                                    <FaPhoneAlt size={16} />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-[10px] font-black text-white uppercase tracking-widest italic">Contact Link</h4>
                                    <p className="text-gray-400 text-[12px] font-medium italic leading-relaxed">+880 1700-000000</p>
                                    <p className="text-gray-400 text-[12px] font-medium italic leading-relaxed">+880 1800-000000</p>
                                </div>
                            </div>
 
                            <div className="flex items-start gap-4">
                                <div className="p-2.5 bg-success/10 border border-success/20 rounded-xl text-success">
                                    <FaEnvelope size={16} />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-[10px] font-black text-white uppercase tracking-widest italic">Digital Mail</h4>
                                    <p className="text-gray-400 text-[12px] font-medium italic leading-relaxed">info@snackzilla.com</p>
                                </div>
                            </div>
 
                            <div className="flex items-start gap-4">
                                <div className="p-2.5 bg-success/10 border border-success/20 rounded-xl text-success">
                                    <FaClock size={16} />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-[10px] font-black text-white uppercase tracking-widest italic">Temporal window</h4>
                                    <p className="text-gray-400 text-[12px] font-medium italic leading-relaxed">Mon - Sun: 10:00 AM - 11:00 PM</p>
                                </div>
                            </div>
                        </div>
 
                        <button className="w-full bg-success hover:bg-success/90 text-black py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] italic transition-all active:scale-95 shadow-[0_20px_40px_-10px_rgba(34,197,94,0.3)] mt-10">
                            Acquire Navigation
                        </button>
                    </motion.div>
 
                    {/* Map */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="lg:col-span-2 relative min-h-[400px] rounded-3xl overflow-hidden shadow-2xl grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-1000 border border-white/5"
                    >
                        <iframe 
                            src={mapSrc}
                            width="100%" 
                            height="100%" 
                            style={{ border: 0 }} 
                            allowFullScreen 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            className="absolute inset-0"
                        ></iframe>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AddressMap;
