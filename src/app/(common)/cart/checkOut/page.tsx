"use client";

import SZForm from "@/components/form/SZFrom";
import { selectCurrentUser, TUser } from "@/redux/features/auth/authSlice";
import { useCreateOrderMutation } from "@/redux/features/order/orderApi";
import { useGetUserByEmailQuery, useUpdateUserMutation } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hooks";
import { TFood } from "@/types/food";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/features/order/orderSlice";
import { TError } from "@/types/global";
import SZInput from "@/components/form/SZInput";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userValidationSchema } from "@/schema/user";

const CheckOut = () => {
  const [createOrder] = useCreateOrderMutation();
  const loggedUser = useAppSelector(selectCurrentUser) as TUser;
  const { data: userInfo } = useGetUserByEmailQuery(loggedUser?.email);
  const user = userInfo?.data;
  const cart = useAppSelector((state) => state.cart);
  const cartItems = cart?.foods;
  const dispatch = useDispatch();
  const [updateUser] = useUpdateUserMutation();
  const methods = useForm();


  const onSubmit = async (data: FieldValues) => {
    try {
      // Google login user
      if (user.auths[0]?.provider === "google") {
        const formData = new FormData();

        const userData = {
          phone: data.phone,
          address: {
            street: data.street,
            city: data.city,
            state: data.state,
            postalCode: data.postalCode,
            country: data.country,
          },
        };

        formData.append("data", JSON.stringify(userData));

        const updateRes = await updateUser({
          id: user?._id,
          data: formData,
        }).unwrap();

        if (updateRes?.success) {
          toast.success("Profile updated successfully!");
        }
      }

      // Custom login user অথবা Google login পরেও order create
      const orderData = {
        user: user._id,
        foods: cartItems?.map((food: TFood) => ({
          food: food._id,
          quantity: food.quantity,
        })),
      };


      const orderRes = await createOrder(orderData).unwrap();

      if (orderRes?.success) {
        toast.success(orderRes?.message);
        window.location.href = orderRes?.data; // payment page redirect
        dispatch(clearCart());
      }
    } catch (error) {
      const err = error as TError;
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 md:p-10 bg-[#0a0a0a]/60 backdrop-blur-3xl rounded-3xl border border-white/5 text-white relative overflow-hidden my-10">
      <div className="absolute inset-0 bg-gradient-to-br from-success/5 via-transparent to-transparent opacity-30" />
      
      <div className="relative z-10 space-y-2 mb-10 text-center">
        <h3 className="text-3xl font-black uppercase tracking-tighter italic leading-none">Execute <span className="text-success">Checkout.</span></h3>
        <p className="text-gray-500 font-medium tracking-[0.3em] uppercase text-[8px] italic">Finalize your culinary arrangement</p>
      </div>
 
      <FormProvider {...methods}>
        <SZForm
          defaultValues={{
            name: user?.name,
            email: user?.email,
            phone: user?.phone,
            street: user?.address?.street,
            city: user?.address?.city,
            state: user?.address?.state,
            postalCode: user?.address?.postalCode,
            country: user?.address?.country,
          }}
          resolver={zodResolver(userValidationSchema)}
          onSubmit={onSubmit}
        >
          {/* MAIN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
 
            {/* ================= USER INFO ================= */}
            <div className="space-y-8">
              <div className="space-y-1">
                <h2 className="text-lg font-black uppercase tracking-widest italic text-success">Personal Details</h2>
                <div className="w-10 h-0.5 bg-success/30 rounded-full" />
              </div>
 
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <SZInput
                  label="Full Name *"
                  name="name"
                  type="text"
                  placeholder="e.g. Alexander Pierce"
                />
                <SZInput
                  label="Email Communications *"
                  name="email"
                  type="text"
                  placeholder="e.g. alex@elitedine.com"
                />
              </div>
 
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <SZInput
                  label="Contact Number *"
                  name="phone"
                  type="text"
                  placeholder="e.g. +1 555 000"
                />
                <SZInput
                  label="Street Address *"
                  name="street"
                  type="text"
                  placeholder="e.g. 7th Avenue"
                />
              </div>
 
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <SZInput
                  label="Metropolis *"
                  name="city"
                  type="text"
                  placeholder="e.g. New York"
                />
                <SZInput
                  label="Province / State *"
                  name="state"
                  type="text"
                  placeholder="e.g. NY"
                />
              </div>
 
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <SZInput
                  label="Postal Identity *"
                  name="postalCode"
                  type="text"
                  placeholder="e.g. 10001"
                />
                <SZInput
                  label="Sovereign State *"
                  name="country"
                  type="text"
                  placeholder="e.g. USA"
                />
              </div>
            </div>
 
            {/* ================= ORDER SUMMARY ================= */}
            <div className="space-y-8">
               <div className="space-y-1 text-right lg:text-left">
                <h2 className="text-lg font-black uppercase tracking-widest italic text-success">Order Manifest</h2>
                <div className="w-10 h-0.5 bg-success/30 rounded-full ml-auto lg:ml-0" />
              </div>
 
              <div className="bg-white/5 border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="p-4 text-[10px] font-black uppercase tracking-widest italic text-gray-400">Creation</th>
                      <th className="p-4 text-[10px] font-black uppercase tracking-widest italic text-gray-400 text-center">Qty</th>
                      <th className="p-4 text-[10px] font-black uppercase tracking-widest italic text-gray-400 text-right">Summation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {cartItems?.map((food: TFood) => (
                      <tr key={food._id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4 text-xs font-bold text-white italic">{food.name}</td>
                        <td className="p-4 text-xs font-black text-white text-center italic">{food.quantity}</td>
                        <td className="p-4 text-xs font-black text-success text-right italic">${(food.price * food.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
 
              <div className="space-y-3 pt-4">
                <div className="flex justify-between items-center text-[10px] uppercase font-black tracking-widest italic text-gray-500">
                  <span>Allocation for Taxation</span>
                  <span className="text-white">${cart?.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-end pt-2">
                  <span className="text-xs font-black uppercase tracking-[0.2em] italic text-success">Aggregate Payable</span>
                  <span className="text-3xl font-black italic tracking-tighter text-white">
                     <span className="text-success text-sm mr-1">$</span>
                     {cart?.grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>
 
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full group flex items-center justify-center gap-3 bg-success hover:bg-success/90 text-black py-4 rounded-xl text-[11px] font-black uppercase tracking-[0.25em] italic transition-all active:scale-95 shadow-[0_20px_40px_-10px_rgba(34,197,94,0.3)]"
                >
                  Authorize Payment & Complete Order
                </button>
              </div>
            </div>
          </div>
        </SZForm>
      </FormProvider>
    </div>
  );
};

export default CheckOut;
