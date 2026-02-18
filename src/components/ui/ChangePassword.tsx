import { FieldValues } from "react-hook-form";
import SZForm from "../form/SZFrom";
import { toast } from "react-toastify";
import SZInput from "../form/SZInput";
import { TError } from "@/types/global";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/auth/authSlice";
import { clearCart, setCartUser } from "@/redux/features/order/orderSlice";
import Cookies from "js-cookie";

const ChangePassword = () => {
  const [changePass] = useChangePasswordMutation();
  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit = async (data: FieldValues) => {
    try {
      const passData = {
        oldPassword: data.oldPass,
        newPassword: data.newPass,
      };

      // console.log(passData);

      const res = await changePass(passData).unwrap();

      if (res?.success) {
        dispatch(setCartUser(""));
        dispatch(clearCart());
        dispatch(logout());
        Cookies.remove("refreshToken");
        router.push("/login");
        toast.success(res?.message, {
          autoClose: 1000,
        });
      }
    } catch (error) {
      const err = error as TError;
      toast.error(err?.data?.message, {
        autoClose: 1000,
      });
    }
  };

  return (
    <div className="card shadow-sm my-20">
      <h2 className="text-center items-center text-4xl font-bold p-6">
        Change Password
      </h2>
      <div className="card-body px-10 py-10 max-w-sm mx-auto">
        <SZForm onSubmit={onSubmit}>
          <div className="py-3">
            <SZInput
              label="Old Password"
              name="oldPass"
              type="text"
              placeholder="enter old password"
            />
          </div>
          <div className="py-3">
            <SZInput
              label="New Password"
              name="newPass"
              type="text"
              placeholder="enter new password"
            />
          </div>
          <div className="text-center py-4">
            <button className="btn btn-outline btn-success w-3/4" type="submit">
              Change Password
            </button>
          </div>
        </SZForm>
      </div>
    </div>
  );
};

export default ChangePassword;
