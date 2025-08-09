import { TResponseRedux } from "@/types/global";
import { baseApi } from "../../api/baseApi";
import { TFood } from "@/types/food";

const foodApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allFoods: builder.query({
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
          url: "/foods",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["food"],
      transformResponse: (response: TResponseRedux<TFood[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    createFood: builder.mutation({
      query: (foodInfo) => ({
        url: "/foods/create-food",
        method: "POST",
        body: foodInfo,
      }),
      invalidatesTags: ["food"],
    }),
    updateFood: builder.mutation({
      query: (args) => ({
        url: `/foods/update/${args?.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["food"],
    }),
    singleFood: builder.query({
      query: (args) => ({
        url: `/foods/${args?.id}`,
        method: "GET",
      }),
      providesTags: ["food"],
    }),
    deleteFood: builder.mutation({
      query: (id) => ({
        url: `/foods/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["food"],
    }),
    foodsByCategory: builder.query({
      query: (args) => ({
        url: `/foods/category-foods/${args?.id}`,
        method: "GET",
      }),
      providesTags: ["food"],
    }),
  }),
});

export const {
  useAllFoodsQuery,
  useCreateFoodMutation,
  useSingleFoodQuery,
  useDeleteFoodMutation,
  useUpdateFoodMutation,
  useFoodsByCategoryQuery,
} = foodApi;
