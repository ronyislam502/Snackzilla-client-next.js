import { baseApi } from "../../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allCategories: builder.query({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),
      providesTags: ["category"],
    }),
    allFoodsByCategories: builder.query({
      query: (id) => ({
        url: `/categories/category-foods/${id}`,
        method: "GET",
      }),
      providesTags: ["category"],
    }),
    createCategory: builder.mutation({
      query: (categoryInfo) => ({
        url: "/categories/category-foods/:categoryId",
        method: "POST",
        body: categoryInfo,
      }),
    }),
  }),
});

export const {
  useAllCategoriesQuery,
  useCreateCategoryMutation,
  useAllFoodsByCategoriesQuery,
} = categoryApi;
