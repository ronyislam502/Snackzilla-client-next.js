"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { verifyToken } from "@/components/utilities/verifyToken";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const AuthListener = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const message = searchParams.get("message");
    const redirect = searchParams.get("redirect");

    if (accessToken) {
      const user = verifyToken(accessToken) as TUser;
      
      if (user) {
        dispatch(setUser({ user, token: accessToken }));
        Cookies.set("accessToken", accessToken);

        if (message) {
            toast.success(decodeURIComponent(message), { autoClose: 1000 });
        } else {
            toast.success("Login successful", { autoClose: 1000 });
        }
        
        // Remove query params from URL
        const newUrl = redirect ? `/${redirect}` : "/";
        router.push(newUrl);
      }
    }
  }, [searchParams, router, dispatch]);

  return null;
};

export default AuthListener;
