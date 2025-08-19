"use client";

import TableSkeleton from "@/components/ui/skeleton/TableSkeleton";
import { formatDate } from "@/components/utilities/Date";
import { TUser } from "@/redux/features/auth/authSlice";
import { useMyOrdersQuery } from "@/redux/features/order/orderApi";
import { useAppSelector } from "@/redux/hooks";
import { TOrder } from "@/types/order";
import { useState } from "react";
import CancelOrder from "./_component/CancelOrder";

const Purchase = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const user = useAppSelector((state) => state?.auth?.user) as TUser;

  const { data: purchases, isLoading } = useMyOrdersQuery({
    user,
    page,
    limit,
  });

  const totalPages = purchases?.meta?.totalPage || 1;

  return (
    <div>
      <div className="text-xl font-bold py-2 text-center">
        <h2>Orders</h2>
        <h2>Total Orders: {purchases?.data?.length}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="">
            <tr className="bg-base-300 text-green-500 text-lg text-center">
              <th>Date</th>
              <th>OrderNo</th>
              <th>Price</th>
              <th>Tax</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {isLoading ? (
              <TableSkeleton columns={7} rows={limit} />
            ) : (
              purchases?.data?.map((order: TOrder) => (
                <tr key={order?._id}>
                  <td>{formatDate(order.createdAt)}</td>
                  <td>{order?.transactionId}</td>
                  <td>$ {order?.totalPrice.toFixed(2)}</td>
                  <td>$ {order?.tax.toFixed(2)}</td>
                  <td>$ {order?.grandAmount.toFixed(2)}</td>
                  <td>{order?.paymentStatus}</td>
                  <th>
                    <div>
                      <CancelOrder order={order} />
                    </div>
                  </th>
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
    </div>
  );
};

export default Purchase;
