import { baseApi } from "../../api/baseApi";

const statisticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    adminStatistics: builder.query({
      query: (filters) => ({
        url: "/dashboard/admin-stats",
        method: "GET",
        params: filters,
      }),
      providesTags: ["dashboard"],
    }),
    topSellingFoods: builder.query({
      query: (filter) => ({
        url: "/dashboard/top-foods",
        method: "GET",
        params: { filter },
      }),
      providesTags: ["dashboard"],
    }),
    userStatistics: builder.query({
      query: (email) => ({
        url: `/dashboard/user-stats/${email}`,
        method: "GET",
      }),
      providesTags: ["dashboard"],
    }),
  }),
});

export const {
  useAdminStatisticsQuery,
  useUserStatisticsQuery,
  useTopSellingFoodsQuery,
} = statisticsApi;
