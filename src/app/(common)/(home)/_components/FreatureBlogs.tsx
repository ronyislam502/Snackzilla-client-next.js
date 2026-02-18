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
            <SectionTitle subHeading="" heading="Our Blogs" />
            <div className="grid lg:grid-cols-3 gap-6 my-6">
                {isLoading ? (
                    <CardSkeleton count={3} />
                ) : blogs?.data?.slice(0, 3).length ? (
                    blogs.data
                        .slice(0, 3)
                        .map((blog: any) => <BlogCard key={blog._id} blog={blog} />)
                ) : (
                    <p className="text-center col-span-3">No blogs available</p>
                )}
            </div>
            <div className="text-center my-4">
                <Link href="/blogs">
                    <button className="btn btn-outline btn-success lg:w-1/12 rounded-lg">
                        See More
                    </button></Link>
            </div>
        </div>
    );
};

export default FeatureBlogs;
