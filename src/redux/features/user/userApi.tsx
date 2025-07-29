import { baseApi } from "../../api/baseApi";

const userApi = baseApi?.injectEndpoints({
  endpoints: (builder) => ({
    allUsers: builder.query({
      query: ({ page, limit }) => {
        const params = new URLSearchParams();

        // if (search) {
        //   params.append("searchTerm", search);
        // }
        // if (role) {
        //   params.append("role", role);
        // }
        if (page) {
          params.append("page", page);
        }
        if (limit) {
          params.append("limit", limit);
        }

        return {
          url: "/users",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["user"],
    }),
    getUserByEmail: builder.query({
      query: (email) => ({
        url: `/users/user/${email}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    updateUser: builder.mutation({
      query: (args) => ({
        url: `/users/update/${args?.id}`,
        method: "PATCH",
        body: args?.data,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useAllUsersQuery,
  useGetUserByEmailQuery,
  useUpdateUserMutation,
} = userApi;
