import { baseApi } from "../../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allCategories: builder.query({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),
    }),
    signUp: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/create-user",
        method: "POST",
        body: userInfo,
      }),
    }),
    changePassword: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/change-password",
        method: "POST",
        body: userInfo,
      }),
    }),
  }),
});

export const {
  useAllCategoriesQuery,
  useSignUpMutation,
  useChangePasswordMutation,
} = categoryApi;
