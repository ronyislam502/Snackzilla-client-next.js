"use client";

import { ChangeEvent, useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import SZForm from "@/components/form/SZFrom";
import SZInput from "@/components/form/SZInput";
import SZTextarea from "@/components/form/SZTextarea";
import { EditIcon } from "@/components/shared/Icons";
import { useUpdateBlogMutation } from "@/redux/features/blog/blogApi";
import { blogUpdatedSchema } from "@/schema/blog";
import { TError } from "@/types/global";

const UpdateBlog = ({ blog }: { blog: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const methods = useForm({
    resolver: zodResolver(blogUpdatedSchema),
  });

  const [previewImage, setPreviewImage] = useState(blog?.image || "");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [updateBlog] = useUpdateBlogMutation();

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

      const blogData = {
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

      const res = await updateBlog({
        id: blog?._id,
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
              Update Blog
            </h3>

            <FormProvider {...methods}>
              <SZForm
                defaultValues={{
                  title: blog?.title,
                  description: blog?.description,
                  tags: blog?.tags?.join(", "),
                }}
                onSubmit={onSubmit}
              >
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
                    placeholder="react, nextjs, saas"
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
                    onChange={handleImageChange}
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
      )}
    </div>
  );
};

export default UpdateBlog;

