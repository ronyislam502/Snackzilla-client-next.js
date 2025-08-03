const CardSkeleton = ({ count = 4 }: { count?: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="card transform transition-transform duration-300 hover:scale-105 shadow-md pb-6 animate-pulse bg-gray-800"
        >
          {/* Image Placeholder */}
          <div className="h-[200px] w-full bg-gray-700 rounded-t-lg" />

          {/* Body */}
          <div className="card-body items-center text-center rounded-b-lg space-y-4 w-full">
            <div className="h-6 bg-gray-600 rounded w-2/3" />
            <div className="flex justify-center gap-4 w-full">
              <div className="h-4 bg-gray-600 rounded w-1/4" />
              <div className="h-4 bg-gray-600 rounded w-1/4" />
            </div>
            <div className="flex justify-center gap-4 w-full">
              <div className="h-10 w-32 bg-gray-700 rounded-md mt-4" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CardSkeleton;
