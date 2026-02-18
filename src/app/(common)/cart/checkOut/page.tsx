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
  const user = userInfo?.data[0];
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

      console.log("order", orderData);

      const orderRes = await createOrder(orderData).unwrap();
      console.log("orderRes", orderRes);

      if (orderRes?.success) {
        toast.success(orderRes?.message);
        window.location.href = orderRes?.data; // payment page redirect
        dispatch(clearCart());
      }
    } catch (error) {
      const err = error as TError;
      console.log(err);
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg text-black">
      <h3 className="my-4 text-3xl font-bold text-center">Checkout</h3>

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* ================= USER INFO ================= */}
            <div>
              <h2 className="text-xl font-semibold mb-6 text-center">
                User Info
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <SZInput
                  label="Name *"
                  name="name"
                  type="text"
                  placeholder="your name"
                />
                <SZInput
                  label="Email *"
                  name="email"
                  type="text"
                  placeholder="your email"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <SZInput
                  label="Phone *"
                  name="phone"
                  type="text"
                  placeholder="your phone number"
                />
                <SZInput
                  label="Street *"
                  name="street"
                  type="text"
                  placeholder="your street"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <SZInput
                  label="City *"
                  name="city"
                  type="text"
                  placeholder="your city"
                />
                <SZInput
                  label="State *"
                  name="state"
                  type="text"
                  placeholder="your state"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SZInput
                  label="Postal Code *"
                  name="postalCode"
                  type="text"
                  placeholder="your postal code"
                />
                <SZInput
                  label="Country *"
                  name="country"
                  type="text"
                  placeholder="your country"
                />
              </div>
            </div>

            {/* ================= ORDER SUMMARY ================= */}
            <div>
              <h2 className="text-xl font-semibold mb-6 text-center">
                Order Summary
              </h2>

              <div className="overflow-x-auto mb-6">
                <table className="table w-full">
                  <thead>
                    <tr className="font-bold text-black">
                      <th>Name</th>
                      <th className="text-center">Qty</th>
                      <th>Price</th>
                      <th>Tax (10%)</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems?.map((food: TFood) => (
                      <tr key={food._id}>
                        <td>{food.name}</td>
                        <td className="text-center">{food.quantity}</td>
                        <td>${(food.price * food.quantity).toFixed(2)}</td>
                        <td>
                          ${(food.price * food.quantity * 0.1).toFixed(2)}
                        </td>
                        <td>
                          $
                          {(
                            food.price * food.quantity * 1.1
                          ).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between text-lg font-semibold mb-6">
                <span>Total Tax: ${cart?.tax.toFixed(2)}</span>
                <span>Total Pay: ${cart?.grandTotal.toFixed(2)}</span>
              </div>

              <div className="text-right">
                <button
                  type="submit"
                  className="btn btn-success btn-md"
                >
                  Proceed to Payment
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
