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
      motionType: "panLeft",
    },
  ];

  const motionVariants: Record<string, any> = {
    zoomIn: {
      hidden: { scale: 1 },
      visible: {
        scale: 1.15,
        transition: { duration: 6, ease: "easeInOut" },
      },
    },
    zoomOut: {
      hidden: { scale: 1.15 },
      visible: {
        scale: 1,
        transition: { duration: 6, ease: "easeInOut" },
      },
    },
    panLeft: {
      hidden: { x: 40, scale: 1.05 },
      visible: {
        x: -40,
        transition: { duration: 6, ease: "easeInOut" },
      },
    },
    panRight: {
      hidden: { x: -40, scale: 1.05 },
      visible: {
        x: 40,
        transition: { duration: 6, ease: "easeInOut" },
      },
    },
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <SectionTitle subHeading="" heading="Our Specials" />
      {/* Items */}
      <div className="grid md:grid-cols-3 gap-10 my-6">
        {items.map((item, index) => (
          <div key={index} className="group">
            {/* Image */}
            <div className="relative w-full h-[260px] overflow-hidden rounded-lg">
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
                  className="object-cover rounded-xl"
                />
              </motion.div>
            </div>

            {/* Content */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-6 text-justify">
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Special;
