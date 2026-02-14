"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { TBlog } from "@/types/blog";

const BlogCard = ({ blog }: { blog: TBlog }) => {

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        hover: { scale: 1.02, boxShadow: "0px 6px 20px rgba(0,0,0,0.15)" },
    };

    const zoomInVariants: any = {
        hidden: { scale: 1 },
        visible: {
            scale: 1.1,
            transition: {
                duration: 6,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror",
            },
        },
    };

    // Truncate description to 60 words
    const words = blog?.description?.split(" ") || [];
    const preview = words.slice(0, 20).join(" ");
    const isLong = words.length > 20

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="bg-base-300 shadow-md rounded-lg cursor-pointer transition-all duration-300"
        >
            {/* Image */}
            <div className="relative w-full h-56 sm:h-64 md:h-72 rounded-t-lg overflow-hidden">
                <motion.div
                    variants={zoomInVariants}
                    initial="hidden"
                    animate="visible"
                    className="absolute inset-0"
                >
                    <Image
                        src={blog?.image}
                        alt={blog?.title}
                        height={300}
                        width={500}
                        className="object-cover w-full h-full brightness-95"

                        priority={false}
                    />
                </motion.div>
            </div>

            {/* Text & Buttons */}
            <div className="p-4 text-center space-y-2">
                <Link href={`/blogs/${blog?._id}`}>
                    <motion.h2
                        whileHover={{ color: "#1d4ed8", scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="text-lg sm:text-xl md:text-xl font-semibold text-gray-800 dark:text-gray-100"
                    >
                        {blog?.title}
                    </motion.h2>
                </Link>

                <div className="text-gray-600 dark:text-gray-300">
                    <Link href={`/blogs/${blog?._id}`}>
                        <p className="text-sm text-justify">
                            {isLong ? `${preview}...` : blog?.description} <span className="text-blue-500">see more</span>
                        </p>
                    </Link>
                </div>
            </div>
        </motion.div >
    );
};

export default BlogCard;
