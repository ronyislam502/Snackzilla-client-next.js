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
  rating: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
  ingredients?: string[];
  nutrition?: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
  };
  allergens?: string[];
  isVegetarian?: boolean;
  isSpicy?: boolean;
};
