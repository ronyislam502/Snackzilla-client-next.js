"use client";

import { motion } from "framer-motion";

const Story = () => {
  return (
    <section className="py-16 bg-black overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-5 py-1.5 rounded-full border border-success/20 bg-success/5 text-success text-[10px] font-black tracking-[0.25em] uppercase mb-6 italic"
          >
            Welcome to Saffron Table
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter leading-none italic"
          >
            Where Every Flavor Tells a <span className="text-success">Story</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-gray-400 text-sm md:text-[15px] leading-relaxed font-medium mx-auto max-w-xl italic"
          >
            For over two decades, we&apos;ve been the heart of gourmet dining in the city. 
            Our commitment to excellence, sustainable sourcing, and culinary innovation 
            creates more than just a meal.
          </motion.p>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 py-10 px-6 rounded-2xl border border-success/10 bg-neutral/40 backdrop-blur-md relative overflow-hidden group hover:border-success/30 transition-all duration-500"
        >
          {/* Decorative Glow */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-success/5 rounded-full blur-[80px] pointer-events-none"></div>
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-success/5 rounded-full blur-[80px] pointer-events-none"></div>

          {/* Stat 1 */}
          <div className="text-center relative z-10">
            <h3 className="text-4xl font-black text-white mb-1 group-hover:text-success transition-colors duration-500 tracking-tighter italic">20+</h3>
            <p className="text-[8px] text-gray-400 font-bold uppercase tracking-[0.2em] italic">Years of Excellence</p>
          </div>

          {/* Divider */}
          <div className="hidden md:block absolute left-1/3 top-1/4 bottom-1/4 w-[1px] bg-success/10"></div>

          {/* Stat 2 */}
          <div className="text-center relative z-10">
            <h3 className="text-4xl font-black text-white mb-1 group-hover:text-success transition-colors duration-500 tracking-tighter italic">15+</h3>
            <p className="text-[8px] text-gray-400 font-bold uppercase tracking-[0.2em] italic">Master Chefs</p>
          </div>

          {/* Divider */}
          <div className="hidden md:block absolute right-1/3 top-1/4 bottom-1/4 w-[1px] bg-success/10"></div>

          {/* Stat 3 */}
          <div className="text-center relative z-10">
            <h3 className="text-4xl font-black text-white mb-1 group-hover:text-success transition-colors duration-500 tracking-tighter italic">50k+</h3>
            <p className="text-[8px] text-gray-400 font-bold uppercase tracking-[0.2em] italic">Happy Guests</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Story;
