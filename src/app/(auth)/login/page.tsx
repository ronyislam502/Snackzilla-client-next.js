"use client";

import SZForm from "@/components/form/SZFrom";
import SZInput from "@/components/form/SZInput";
import { verifyToken } from "@/components/utilities/verifyToken";
import { useLogInMutation } from "@/redux/features/auth/authApi";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { setCartUser } from "@/redux/features/order/orderSlice";
import { useAppDispatch } from "@/redux/hooks";
import { loginValidationSchema } from "@/schema/auth";
import { TError } from "@/types/global";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useState } from "react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/shared/Icons";

const Login = () => {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [signIn] = useLogInMutation();

  const onSubmit = async (data: FieldValues) => {
    try {
      const authData = {
        email: data.email,
        password: data.password,
      };

      const res = await signIn(authData).unwrap();
      const user = verifyToken(res?.data?.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      dispatch(setCartUser(user.email));

      if (res?.success) {
        Cookies.set("accessToken", res?.data?.accessToken);
        Cookies.set("refreshToken", res?.data?.refreshToken);
        toast.success(res?.message, {
          autoClose: 1000,
        });
        router.push("/");
      }
    } catch (error) {
      const err = error as TError;
      console.log(err);
      toast.error(err?.data?.message);
    }
  };


  const googleLogin = () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://snackzilla-server.vercel.app/api";
    window.location.href = `${baseUrl}/auth/google`;
  }


  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-success/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-success/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-sm bg-[#0a0a0a]/60 backdrop-blur-3xl border border-success/20 rounded-3xl p-8 md:p-10 relative z-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] group hover:border-blue-500/40 hover:shadow-[0_0_50px_rgba(59,130,246,0.15)] transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-tr from-success/8 via-success/3 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none rounded-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl" />

        <div className="space-y-2 mb-10 text-center relative z-10">
          <h3 className="text-3xl font-black uppercase tracking-tighter italic leading-none text-white">Member <span className="text-success group-hover:text-blue-400 transition-colors duration-500">Access.</span></h3>
          <p className="text-gray-500 font-medium tracking-[0.3em] uppercase text-[8px] italic">Enter your authentication keys</p>
        </div>

        <SZForm
          resolver={zodResolver(loginValidationSchema)}
          onSubmit={onSubmit}
        >
          <div className="space-y-5">
            <SZInput label="Email Address" name="email" type="email" placeholder="Enter your email" />
            <div className="relative">
              <SZInput
                label="Security Key"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
              />
              <div
                className="absolute right-4 top-10 cursor-pointer text-gray-500 hover:text-white transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlashFilledIcon size={18} />
                ) : (
                  <EyeFilledIcon size={18} />
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 text-right">
            <Link href="/recover" className="text-[10px] font-black text-gray-500 hover:text-success uppercase tracking-widest italic transition-colors">
              Recover Lost Key?
            </Link>
          </div>

          <div className="mt-8 space-y-4">
            <button
              className="w-full group flex items-center justify-center gap-3 bg-success hover:bg-success/90 text-black py-4 rounded-xl text-[11px] font-black uppercase tracking-[0.25em] italic transition-all active:scale-95 shadow-[0_20px_40px_-10px_rgba(34,197,94,0.3)]"
              type="submit"
            >
              Authorize Login
            </button>

            <button
              className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/5 text-white py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest italic hover:bg-white/10 transition-all active:scale-95"
              type="button"
              onClick={googleLogin}
            >
              <Image src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width={16} height={16} className="w-4 h-4" alt="google" />
              Gateway via Google
            </button>
          </div>
        </SZForm>

        <div className="mt-10 pt-6 border-t border-white/5 text-center">
          <Link href="/register">
            <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest italic hover:text-white transition-colors">
              New to the experience? <span className="text-success ml-1">Initiate Membership</span>
            </p>
          </Link>
        </div>
      </div>
    </div >
  );
};

export default Login;