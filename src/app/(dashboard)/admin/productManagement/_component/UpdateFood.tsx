"use client"

import { ChangeEvent, useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import SZForm from "@/components/form/SZFrom";
import SZInput from "@/components/form/SZInput";
import SZSelect from "@/components/form/SZSelect";
import SZTextarea from "@/components/form/SZTextarea";
import { EditIcon, CameraIcon, XIcon } from "@/components/shared/Icons";
import { useAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { useUpdateFoodMutation } from "@/redux/features/food/foodApi";
import { TError } from "@/types/global";
import { foodUpdatedSchema } from "@/schema/food";

const UpdateFood = ({ food }: { food: any }) => {
    const [isOpen, setIsOpen] = useState(false);
    const methods = useForm({
        resolver: zodResolver(foodUpdatedSchema),
        defaultValues: {
            name: food?.name,
            description: food?.description,
            price: food?.price,
            category: food?.category?._id,
            preparationTime: food?.preparationTime,
        }
    });
    const [previewImage, setPreviewImage] = useState(food?.image || "");
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const { data: categories, isLoading: serviceLoading } = useAllCategoriesQuery({});
    const [updateFood] = useUpdateFoodMutation();

    let categoryOption: { key: string; label: string }[] = [];

    if (categories?.data && !serviceLoading) {
        categoryOption = categories.data.map(
            (category: { _id: string; name: string }) => ({
                key: category._id,
                label: `${category.name}`,
            })
        );
    }

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const onSubmit = async (data: FieldValues) => {
        const formData = new FormData();
        try {
            const foodData = {
                category: data.category,
                name: data.name,
                price: Number(data?.price),
                description: data.description,
                preparationTime: Number(data?.preparationTime),
            };

            formData.append("data", JSON.stringify(foodData));
            if (selectedImage) {
                formData.append("image", selectedImage);
            }

            const res = await updateFood({
                id: food?._id,
                data: formData,
            }).unwrap();

            if (res?.success) {
                toast.success(res?.message, { autoClose: 1000 });
                setIsOpen(false);
            }
        } catch (error) {
            const err = error as TError;
            toast.error(err?.data?.message || "Something went wrong", { autoClose: 1000 });
        }
    };

    return (
        <div className="relative text-left">
            <button
                onClick={() => setIsOpen(true)}
                className=" rounded-lg bg-info/10 text-info hover:bg-info hover:text-white transition-all border border-info/20 shadow-lg hover:scale-110 active:scale-95"
            >
                <EditIcon size={16} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center">
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
                            className="relative w-full max-w-xl bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
                        >
                            {/* Header Section */}
                            <div className="relative bg-gradient-to-br from-info/20 via-info/5 to-transparent flex items-center px-8 py-6">
                                <div className="absolute top-0 right-0 p-6 opacity-10 rotate-12">
                                    <EditIcon size={80} />
                                </div>
                                <div className="flex items-center gap-5 relative z-10">
                                    <div className="w-12 h-12 rounded-xl bg-info/20 flex items-center justify-center text-info border border-info/30 shadow-[0_0_20px_rgba(14,165,233,0.1)]">
                                        <EditIcon size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic">Edit Dish</h2>
                                        <p className="text-info font-medium text-[10px] tracking-widest uppercase opacity-70 italic">Inventory Refinement</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setIsOpen(false)}
                                    className="absolute top-6 right-6 p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all border border-white/5"
                                >
                                    <XIcon size={18} />
                                </button>
                            </div>

                            <div className="px-2">
                                <FormProvider {...methods}>
                                    <SZForm onSubmit={onSubmit}>
                                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                                            {/* Left Column: Form Fields */}
                                            <div className="md:col-span-12 space-y-6">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <SZInput label="Dish Name" name="name" type="text" placeholder="e.g. Truffle Pasta" />
                                                    <SZSelect label="Category" name="category" options={categoryOption} />
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <SZInput label="Price ($)" name="price" type="number" placeholder="0.00" />
                                                    <SZInput label="Prep Time (Min)" name="preparationTime" type="number" placeholder="15" />
                                                </div>

                                                <SZTextarea label="Description" name="description" placeholder="Describe the flavors..." />

                                                {/* Image Upload Grid */}
                                                <div className="bg-neutral/40 p-6 rounded-2xl border border-white/5 space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <div className="space-y-0.5">
                                                            <h4 className="text-[11px] font-black text-white uppercase tracking-wider italic">Presentation</h4>
                                                            <p className="text-[9px] text-gray-500 font-medium italic">Update the visual representation.</p>
                                                        </div>
                                                        <label className="cursor-pointer group">
                                                            <div className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-white px-3 py-1.5 rounded-lg border border-white/5 transition-all">
                                                                <CameraIcon size={14} className="text-info" />
                                                                <span className="text-[10px] font-bold">Change</span>
                                                            </div>
                                                            <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                                        </label>
                                                    </div>

                                                    {previewImage ? (
                                                        <div className="relative group/img w-full h-32 rounded-xl overflow-hidden border border-white/10 shadow-lg">
                                                            <img src={previewImage} alt="Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110" />
                                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                                                <p className="text-white font-black text-[10px] uppercase tracking-widest italic">Current Image</p>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="w-full h-32 rounded-xl border-2 border-dashed border-white/5 flex flex-col items-center justify-center text-gray-600 gap-2">
                                                            <CameraIcon size={32} className="opacity-20" />
                                                            <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40">No Image</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Footer Actions */}
                                        <div className="flex items-center justify-end gap-3 border-t border-white/5 pb-4">
                                            <button 
                                                type="button"
                                                onClick={() => setIsOpen(false)}
                                                className="px-6 py-2 rounded-xl text-gray-400 font-bold hover:text-white transition-colors uppercase text-[10px] tracking-widest"
                                            >
                                                Cancel
                                            </button>
                                            <button 
                                                type="submit"
                                                className="bg-info text-white px-4 py-2 rounded-xl font-black hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(14,165,233,0.2)] uppercase text-[10px] tracking-widest"
                                            >
                                                Update Changes
                                            </button>
                                        </div>
                                    </SZForm>
                                </FormProvider>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default UpdateFood;
