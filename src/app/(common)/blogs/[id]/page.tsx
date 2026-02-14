"use client";

import Loading from "@/app/loading";
import { useSingleBlogQuery } from "@/redux/features/blog/blogApi";
import { useAllBlogsQuery } from "@/redux/features/blog/blogApi";
import Image from "next/image";
import BlogCard from "@/components/ui/BlogCard";
import { use } from "react";

const BlogDetails = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  const { data: blog, isLoading } = useSingleBlogQuery(id);
  const { data: allBlogs, isLoading: blogsLoading } = useAllBlogsQuery({});

  if (isLoading) return <Loading />;
  if (!blog?.data) return <p className="text-center my-8">Blog not found</p>;

  // Filter out the current blog from all blogs
  const otherBlogs = allBlogs?.data?.filter((b: any) => b._id !== id) || [];

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Blog Details */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">{blog?.data?.title}</h1>
        {blog?.data?.image && (
          <div className="flex justify-center mb-6">
            <Image
              src={blog?.data?.image}
              alt={blog?.data?.title}
              width={600}
              height={400}
              className="rounded-lg object-cover"
            />
          </div>
        )}
        <p className="text-gray-100 text-justify">{blog?.data?.description}</p>
      </div>

      {/* Other Blogs Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Other Blogs
        </h2>

        {blogsLoading ? (
          <p className="text-center">Loading other blogs...</p>
        ) : otherBlogs.length ? (
          <div className="grid lg:grid-cols-3 gap-6">
            {otherBlogs?.map((b: any) => (
              <BlogCard key={b._id} blog={b} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">No other blogs available</p>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;

