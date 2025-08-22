import { TFood } from "@/types/food";
import Image from "next/image";

const FoodDetail = ({ food }: { food: TFood }) => {
  return (
    <div className="p-4">
      <div className="flex gap-6">
        <Image
          src={food?.image}
          alt="food"
          height={500}
          width={500}
          className="rounded-xl"
        />
        <div>
          <h1 className="text-2xl font-bold">{food?.name}</h1>
          <p>{food?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default FoodDetail;
