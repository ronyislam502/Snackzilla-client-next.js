"use client"

import SectionTitle from "@/components/shared/SectionTitle";
import { useState } from 'react';
import { useAllBlogsQuery } from '@/redux/features/blog/blogApi';
import CardSkeleton from '@/components/ui/skeleton/CardSkeleton';
import BlogCard from '@/components/ui/BlogCard';

const Blogs = () => {
    const [limit] = useState(6);
    const [page, setPage] = useState(1);

    const { data: blogs, isLoading } = useAllBlogsQuery({
        page,
        limit
    });

    const totalPages = blogs?.meta?.totalPage || 1;

    return (
        <div>
            <SectionTitle subHeading="" heading="Blogs" />
            <div className="grid lg:grid-cols-4 gap-4 my-10">
                {isLoading ? (
                    <CardSkeleton count={limit} />
                ) : blogs?.data?.length ? (
                    blogs.data.map((blog: any) => (
                        <BlogCard key={blog._id} blog={blog} />
                    ))
                ) : (
                    <p className="col-span-3 text-7xl text-center">No blogs found</p>
                )}
            </div>
            {(blogs?.meta?.total as number) > limit && (
                <div className="flex gap-2 mx-auto text-center md:w-2/12 my-8">
                    <button
                        className="btn btn-outline btn-primary text-success btn-sm"
                        disabled={page <= 1}
                        onClick={() => setPage((prev: number) => Math.max(prev - 1, 1))}
                    >
                        Prev
                    </button>
                    <span className="text-success">
                        {page} / {totalPages}
                    </span>
                    <button
                        className="btn btn-outline btn-primary text-success btn-sm"
                        disabled={page >= totalPages}
                        onClick={() =>
                            setPage((prev: number) => Math.min(prev + 1, totalPages))
                        }
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default Blogs;