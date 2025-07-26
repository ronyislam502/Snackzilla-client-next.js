import { baseApi } from "../../api/baseApi";

const foodApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allFoods: builder.query({
      query: () => ({
        url: "/foods",
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
  useAllFoodsQuery,
  useSignUpMutation,
  useChangePasswordMutation,
} = foodApi;
