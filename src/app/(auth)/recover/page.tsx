"use client";

import SZForm from "@/components/form/SZFrom";
import SZInput from "@/components/form/SZInput";
import { useForgotPasswordMutation } from "@/redux/features/auth/authApi";
import { TError } from "@/types/global";
import { FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { forgotPasswordSchema } from "@/schema/auth";
// import { useRouter } from "next/navigation";

const RecoverPassword = () => {
  // const router = useRouter();
  const [forgotPassword, { isSuccess }] = useForgotPasswordMutation();
  const onSubmit = async (data: FieldValues) => {
    try {
      const forgotData = {
        email: data?.email,
      };
      const res = await forgotPassword(forgotData).unwrap();

      if (res?.success) {
        toast.success(res?.message);
        // router.push("/reset-pass");
      }
    } catch (error) {
      const err = error as TError;
      console.log(err);
      toast.error(err?.data?.message);
    }
  };

  return (
    <div className="hero min-h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h2 className="card-title text-success">Forgot Password</h2>
          <p>Please enter your email address to search for your account.</p>
          {isSuccess && (
            <p>An Email with reset password link was sent to your email</p>
          )}

          {!isSuccess && (
            <SZForm
              resolver={zodResolver(forgotPasswordSchema)}
              onSubmit={onSubmit}
            >
              <div className="py-3">
                <SZInput
                  label="Email"
                  name="email"
                  placeholder="enter your email"
                  type="email"
                />
              </div>
              <div className="text-center py-4">
                <button
                  className="btn btn-outline btn-success w-2/4"
                  type="submit"
                >
                  forget Password
                </button>
              </div>
            </SZForm>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecoverPassword;
