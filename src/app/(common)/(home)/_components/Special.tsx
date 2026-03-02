"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionTitle from "@/components/shared/SectionTitle";

const Special = () => {
  const items = [
    {
      image: "https://i.postimg.cc/wj59TsC5/biriani2.jpg",
      title: "SnackZilla Hydrabadi Birani",
      subtitle:
        "Hyderabad biryani is a key dish in Hyderabadi cuisine. Originating in the kitchens of the Nizam of Hyderabad in India, Hyderabadi biryani is made with basmati rice and goat meat. The taste of Hyderabadi biryani in our restaurant will remind you of Mughal elite food.",
      motionType: "zoomIn",
    },
    {
      image: "https://i.postimg.cc/sfBQfww6/kabab2.jpg",
      title: "SnackZilla Kebab",
      subtitle:
        "Many kebab variants are popular around the world. Kebab originates in Middle Eastern cuisines. The taste and aroma of SnackZilla kebab will bring you back again and again.",
      motionType: "zoomOut",
    },
    {
      image: "https://i.postimg.cc/fL90CMtr/drinks2.jpg",
      title: "SnackZilla Lassi",
      subtitle:
        "Lassi is a signature dish made with yogurt, spices and water. Sweet or salty, its refreshing taste represents traditional Mughal-era drinks.",
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
    <section className="max-w-7xl mx-auto px-4 py-12">
      <SectionTitle subHeading="Favorites you’ll keep coming back for" heading="Our Specials" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {items.map((item, index) => (
          <motion.div
            key={index}
            className="group relative bg-[#0a0a0a]/40 backdrop-blur-2xl border border-white/5 rounded-2xl p-2.5 transition-all duration-500 hover:border-success/30 hover:shadow-[0_0_40px_rgba(34,197,94,0.1)] overflow-hidden"
          >
            {/* Image */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/5">
              <motion.div
                className="absolute inset-0"
                variants={motionVariants[item.motionType]}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Image
                  src={item?.image}
                  alt={item.title}
                  fill
                  className="object-cover brightness-75 group-hover:brightness-100 transition-all duration-700"
                />
              </motion.div>
            </div>

            {/* Content */}
            <div className="mt-5 p-2 space-y-2">
              <h3 className="text-lg font-black text-white uppercase tracking-tighter italic group-hover:text-success transition-colors leading-tight">
                {item.title}
              </h3>
              <p className="text-gray-400 text-[12px] font-medium leading-relaxed italic line-clamp-3">
                {item.subtitle}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Special;
