import { TResponseRedux } from "@/types/global";
import { baseApi } from "../../api/baseApi";
import { TFood } from "@/types/food";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allBlogs: builder.query({
      query: ({ search, sort, page, limit, category, minPrice, maxPrice }) => {
        const params = new URLSearchParams();

        if (page) {
          params.append("page", page);
        }
        if (limit) {
          params.append("limit", limit);
        }

        return {
          url: "/blogs",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["blog"],
      transformResponse: (response: TResponseRedux<TFood[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    createBlog: builder.mutation({
      query: (blogInfo) => ({
        url: "/blogs/create-blog",
        method: "POST",
        body: blogInfo,
      }),
      invalidatesTags: ["blog"],
    }),
    updateBlog: builder.mutation({
      query: (args) => ({
        url: `/blogs/update/${args?.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["blog"],
    }),
    singleBlog: builder.query({
      query: (id) => ({
        url: `/blogs/blog/${id}`,
        method: "GET",
      }),
      providesTags: ["blog"],
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blogs/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blog"],
    }),
  }),
});

export const {
  useAllBlogsQuery,
  useCreateBlogMutation,
  useSingleBlogQuery,
  useDeleteBlogMutation,
  useUpdateBlogMutation,
} = blogApi;
