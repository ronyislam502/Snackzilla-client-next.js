export type TAddress = {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  _id: string;
};

export type TUserDetail = {
  _id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  phone: string;
  role: string;
  status: string;
  address: TAddress;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};
