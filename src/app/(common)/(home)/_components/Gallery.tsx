"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import SectionTitle from "@/components/shared/SectionTitle";

const Gallery = () => {

    const items = [
        { image: "https://i.postimg.cc/bJZnYwhQ/1.jpg", motionType: "zoomIn" },
        { image: "https://i.postimg.cc/qBCK9qQM/2-(1).jpg", motionType: "zoomOut" },
        { image: "https://i.postimg.cc/66R7MS6k/5.jpg", motionType: "zoomIn" },
        { image: "https://i.postimg.cc/L8mZYTSY/3.jpg", motionType: "zoomOut" },
        { image: "https://i.postimg.cc/g0Tw7bZL/4.jpg", motionType: "zoomIn" },
        { image: "https://i.postimg.cc/JhfrJrXc/6.jpg", motionType: "zoomOut" },
        { image: "https://i.postimg.cc/wMVgSDG5/7.jpg", motionType: "zoomIn" },
        { image: "https://i.postimg.cc/vZDbNgLS/8.jpg", motionType: "zoomOut" },
        { image: "https://i.postimg.cc/GtSS828R/14.jpg", motionType: "zoomOut" },
    ];

    const motionVariants: Record<string, Variants> = {
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
        <section className="px-4 py-12">
            <SectionTitle subHeading="Moments beautifully captured" heading="Our Gallery" />
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {items.map((item, index) => (
                    <motion.div
                        key={index}
                        className="group relative rounded-3xl overflow-hidden border border-success/20 bg-[#0a0a0a]/60 backdrop-blur-3xl transition-all duration-500 hover:border-blue-500/40 hover:shadow-[0_0_50px_rgba(59,130,246,0.15)]"
                    >
                        <div className="relative aspect-[4/3] w-full overflow-hidden">
                            <motion.div
                                className="absolute inset-0"
                                variants={motionVariants[item.motionType]}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <Image
                                    src={item?.image}
                                    alt="Gallery image"
                                    fill
                                    className="object-cover brightness-75 group-hover:brightness-100 transition-all duration-700"
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Gallery;