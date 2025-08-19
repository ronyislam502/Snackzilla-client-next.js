"use client";

import OrderTable from "@/components/ui/OrderTable";
import PendingOrder from "@/components/ui/PendingOrder";
import TableSkeleton from "@/components/ui/skeleton/TableSkeleton";
import { useAllOrdersQuery } from "@/redux/features/order/orderApi";
import { TOrder } from "@/types/order";
import { useState } from "react";

const OrderManagement = () => {
  const { data: orders, isLoading } = useAllOrdersQuery({});
  const [activeTab, setActiveTab] = useState<
    "PENDING" | "CANCELLED" | "UNSHIPPED" | "SHIPPED"
  >("UNSHIPPED");

  const pendingOrders = orders?.data?.filter(
    (order: TOrder) => order.paymentStatus === "PENDING"
  );
  const cancelOrders = orders?.data?.filter(
    (order: TOrder) => order.status === "CANCELLED"
  );
  const unshippedOrders = orders?.data?.filter(
    (order: TOrder) => order.status === "UNSHIPPED"
  );
  const shippedOrders = orders?.data?.filter(
    (order: TOrder) => order.status === "SHIPPED"
  );

  const getActiveOrders = () => {
    switch (activeTab) {
      case "PENDING":
        return pendingOrders;
      case "CANCELLED":
        return cancelOrders;
      case "UNSHIPPED":
        return unshippedOrders;
      case "SHIPPED":
        return shippedOrders;
      default:
        return [];
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Order Management</h2>
      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("PENDING")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "PENDING" ? "bg-blue-600 text-white" : ""
          }`}
        >
          Pending({pendingOrders?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab("CANCELLED")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "CANCELLED" ? "bg-red-600 text-white" : ""
          }`}
        >
          Cancel({cancelOrders?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab("UNSHIPPED")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "UNSHIPPED" ? "bg-yellow-600 text-white" : ""
          }`}
        >
          Unshipped({unshippedOrders?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab("SHIPPED")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "SHIPPED" ? "bg-green-600 text-white" : ""
          }`}
        >
          Shipped({shippedOrders?.length || 0})
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table text-center">
          {/* Different head for PENDING */}
          <thead>
            {activeTab === "PENDING" ? (
              <tr className="text-lg">
                <th>Date</th>
                <th className="flex gap-10">
                  <p>Image</p>
                  <p>Food</p>
                </th>
              </tr>
            ) : (
              <tr className="bg-blue-700 text-green-500 text-lg">
                <th>Date</th>
                <th>Order No</th>
                <th className="flex gap-10">
                  <p>Image</p>
                  <p>Food</p>
                </th>
                <th>Status</th>
              </tr>
            )}
          </thead>

          <tbody className="text-center">
            {isLoading ? (
              <TableSkeleton columns={5} rows={8} />
            ) : (
              getActiveOrders()?.map((order: TOrder) =>
                activeTab === "PENDING" ? (
                  <PendingOrder key={order._id} order={order} />
                ) : (
                  <OrderTable key={order._id} order={order} />
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
