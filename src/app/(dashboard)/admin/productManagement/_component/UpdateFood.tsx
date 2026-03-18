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
import { EditIcon, CameraIcon, XIcon, PlusIcon, ShieldCheckIcon } from "@/components/shared/Icons";
import { useAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { useUpdateFoodMutation } from "@/redux/features/food/foodApi";
import { TError } from "@/types/global";
import { foodUpdatedSchema } from "@/schema/food";
import Portal from "@/components/ui/Portal";
import { TFood } from "@/types/food";
import Image from "next/image";

const UpdateFood = ({ food }: { food: TFood }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<"identity" | "details" | "nutrition" | "dietary" | "media">("identity");
    // const [mounted, setMounted] = useState(false);
    const methods = useForm();

    // useEffect(() => {
    //     setMounted(true);
    // }, []);


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

    const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
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
                tags: data.tags ? data.tags.split(",").map((t: string) => t.trim()) : [],
                ingredients: data.ingredients ? data.ingredients.split(",").map((i: string) => i.trim()) : [],
                allergens: data.allergens ? data.allergens.split(",").map((a: string) => a.trim()) : [],
                nutrition: {
                    calories: Number(data.calories || 0),
                    protein: data.protein || "0g",
                    carbs: data.carbs || "0g",
                    fat: data.fat || "0g",
                },
                isVegetarian: !!data.isVegetarian,
                isSpicy: !!data.isSpicy,
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
                className="p-2 rounded-lg bg-info/10 text-info hover:bg-info hover:text-white transition-all border border-info/20 shadow-lg hover:scale-110 active:scale-95"
            >
                <EditIcon size={16} />
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
                                className="relative w-full max-w-4xl bg-[#0a0a0a]/60 backdrop-blur-3xl border border-success/20 rounded-3xl shadow-2xl overflow-hidden mt-16 group hover:border-blue-500/40 hover:shadow-[0_0_50px_rgba(59,130,246,0.15)] transition-all duration-500"
                            >
                                <div className="absolute inset-0 bg-gradient-to-tr from-success/8 via-success/3 to-transparent transition-opacity duration-700 group-hover:opacity-0 pointer-events-none" />
                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                <div className="overflow-hidden relative min-h-[500px] flex flex-col md:flex-row h-full z-10">
                                    {/* Sidebar Navigation */}
                                    <div className="w-full md:w-64 bg-black/20 border-r border-white/5 p-8 flex flex-col gap-8">
                                        <div className="space-y-1">
                                            <h3 className="text-xl font-black text-white uppercase tracking-tighter italic leading-none">Settings.</h3>
                                            <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest leading-relaxed italic">Inventory configuration module.</p>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <button
                                                onClick={() => setActiveTab("identity")}
                                                className={`flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-300 group ${activeTab === 'identity' ? 'bg-success text-black italic font-black' : 'bg-white/5 text-gray-500 hover:bg-white/10 hover:text-white'}`}
                                            >
                                                <EditIcon size={16} className={activeTab === 'identity' ? 'text-black' : 'group-hover:text-success'} />
                                                <span className="text-[9px] font-black uppercase tracking-widest">Identity</span>
                                            </button>
                                            <button
                                                onClick={() => setActiveTab("details")}
                                                className={`flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-300 group ${activeTab === 'details' ? 'bg-success text-black italic font-black' : 'bg-white/5 text-gray-500 hover:bg-white/10 hover:text-white'}`}
                                            >
                                                <EditIcon size={16} className={activeTab === 'details' ? 'text-black' : 'group-hover:text-success'} />
                                                <span className="text-[9px] font-black uppercase tracking-widest">Attribute</span>
                                            </button>
                                            <button
                                                onClick={() => setActiveTab("nutrition")}
                                                className={`flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-300 group ${activeTab === 'nutrition' ? 'bg-success text-black italic font-black' : 'bg-white/5 text-gray-500 hover:bg-white/10 hover:text-white'}`}
                                            >
                                                <EditIcon size={16} className={activeTab === 'nutrition' ? 'text-black' : 'group-hover:text-success'} />
                                                <span className="text-[9px] font-black uppercase tracking-widest">Nutrition</span>
                                            </button>
                                            <button
                                                onClick={() => setActiveTab("dietary")}
                                                className={`flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-300 group ${activeTab === 'dietary' ? 'bg-success text-black italic font-black' : 'bg-white/5 text-gray-500 hover:bg-white/10 hover:text-white'}`}
                                            >
                                                <ShieldCheckIcon size={16} className={activeTab === 'dietary' ? 'text-black' : 'group-hover:text-success'} />
                                                <span className="text-[9px] font-black uppercase tracking-widest">Dietary</span>
                                            </button>
                                            <button
                                                onClick={() => setActiveTab("media")}
                                                className={`flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-300 group ${activeTab === 'media' ? 'bg-success text-black italic font-black' : 'bg-white/5 text-gray-500 hover:bg-white/10 hover:text-white'}`}
                                            >
                                                <CameraIcon size={16} className={activeTab === 'media' ? 'text-black' : 'group-hover:text-success'} />
                                                <span className="text-[9px] font-black uppercase tracking-widest">Media</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Content Area */}
                                    <div className="flex-1 p-8 md:p-10 flex flex-col overflow-hidden h-[80vh] md:h-auto">
                                        <div className="flex justify-between items-start mb-8">
                                            <div className="space-y-0.5">
                                                <div className="flex items-center gap-2 text-success uppercase text-[8px] font-black tracking-[0.3em] italic leading-none">
                                                    <div className="w-6 h-px bg-success/30"></div>
                                                    {activeTab === 'identity' ? 'Identity Sync' : activeTab === 'details' ? 'Attribute Matrix' : activeTab === 'nutrition' ? 'Biological Data' : activeTab === 'dietary' ? 'Restriction Protocol' : 'Optical Acquisition'}
                                                </div>
                                                <h3 className="font-black text-2xl text-white tracking-tighter uppercase leading-none italic">
                                                    {activeTab === 'identity' ? 'Dish' : activeTab === 'details' ? 'Metric' : activeTab === 'nutrition' ? 'Nutrient' : activeTab === 'dietary' ? 'Class' : 'Visual'} <span className="text-success">{activeTab === 'identity' ? 'Update' : activeTab === 'details' ? 'Matrix' : activeTab === 'nutrition' ? 'Schema' : activeTab === 'dietary' ? 'Tag' : 'Dossier'}</span>
                                                </h3>
                                            </div>
                                            <button
                                                onClick={() => setIsOpen(false)}
                                                className="absolute top-6 right-6 p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all border border-white/5"
                                            >
                                                <XIcon size={18} />
                                            </button>
                                        </div>

                                        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 mb-6 space-y-8">
                                            <FormProvider {...methods}>
                                                <SZForm
                                                    defaultValues={{
                                                        name: food?.name,
                                                        description: food?.description,
                                                        price: food?.price,
                                                        category: food?.category?._id,
                                                        preparationTime: food?.preparationTime,
                                                        tags: food?.tags?.join(", "),
                                                        ingredients: food?.ingredients?.join(", "),
                                                        allergens: food?.allergens?.join(", "),
                                                        calories: food?.nutrition?.calories,
                                                        protein: food?.nutrition?.protein,
                                                        carbs: food?.nutrition?.carbs,
                                                        fat: food?.nutrition?.fat,
                                                        isVegetarian: food?.isVegetarian || false,
                                                        isSpicy: food?.isSpicy || false,
                                                    }}
                                                    resolver={zodResolver(foodUpdatedSchema)}
                                                    onSubmit={onSubmit}>
                                                    <motion.div
                                                        key={activeTab}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="space-y-8"
                                                    >
                                                        {activeTab === 'identity' && (
                                                            <div className="grid grid-cols-1 gap-6">
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                                    <SZInput label="Dish Name" name="name" type="text" placeholder="Enter Dish Name" />
                                                                    <SZSelect label="Category" name="category" options={categoryOption} />
                                                                </div>
                                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                                    <SZInput label="Price ($)" name="price" type="number" placeholder="0.00" />
                                                                    <SZInput label="Prep Time (Min)" name="preparationTime" type="number" placeholder="0" />
                                                                </div>
                                                                <SZTextarea label="Description" name="description" placeholder="Describe the flavors..." />
                                                            </div>
                                                        )}

                                                        {activeTab === 'details' && (
                                                            <div className="grid grid-cols-1 gap-6">
                                                                <SZInput label="Tags (Comma separated)" name="tags" type="text" placeholder="Spicy, Vegan..." />
                                                                <div className="space-y-6">
                                                                    <SZInput label="Ingredients (Comma separated)" name="ingredients" type="text" placeholder="Flour, Salt..." />
                                                                    <SZInput label="Allergens (Comma separated)" name="allergens" type="text" placeholder="Nuts, Dairy..." />
                                                                </div>
                                                            </div>
                                                        )}

                                                        {activeTab === 'nutrition' && (
                                                            <div className="grid grid-cols-2 gap-6 bg-neutral/40 p-6 rounded-2xl border border-white/5">
                                                                <SZInput label="Calories" name="calories" type="number" placeholder="0" />
                                                                <SZInput label="Protein" name="protein" type="text" placeholder="0g" />
                                                                <SZInput label="Carbs" name="carbs" type="text" placeholder="0g" />
                                                                <SZInput label="Fat" name="fat" type="text" placeholder="0g" />
                                                            </div>
                                                        )}

                                                        {activeTab === 'dietary' && (
                                                            <div className="flex items-center gap-12 bg-neutral/40 p-8 rounded-2xl border border-white/5">
                                                                <div className="flex items-center gap-4 group/toggle cursor-pointer">
                                                                    <input type="checkbox" {...methods.register("isVegetarian")} className="w-5 h-5 rounded-[7px] border-white/10 bg-white/5 text-success focus:ring-success transition-all cursor-pointer" />
                                                                    <div className="flex flex-col">
                                                                        <span className="text-[10px] font-black text-white uppercase italic tracking-wider leading-none">Vegetarian</span>
                                                                        <p className="text-[8px] text-gray-600 font-bold uppercase italic mt-1 tracking-widest">Protocol V-1</p>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center gap-4 group/toggle cursor-pointer">
                                                                    <input type="checkbox" {...methods.register("isSpicy")} className="w-5 h-5 rounded-[7px] border-white/10 bg-white/5 text-red-500 focus:ring-red-500 transition-all cursor-pointer" />
                                                                    <div className="flex flex-col">
                                                                        <span className="text-[10px] font-black text-white uppercase italic tracking-wider leading-none">Spicy</span>
                                                                        <p className="text-[8px] text-gray-600 font-bold uppercase italic mt-1 tracking-widest">Protocol S-1</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}

                                                        {activeTab === 'media' && (
                                                            <div className="bg-neutral/40 p-6 rounded-2xl border border-white/5 space-y-6">
                                                                <div className="flex items-center justify-between">
                                                                    <div className="space-y-0.5">
                                                                        <h4 className="text-[11px] font-black text-white uppercase tracking-wider italic">Optical Sensor Data</h4>
                                                                        <p className="text-[9px] text-gray-500 font-medium italic">Resolution: High-fidelity only.</p>
                                                                    </div>
                                                                    <label className="cursor-pointer group">
                                                                        <div className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-xl border border-white/5 transition-all">
                                                                            <CameraIcon size={14} className="text-success" />
                                                                            <span className="text-[10px] font-black uppercase italic tracking-widest">Capture</span>
                                                                        </div>
                                                                        <input type="file" className="hidden" accept="image/*" onChange={handleImage} />
                                                                    </label>
                                                                </div>

                                                                {(previewImage || food.image) && (
                                                                    <div className="relative group/img w-full h-48 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                                                                        <Image
                                                                            src={previewImage || food.image as string}
                                                                            alt="Preview"
                                                                            fill
                                                                            className="object-cover transition-transform duration-700 group-hover/img:scale-110"
                                                                        />
                                                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                                                            <p className="text-white font-black text-[11px] uppercase tracking-[0.3em] italic">Current Image</p>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}

                                                        <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                                                            <button
                                                                type="button"
                                                                onClick={() => setIsOpen(false)}
                                                                className="flex-1 px-6 py-4 rounded-xl bg-white/5 text-gray-500 font-black uppercase text-[9px] tracking-[0.2em] italic hover:bg-white/10 hover:text-white transition-all border border-white/5 active:scale-95"
                                                            >
                                                                Discard Changes
                                                            </button>
                                                            <button
                                                                type="submit"
                                                                className="flex-2 px-8 py-4 rounded-xl bg-success text-black font-black uppercase text-[9px] tracking-[0.2em] italic hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl"
                                                            >
                                                                Update Entry
                                                            </button>
                                                        </div>
                                                    </motion.div>
                                                </SZForm>
                                            </FormProvider>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </Portal>
        </div>
    );
};

export default UpdateFood;