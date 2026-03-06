import { baseApi } from "../../api/baseApi";

const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrCreateChat: builder.mutation({
      query: (data) => ({
        url: "/chats/get-chat",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["chat"],
    }),
    sendMessage: builder.mutation({
      query: (data) => ({
        url: "/chats/send-message",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["chat"],
    }),
    getAllChats: builder.query({
      query: () => ({
        url: "/chats/all-chats",
        method: "GET",
      }),
      providesTags: ["chat"],
    }),
    getMessagesByChatId: builder.query({
      query: (chatId) => ({
        url: `/chats/messages/${chatId}`,
        method: "GET",
      }),
      providesTags: ["chat"],
    }),
  }),
});

export const {
  useGetOrCreateChatMutation,
  useSendMessageMutation,
  useGetAllChatsQuery,
  useGetMessagesByChatIdQuery,
} = chatApi;
