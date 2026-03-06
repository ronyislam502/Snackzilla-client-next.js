"use client";

import Loading from "@/app/loading";
import { useSingleBlogQuery, useAllBlogsQuery } from "@/redux/features/blog/blogApi";
import Image from "next/image";
import BlogCard from "@/components/ui/BlogCard";
import { use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { TBlog } from "@/types/blog";

const BlogDetails = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  const { data: blog, isLoading } = useSingleBlogQuery(id);
  const { data: allBlogs, isLoading: blogsLoading } = useAllBlogsQuery({});

  if (isLoading) return <Loading />;
  if (!blog?.data) return <p className="text-center my-8 text-white">Blog not found</p>;

  // Filter out the current blog from all blogs
  const otherBlogs = allBlogs?.data?.filter((b: TBlog) => b._id !== id) || [];
  const blogData = blog.data;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto p-6 md:p-10"
    >
      {/* Back Link */}
      <Link href="/blogs" className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest italic text-gray-500 hover:text-success transition-all mb-10">
        <span className="text-lg leading-none group-hover:-translate-x-1 transition-transform">←</span>
        Back to Archives
      </Link>
 
      {/* Header Section */}
      <header className="mb-12 space-y-6">
        <div className="flex flex-wrap gap-2">
          {blogData?.tags?.map((tag: string) => (
            <span key={tag} className="px-3 py-1 bg-success/10 border border-success/20 rounded-full text-[9px] font-black text-success tracking-widest uppercase italic">
              {tag}
            </span>
          ))}
        </div>
        
        <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter italic leading-tight">
          {blogData?.title}
        </h1>
        
        <div className="flex items-center gap-4 pt-4 border-t border-white/5">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-success/30 shadow-xl">
             <Image src={blogData?.user?.avatar || "https://i.pravatar.cc/150"} alt={blogData?.user?.name} fill className="object-cover" />
          </div>
          <div>
            <p className="text-[11px] font-black text-white uppercase tracking-widest italic leading-none">{blogData?.user?.name || "Anonymous Author"}</p>
            <p className="text-[9px] text-success uppercase tracking-widest mt-1 italic font-black">
              {blogData?.createdAt ? new Date(blogData.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              }) : "Unknown Date"}
            </p>
          </div>
        </div>
      </header>
 
      {/* Hero Image */}
      {blogData?.image && (
        <div className="relative w-full aspect-[21/9] mb-12 rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
          <Image
            src={blogData?.image}
            alt={blogData?.title}
            fill
            className="object-cover transition-transform duration-1000 hover:scale-105"
          />
        </div>
      )}
 
      {/* Blog Content */}
      <article className="prose prose-invert max-w-none mb-20">
        <div className="text-gray-400 text-lg leading-relaxed italic first-letter:text-6xl first-letter:font-black first-letter:text-success first-letter:mr-4 first-letter:float-left first-letter:leading-none">
          {blogData?.description}
        </div>
      </article>
 
      {/* RECOMMENDED SECTION */}
      <section className="mt-20 pt-16 border-t border-white/5">
        <div className="flex items-end justify-between mb-10">
           <div className="space-y-1">
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic">Related <span className="text-success">Chronicles.</span></h2>
            <p className="text-gray-500 font-medium tracking-[0.3em] uppercase text-[8px] italic">Expand your expertise</p>
          </div>
          <Link href="/blogs" className="text-[10px] font-black text-success hover:text-white uppercase tracking-widest italic transition-all group">
            See All <span className="group-hover:translate-x-1 inline-block transition-transform">→</span>
          </Link>
        </div>
 
        {blogsLoading ? (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Assuming CardSkeleton is defined elsewhere or will be added */}
            {/* <CardSkeleton count={3} /> */}
            <p className="text-center text-secondary">Loading suggestions...</p>
          </div>
        ) : otherBlogs.length ? (
          <div className="grid lg:grid-cols-3 gap-6">
            {otherBlogs?.slice(0, 3).map((item: TBlog) => (
              <BlogCard key={item._id} blog={item} />
            ))}
          </div>
        ) : (
          <p className="text-center text-[10px] font-black text-white/10 uppercase italic tracking-widest">No similar transmissions discovered</p>
        )}
      </section>
    </motion.div>
  );
};

export default BlogDetails;

