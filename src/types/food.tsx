export type TCategory = {
  _id: string;
  name: string;
  icon: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TFood = {
  _id: string;
  category: TCategory;
  name: string;
  description: string;
  price: number;
  image: string;
  preparationTime: number;
  isDeleted: boolean;
  quantity: number;
  createdAt: string;
  updatedAt: string;
};
