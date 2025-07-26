"use client";

import SZForm from "@/components/form/SZFrom";
import SZInput from "@/components/form/SZInput";
import { loginValidationSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";

const Login = () => {
  const onSubmit = () => {};

  return (
    <div className="hero bg-base-200 min-h-screen">
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
