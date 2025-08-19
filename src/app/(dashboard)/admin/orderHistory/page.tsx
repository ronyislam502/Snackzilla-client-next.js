"use client";

import TableSkeleton from "@/components/ui/skeleton/TableSkeleton";
import { formatDate } from "@/components/utilities/Date";
import { useAllOrdersQuery } from "@/redux/features/order/orderApi";

import React, { useState } from "react";

const Orders = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { data: orders, isLoading } = useAllOrdersQuery({ page, limit });
  const totalPages = orders?.meta?.totalPage || 1;

  return (
    <div>
      <div className="text-xl font-bold text-center py-2">
        <h2>Orders</h2>
        <h2>Total Orders: {orders?.data?.length}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="">
            <tr className="bg-blue-700 text-green-500 text-lg text-center">
              <th>Date</th>
              <th>OrderNo</th>
              <th>Price</th>
              <th>Tax</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {isLoading ? (
              <TableSkeleton columns={7} rows={limit} />
            ) : (
              orders?.data?.map((order: any) => (
                <tr key={order?._id}>
                  <td>{formatDate(order.createdAt)}</td>
                  <td>{order?.transactionId}</td>
                  <td>$ {order?.totalPrice.toFixed(2)}</td>
                  <td>$ {order?.tax.toFixed(2)}</td>
                  <td>$ {order?.grandAmount.toFixed(2)}</td>
                  <td>{order?.paymentStatus}</td>
                  <th>{order?.status}</th>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex gap-2 mx-auto text-center md:w-4/12 my-4">
        <button
          className="btn btn-outline btn-primary text-success btn-sm"
          disabled={page <= 1}
          onClick={() => setPage((prev: number) => Math.max(prev - 1, 1))}
        >
          Prev
        </button>
        <span className="px-2 py-1 text-success border rounded">
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
    </div>
  );
};

export default Orders;
