"use client";

import SZForm from "@/components/form/SZFrom";
import SZInput from "@/components/form/SZInput";
import SZSelect from "@/components/form/SZSelect";
import SZTextarea from "@/components/form/SZTexarea";
import { useAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { useCreateFoodMutation } from "@/redux/features/food/foodApi";
import { TError } from "@/types/global";
import { ChangeEvent, useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { foodCreatedSchema } from "@/schema/food";

const AddFood = () => {
  const [isOpen, setIsOpen] = useState(false);
  const methods = useForm();
  const [previewImage, setPreviewImage] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { data: categories, isLoading: serviceLoading } = useAllCategoriesQuery(
    {}
  );
  const [addFood] = useCreateFoodMutation();

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
      const imageUrl = URL.createObjectURL(file);
      // console.log("img", imageUrl);

      setPreviewImage(imageUrl);
    }
  };

  const onSubmit = async (data: FieldValues) => {
    const numericPrice = Number(data?.price);
    const readyTime = Number(data?.preparationTime);
    const formData = new FormData();
    try {
      const foodData = {
        category: data.category,
        name: data.name,
        price: numericPrice,
        description: data.description,
        preparationTime: readyTime,
      };

      formData.append("data", JSON.stringify(foodData));
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      const res = await addFood(formData).unwrap();
      // console.log("res", res);
      if (res.success) {
        toast.success(res?.message, {
          autoClose: 1000,
        });
        methods.reset();
        setIsOpen(false);
      }
    } catch (error) {
      const err = error as TError;
      toast.error(err?.data?.message, {
        autoClose: 1000,
      });
    }
  };

  return (
    <div>
      <div className="flex mb-4 flex-col items-center justify-center">
        <button
          className="btn btn-outline btn-info"
          onClick={() => setIsOpen(true)}
        >
          Add Food
        </button>
      </div>

      {/* DaisyUI Modal */}
      {isOpen && (
        <dialog id="modal" className="modal modal-open">
          <div className="modal-box max-w-sm">
            <h3 className="font-bold text-lg text-success text-center">
              Add Food
            </h3>
            <FormProvider {...methods}>
              <SZForm
                resolver={zodResolver(foodCreatedSchema)}
                onSubmit={onSubmit}
              >
                <div className="py-3">
                  <div className="flex gap-6">
                    <SZInput
                      label="Name"
                      name="name"
                      type="text"
                      placeholder="enter food name"
                    />
                    <SZSelect
                      label="Category"
                      name="category"
                      options={categoryOption}
                    />
                  </div>
                </div>
                <div className="py-3">
                  <div className="flex gap-6">
                    <SZInput
                      label="Price"
                      name="price"
                      type="number"
                      placeholder="enter food price"
                    />
                    <SZInput
                      label="Time"
                      name="preparationTime"
                      type="number"
                      placeholder="enter food ready time"
                    />
                  </div>
                </div>
                <div className="py-3">
                  <SZTextarea
                    label="Description"
                    name="description"
                    type="text"
                    placeholder="enter food description"
                  />
                </div>
                <div className="py-2">
                  <div className="min-w-fit flex-1">
                    <label className="text-xl font-medium text-success">
                      Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImage}
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

                <div className="modal-action">
                  <button className="btn" onClick={() => setIsOpen(false)}>
                    No
                  </button>
                  <button className="btn btn-outline btn-success" type="submit">
                    Yes
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

export default AddFood;
