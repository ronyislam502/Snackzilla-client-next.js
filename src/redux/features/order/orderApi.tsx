import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allOrders: builder.query({
      query: () => ({
        url: "/orders",
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    createOrder: builder.mutation({
      query: (categoryInfo) => ({
        url: "/orders/create-order",
        method: "POST",
        body: categoryInfo,
      }),
    }),
  }),
});

export const { useAllOrdersQuery, useCreateOrderMutation } = orderApi;
