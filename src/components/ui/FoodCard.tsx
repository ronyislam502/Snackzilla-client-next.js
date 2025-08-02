const FoodCard = ({ food }: { food: any }) => {
  return (
    <div className="card bg-base-200 shadow-sm">
      <figure>
        <img src={food?.image} alt="Foods" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{food?.name}</h2>
        <p>
          A card component has a figure, a body part, and inside body there are
          title and actions parts
        </p>
        <div className="flex gap-6">
          <p>Price: $ {food?.price}</p>
          <p>Time: {food?.preparationTime}min</p>
        </div>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
