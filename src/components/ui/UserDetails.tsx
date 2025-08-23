import { useState } from "react";
import { TUserDetail } from "@/types/user";
import { EyeFilledIcon } from "../shared/Icons";

const UserDetails = ({ user }: { user: TUserDetail }) => {
  const [isOpen, setIsOpen] = useState(false);

  const address = user?.address
    ? `${user?.address?.street}, ${user?.address?.city}-${user?.address?.postalCode}, ${user?.address?.state}, ${user.address.country}`
    : "";

  return (
    <div>
      <div className="flex mb-4 flex-col items-center justify-center">
        <button
          className="btn btn-outline btn-info"
          onClick={() => setIsOpen(true)}
        >
          <EyeFilledIcon />
        </button>
      </div>

      {/* DaisyUI Modal */}
      {isOpen && (
        <dialog id="modal" className="modal modal-open">
          <div className="modal-box w-11/12 max-w-5xl">
            <h3 className="font-bold text-3xl text-info">User Details</h3>
            <div className="flex gap-6">
              <figure className="px-10 py-10">
                <img
                  src={user?.avatar}
                  alt="avatar"
                  className="rounded-xl h-[400px]"
                />
              </figure>
              <div className="card-body  px-10 py-10">
                <div className="flex gap-6">
                  <div className="py-6">
                    <div>
                      <label className="label-text text-2xl font-extrabold text-blue-500">
                        Name
                      </label>
                      <h3 className="text-xl font-bold ">{user?.name}</h3>
                    </div>
                    <div className="py-2">
                      <label className="label-text text-2xl font-extrabold text-blue-500">
                        Phone
                      </label>
                      <h3 className="text-xl font-bold ">{user?.phone}</h3>
                    </div>
                    <div className="py-2">
                      <label className="label-text text-2xl font-extrabold text-blue-500">
                        E-mail
                      </label>
                      <h3 className="text-xl font-bold ">{user?.email}</h3>
                    </div>
                    <div className="py-2">
                      <label className="label-text text-2xl font-extrabold text-blue-500">
                        Address
                      </label>
                      <h3 className="text-xl font-bold ">{address}</h3>
                    </div>
                    <div className="modal-action">
                      <button
                        className="btn btn-outline btn-info"
                        onClick={() => setIsOpen(false)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default UserDetails;
