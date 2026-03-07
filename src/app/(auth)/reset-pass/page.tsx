"use client";

import SZForm from "@/components/form/SZFrom";
import SZInput from "@/components/form/SZInput";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { TError } from "@/types/global";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { resetPasswordSchema } from "@/schema/auth";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setToken } from "@/redux/features/auth/authSlice";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  const router = useRouter();
  const [resetPassword] = useResetPasswordMutation();
  // console.log("searc", { email, token });
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(setToken(token));
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (!token) return;
    localStorage.setItem("accessToken", token);
  }, [token]);

  const onSubmit = async (data: FieldValues) => {
    if (!email || !token) {
      toast.error("Invalid reset link. Please request a new one.");
      return;
    }

    try {
      const resetData = {
        email,
        newPassword: data.newPassword,
      };

      const res = await resetPassword(resetData).unwrap();

      if (res?.success) {
        toast.success(res?.message || "Password reset successfully!");
        dispatch(setToken(null));
        router.push("/login");
      }
    } catch (error) {
      const err = error as TError;
      toast.error(err?.data?.message || "Failed to reset password");
    }
  };

  if (!email || !token) {
    return (
      <div className="hero min-h-screen">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body text-center">
            <h2 className="card-title text-error justify-center text-center">Invalid Link</h2>
            <p>The password reset link is invalid or expired.</p>
            <button 
              onClick={() => router.push("/recover")}
              className="btn btn-outline btn-success mt-4"
            >
              Request New Link
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="hero min-h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h2 className="card-title text-success italic uppercase tracking-tighter transition-all hover:scale-105 duration-300">
            Find Your Account
          </h2>
          <p className="text-xs text-gray-400 italic font-medium">Please set your new secure password.</p>
          <SZForm
            resolver={zodResolver(resetPasswordSchema)}
            onSubmit={onSubmit}
          >
            <div className="py-3">
              <SZInput
                label="New Password"
                name="newPassword"
                placeholder="••••••••"
                type="password"
              />
            </div>
            <div className="text-center py-4">
              <button
                className="group relative w-full py-3 bg-success text-black font-black uppercase text-[10px] tracking-widest italic rounded-xl hover:scale-105 active:scale-95 transition-all shadow-[0_20px_40px_-10px_rgba(34,197,94,0.2)] overflow-hidden"
                type="submit"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                Reset Password
              </button>
            </div>
          </SZForm>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;