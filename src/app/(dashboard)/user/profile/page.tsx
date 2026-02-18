"use client";

import { TUser } from "@/redux/features/auth/authSlice";
import { useGetUserByEmailQuery } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hooks";
import Update from "../_components/Edit";

const Profile = () => {
  const loggedUser = useAppSelector((state) => state?.auth?.user) as TUser;
  const { data: userData, isLoading } = useGetUserByEmailQuery(
    loggedUser?.email
  );

  const user = userData?.data[0];

  console.log('pro-user', user)

  const address = user?.address
    ? `${user?.address?.street}, ${user?.address?.city}-${user?.address?.postalCode}, ${user?.address?.state}, ${user.address.country}`
    : "";

  return (
    <div className="card bg-black/80 text-white shadow-sm my-20">
      <h2 className="text-center text-4xl font-bold p-6">User Info</h2>
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
            <div className="py-2">
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
            </div>
            <div>
              <Update user={user} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
