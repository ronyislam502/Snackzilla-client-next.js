"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionTitle from "@/components/shared/SectionTitle";

const Team = () => {
    const items = [
        {
            image: "https://i.postimg.cc/GppSbGST/chef-1.jpg",
            name: "Chef Rahman Ali",
            designation: "Head Chef & Culinary Director",
            biography:
                "Chef Rahman Ali has over 15 years of experience in traditional Mughal and Hyderabadi cuisine. Trained under renowned chefs in India, he specializes in authentic biryani recipes passed down through generations. His passion for perfection and rich flavors defines the signature dishes of our restaurant.",
            motionType: "zoomIn",
        },
        {
            image: "https://i.postimg.cc/2Sk0xnYK/chef-2.jpg",
            name: "Chef Imran Khan",
            designation: "Grill & Kebab Specialist",
            biography:
                "Chef Imran Khan is an expert in Middle Eastern and South Asian kebabs. With a deep understanding of spices, marinades, and charcoal grilling techniques, he brings bold flavors and irresistible aromas to every kebab served. His creations keep guests coming back for more.",
            motionType: "zoomOut",
        },
        {
            image: "https://i.postimg.cc/XJCLv8KV/chef-3.jpg",
            name: "Chef Ayesha Noor",
            designation: "Beverage & Dessert Specialist",
            biography:
                "Chef Ayesha Noor is known for crafting refreshing traditional drinks and desserts inspired by Mughal-era recipes. From classic sweet and salty lassi to innovative yogurt-based beverages, her work adds the perfect finishing touch to every meal experience.",
            motionType: "zoomIn",
        },
    ];


    const motionVariants: Record<string, any> = {
        zoomIn: {
            hidden: { scale: 1 },
            visible: {
                scale: 1.15,
                transition: { duration: 6, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" },
            },
        },
        zoomOut: {
            hidden: { scale: 1.15 },
            visible: {
                scale: 1,
                transition: { duration: 6, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" },
            },
        },
        panLeft: {
            hidden: { x: 40, scale: 1.05 },
            visible: {
                x: -40,
                transition: { duration: 6, ease: "easeInOut", },
            },
        },
        panRight: {
            hidden: { x: -40, scale: 1.05 },
            visible: {
                x: 40,
                transition: { duration: 6, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" },
            },
        },
    };

    return (
        <section className="max-w-7xl mx-auto px-6 py-16">
            <SectionTitle subHeading="The artisans behind the culinary masterpieces" heading="Our Ensemble" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                {items.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group bg-[#0a0a0a]/60 backdrop-blur-3xl border border-white/5 rounded-3xl p-4 transition-all duration-300 hover:border-success/20 shadow-2xl"
                    >
                        {/* Image Container */}
                        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-6 border border-white/5">
                            <motion.div
                                className="absolute inset-0"
                                variants={motionVariants[item.motionType]}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <Image
                                    src={item?.image}
                                    alt={item?.name}
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
 
                        {/* Content */}
                        <div className="px-2 pb-4 text-center space-y-3">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-success uppercase tracking-[0.3em] italic">
                                    {item?.designation}
                                </p>
                                <h3 className="text-xl font-black text-white uppercase tracking-tighter italic">
                                    {item?.name}
                                </h3>
                            </div>
                            
                            <div className="w-8 h-0.5 bg-success/20 mx-auto rounded-full" />
                            
                            <p className="text-gray-500 text-[12px] leading-relaxed italic font-medium">
                                {item?.biography}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Team;
