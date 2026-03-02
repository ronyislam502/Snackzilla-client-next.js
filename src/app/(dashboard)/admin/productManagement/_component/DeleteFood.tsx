import { useState } from "react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import SZForm from "@/components/form/SZFrom";
import { DeleteIcon, XIcon } from "@/components/shared/Icons";
import { useDeleteFoodMutation } from "@/redux/features/food/foodApi";
import { TError } from "@/types/global";
import { TFood } from "@/types/food";

const DeleteFood = ({ food }: { food: TFood }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [deleteFood] = useDeleteFoodMutation();

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

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />
                        
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-sm bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden p-8 text-center"
                        >
                            <div className="w-16 h-16 rounded-xl bg-error/20 flex items-center justify-center text-error border border-error/30 shadow-[0_0_20px_rgba(239,68,68,0.1)] mx-auto mb-5">
                                <DeleteIcon size={24} />
                            </div>

                            <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-2 italic">Delete Dish?</h3>
                            <p className="text-[11px] text-gray-400 font-medium mb-8 italic">
                                Are you sure you want to remove <span className="text-white font-bold">{food?.name}</span>? This action is <span className="text-error uppercase">Irreversible</span>.
                            </p>

                            <div className="flex gap-3">
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
                                className="absolute top-6 right-6 p-2 rounded-lg bg-white/5 text-gray-500 hover:text-white transition-colors"
                            >
                                <XIcon size={14} />
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DeleteFood;
