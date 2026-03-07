import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { TBlog } from "@/types/blog";
import { CalendarIcon, UserIcon, ArrowRightIcon } from "@/components/shared/Icons";

const BlogCard = ({ blog }: { blog: TBlog }) => {
    // Truncate description to 20 words for premium preview
    const words = blog?.description?.split(" ") || [];
    const preview = words.slice(0, 18).join(" ");
    const isLong = words.length > 18;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="group relative bg-[#0a0a0a]/60 backdrop-blur-3xl border border-success/20 rounded-3xl overflow-hidden transition-all duration-500 hover:border-blue-500/40 hover:shadow-[0_0_50px_rgba(59,130,246,0.15)] flex flex-col h-full"
        >
            {/* Default: success gradient */}
            <div className="absolute inset-0 bg-gradient-to-tr from-success/8 via-success/3 to-transparent transition-opacity duration-700 group-hover:opacity-0 pointer-events-none" />
            {/* Hover: blue gradient */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            {/* Image Wrapper */}
            <div className="relative aspect-[16/10] overflow-hidden border-b border-white/5">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 1.2, ease: "circOut" }}
                    className="w-full h-full"
                >
                    <Image
                        src={blog?.image}
                        alt={blog?.title}
                        fill
                        className="object-cover brightness-75 group-hover:brightness-100 transition-all duration-700"
                        sizes="(max-width: 768px) 100vw, 33vw"
                    />
                </motion.div>
                
                <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-xl border border-success/20 group-hover:border-blue-500/30 text-[9px] font-black text-white uppercase tracking-widest flex items-center gap-2 transition-colors duration-500">
                    <CalendarIcon size={10} className="text-success group-hover:text-blue-400 transition-colors duration-500" />
                    {new Date(blog?.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
            </div>

            {/* Content Container */}
            <div className="p-6 flex flex-col flex-1 space-y-4 relative z-10">
                <div className="space-y-1.5">
                    <div className="flex items-center gap-3 text-[8px] font-black text-gray-500 uppercase tracking-widest italic">
                        <UserIcon size={9} />
                        <span>Culinary Chronicles</span>
                    </div>
                    <Link href={`/blogs/${blog?._id}`}>
                        <h2 className="text-lg font-black text-white uppercase tracking-tighter italic leading-[1.15] group-hover:text-blue-400 transition-colors duration-300">
                            {blog?.title}
                        </h2>
                    </Link>
                </div>

                <p className="text-[11px] font-medium text-gray-400 leading-relaxed italic flex-1">
                    &quot;{isLong ? `${preview}...` : blog?.description}&quot;
                </p>

                <div className="pt-4 border-t border-success/10 group-hover:border-blue-500/10 transition-colors duration-500">
                    <Link
                        href={`/blogs/${blog?._id}`}
                        className="inline-flex items-center gap-2.5 text-[8px] font-black text-success group-hover:text-blue-400 uppercase tracking-[0.2em] group/link italic transition-colors duration-500"
                    >
                        Read Full Article
                        <div className="w-6 h-6 rounded-full bg-success/10 border border-success/20 flex items-center justify-center group-hover/link:bg-blue-500 group-hover/link:border-blue-500 group-hover/link:text-black transition-all duration-300">
                            <ArrowRightIcon size={10} />
                        </div>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default BlogCard;
