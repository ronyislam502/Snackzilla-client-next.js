import { addToCart } from "@/redux/features/order/orderSlice";
import { TFood } from "@/types/food";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const FoodCard = ({ food }: { food: TFood }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (food: TFood) => {
    dispatch(addToCart(food));
    console.log(food);
    toast.success("Add to cart successfully", { autoClose: 1000 });
  };

  return (
    <div className="card bg-base-300 shadow-sm">
      <img src={food?.image} alt="Foods" className="rounded-t-lg" />
      <div className="card-body items-center text-center">
        <Link href={`/menu/${food?._id}`}>
          <h2 className="card-title">{food?.name}</h2>
        </Link>
        <div className="flex gap-16 mb-2">
          <p>Price: $ {food?.price}</p>
          <p>Time: {food?.preparationTime} min</p>
        </div>
        <div className="card-actions">
          <button
            className="btn btn-outline btn-success"
            onClick={() => handleAddToCart(food)}
          >
            add To cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
