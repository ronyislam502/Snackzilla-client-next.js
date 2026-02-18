"use client";

import { ChangeEvent, useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useCreateBlogMutation } from "@/redux/features/blog/blogApi";
import { blogCreatedSchema } from "@/schema/blog";
import { TError } from "@/types/global";
import SZForm from "@/components/form/SZFrom";
import SZInput from "@/components/form/SZInput";
import SZTextarea from "@/components/form/SZTextarea";
import { useAppSelector } from "@/redux/hooks";
import { TUser } from "@/redux/features/auth/authSlice";
import { useGetUserByEmailQuery } from "@/redux/features/user/userApi";

const AddBlog = () => {
    const loggedUser = useAppSelector((state) => state?.auth?.user) as TUser;
    const { data: userData, isLoading } = useGetUserByEmailQuery(
        loggedUser?.email
    );

    const user = userData?.data[0];
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
        <div>
            <button
                className="btn btn-outline btn-info"
                onClick={() => setIsOpen(true)}
            >
                Add Blog
            </button>

            {isOpen && (
                <dialog className="modal modal-open">
                    <div className="modal-box max-w-sm">
                        <h3 className="font-bold text-lg text-success text-center">
                            Add Blog
                        </h3>

                        <FormProvider {...methods}>
                            <SZForm onSubmit={onSubmit}>
                                {/* Title */}
                                <div className="py-3">
                                    <SZInput
                                        label="Title"
                                        name="title"
                                        type="text"
                                        placeholder="Enter blog title"
                                    />
                                </div>

                                {/* Description */}
                                <div className="py-3">
                                    <SZTextarea
                                        label="Description"
                                        name="description"
                                        placeholder="Enter blog description"
                                    />
                                </div>

                                {/* Tags */}
                                <div className="py-3">
                                    <SZInput
                                        label="Tags"
                                        name="tags"
                                        type="text"
                                        placeholder="enter blog tags"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Separate tags with commas
                                    </p>
                                </div>

                                {/* Image */}
                                <div className="py-3">
                                    <label className="text-xl font-medium text-success">
                                        Image
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImage}
                                        className="file-input file-input-bordered file-input-success w-full"
                                    />

                                    {previewImage && (
                                        <img
                                            src={previewImage}
                                            alt="Preview"
                                            className="mt-4 w-20 h-20 object-cover rounded-full shadow"
                                        />
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="modal-action">
                                    <button
                                        type="button"
                                        className="btn"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-outline btn-success"
                                    >
                                        Create
                                    </button>
                                </div>
                            </SZForm>
                        </FormProvider>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default AddBlog;
