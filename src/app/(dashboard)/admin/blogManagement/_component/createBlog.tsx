"use client";

import { ChangeEvent, useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import SZForm from "@/components/form/SZFrom";
import SZInput from "@/components/form/SZInput";
import SZTextarea from "@/components/form/SZTextarea";
import { PlusIcon, CameraIcon, XIcon } from "@/components/shared/Icons";
import { useCreateBlogMutation } from "@/redux/features/blog/blogApi";
import { blogCreatedSchema } from "@/schema/blog";
import { TError } from "@/types/global";
import { useAppSelector } from "@/redux/hooks";
import { TUser } from "@/redux/features/auth/authSlice";
import { useGetUserByEmailQuery } from "@/redux/features/user/userApi";

const AddBlog = () => {
    const loggedUser = useAppSelector((state) => state?.auth?.user) as TUser;
    const { data: userData, isLoading: userLoading } = useGetUserByEmailQuery(
        loggedUser?.email
    );

    const user = userData?.data?.[0];
    const [isOpen, setIsOpen] = useState(false);
    const methods = useForm({
        resolver: zodResolver(blogCreatedSchema),
    });

    const [previewImage, setPreviewImage] = useState("");
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const [createBlog] = useCreateBlogMutation();

    const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const onSubmit = async (data: FieldValues) => {
        try {
            const formData = new FormData();

            const blogData = {
                user: user?._id,
                title: data.title,
                description: data.description,
                tags: data.tags
                    .split(",")
                    .map((tag: string) => tag.trim())
                    .filter(Boolean),
            };

            formData.append("data", JSON.stringify(blogData));

            if (selectedImage) {
                formData.append("image", selectedImage);
            }

            const res = await createBlog(formData).unwrap();

            if (res?.success) {
                toast.success(res?.message, { autoClose: 1000 });
                methods.reset();
                setPreviewImage("");
                setSelectedImage(null);
                setIsOpen(false);
            }
        } catch (error) {
            const err = error as TError;
            toast.error(err?.data?.message || "Something went wrong", {
                autoClose: 1000,
            });
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(true)}
                className="group relative flex items-center gap-2 bg-success text-black font-black px-6 py-2.5 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(34,197,94,0.2)] uppercase tracking-wider text-[10px] overflow-hidden italic"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <PlusIcon />
                <span>Compose Insight</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
                        />
                        
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-[2rem] shadow-[0_0_100px_rgba(0,0,0,1)] overflow-hidden"
                        >
                            {/* Header Section */}
                            <div className="relative h-32 bg-gradient-to-br from-success/10 via-success/[0.02] to-transparent flex items-center px-8 md:px-10">
                                <div className="absolute top-0 right-0 p-8 opacity-5 rotate-12">
                                    <PlusIcon />
                                </div>
                                <div className="flex items-center gap-5 relative z-10">
                                    <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center text-success border border-success/30 shadow-[0_0_20px_rgba(34,197,94,0.1)]">
                                        <PlusIcon />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic leading-none">New <span className="text-success">Insight.</span></h2>
                                        <p className="text-gray-500 font-bold text-[9px] tracking-widest uppercase mt-1 italic">Publishing Authorization Required</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setIsOpen(false)}
                                    className="absolute top-6 right-6 p-2.5 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all border border-white/5"
                                >
                                    <XIcon />
                                </button>
                            </div>

                            <div className="p-8 md:p-10 pt-4">
                                <FormProvider {...methods}>
                                    <SZForm onSubmit={onSubmit}>
                                        <div className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <SZInput label="Article Title" name="title" type="text" placeholder="e.g. Culinary Horizons" />
                                                <SZInput label="Reference Tags" name="tags" type="text" placeholder="Chef, Review, Recipe" />
                                            </div>

                                            <SZTextarea label="Insight Narrative" name="description" placeholder="Pen your thoughts here..." />

                                            {/* Image Upload Area */}
                                            <div className="bg-white/[0.02] p-6 rounded-2xl border border-white/5 space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <div className="space-y-0.5">
                                                        <h4 className="text-[10px] font-black text-white uppercase tracking-wider italic">Visual Asset</h4>
                                                        <p className="text-[8px] text-gray-500 font-bold uppercase italic opacity-60">Cover Capture Specification</p>
                                                    </div>
                                                    <label className="cursor-pointer group">
                                                        <div className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-xl border border-white/5 transition-all">
                                                            <CameraIcon className="text-success w-4 h-4" />
                                                            <span className="text-[10px] font-black uppercase tracking-widest italic">Link Asset</span>
                                                        </div>
                                                        <input type="file" className="hidden" accept="image/*" onChange={handleImage} />
                                                    </label>
                                                </div>

                                                {previewImage ? (
                                                    <div className="relative group/img w-full h-32 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                                                        <img src={previewImage} alt="Preview" className="w-full h-full object-cover brightness-75 group-hover/img:brightness-100 transition-all" />
                                                        <div className="absolute inset-0 bg-success/10 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                                            <p className="text-white font-black text-[9px] uppercase tracking-[0.2em] italic">Validated Asset Preview</p>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="w-full h-24 rounded-xl border border-dashed border-white/5 flex flex-col items-center justify-center text-gray-600 gap-2 bg-white/[0.01]">
                                                        <CameraIcon className="opacity-20 w-5 h-5" />
                                                        <p className="text-[8px] font-black uppercase tracking-[0.2em] opacity-30 italic">No asset linked to record</p>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center justify-end gap-3 pt-6 border-t border-white/5">
                                                <button 
                                                    type="button"
                                                    onClick={() => setIsOpen(false)}
                                                    className="px-6 py-2.5 rounded-xl text-gray-500 font-black hover:text-white transition-colors uppercase text-[10px] tracking-widest italic"
                                                >
                                                    Discard
                                                </button>
                                                <button 
                                                    type="submit"
                                                    className="bg-success text-black px-8 py-2.5 rounded-xl font-black hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(34,197,94,0.1)] uppercase text-[10px] tracking-widest italic"
                                                >
                                                    Initialize Publication
                                                </button>
                                            </div>
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

export default AddBlog;
