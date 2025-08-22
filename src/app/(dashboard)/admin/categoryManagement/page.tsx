"use client";

import CategoryCard from "@/components/ui/CategoryCard";
import TableSkeleton from "@/components/ui/skeleton/TableSkeleton";
import { useAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { TCategory } from "@/types/food";
import React, { useState } from "react";

const CategoryManagement = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const { data: categories, isLoading } = useAllCategoriesQuery({
    page,
    limit,
  });
  const totalPages = categories?.meta?.totalPage || 1;

  return (
    <div>
      <div className="text-xl font-bold text-center py-6">
        <h2>Categories</h2>
        <h2>Total Category: {categories?.data?.length}</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {categories?.data?.map((category: TCategory) => (
          <CategoryCard key={category?._id} category={category} />
        ))}
      </div>
      {(categories?.meta?.total as number) > limit && (
        <div className="flex gap-2 mx-auto text-center md:w-4/12 my-8">
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

export default CategoryManagement;
