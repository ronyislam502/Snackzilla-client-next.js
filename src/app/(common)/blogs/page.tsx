"use client"

import SectionTitle from "@/components/shared/SectionTitle";
import { useState } from 'react';
import { useAllBlogsQuery } from '@/redux/features/blog/blogApi';
import CardSkeleton from '@/components/ui/skeleton/CardSkeleton';
import BlogCard from '@/components/ui/BlogCard';
import { TBlog } from '@/types/blog';

const Blogs = () => {
    const [limit] = useState(6);
    const [page, setPage] = useState(1);

    const { data: blogs, isLoading } = useAllBlogsQuery({
        page,
        limit
    });

    const totalPages = blogs?.meta?.totalPage || 1;

    return (
        <div className="px-4 py-6">
      <SectionTitle subHeading="Insights from our master chefs" heading="Culinary Chronicles" />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-12">
        {isLoading ? (
          <CardSkeleton count={limit} />
        ) : blogs?.data?.length ? (
          blogs.data.map((blog: TBlog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center space-y-4">
            <p className="text-4xl font-black text-white/5 uppercase italic tracking-tighter">No Chronicles Found</p>
          </div>
        )}
      </div>
 
      {(blogs?.meta?.total as number) > limit && (
        <div className="flex items-center justify-center gap-6 py-10 border-t border-white/5">
          <button
            className="p-3 rounded-xl bg-white/5 border border-white/5 text-white hover:bg-success hover:text-black transition-all active:scale-90 disabled:opacity-20"
            disabled={page <= 1}
            onClick={() => setPage((prev: number) => Math.max(prev - 1, 1))}
          >
            <span className="text-[10px] font-black uppercase tracking-widest italic px-4">Previous Chapters</span>
          </button>
          <div className="text-center">
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest italic mb-1">Archive Page</p>
            <span className="text-lg font-black text-white italic tracking-tighter">
              {page} <span className="text-success mx-1">/</span> {totalPages}
            </span>
          </div>
          <button
            className="p-3 rounded-xl bg-white/5 border border-white/5 text-white hover:bg-success hover:text-black transition-all active:scale-90 disabled:opacity-20"
            disabled={page >= totalPages}
            onClick={() =>
              setPage((prev: number) => Math.min(prev + 1, totalPages))
            }
          >
            <span className="text-[10px] font-black uppercase tracking-widest italic px-4">Next Chapters</span>
          </button>
        </div>
      )}
    </div>
    );
};

export default Blogs;