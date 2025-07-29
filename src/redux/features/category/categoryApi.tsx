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
    createCategory: builder.mutation({
      query: (categoryInfo) => ({
        url: "/categories/create-category",
        method: "POST",
        body: categoryInfo,
      }),
    }),
  }),
});

export const { useAllCategoriesQuery } = categoryApi;
