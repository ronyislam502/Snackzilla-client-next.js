import { TFood } from "@/types/food";

const FoodCard = ({ food }: { food: TFood }) => {
  return (
    <div className="card bg-base-100 shadow-sm">
      <img src={food?.image} alt="Foods" className="rounded-t-lg" />
      <div className="card-body items-center text-center">
        <h2 className="card-title">{food?.name}</h2>
        <div className="flex gap-16 mb-2">
          <p>Price: $ {food?.price}</p>
          <p>Time: {food?.preparationTime} min</p>
        </div>
        <div className="card-actions">
          <button className="btn btn-primary">Add To Cart</button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
