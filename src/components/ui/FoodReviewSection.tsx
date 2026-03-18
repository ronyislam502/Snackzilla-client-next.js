import { useEffect, useState } from "react";
import { useGetReviewsByFoodIdQuery } from "@/redux/features/review/reviewApi";
import ReviewSummary from "./ReviewSummary";
import ReviewList from "./ReviewList";
import { TReview } from "@/types/review";
import { useAppSelector } from "@/redux/hooks";
import { TUser } from "@/redux/features/auth/authSlice";
import AddReview from "@/app/(dashboard)/user/purchase/_component/AddReview";
import { useMyOrdersQuery } from "@/redux/features/order/orderApi";
import { toast } from "react-toastify";
import { TOrder } from "@/types/order";
import { useSocket } from "@/hooks/useSocket";

interface FoodReviewSectionProps {
  foodId: string;
}

const FoodReviewSection = ({ foodId }: FoodReviewSectionProps) => {
  const { data: reviewsData, isLoading } = useGetReviewsByFoodIdQuery(foodId);
  const reviews = (reviewsData?.reviews as TReview[]) || [];
  const averageRating = reviewsData?.averageRating || 0;
  const totalReviews = reviewsData?.totalReviews || 0;

  const loggedUser = useAppSelector((state) => state.auth.user) as TUser;
  const socket = useSocket(process.env.NEXT_PUBLIC_SERVER_URL as string || "http://localhost:5000");
  const [eligibleOrderId, setEligibleOrderId] = useState<string | null>(null);

  const { data: ordersData, refetch } = useMyOrdersQuery({ email: loggedUser?.email }, { skip: !loggedUser?.email });

  useEffect(() => {
    if (!ordersData?.data || !foodId) return;

    const order = ordersData?.data?.find((order: TOrder) =>
      order.status === "DELIVERED" &&
      order.foods.some((f) => f?.food?._id === foodId)
    );
    if (order) setEligibleOrderId(order._id);
  }, [ordersData, foodId]);

  useEffect(() => {
    if (!socket.isConnected || !loggedUser?.email) return;

    const handleOrderUpdated = () => {
        refetch();
    };

    socket.on("order-updated", handleOrderUpdated as any);
    return () => {
      socket.off("order-updated", handleOrderUpdated as any);
    };
  }, [socket.isConnected, loggedUser?.email, refetch]);

  const handleWriteReview = () => {
    if (!loggedUser) {
      toast.info("Please log in to share your epicurean experience.");
      return;
    }
    if (!eligibleOrderId) {
      toast.info("Reviews are reserved for patrons who have experienced this dish via a delivered order.");
      return;
    }
    // The AddReview component has its own internal state to open. 
    // We'll need to trigger it. Since it's a fixed component, we might need a better way.
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8 animate-pulse">
        <div className="h-64 bg-white/5 rounded-3xl" />
        <div className="space-y-4">
          <div className="h-32 bg-white/5 rounded-2xl" />
          <div className="h-32 bg-white/5 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <section className="mt-20 space-y-12">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Side: Summary */}
        <div className="w-full lg:w-1/3 sticky top-24">
          <ReviewSummary 
            reviews={reviews} 
            averageRating={averageRating} 
            totalReviews={totalReviews} 
          />

          <div className="mt-8 p-8 bg-[#0a0a0a]/40 rounded-3xl border border-white/5 backdrop-blur-3xl space-y-4">
            <h4 className="text-sm font-black text-white uppercase italic tracking-wider">Review this product</h4>
            <p className="text-[10px] text-gray-400 font-medium italic leading-relaxed">
              Share your thoughts with other customers. Feedback helps us refine our culinary edge.
            </p>

            {eligibleOrderId ? (
              <AddReview id={eligibleOrderId} />
            ) : (
              <button
                onClick={handleWriteReview}
                className="w-full py-2.5 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase italic text-white hover:bg-white/10 transition-all active:scale-95 shadow-xl"
              >
                Write a customer review
              </button>
            )}
          </div>
        </div>

        {/* Right Side: Detailed Reviews */}
        <div className="w-full lg:w-2/3">
          <ReviewList reviews={reviews} />
        </div>
      </div>
    </section>
  );
};

export default FoodReviewSection;
