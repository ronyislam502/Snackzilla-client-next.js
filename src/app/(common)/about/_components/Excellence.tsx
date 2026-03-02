"use client"

import { FaStar, FaAward, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";

const Excellence = () => {
    const awards = [
        "Vogue Dining",
        "Culinary Review",
        "Gourmet Traveller",
        "Global Gastronomy",
        "Fine Food Magazine",
        "Epicurean Weekly"
    ];

    return (
        <section className="bg-black text-white py-16 px-6 overflow-hidden relative border-b border-white/5">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                {/* Left Content */}
                <div className="space-y-8">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-block px-4 py-1 rounded-full border border-success/20 text-[10px] font-black tracking-[0.3em] uppercase text-success italic"
                    >
                        Excellence Recognized
                    </motion.div>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter italic leading-none"
                    >
                        A Journey Guided by <br />
                        <span className="text-success">Precision.</span>
                    </motion.h2>
 
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-gray-400 text-lg font-medium italic leading-relaxed max-w-md"
                    >
                        While our greatest reward is the smile of a satisfied guest, we are proud to have been recognized by the most prestigious culinary organizations in the world.
                    </motion.p>
 
                    <div className="flex flex-wrap gap-8 pt-6 border-t border-white/5">
                        <motion.div 
                            whileHover={{ scale: 1.1 }}
                            className="text-left space-y-2"
                        >
                            <FaStar className="text-success text-2xl" />
                            <p className="text-[10px] font-black uppercase tracking-widest italic text-white">3 Michelin Stars</p>
                        </motion.div>
                        <motion.div 
                            whileHover={{ scale: 1.1 }}
                            className="text-left space-y-2"
                        >
                            <FaAward className="text-success text-2xl" />
                            <p className="text-[10px] font-black uppercase tracking-widest italic text-white">Culinary Laureate 2024</p>
                        </motion.div>
                        <motion.div 
                            whileHover={{ scale: 1.1 }}
                            className="text-left space-y-2"
                        >
                            <FaUsers className="text-success text-2xl" />
                            <p className="text-[10px] font-black uppercase tracking-widest italic text-white">Elite Hospitality</p>
                        </motion.div>
                    </div>
                </div>
 
                {/* Right Grid */}
                <div className="relative">
                    <div className="grid grid-cols-2 gap-4 relative z-10">
                        {awards.map((award, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ scale: 1.02, backgroundColor: "rgba(34,197,94,0.05)", borderColor: "rgba(34,197,94,0.2)" }}
                                className="bg-[#0a0a0a]/60 backdrop-blur-3xl border border-white/5 rounded-2xl p-6 flex items-center justify-center text-center cursor-default min-h-[100px]"
                            >
                                <p className="text-gray-400 font-black uppercase tracking-widest italic text-[11px] leading-tight">{award}</p>
                            </motion.div>
                        ))}
                    </div>
                    {/* Background Decorative Ribbon */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none scale-125">
                        <FaAward className="text-[300px] text-white" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Excellence;
