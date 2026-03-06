export type TReview = {
  _id: string;
  user: {
    _id: string;
    name: string;
    avatar?: string;
  };
  order: string;
  food: string;
  feedback: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
};
