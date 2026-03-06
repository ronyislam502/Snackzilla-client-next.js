"use client";

import { useEffect, useMemo } from "react";
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
  const hasNotified = useMemo(() => new Set<string>(), []);

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const message = searchParams.get("message");
    const redirect = searchParams.get("redirect");

    if (accessToken && !hasNotified.has(accessToken)) {
      const user = verifyToken(accessToken) as TUser;
      
      if (user) {
        hasNotified.add(accessToken);
        const refreshToken = searchParams.get("refreshToken");
        
        dispatch(setUser({ user, token: accessToken }));
        Cookies.set("accessToken", accessToken);
        if (refreshToken) {
          Cookies.set("refreshToken", refreshToken);
        }

        if (message) {
            toast.success(decodeURIComponent(message), { autoClose: 1000 });
        } else {
            toast.success("Login successful", { autoClose: 1000 });
        }
        
        // Use replace to avoid history stack issues
        const newUrl = redirect ? `/${redirect}` : "/";
        router.replace(newUrl);
      }
    }
  }, [searchParams, router, dispatch, hasNotified]);

  return null;
};

export default AuthListener;
