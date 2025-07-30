"use client";

import TableSkeleton from "@/components/ui/skeleaton/TableSkeleton";
import { useAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { useAllFoodsQuery } from "@/redux/features/food/foodApi";
import { TCategory, TFood } from "@/types/food";
import React, { useState } from "react";

const CategoryManagement = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const { data: categories, isLoading } = useAllCategoriesQuery({
    page,
    limit,
  });

  console.log("data", categories);

  const totalPages = categories?.meta?.totalPage || 1;

  return (
    <div>
      <div className="text-xl font-bold text-center py-6">
        <h2>Categories</h2>
        <h2>Total Category: {categories?.data?.length}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="">
            <tr className="bg-base-300 text-green-500 text-lg">
              <th>Image</th>
              <th>Name</th>
              <th>isDelete</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <TableSkeleton columns={4} rows={limit} />
            ) : (
              categories?.data?.map((category: TCategory) => (
                <tr key={category?._id}>
                  <td>
                    <div className="avatar">
                      <div className="w-12 rounded-full">
                        <img src={category?.icon} />
                      </div>
                    </div>
                  </td>
                  <td>{category?.name}</td>
                  <td>
                    {" "}
                    {category?.isDeleted ? (
                      <span className="text-red-500 font-semibold">
                        Deleted
                      </span>
                    ) : (
                      <span className="text-green-600 font-semibold">
                        Active
                      </span>
                    )}
                  </td>
                  <th>
                    <button
                      // onClick={() => handleDeleteUser(user)}
                      className="btn btn-outline btn-success"
                    >
                      add
                    </button>
                  </th>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex gap-2 my-2 px-10">
        <button
          className="btn btn-outline btn-primary text-white btn-sm"
          disabled={page <= 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Prev
        </button>
        <span className="text-success text-xl font-bold">
          {page} / {totalPages}
        </span>
        <button
          className="btn btn-outline btn-primary btn-sm"
          disabled={page >= totalPages}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CategoryManagement;
