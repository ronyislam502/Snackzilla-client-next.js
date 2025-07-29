"use client";

import Link from "next/link";
import { MenuLinks } from "./NavMenu";
import Image from "next/image";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/hooks";
import { logout, TUser } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { useGetUserByEmailQuery } from "@/redux/features/user/userApi";

const Navbar = () => {
  const loggedUser = useAppSelector((state) => state?.auth?.user) as TUser;
  const { data: userData } = useGetUserByEmailQuery(loggedUser?.email);
  const user = userData?.data[0];
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Log out successfully");
    router.push("/login");
  };

  return (
    <div className="navbar bg-base-500 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {MenuLinks?.map((menu) => (
              <Link key={menu?.name} href={menu?.path}>
                {menu?.name}
              </Link>
            ))}
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl">
          <Image
            src="https://i.postimg.cc/gjhSbS06/resturent.png"
            height={100}
            width={120}
            alt="logo"
            className="rounded-lg"
          />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {MenuLinks?.map((menu) => (
            <Link className="px-2 text-lg" key={menu?.name} href={menu?.path}>
              {menu?.name}
            </Link>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-center">
            <div tabIndex={0} role="button">
              <div className="avatar">
                <div className="w-10 rounded-full">
                  <img src={user?.avatar || ""} />
                </div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box z-1 w-52 p-2 shadow-sm bg-black/80 text-xl font-bold text-blue-700"
            >
              <li>
                <Link href={`/${user?.role?.toLowerCase()}`}>Dashboard</Link>
              </li>
              <li onClick={handleLogout}>
                <a>logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <Link href="/login" className="btn">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
