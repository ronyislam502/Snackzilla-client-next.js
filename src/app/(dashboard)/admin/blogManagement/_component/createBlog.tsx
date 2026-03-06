"use client";

import { ChangeEvent, useState, useEffect } from "react";
import { createPortal } from "react-dom";
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
import Image from "next/image";

const AddBlog = () => {
    const loggedUser = useAppSelector((state) => state?.auth?.user) as TUser;
    const { data: userData } = useGetUserByEmailQuery(
        loggedUser?.email
    );

    const user = userData?.data?.[0];
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

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

    const modalContent = (
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
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-2xl bg-[#0a0a0a]/60 backdrop-blur-3xl border border-success/20 rounded-3xl shadow-2xl overflow-hidden mt-16 group hover:border-blue-500/40 hover:shadow-[0_0_50px_rgba(59,130,246,0.15)] transition-all duration-500"
                    >
                        {/* Header Section Backgrounds */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-success/8 via-success/3 to-transparent transition-opacity duration-700 group-hover:opacity-0 pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                        
                        <div className="relative flex items-center px-8 pt-4">
                            <div className="absolute top-0 right-0 p-6 opacity-10 rotate-12">
                                <PlusIcon size={80} />
                            </div>
                            <div className="flex items-center gap-5 relative z-10">
                                <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center text-success border border-success/30 shadow-[0_0_20px_rgba(34,197,94,0.1)]">
                                    <PlusIcon size={24} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic leading-none">New <span className="text-success">Insight.</span></h2>
                                    <p className="text-success font-medium text-[10px] tracking-widest uppercase opacity-70 italic">Publishing Intelligence</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setIsOpen(false)}
                                className="absolute top-6 right-6 p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all border border-white/5"
                            >
                                <XIcon size={18} />
                            </button>
                        </div>

                        <div className="p-8 pt-4 relative z-10">
                            <FormProvider {...methods}>
                                <SZForm onSubmit={onSubmit}>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <SZInput label="Article Title" name="title" type="text" placeholder="e.g. Culinary Horizons" />
                                            <SZInput label="Reference Tags" name="tags" type="text" placeholder="Chef, Review, Recipe" />
                                        </div>

                                        <SZTextarea label="Insight Narrative" name="description" placeholder="Pen your thoughts here..." />

                                        {/* Image Upload Area */}
                                        <div className="bg-neutral/40 p-6 rounded-2xl border border-white/5 space-y-3">
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-0.5">
                                                    <h4 className="text-[11px] font-black text-white uppercase tracking-wider italic">Visual Asset</h4>
                                                    <p className="text-[9px] text-gray-500 font-medium italic">High-res photography recommended.</p>
                                                </div>
                                                <label className="cursor-pointer group">
                                                    <div className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-white px-3 py-1.5 rounded-lg border border-white/5 transition-all">
                                                        <CameraIcon size={14} className="text-success" />
                                                        <span className="text-[10px] font-bold">Upload</span>
                                                    </div>
                                                    <input type="file" className="hidden" accept="image/*" onChange={handleImage} />
                                                </label>
                                            </div>

                                            {previewImage ? (
                                                <div className="relative group/img w-full h-32 rounded-xl overflow-hidden border border-white/10 shadow-lg">
                                                    <Image src={previewImage} alt="Preview" fill className="object-cover transition-transform duration-700 group-hover/img:scale-110" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                                        <p className="text-white font-black text-[10px] uppercase tracking-widest italic">Asset Preview</p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="w-full h-24 rounded-xl border-2 border-dashed border-white/5 flex flex-col items-center justify-center text-gray-600 gap-2 group-hover:border-success/20 transition-all">
                                                    <CameraIcon size={24} className="opacity-20" />
                                                    <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40">No Asset Linked</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
                                            <button 
                                                type="button"
                                                onClick={() => setIsOpen(false)}
                                                className="px-6 py-2 rounded-xl text-gray-400 font-bold hover:text-white transition-colors uppercase text-[10px] tracking-widest"
                                            >
                                                Discard
                                            </button>
                                            <button 
                                                type="submit"
                                                className="bg-success text-black px-4 py-2 rounded-xl font-black hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(34,197,94,0.1)] uppercase text-[10px] tracking-widest"
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
    );

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

            {mounted && typeof document !== "undefined" ? createPortal(modalContent, document.body) : null}
        </div>
    );
};

export default AddBlog;

