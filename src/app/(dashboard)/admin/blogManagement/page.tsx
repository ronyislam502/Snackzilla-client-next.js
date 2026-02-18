"use client";

import React, { useState } from "react";
import SectionTitle from "@/components/shared/SectionTitle";
import TableSkeleton from "@/components/ui/skeleton/TableSkeleton";
import AddBlog from "./_component/createBlog";
import { useAllBlogsQuery } from "@/redux/features/blog/blogApi";
import UpdateBlog from "./_component/UpdateBlog";
import DeleteBlog from "./_component/deleteBlog";

const truncateText = (text: string, length = 20) => {
  if (!text) return "";
  return text.length > length ? text.slice(0, length) + "..." : text;
};

const BlogManagement = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(7);

  const { data: blogs, isLoading } = useAllBlogsQuery({ page, limit });
  const totalPages = blogs?.meta?.totalPage || 1;

  return (
    <div>
      <SectionTitle subHeading="" heading="Blogs" />

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mt-4">
          Total Blogs:{" "}
          <span className="text-info text-3xl font-extrabold">
            {blogs?.data?.length || 0}
          </span>
        </h2>
        <AddBlog />
      </div>

      <div className="overflow-x-auto mt-6">
        <table className="table text-center">
          <thead>
            <tr className="bg-blue-700 text-green-500 text-lg">
              <th>Author</th>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody className="text-lg">
            {isLoading ? (
              <TableSkeleton columns={6} rows={limit} />
            ) : (
              blogs?.data?.map((blog: any) => (
                <tr key={blog?._id}>
                  {/* Author */}
                  <td>
                    <div className="avatar mx-auto">
                      <div className="w-12 rounded-full">
                        <img
                          src={blog?.user?.avatar || "/avatar.png"}
                          alt="author"
                        />
                      </div>
                    </div>
                  </td>

                  {/* Blog Image */}
                  <td>
                    <div className="avatar mx-auto">
                      <div className="w-12 rounded-full">
                        <img
                          src={blog?.image || "/placeholder.png"}
                          alt="blog"
                        />
                      </div>
                    </div>
                  </td>

                  {/* Title */}
                  <td className="">{blog?.title}</td>

                  {/* Description (short) */}
                  <td className="max-w-xs">
                    {truncateText(blog?.description, 20)}
                  </td>

                  {/* Status */}
                  <td>
                    {blog?.isDeleted ? (
                      <span className="text-red-500 font-semibold">
                        Deleted
                      </span>
                    ) : (
                      <span className="text-green-600 font-semibold">
                        Active
                      </span>
                    )}
                  </td>
                  <th className="flex gap-6">
                    <UpdateBlog blog={blog} />
                    <DeleteBlog blog={blog} />
                  </th>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {Number(blogs?.meta?.total) > limit && (
        <div className="flex gap-4 justify-center items-center my-8">
          <button
            className="btn btn-outline btn-primary btn-sm"
            disabled={page <= 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            Prev
          </button>

          <span className="font-semibold text-success">
            {page} / {totalPages}
          </span>

          <button
            className="btn btn-outline btn-primary btn-sm"
            disabled={page >= totalPages}
            onClick={() =>
              setPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogManagement;
