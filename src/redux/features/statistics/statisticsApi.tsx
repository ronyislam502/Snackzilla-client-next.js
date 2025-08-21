import { baseApi } from "../../api/baseApi";

const statisticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    adminStatistics: builder.query({
      query: () => ({
        url: "/dashboard/admin-stats",
        method: "GET",
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

export const { useAdminStatisticsQuery, useUserStatisticsQuery } =
  statisticsApi;
