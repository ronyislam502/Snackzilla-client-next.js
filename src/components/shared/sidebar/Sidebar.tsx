"use client";

import { adminLinks, userLinks } from "./constants";
import { useAppSelector } from "@/redux/hooks";
import { TUser } from "@/redux/features/auth/authSlice";
import { useGetUserByEmailQuery } from "@/redux/features/user/userApi";
import { SidebarOptions } from "./SidebarOptions";

const Sidebar = () => {
  const loggedUser = useAppSelector((state) => state?.auth?.user) as TUser;
  const { data: userData } = useGetUserByEmailQuery(loggedUser?.email);
  const user = userData?.data[0];

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-start flex flex-col items-center justify-center">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-ghost drawer-button lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {" "}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />{" "}
          </svg>
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-300 text-base-content min-h-full w-50 p-4">
          {/* Sidebar content here */}
          <SidebarOptions
            links={
              user?.role?.toLowerCase() === "admin" ? adminLinks : userLinks
            }
          />
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
