import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import SZForm from "@/components/form/SZFrom";
import { DeleteIcon, XIcon } from "@/components/shared/Icons";
import { useDeleteFoodMutation } from "@/redux/features/food/foodApi";
import { TError } from "@/types/global";
import { TFood } from "@/types/food";
import Portal from "@/components/ui/Portal";

const DeleteFood = ({ food }: { food: TFood }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [deleteFood] = useDeleteFoodMutation();

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleDelete = async () => {
        try {
            const res = await deleteFood(food?._id).unwrap();
            if (res?.success) {
                toast.success(res?.message || "Dish deleted successfully", { autoClose: 1000 });
                setIsOpen(false);
            }
        } catch (error) {
            const err = error as TError;
            toast.error(err?.data?.message || "Deletion failed", { autoClose: 1000 });
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 rounded-lg bg-error/10 text-error hover:bg-error hover:text-white transition-all border border-error/20 shadow-lg hover:scale-110 active:scale-95"
            >
                <DeleteIcon size={16} />
            </button>

            <Portal>
                <AnimatePresence>
                    {isOpen && (
                        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                            <motion.div
                                key="backdrop"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsOpen(false)}
                                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                            />
                            
                            <motion.div
                                key="modal"
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="relative w-full max-sm bg-[#0a0a0a]/60 backdrop-blur-3xl border border-success/20 rounded-3xl shadow-2xl overflow-hidden p-8 text-center group hover:border-blue-500/40 hover:shadow-[0_0_50px_rgba(59,130,246,0.15)] transition-all duration-500"
                            >
                                {/* Header Section Backgrounds */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-success/8 via-success/3 to-transparent transition-opacity duration-700 group-hover:opacity-0 pointer-events-none" />
                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                <div className="relative z-10 w-16 h-16 rounded-xl bg-error/20 flex items-center justify-center text-error border border-error/30 shadow-[0_0_20px_rgba(239,68,68,0.1)] mx-auto mb-5">
                                    <DeleteIcon size={24} />
                                </div>

                                <h3 className="relative z-10 text-xl font-black text-white uppercase tracking-tighter mb-2 italic leading-none">Delete <span className="text-error">Dish?</span></h3>
                                <p className="relative z-10 text-[11px] text-gray-500 font-medium mb-8 italic uppercase tracking-widest leading-relaxed">
                                    Are you sure you want to remove <span className="text-white font-black">{food?.name}</span>? This action is <span className="text-error font-black underline underline-offset-4 tracking-[0.2em]">Irreversible</span>.
                                </p>

                                <div className="relative z-10 flex gap-3">
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="flex-1 px-6 py-2.5 rounded-xl bg-white/5 text-gray-400 font-bold hover:text-white transition-all border border-white/5 uppercase text-[10px] tracking-widest"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="flex-1 bg-error text-white px-6 py-2.5 rounded-xl font-black hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(239,68,68,0.2)] uppercase text-[10px] tracking-widest"
                                    >
                                        Confirm
                                    </button>
                                </div>

                                <button 
                                    onClick={() => setIsOpen(false)}
                                    className="absolute top-6 right-6 p-2 rounded-lg bg-white/5 text-gray-500 hover:text-white hover:bg-white/10 transition-all border border-white/5 z-20"
                                >
                                    <XIcon size={14} />
                                </button>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </Portal>
        </div>
    );
};

export default DeleteFood;
