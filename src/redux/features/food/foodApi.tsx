import { baseApi } from "../../api/baseApi";

const foodApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allFoods: builder.query({
      query: () => ({
        url: "/foods",
        method: "GET",
      }),
    }),
    createFood: builder.mutation({
      query: (foodInfo) => ({
        url: "/foods/create-food",
        method: "POST",
        body: foodInfo,
      }),
    }),
    updateFood: builder.mutation({
      query: (args) => ({
        url: `/foods/update/${args?.id}`,
        method: "PATCH",
        body: args.data,
      }),
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
