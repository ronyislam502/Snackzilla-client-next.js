"use client";

import TableSkeleton from "@/components/ui/skeleton/TableSkeleton";
import { useAllUsersQuery } from "@/redux/features/user/userApi";
import { TUserDetail } from "@/types/user";
import React, { useState } from "react";

const UserManagement = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const { data: users, isLoading } = useAllUsersQuery({ page, limit });
  const totalPages = users?.meta?.totalPage || 1;

  return (
    <div>
      <div className="text-xl font-bold text-center py-6">
        <h2>Users</h2>
        <h2>Total Users: {users?.data?.length}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="">
            <tr className="bg-blue-700 text-green-500 text-lg">
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <TableSkeleton columns={7} rows={limit} />
            ) : (
              users?.data?.map((user: TUserDetail) => (
                <tr key={user?._id}>
                  <td>
                    <div className="avatar">
                      <div className="w-12 rounded-full">
                        <img src={user?.avatar} />
                      </div>
                    </div>
                  </td>
                  <td>{user?.name}</td>
                  <td>{user?.email}</td>
                  <td>{user?.phone}</td>
                  <td>{user?.role}</td>
                  <td>{user?.status}</td>
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
        <span className="text-success">
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

export default UserManagement;
