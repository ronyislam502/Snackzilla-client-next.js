import { TCategory } from "@/types/food";
import React from "react";

const CategoryCard = ({ category }: { category: TCategory }) => {
  return (
    <div className="card bg-base-300 shadow-sm">
      <img src={category?.icon} alt="Foods" className="rounded-t-lg" />
      <div className="card-body items-center text-center">
        <h2 className="card-title">{category?.name}</h2>
      </div>
    </div>
  );
};

export default CategoryCard;
