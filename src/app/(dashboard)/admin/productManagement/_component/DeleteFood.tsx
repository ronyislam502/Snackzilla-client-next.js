"use client";

import SZForm from "@/components/form/SZFrom";
import { DeleteIcon } from "@/components/shared/Icons";
import { useDeleteFoodMutation } from "@/redux/features/food/foodApi";
import { TError } from "@/types/global";
import { useState } from "react";
import { toast } from "react-toastify";

const DeleteFood = ({ food }: { food: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteService] = useDeleteFoodMutation();

  const handleDelete = async (id: string) => {
    console.log("id", id);
    try {
      const res = await deleteService(id);
      console.log("res-delete", res);
      if (res?.data.success) {
        toast.success(res?.data?.message, { autoClose: 1000 });
      }
    } catch (error) {
      const err = error as TError;
      toast.error(err?.data?.message, { autoClose: 1000 });
    }
  };

  return (
    <div>
      <div className="flex mb-4 flex-col items-center justify-center">
        <button
          className="btn btn-outline btn-error"
          onClick={() => setIsOpen(true)}
        >
          <DeleteIcon />
        </button>
      </div>

      {/* DaisyUI Modal */}
      {isOpen && (
        <dialog id="modal" className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-red-600">Cancel Order?</h3>
            <p className="py-4">Are you sure you want to cancel this order?</p>
            <div className="modal-action">
              <SZForm onSubmit={() => handleDelete(food?._id)}>
                <div className="flex gap-4">
                  <button
                    className="btn btn-outline btn-accent"
                    onClick={() => setIsOpen(false)}
                  >
                    No
                  </button>
                  <button className="btn btn-outline btn-error" type="submit">
                    Yes
                  </button>
                </div>
              </SZForm>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default DeleteFood;
