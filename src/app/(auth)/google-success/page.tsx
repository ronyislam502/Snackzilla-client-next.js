"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import { verifyToken } from "@/components/utilities/verifyToken";
import { useAppDispatch } from "@/redux/hooks";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { setCartUser } from "@/redux/features/order/orderSlice";

const GoogleSuccess = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const accessToken = searchParams.get("accessToken");
        const refreshToken = searchParams.get("refreshToken");
        const message = searchParams.get("message");

        if (!accessToken) {
            router.replace("/auth/login");
            return;
        }

        const user = verifyToken(accessToken) as TUser;

        dispatch(setUser({ user, token: accessToken }));
        dispatch(setCartUser(user.email));

        Cookies.set("accessToken", accessToken);
        if (refreshToken) {
            Cookies.set("refreshToken", refreshToken);
        }

        toast.success(message || "Google login successful");
        router.replace("/");
    }, [searchParams, router, dispatch]);

    return (
        <div className="h-screen flex items-center justify-center">
            <p className="text-lg font-semibold">
                Logging you in with Google…
            </p>
        </div>
    );
};

export default GoogleSuccess;
