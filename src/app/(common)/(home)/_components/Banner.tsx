"use client";

import { useState } from "react";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { motion } from "framer-motion";

const Banner = () => {
  const [current, setCurrent] = useState(0);

  const slides = [
    {
      image: "https://i.postimg.cc/RFr0qmsS/resturent-banner.jpg",
      title: "Welcome to Our Restaurant",
      subtitle:
        "Experience the taste of perfection — Fresh, Delicious & Authentic.",
      buttonText: "Explore Menu",
      motionType: "zoomIn",
    },
    {
      image: "https://i.postimg.cc/qBwkH2TN/resturent-banner-2.jpg",
      title: "Delicious Moments Await",
      subtitle: "Savor every bite in a cozy and vibrant atmosphere.",
      buttonText: "Book a Table",
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
      buttonText: "View Specials",
      motionType: "panRight",
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
    { hidden: any; visible: any } 
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
            className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] w-full overflow-hidden"
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
                fill
                priority={index === 0}
                className="object-cover brightness-75"
                sizes="(max-width: 640px) 100vw,
                       (max-width: 1024px) 100vw,
                       100vw"
              />
            </motion.div>

            {/* Overlay Text — animate only when active */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 sm:px-8 md:px-12">
              <motion.h2
                variants={fadeDown}
                initial="hidden"
                animate={isActive ? "visible" : "hidden"}
                className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3 drop-shadow-lg"
              >
                {slide.title}
              </motion.h2>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate={isActive ? "visible" : "hidden"}
                transition={{ delay: 0.3 }}
                className="text-sm sm:text-base md:text-lg lg:text-xl max-w-xs sm:max-w-md md:max-w-2xl mb-4 sm:mb-6 opacity-90"
              >
                {slide.subtitle}
              </motion.p>

              <motion.button
                variants={scaleIn}
                initial="hidden"
                animate={isActive ? "visible" : "hidden"}
                transition={{ delay: 0.5 }}
                className="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base md:text-lg font-semibold shadow-lg transition"
              >
                {slide.buttonText}
              </motion.button>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
};

export default Banner;
