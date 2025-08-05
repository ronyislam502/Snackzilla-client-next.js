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
  }, [token]);

  // useEffect(() => {
  //   if (!token) return;
  //   localStorage.setItem("accessToken", token);
  // }, [token]);

  const onSubmit = async (data: FieldValues) => {
    try {
      const resetData = {
        email,
        ...data,
      };

      const res = await resetPassword(resetData).unwrap();

      if (res?.success) {
        toast.success(res?.message);
        dispatch(setToken(null));
        router.push("/login");
      }
    } catch (error) {
      const err = error as TError;
      toast.error(err?.data?.message);
    }
  };

  return (
    <div className="hero min-h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h2 className="card-title text-success">Find Your Account</h2>
          <p>Please set your new password and login your account.</p>
          <SZForm
            resolver={zodResolver(resetPasswordSchema)}
            onSubmit={onSubmit}
          >
            <div className="py-3">
              <SZInput
                label="New Password"
                name="newPassword"
                placeholder="new password"
                type="text"
              />
            </div>
            <div className="text-center py-4">
              <button
                className="btn btn-outline btn-success w-2/4"
                type="submit"
              >
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
