"use client";

import SectionTitle from "@/components/shared/SectionTitle";
import BlogCard from "@/components/ui/BlogCard";
import CardSkeleton from "@/components/ui/skeleton/CardSkeleton";
import { useAllBlogsQuery } from "@/redux/features/blog/blogApi";

import { TBlog } from "@/types/blog";
import Link from "next/link";

const FeatureBlogs = () => {
    const { data: blogs, isLoading } = useAllBlogsQuery({})

    return (
        <div className="my-4">
            <SectionTitle subHeading="Curated articles to inspire your cooking journey" heading="Our Blogs" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
                {isLoading ? (
                    <CardSkeleton count={3} />
                ) : blogs?.data?.slice(0, 3).length ? (
                    blogs.data
                        .slice(0, 3)
                        .map((blog: any) => <BlogCard key={blog._id} blog={blog} />)
                ) : (
                    <p className="text-center col-span-3 text-gray-500 font-bold italic text-xs uppercase tracking-widest">No culinary chronicles found</p>
                )}
            </div>
            <div className="text-center mb-10">
                <Link href="/blogs">
                    <button className="px-8 py-2.5 bg-white/5 border border-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 hover:border-white/20 transition-all active:scale-95 italic">
                        Explore Full Library
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default FeatureBlogs;
