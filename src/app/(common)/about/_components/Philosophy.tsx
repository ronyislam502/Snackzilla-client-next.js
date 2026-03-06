"use client"

import { FaLeaf, FaHeart, FaUtensils } from "react-icons/fa";
import { motion } from "framer-motion";

const Philosophy = () => {
    const values = [
        {
            title: "Sustainability",
            description: "We are committed to a zero-waste policy and ethical sourcing practices that honor our planet.",
            icon: <FaLeaf size={24} />,
            delay: 0.1
        },
        {
            title: "Authenticity",
            description: "Every flavor is honest. We avoid shortcuts to preserve the true essence of our ingredients.",
            icon: <FaHeart size={24} />,
            delay: 0.2
        },
        {
            title: "Innovation",
            description: "While we respect tradition, we constantly evolve through culinary experimentation and craft.",
            icon: <FaUtensils size={24} />,
            delay: 0.3
        }
    ];

    return (
        <section className="bg-black text-white py-16 px-6 border-y border-white/5">
            <div className="max-w-7xl mx-auto text-center">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 space-y-4"
                >
                    <span className="inline-block px-4 py-1 rounded-full border border-success/20 text-[10px] font-black tracking-[0.3em] uppercase text-success italic">
                        Our Core Creed
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic text-white leading-none">
                        Values that <span className="text-success">Evolve</span> our craft.
                    </h2>
                </motion.div>
 
                {/* Cards Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    {values.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: item.delay }}
                            whileHover={{ y: -5, borderColor: "rgba(59, 130, 246, 0.4)" }}
                            className="bg-[#0a0a0a]/60 backdrop-blur-3xl p-8 rounded-2xl border border-success/20 text-left group transition-all duration-300 hover:shadow-[0_0_50px_rgba(59,130,246,0.15)]"
                        >
                            <div className="w-12 h-12 bg-white/5 border border-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-success group-hover:text-black transition-all duration-500 text-success">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-black uppercase tracking-tighter italic mb-4 text-white">{item.title}</h3>
                            <p className="text-gray-500 leading-relaxed font-medium italic text-sm">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Philosophy;
