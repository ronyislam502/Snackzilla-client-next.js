"use client";

import OrderTable from "@/components/ui/OrderTable";
import PendingOrder from "@/components/ui/PendingOrder";
import TableSkeleton from "@/components/ui/skeleton/TableSkeleton";
import { useAllOrdersQuery } from "@/redux/features/order/orderApi";
import { TOrder } from "@/types/order";
import { useState } from "react";

const ORDERS_PER_PAGE = 5;

const OrderManagement = () => {
  const [activeTab, setActiveTab] = useState<
    "PENDING" | "CANCELLED" | "UNSHIPPED" | "SHIPPED"
  >("UNSHIPPED");
  const [page, setPage] = useState(1);

  const { data: orders, isLoading } = useAllOrdersQuery({
    page: 1,
    limit: 1000,
  });

  const getOrdersByStatus = () => {
    if (!orders?.data) return [];
    switch (activeTab) {
      case "PENDING":
        return orders.data.filter((o: TOrder) => o.paymentStatus === "PENDING");
      case "CANCELLED":
        return orders.data.filter((o: TOrder) => o.status === "CANCELLED");
      case "UNSHIPPED":
        return orders.data.filter((o: TOrder) => o.status === "UNSHIPPED");
      case "SHIPPED":
        return orders.data.filter((o: TOrder) => o.status === "SHIPPED");
      default:
        return [];
    }
  };

  const activeOrders = getOrdersByStatus();
  const totalPages = Math.ceil(activeOrders.length / ORDERS_PER_PAGE);

  const paginatedOrders = activeOrders.slice(
    (page - 1) * ORDERS_PER_PAGE,
    page * ORDERS_PER_PAGE
  );

  const handleTabChange = (tab: typeof activeTab) => {
    setActiveTab(tab);
    setPage(1); // reset page when changing tab
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Order Management</h2>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => handleTabChange("PENDING")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "PENDING" ? "bg-blue-600 text-white" : ""
          }`}
        >
          Pending (
          {orders?.data?.filter((o) => o.paymentStatus === "PENDING").length ||
            0}
          )
        </button>
        <button
          onClick={() => handleTabChange("UNSHIPPED")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "UNSHIPPED" ? "bg-yellow-600 text-white" : ""
          }`}
        >
          Unshipped (
          {orders?.data?.filter((o) => o.status === "UNSHIPPED").length || 0})
        </button>
        <button
          onClick={() => handleTabChange("CANCELLED")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "CANCELLED" ? "bg-red-600 text-white" : ""
          }`}
        >
          Cancel (
          {orders?.data?.filter((o) => o.status === "CANCELLED").length || 0})
        </button>
        <button
          onClick={() => handleTabChange("SHIPPED")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "SHIPPED" ? "bg-green-600 text-white" : ""
          }`}
        >
          Shipped (
          {orders?.data?.filter((o) => o.status === "SHIPPED").length || 0})
        </button>
      </div>

      {/* Table with horizontal scroll */}
      <div className="overflow-x-auto">
        <table className="table text-center border-none">
          {activeTab === "PENDING" ? (
            <thead>
              <tr>
                <th>Date</th>
                <th className="flex gap-10">
                  <p>Image</p>
                  <p>Food</p>
                </th>
              </tr>
            </thead>
          ) : (
            <thead className="bg-blue-700 text-green-500 text-lg">
              <tr>
                <th>Date</th>
                <th>Order No</th>
                <th className="flex gap-10">
                  <p>Image</p>
                  <p>Food</p>
                </th>
                <th>Status</th>
              </tr>
            </thead>
          )}
          <tbody>
            {isLoading ? (
              <TableSkeleton columns={4} rows={ORDERS_PER_PAGE} />
            ) : paginatedOrders.length > 0 ? (
              paginatedOrders.map((order) =>
                activeTab === "PENDING" ? (
                  <PendingOrder key={order._id} order={order} />
                ) : (
                  <OrderTable key={order._id} order={order} />
                )
              )
            ) : (
              <tr>
                <td colSpan={5}>Not found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {activeTab !== "PENDING" && totalPages > 1 && (
        <div className="flex gap-2 justify-center my-4">
          <button
            className="btn btn-outline btn-primary btn-sm"
            disabled={page <= 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            Prev
          </button>
          <span className="px-2 py-1 text-success border rounded">
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
      )}
    </div>
  );
};

export default OrderManagement;
