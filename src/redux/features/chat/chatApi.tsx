import { baseApi } from "../../api/baseApi";

const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrCreateChat: builder.mutation({
      query: (data) => ({
        url: "/chat/get-chat",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["chat" as any],
    }),
    sendMessage: builder.mutation({
      query: (data) => ({
        url: "/chat/send-message",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["chat" as any],
    }),
    getAllChats: builder.query({
      query: () => ({
        url: "/chat/all-chats",
        method: "GET",
      }),
      providesTags: ["chat" as any],
    }),
    getMessagesByChatId: builder.query({
      query: (chatId) => ({
        url: `/chat/messages/${chatId}`,
        method: "GET",
      }),
      providesTags: ["chat" as any],
    }),
  }),
});

export const {
  useGetOrCreateChatMutation,
  useSendMessageMutation,
  useGetAllChatsQuery,
  useGetMessagesByChatIdQuery,
} = chatApi;
