"use client";
import SZForm from "@/components/form/SZFrom";
import { selectCurrentUser, TUser } from "@/redux/features/auth/authSlice";
import { useCreateOrderMutation } from "@/redux/features/order/orderApi";
import { useGetUserByEmailQuery } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hooks";
import { TFood } from "@/types/food";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/features/order/orderSlice";

const CheckOut = () => {
  const router = useRouter();
  const [createOrder] = useCreateOrderMutation();
  const loggedUser = useAppSelector(selectCurrentUser) as TUser;
  const { data: userInfo } = useGetUserByEmailQuery(loggedUser?.email);
  const user = userInfo?.data[0];
  const cart = useAppSelector((state) => state.cart);
  const cartItems = cart?.foods;
  const dispatch = useDispatch();

  const address = user?.address
    ? `${user?.address?.street}, ${user?.address?.city}-${user?.address?.postalCode}, ${user?.address?.state}, ${user.address.country}`
    : "";

  const onSubmit = async () => {
    const orderData = {
      user: user?._id,
      foods: cartItems?.map((food: TFood) => ({
        food: food._id,
        quantity: food.quantity,
      })),
    };

    const res = await createOrder(orderData).unwrap();

    if (res?.success) {
      toast.success(res?.message);
      window.location.href = res?.data;
      dispatch(clearCart());
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg text-black">
      <h3 className="my-4 text-3xl font-bold text-center">Checkout</h3>

      <h2 className="text-xl font-semibold mb-4 text-center">User Info</h2>

      <SZForm onSubmit={onSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="form-control">
            <label className="label" htmlFor="name">
              <span className="label-text font-semibold">Name</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              defaultValue={user?.name}
              className="input input-bordered"
              readOnly
            />
          </div>

          <div className="form-control">
            <label className="label" htmlFor="email">
              <span className="label-text font-semibold">Email</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={user?.email}
              className="input input-bordered"
              readOnly
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="form-control">
            <label className="label" htmlFor="phone">
              <span className="label-text font-semibold">Phone</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              defaultValue={user?.phone}
              className="input input-bordered"
              readOnly
            />
          </div>

          <div className="form-control">
            <label className="label" htmlFor="address">
              <span className="label-text font-semibold">Address</span>
            </label>
            <input
              id="address"
              name="address"
              type="text"
              defaultValue={address as string}
              className="input input-bordered"
              readOnly
            />
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-center">
          Order Summary
        </h2>

        <div className="overflow-x-auto mb-8">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Tax (10%)</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems?.map((food: TFood) => (
                <tr key={food._id}>
                  <td>{food.name}</td>
                  <td>{food.quantity}</td>
                  <td>${(food.price * food.quantity).toFixed(2)}</td>
                  <td>${(food.price * food.quantity * 0.1).toFixed(2)}</td>
                  <td>
                    $
                    {(
                      food.price * food.quantity +
                      food.price * food.quantity * 0.1
                    ).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between text-lg font-semibold mb-6 px-2">
          <div>Total Tax: ${cart?.tax.toFixed(2)}</div>
          <div>Total Pay: ${cart?.grandTotal.toFixed(2)}</div>
        </div>

        <div className="text-right">
          <button type="submit" className="btn btn-success btn-md">
            Proceed to Payment
          </button>
        </div>
      </SZForm>
    </div>
  );
};

export default CheckOut;
