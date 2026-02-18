"use client";

import { ChangeEvent, useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import SZForm from "@/components/form/SZFrom";
import SZInput from "@/components/form/SZInput";
import { EditIcon } from "@/components/shared/Icons";
import { blogUpdatedSchema } from "@/schema/blog";
import { TError } from "@/types/global";
import { TUserDetail } from "@/types/user";
import { useUpdateUserMutation } from "@/redux/features/user/userApi";
import { userValidationSchema } from "@/schema/user";

const Update = ({ user }: { user: TUserDetail }) => {
    const [isOpen, setIsOpen] = useState(false);
    const methods = useForm({
        resolver: zodResolver(blogUpdatedSchema),
    });
    console.log("user", user.address)

    const [previewImage, setPreviewImage] = useState(user?.avatar || "");
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const [updateUser] = useUpdateUserMutation();

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const onSubmit = async (data: FieldValues) => {
        try {
            const formData = new FormData();

            const userData = {
                name: data.name,
                phone: data.phone,
                address: {
                    street: data.street,
                    city: data.city,
                    state: data.state,
                    postalCode: data.postalCode,
                    country: data.country,
                }
            };

            formData.append("data", JSON.stringify(userData));

            if (selectedImage) {
                formData.append("image", selectedImage);
            }

            const res = await updateUser({
                id: user?._id,
                data: formData,
            }).unwrap();

            if (res?.success) {
                toast.success(res?.message, { autoClose: 1000 });
                methods.reset();
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
                <EditIcon />
            </button>

            {isOpen && (
                <dialog className="modal modal-open">
                    <div className="modal-box max-w-sm">
                        <h3 className="font-bold text-lg text-success text-center">
                            Update Profile
                        </h3>

                        <FormProvider {...methods}>
                            <SZForm
                                defaultValues={{
                                    name: user?.name,
                                    email: user.email,
                                    phone: user?.phone,
                                    street: user?.address?.street,
                                    city: user?.address?.city,
                                    state: user?.address?.state,
                                    postalCode: user?.address?.postalCode,
                                    country: user?.address?.country
                                }}
                                resolver={zodResolver(userValidationSchema)}
                                onSubmit={onSubmit}
                            >
                                {/* Title */}
                                <div className="py-3">
                                    <SZInput
                                        label="Name"
                                        name="name"
                                        type="text"
                                        placeholder="Enter user name"
                                    />
                                </div>
                                <div className="py-3">
                                    <SZInput
                                        label="Phone *"
                                        name="phone"
                                        type="text"
                                        placeholder="your phone number"
                                    />
                                </div>
                                <div className="py-3 grid lg:grid-cols-2 gap-2">
                                    <SZInput
                                        label="Street *"
                                        name="street"
                                        type="text"
                                        placeholder="your street"
                                    />
                                    <SZInput
                                        label="City *"
                                        name="city"
                                        type="text"
                                        placeholder="your city"
                                    />
                                </div>
                                <div className="py-3 grid lg:grid-cols-2 gap-2">
                                    <SZInput
                                        label="State *"
                                        name="state"
                                        type="text"
                                        placeholder="your state"
                                    />
                                    <SZInput
                                        label="PostalCode *"
                                        name="postalCode"
                                        type="text"
                                        placeholder="your postal code"
                                    />
                                </div>
                                <div className="py-3 grid lg:grid-cols-2 gap-2">
                                    <SZInput
                                        label="Country *"
                                        name="country"
                                        type="text"
                                        placeholder="your country"
                                    />
                                </div>

                                {/* Image */}
                                <div className="py-2">
                                    <div className="min-w-fit flex-1">
                                        <label className="text-xl font-medium text-success">
                                            Image
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="file-input file-input-bordered file-input-success"
                                        />
                                        {previewImage && (
                                            <img
                                                src={previewImage}
                                                alt="Preview"
                                                className="mt-4 w-20 max-h-64 object-cover rounded-full shadow"
                                            />
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="modal-action">
                                    <button
                                        type="button"
                                        className="btn btn-outline btn-info"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-outline btn-success"
                                    >
                                        Update
                                    </button>
                                </div>
                            </SZForm>
                        </FormProvider>
                    </div>
                </dialog>
            )
            }
        </div >
    );
};

export default Update;

