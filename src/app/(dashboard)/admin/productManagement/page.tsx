"use client";

import TableSkeleton from "@/components/ui/skeleton/TableSkeleton";
import { useAllFoodsQuery } from "@/redux/features/food/foodApi";
import { TFood } from "@/types/food";
import React, { useState } from "react";
import DeleteFood from "./_component/DeleteFood";
import AddFood from "./_component/AddFood";
import SectionTitle from "@/components/shared/SectionTitle";
import UpdateFood from "./_component/UpdateFood";

const ProductManagement = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(7);
  const { data: foods, isLoading } = useAllFoodsQuery({ page, limit });
  const totalPages = foods?.meta?.totalPage || 1;

  return (
    <div>
      <SectionTitle subHeading="" heading="Foods" />
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mt-4">
          Total Foods:
          <span className="text-info text-3xl font-extrabold">
            {foods?.data?.length}
          </span>
        </h2>
        <AddFood />
      </div>
      <div className="overflow-x-auto">
        <table className="table text-center">
          {/* head */}
          <thead className="">
            <tr className="bg-blue-700 text-green-500 text-lg">
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>isDelete</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-lg">
            {isLoading ? (
              <TableSkeleton columns={6} rows={limit} />
            ) : (
              foods?.data?.map((food: TFood) => (
                <tr key={food?._id}>
                  <td>
                    <div className="avatar">
                      <div className="w-12 rounded-full">
                        <img src={food?.image} />
                      </div>
                    </div>
                  </td>
                  <td>{food?.name}</td>
                  <td>$ {food?.price.toFixed(2)}</td>
                  <td>{food?.category?.name}</td>
                  <td>
                    {" "}
                    {food?.isDeleted ? (
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
                    <UpdateFood food={food} />
                    <DeleteFood food={food} />
                  </th>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {Number(foods?.meta?.total) > limit && (
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

export default ProductManagement;
