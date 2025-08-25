import { TResponseRedux } from "@/types/global";
import { baseApi } from "../../api/baseApi";
import { TFood } from "@/types/food";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allReviews: builder.query({
      query: ({ search, sort, page, limit, category, minPrice, maxPrice }) => {
        const params = new URLSearchParams();

        if (search) {
          params.append("searchTerm", search);
        }
        if (category) {
          params.append("category", category);
        }
        if (minPrice) {
          params.append("minPrice", String(minPrice));
        }
        if (maxPrice) {
          params.append("maxPrice", String(maxPrice));
        }
        if (sort) {
          params.append("sort", sort);
        }
        if (page) {
          params.append("page", page);
        }
        if (limit) {
          params.append("limit", limit);
        }

        return {
          url: "/reviews",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["review"],
      transformResponse: (response: TResponseRedux<TFood[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    createReview: builder.mutation({
      query: (reviewInfo) => ({
        url: "/reviews/create-review",
        method: "POST",
        body: reviewInfo,
      }),
      invalidatesTags: ["review"],
    }),
    updateReview: builder.mutation({
      query: (args) => ({
        url: `/reviews/update/${args?.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["review"],
    }),
  }),
});

export const {
  useAllReviewsQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
} = reviewApi;
