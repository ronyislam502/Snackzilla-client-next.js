import { TResponseRedux } from "@/types/global";
import { baseApi } from "../../api/baseApi";
import { TOrder } from "@/types/order";

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
    myOrders: builder.query({
      query: ({ user, page, limit }) => {
        const params = new URLSearchParams();

        if (page) {
          params.append("page", page);
        }
        if (limit) {
          params.append("limit", limit);
        }

        return {
          url: `/orders/my-orders/${user?.email}`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["order"],
      transformResponse: (response: TResponseRedux<TOrder[]>) => {
        return {
          data: response.data,
          meta: response?.meta,
        };
      },
    }),
  }),
});

export const { useAllOrdersQuery, useCreateOrderMutation, useMyOrdersQuery } =
  orderApi;
