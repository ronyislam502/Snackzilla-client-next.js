import { baseApi } from "../../api/baseApi";

const reservationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReservation: builder.mutation({
      query: (data) => ({
        url: "/reservations/create-reservation",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["reservation"],
    }),
    getMyReservations: builder.query({
      query: () => ({ url: "/reservations/my-reservations" }),
      providesTags: ["reservation"],
    }),
    getAllReservations: builder.query({
      query: () => ({ url: "/reservations" }),
      providesTags: ["reservation"],
    }),
    updateReservationStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/reservations/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["reservation"],
    }),
    deleteReservation: builder.mutation({
      query: (id) => ({
        url: `/reservations/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["reservation"],
    }),
  }),
});

export const {
  useCreateReservationMutation,
  useGetMyReservationsQuery,
  useGetAllReservationsQuery,
  useUpdateReservationStatusMutation,
  useDeleteReservationMutation,
} = reservationApi;
