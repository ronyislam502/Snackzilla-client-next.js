"use client";

import TableSkeleton from "@/components/ui/skeleton/TableSkeleton";
import { formatDate } from "@/components/utilities/Date";
import { useAllOrdersQuery } from "@/redux/features/order/orderApi";

import React, { useState } from "react";

const Orders = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const { data: orders, isLoading } = useAllOrdersQuery({ page, limit });
  const totalPages = orders?.meta?.totalPage || 1;

  return (
    <div>
      <div className="text-xl font-bold text-center py-6">
        <h2>Orders</h2>
        <h2>Total Orders: {orders?.data?.length}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="">
            <tr className="bg-base-300 text-green-500 text-lg">
              <th>Date</th>
              <th>OrderNo</th>
              <th>Price</th>
              <th>Tax</th>
              <th>Payment</th>
              <th>isPayment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <TableSkeleton columns={7} rows={limit} />
            ) : (
              orders?.data?.map((order: any) => (
                <tr key={order?._id}>
                  {/* <td>
                    <div className="avatar">
                      <div className="w-12 rounded-full">
                        <img src={order?.image} />
                      </div>
                    </div>
                  </td> */}
                  <td>{formatDate(order.createdAt)}</td>
                  <td>$ {order?.transactionId}</td>
                  <td>{order?.totalPrice}</td>
                  <td>{order?.tax}</td>
                  <td>{order?.grandAmount}</td>
                  <td>
                    {" "}
                    {order?.paymentStatus ? (
                      <span className="text-red-500 font-semibold">
                        Pending
                      </span>
                    ) : (
                      <span className="text-green-600 font-semibold">Paid</span>
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

export default Orders;
