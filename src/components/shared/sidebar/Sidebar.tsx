import React from "react";
import { SidebarOptions } from "./SidebarOptions";
import { adminLinks, userLinks } from "./constants";

const Sidebar = () => {
  const user = {
    email: "ronyislam1074@gmail.com",
    role: "user",
  };

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
            links={user?.role === "admin" ? adminLinks : userLinks}
          />
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
