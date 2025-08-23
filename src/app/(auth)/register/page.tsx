"use client";

import SZForm from "@/components/form/SZFrom";
import SZInput from "@/components/form/SZInput";
import { useSignUpMutation } from "@/redux/features/user/userApi";
import { signUpValidationSchema } from "@/schema/auth";
import { TError } from "@/types/global";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import { FieldValues, FormProvider, useForm } from "react-hook-form";

const Register = () => {
  const router = useRouter();
  const methods = useForm();
  const [signUp] = useSignUpMutation();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setSelectedImage(file);
    }
  };

  const onSubmit = async (data: FieldValues) => {
    const formData = new FormData();
    try {
      const userData = {
        name: data?.name,
        email: data?.email,
        phone: data?.phone,
        password: data?.password,
        address: {
          street: data?.street,
          city: data?.city,
          state: data?.state,
          postalCode: data?.postalCode,
          country: data?.country,
        },
      };

      formData.append("data", JSON.stringify(userData));
      if (selectedImage) {
        formData.append("avatar", selectedImage);
      }

      const res = await signUp(formData).unwrap();
      if (res?.success) {
        toast.success(res?.message, {
          autoClose: 1000,
        });
        router.push("/login");
      }
    } catch (error) {
      const err = error as TError;
      console.log(err);
      toast.error(err?.data?.message);
    }
  };

  return (
    <div className="hero min-h-screen">
      <div className="card bg-base-100 w-full max-w-lg shadow-2xl">
        <div className="card-body">
          <FormProvider {...methods}>
            <SZForm
              resolver={zodResolver(signUpValidationSchema)}
              onSubmit={onSubmit}
            >
              <div className="py-3 grid lg:grid-cols-2 gap-4">
                <SZInput
                  label="Name *"
                  name="name"
                  type="text"
                  placeholder="your name"
                />
                <SZInput
                  label="Email *"
                  name="email"
                  type="email"
                  placeholder="your email"
                />
              </div>
              <div className="py-3 grid lg:grid-cols-2 gap-4">
                <SZInput
                  label="Phone *"
                  name="phone"
                  type="text"
                  placeholder="your phone"
                />
                <SZInput
                  label="Password *"
                  name="password"
                  type="text"
                  placeholder="your password"
                />
              </div>
              <div className="py-3 grid lg:grid-cols-2 gap-2">
                <SZInput
                  label="Street *"
                  name="street"
                  type="text"
                  placeholder="your street"
                />
                <SZInput
                  label="City *"
                  name="city"
                  type="text"
                  placeholder="your city"
                />
              </div>
              <div className="py-3 grid lg:grid-cols-2 gap-2">
                <SZInput
                  label="State *"
                  name="state"
                  type="text"
                  placeholder="your state"
                />
                <SZInput
                  label="PostalCode *"
                  name="postalCode"
                  type="text"
                  placeholder="your postal code"
                />
              </div>
              <div className="py-3 grid lg:grid-cols-2 gap-2">
                <SZInput
                  label="Country *"
                  name="country"
                  type="text"
                  placeholder="your country"
                />
                <div className="min-w-fit">
                  <label className="text-xl font-medium text-success">
                    Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    className="file-input file-input-bordered file-input-success"
                  />
                </div>
              </div>
              <div className="text-center py-4">
                <button
                  className="btn btn-outline btn-success w-2/4"
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
            </SZForm>
          </FormProvider>
          <div className="text-center">
            <Link href="/login">
              <p>
                already have an account ?
                <span className="text-blue-400"> Login </span>
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
