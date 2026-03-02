import { baseApi } from "../../api/baseApi";

const reservationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReservation: builder.mutation({
      query: (reservationData) => ({
        url: "/reservations/create-reservation",
        method: "POST",
        body: reservationData,
      }),
      invalidatesTags: ["reservation"],
    }),
    getAllReservations: builder.query({
      query: () => ({
        url: "/reservations",
        method: "GET",
      }),
      providesTags: ["reservation"],
    }),
    getMyReservations: builder.query({
      query: () => ({
        url: "/reservations/my-reservations",
        method: "GET",
      }),
      providesTags: ["reservation"],
    }),
    updateReservationStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/reservations/${id}`,
        method: "PATCH",
        body: { status },
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
  useGetAllReservationsQuery,
  useGetMyReservationsQuery,
  useUpdateReservationStatusMutation,
  useDeleteReservationMutation,
} = reservationApi;
