"use client";

import { useState } from "react";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

const Banner = () => {
  const [current, setCurrent] = useState(0);

  const slides = [
    {
      image: "https://i.postimg.cc/RFr0qmsS/resturent-banner.jpg",
      title: "Welcome to Our Restaurant",
      subtitle:
        "Experience the taste of perfection — Fresh, Delicious & Authentic.",
      buttonText: "Order Now",
      motionType: "zoomIn",
    },
    {
      image: "https://i.postimg.cc/qBwkH2TN/resturent-banner-2.jpg",
      title: "Delicious Moments Await",
      subtitle: "Savor every bite in a cozy and vibrant atmosphere.",
      buttonText: "Order Now",
      motionType: "zoomOut",
    },
    {
      image: "https://i.postimg.cc/V67HDfxS/res-banner-3.jpg",
      title: "Taste Crafted with Love",
      subtitle:
        "From our kitchen to your heart — authentic flavor guaranteed.",
      buttonText: "Order Now",
      motionType: "panLeft",
    },
    {
      image: "https://i.postimg.cc/RCDDt0Qr/banner-4.jpg",
      title: "Fine Dining, Redefined",
      subtitle: "Where every meal becomes a memory worth sharing.",
      buttonText: "Order Now",
      motionType: "panRight",
    },
    // 🆕 Added new slide
    {
      image: "https://i.postimg.cc/zBnHFf6N/banner-5.jpg",
      title: "A Feast for Every Occasion",
      subtitle:
        "Celebrate your special moments with our chef’s signature dishes.",
      buttonText: "Order Now",
      motionType: "zoomIn",
    },
  ];


  // Motion Variants
  const fadeDown = {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7 } },
  };

  const motionVariants: Record<
    string,
    Variants
  > = {
    zoomIn: {
      hidden: { scale: 1 },
      visible: { scale: 1.15, transition: { duration: 6, ease: "easeInOut" } },
    },
    zoomOut: {
      hidden: { scale: 1.15 },
      visible: { scale: 1, transition: { duration: 6, ease: "easeInOut" } },
    },
    panLeft: {
      hidden: { x: 40, scale: 1.05 },
      visible: { x: -40, transition: { duration: 6, ease: "easeInOut" } },
    },
    panRight: {
      hidden: { x: -40, scale: 1.05 },
      visible: { x: 40, transition: { duration: 6, ease: "easeInOut" } },
    },
  };

  return (
    <Carousel
      autoPlay
      infiniteLoop
      interval={6000}
      showThumbs={false}
      showStatus={false}
      showIndicators
      swipeable
      emulateTouch
      stopOnHover={false}
      // react-responsive-carousel onChange gives the new index
      onChange={(index) => setCurrent(index)}
    >
      {slides.map((slide, index) => {
        const isActive = index === current;
        const variants = motionVariants[slide.motionType];

        return (
          <div
            key={index}
            className="relative h-[40vh] sm:h-[45vh] md:h-[50vh] lg:h-[60vh] w-full overflow-hidden rounded-3xl"
          >
            {/* Animated Image wrapper — animate only when active */}
            <motion.div
              variants={variants}
              initial="hidden"
              // animate toggles based on whether this slide is active
              animate={isActive ? "visible" : "hidden"}
              className="absolute inset-0"
            >
              <Image
                src={slide.image}
                alt={`banner-${index}`}
                width={1920}
                height={1080}
                priority={index === 0}
                className="w-full h-full object-cover brightness-50"
                sizes="(max-width: 640px) 100vw,
                       (max-width: 1024px) 100vw,
                       100vw"
              />
            </motion.div>

            {/* Overlay Text — animate only when active */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6 sm:px-10 md:px-16">
              <motion.h2
                variants={fadeDown}
                initial="hidden"
                animate={isActive ? "visible" : "hidden"}
                className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4 drop-shadow-2xl uppercase tracking-tighter italic leading-none"
              >
                {slide.title.split(' ').map((word, i) => (
                  <span key={i} className={i === slide.title.split(' ').length - 1 ? "text-success" : ""}> {word} </span>
                ))}
              </motion.h2>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate={isActive ? "visible" : "hidden"}
                transition={{ delay: 0.3 }}
                className="text-xs sm:text-sm md:text-[15px] max-w-xs sm:max-w-md md:max-w-xl mb-6 sm:mb-8 opacity-90 italic font-medium leading-relaxed"
              >
                {slide.subtitle}
              </motion.p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href={"/menu"}>
                  <motion.button
                    variants={scaleIn}
                    initial="hidden"
                    animate={isActive ? "visible" : "hidden"}
                    transition={{ delay: 0.5 }}
                    className="bg-success hover:bg-success/90 text-black px-6 sm:px-8 md:px-10 py-2.5 sm:py-3.5 rounded-xl text-xs sm:text-[13px] font-black uppercase tracking-widest shadow-[0_20px_40px_-10px_rgba(34,197,94,0.3)] transition-all hover:scale-105 active:scale-95 italic"
                  >
                    {slide.buttonText}
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
};

export default Banner;
