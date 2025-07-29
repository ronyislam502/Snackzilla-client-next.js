"use client";

import SZForm from "@/components/form/SZFrom";
import SZInput from "@/components/form/SZInput";
import { verifyToken } from "@/components/utilities/verifyToken";
import { useLogInMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { loginValidationSchema } from "@/schema/auth";
import { TError } from "@/types/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [signIn] = useLogInMutation();

  const onSubmit = async (data: FieldValues) => {
    try {
      const authData = {
        email: data.email,
        password: data.password,
      };

      const res = await signIn(authData).unwrap();
      const user = verifyToken(res?.data?.accessToken);
      dispatch(setUser({ user: user, token: res.data.accessToken }));

      if (res?.success) {
        toast.success(res?.message);
        router.push("/");
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
          <SZForm
            resolver={zodResolver(loginValidationSchema)}
            onSubmit={onSubmit}
          >
            <div className="py-3">
              <SZInput label="Email" name="email" type="email" />
            </div>
            <div className="py-3">
              <SZInput label="Password" name="password" type="password" />
            </div>
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <div className="text-center py-4">
              <button
                className="btn btn-outline btn-success w-full"
                type="submit"
              >
                Login
              </button>
            </div>
          </SZForm>
        </div>
      </div>
    </div>
  );
};

export default Login;
