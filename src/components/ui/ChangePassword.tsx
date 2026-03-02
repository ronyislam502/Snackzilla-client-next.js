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
import { motion } from "framer-motion";
import { LockIcon, KeyIcon } from "../shared/Icons";

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

      const res = await changePass(passData).unwrap();

      if (res?.success) {
        dispatch(setCartUser(""));
        dispatch(clearCart());
        dispatch(logout());
        Cookies.remove("refreshToken");
        router.push("/login");
        toast.success("CREDENTIALS UPDATED", {
          autoClose: 1000,
        });
      }
    } catch (error) {
      const err = error as TError;
      toast.error(err?.data?.message || "SECURITY BREACH: UPDATE FAILED", {
        autoClose: 1000,
      });
    }
  };

  return (
    <div className="flex items-center justify-center py-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-[#0a0a0a]/40 backdrop-blur-3xl border border-white/5 rounded-[2rem] shadow-[0_0_100px_rgba(0,0,0,1)] overflow-hidden relative group"
      >
        <div className="absolute top-0 left-0 w-full h-px bg-success/20 blur-[1px]" />
        
        <div className="p-8 md:p-10 relative z-10 space-y-8">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center mx-auto text-success border border-success/20 shadow-[0_0_30px_rgba(34,197,94,0.1)] mb-2 relative">
                <div className="absolute inset-0 bg-success/20 blur-xl opacity-50 animate-pulse"></div>
                <LockIcon size={20} className="relative z-10" />
            </div>
            <h2 className="text-xl font-black text-white uppercase tracking-tighter italic leading-none">
              Access <span className="text-success">Matrix.</span>
            </h2>
            <div className="flex flex-col items-center gap-1.5 opacity-60">
                <p className="text-gray-500 font-bold tracking-[0.2em] uppercase text-[8px] italic">
                   Credential Integrity Synchronization
                </p>
                <div className="w-6 h-px bg-success/30 rounded-full" />
            </div>
          </div>

          <SZForm onSubmit={onSubmit}>
            <div className="space-y-5">
              <SZInput
                label="Old Protocol Sequence"
                name="oldPass"
                type="password"
                placeholder="INPUT_OLD_PRT"
                icon={<LockIcon size={12} />}
              />

              <SZInput
                label="New Encryption String"
                name="newPass"
                type="password"
                placeholder="GENERATE_NEW_STR"
                icon={<KeyIcon size={12} />}
              />
              
              <div className="pt-4">
                <button 
                  className="w-full py-3 bg-success text-black font-black uppercase tracking-[0.2em] italic text-[9px] rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(34,197,94,0.1)] group/btn relative overflow-hidden" 
                  type="submit"
                >
                  <span className="relative z-10">Commit Security Update</span>
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </button>
              </div>
            </div>
          </SZForm>

          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 bg-white/[0.03] rounded-full border border-white/5">
                <div className="w-1 h-1 rounded-full bg-success animate-pulse shadow-[0_0_10px_rgba(34,197,94,1)]" />
                <span className="text-[7px] font-black text-gray-500 uppercase tracking-[0.2em] italic">Encryption Layer Status: [ACTIVE]</span>
            </div>
            <p className="text-center text-[7px] font-bold text-gray-700 uppercase tracking-widest leading-relaxed italic max-w-[200px] opacity-50">
              Direct authorization override detected. Status synchronized to secure persistent archive.
            </p>
          </div>
        </div>

        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-success/[0.02] rounded-full blur-[100px] pointer-events-none" />
      </motion.div>
    </div>
  );
};

export default ChangePassword;
