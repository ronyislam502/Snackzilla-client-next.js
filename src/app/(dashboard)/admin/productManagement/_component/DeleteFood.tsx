"use client";

import SZForm from "@/components/form/SZFrom";
import { useState } from "react";

const DeleteFood = ({ food }: { food: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  //   const [deleteService] = useDeleteServiceMutation();

  const handleDelete = async (id: string) => {
    console.log("id", id);
    // try {
    //   const res = await deleteService(id);
    //   if (res?.data.success) {
    //     toast.success(res?.data?.message);
    //   }
    // } catch (error) {
    //   const err = error as TError;
    //   toast.error(err?.data?.message);
    // }
  };

  return (
    <div>
      <div className="flex mb-4 flex-col items-center justify-center">
        <button
          className="btn btn-outline btn-error"
          onClick={() => setIsOpen(true)}
        >
          Cancel
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
                <button className="btn" onClick={() => setIsOpen(false)}>
                  No
                </button>
                <button className="btn btn-outline btn-success" type="submit">
                  Yes, Cancel
                </button>
              </SZForm>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default DeleteFood;
