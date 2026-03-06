import { baseApi } from "../../api/baseApi";

const serviceReviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createServiceReview: builder.mutation({
      query: (reviewData) => ({
        url: "/service-reviews/create-service-review",
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: ["serviceReview"],
    }),
    getAllServiceReviews: builder.query({
      query: (query) => ({
        url: "/service-reviews",
        method: "GET",
        params: query,
      }),
      providesTags: ["serviceReview"],
    }),
  }),
});

export const {
  useCreateServiceReviewMutation,
  useGetAllServiceReviewsQuery,
} = serviceReviewApi;
