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
    <div className="min-h-screen flex items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-success/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-success/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-2xl bg-[#0a0a0a]/60 backdrop-blur-3xl border border-success/20 rounded-3xl p-8 md:p-12 relative z-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] group hover:border-blue-500/40 hover:shadow-[0_0_50px_rgba(59,130,246,0.15)] transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-tr from-success/8 via-success/3 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none rounded-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl" />
        
        <div className="space-y-2 mb-10 text-center relative z-10">
          <h3 className="text-3xl font-black uppercase tracking-tighter italic leading-none text-white">Initiate <span className="text-success group-hover:text-blue-400 transition-colors duration-500">Membership.</span></h3>
          <p className="text-gray-500 font-medium tracking-[0.3em] uppercase text-[8px] italic">Create your culinary identity</p>
        </div>

        <FormProvider {...methods}>
          <SZForm
            resolver={zodResolver(signUpValidationSchema)}
            onSubmit={onSubmit}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-6">
                <div className="space-y-1">
                   <h2 className="text-[10px] font-black uppercase tracking-widest italic text-success/70">Core Identity</h2>
                   <div className="w-6 h-0.5 bg-success/20 rounded-full" />
                </div>
                <SZInput
                  label="Full Name *"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                />
                <SZInput
                  label="Email Communications *"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                />
                <SZInput
                  label="Contact Protocol *"
                  name="phone"
                  type="text"
                  placeholder="Enter your phone number"
                />
                <SZInput
                  label="Security Lock *"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>

              <div className="space-y-6">
                 <div className="space-y-1">
                   <h2 className="text-[10px] font-black uppercase tracking-widest italic text-success/70">Navigation Details</h2>
                   <div className="w-6 h-0.5 bg-success/20 rounded-full" />
                </div>
                 <SZInput
                  label="Street / Way *"
                  name="street"
                  type="text"
                  placeholder="your address street"
                />
                <SZInput
                  label="Metropolis *"
                  name="city"
                  type="text"
                  placeholder="Your City"
                />
                <div className="grid grid-cols-2 gap-4">
                  <SZInput
                    label="Province *"
                    name="state"
                    type="text"
                    placeholder="Your State"
                  />
                  <SZInput
                    label="Postal ID *"
                    name="postalCode"
                    type="text"
                    placeholder="post code"
                  />
                </div>
                <SZInput
                  label="Sovereign State *"
                  name="country"
                  type="text"
                  placeholder="Your Country"
                />
              </div>
            </div>

            <div className="mt-8 p-6 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
               <div className="space-y-1 text-center md:text-left">
                  <h4 className="text-[11px] font-black text-white uppercase tracking-widest italic">Identity Visualization</h4>
                  <p className="text-[9px] text-gray-500 uppercase tracking-tighter italic font-medium">Upload a profile depiction (Optional)</p>
               </div>
               <label className="relative group cursor-pointer">
                  <div className="bg-white/5 border border-dashed border-white/20 px-6 py-3 rounded-xl group-hover:bg-success group-hover:border-success group-hover:text-black transition-all">
                    <span className="text-[10px] font-black uppercase tracking-widest italic">{selectedImage ? selectedImage.name : "Select Transmission"}</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    className="hidden"
                  />
               </label>
            </div>

            <div className="mt-12">
              <button
                className="w-full group flex items-center justify-center gap-3 bg-success hover:bg-success/90 text-black py-4 rounded-xl text-[11px] font-black uppercase tracking-[0.25em] italic transition-all active:scale-95 shadow-[0_20px_40px_-10px_rgba(34,197,94,0.3)]"
                type="submit"
              >
                Execute Membership & Proceed
              </button>
            </div>
          </SZForm>
        </FormProvider>

        <div className="mt-10 pt-6 border-t border-white/5 text-center">
          <Link href="/login">
            <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest italic hover:text-white transition-colors">
              <span className="text-blue-500 hover:text-white transition-colors">Already possess an identity?</span> <span className="text-success ml-1">Access Member Portal</span>
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
