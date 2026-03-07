"use client";

import { adminLinks, userLinks } from "./constants";
import { useAppSelector } from "@/redux/hooks";
import { TUser } from "@/redux/features/auth/authSlice";
import { useGetUserByEmailQuery } from "@/redux/features/user/userApi";
import { SidebarOptions } from "./SidebarOptions";

const Sidebar = () => {
  const loggedUser = useAppSelector((state) => state?.auth?.user) as TUser;
  const { data: userData } = useGetUserByEmailQuery(loggedUser?.email);
  const user = userData?.data;

  return (
    <div className="h-full">
      <div className="drawer lg:drawer-open h-full">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="lg:hidden absolute top-4 left-4 z-[30]">
          <label
            htmlFor="my-drawer-2"
            className="flex items-center justify-center w-10 h-10 bg-success/10 border border-success/20 rounded-xl text-success hover:bg-success hover:text-black transition-all shadow-lg backdrop-blur-md cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
        </div>
        <div className="drawer-side h-full z-20">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="bg-black/95 backdrop-blur-xl border-r border-success/10 min-h-full w-64 flex flex-col pt-6">
            <div className="px-6 mb-8 text-center lg:text-left">
               <h2 className="text-xl font-black text-white tracking-tighter">ADMIN <span className="text-success italic">PANEL</span></h2>
               <div className="h-1 w-12 bg-success mt-2 rounded-full mx-auto lg:mx-0 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
            </div>
            <ul className="menu flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar pb-10">
              {/* Sidebar content here */}
              <SidebarOptions
                links={
                  user?.role?.toLowerCase() === "admin" ? adminLinks : userLinks
                }
              />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
