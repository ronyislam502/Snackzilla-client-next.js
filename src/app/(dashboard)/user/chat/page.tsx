"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSocket } from "@/hooks/useSocket";
import { useAppSelector } from "@/redux/hooks";
import { TUser } from "@/redux/features/auth/authSlice";
import { useGetOrCreateChatMutation, useGetMessagesByChatIdQuery } from "@/redux/features/chat/chatApi";
import { SendIcon, UserIcon, ClockIcon } from "@/components/shared/Icons";
import { TUserDetail } from "@/types/user";

const UserChatPage = () => {
    const user = useAppSelector((state) => state.auth.user) as TUser;
    const socket = useSocket("http://localhost:5000");
    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState("");
    const [chatId, setChatId] = useState<string | null>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const [getOrCreateChat] = useGetOrCreateChatMutation();
    const { data: initialMessages } = useGetMessagesByChatIdQuery(chatId, { skip: !chatId });

    useEffect(() => {
        if (!user?.user) return;

        const initChat = async () => {
            try {
                const res = await getOrCreateChat({ 
                    userId: user.user
                }).unwrap();
                if (res?.success) {
                    setChatId(res?.data._id);
                    socket.emit("join-chat", res?.data._id);
                }
            } catch (error) {
                console.error("Failed to init chat:", error);
            }
        };
        initChat();
    }, [getOrCreateChat, socket, user?.user]);

    useEffect(() => {
        if (initialMessages?.data) {
            setMessages(initialMessages?.data);
        }
    }, [initialMessages]);

    useEffect(() => {
        socket.on("receive-message", (message: any) => {
            setMessages((prev) => [...prev, message]);
        });
        return () => socket.off("receive-message");
    }, [socket]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = () => {
        if (!input.trim() || !chatId) return;
        const messageData = {
            chatId,
            senderId: (user as any)?._id || (user as any)?.user,
            content: input.trim(),
        };
        socket.emit("send-message", messageData);
        setInput("");
    };

    return (
    <div className="p-4 md:p-8 space-y-8 lg:max-w-7xl mx-auto h-[calc(100vh-120px)] flex flex-col">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-[#0a0a0a]/60 backdrop-blur-3xl p-6 md:p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-success/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-success/10 transition-colors duration-700"></div>
          
          <div className="space-y-1 relative z-10">
              <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter italic leading-none">Diplomatic <span className="text-success">Comms.</span></h2>
              <div className="flex items-center gap-3">
                  <span className="text-gray-500 font-bold text-[10px] tracking-[0.2em] uppercase italic">Secure Support Channel</span>
                  <div className="h-px w-8 bg-success/20"></div>
                  <span className="bg-success/10 text-success border border-success/20 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider italic">
                      Direct Link Active
                  </span>
              </div>
          </div>
      </div>

      <div className="flex-1 overflow-hidden bg-[#0a0a0a]/40 backdrop-blur-3xl border border-white/5 rounded-3xl shadow-2xl flex flex-col relative group">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-success/10 to-transparent"></div>
          
          {/* Chat Header */}
          <div className="px-8 py-4 border-b border-white/5 bg-white/[0.01] flex items-center justify-between backdrop-blur-xl">
              <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#0f0f0f] flex items-center justify-center text-success border border-white/5 shadow-inner group-hover:border-success/20 transition-all duration-500">
                      <UserIcon size={18} />
                  </div>
                  <div>
                      <p className="text-white font-black uppercase tracking-tight text-xs italic">Command Support</p>
                      <div className="flex items-center gap-1.5">
                          <span className={`w-1 h-1 rounded-full ${socket.isConnected ? 'bg-success animate-pulse' : 'bg-gray-600'}`}></span>
                          <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest italic">
                              {socket.isConnected ? 'Secure Connection established' : 'Offline Mode'}
                          </span>
                      </div>
                  </div>
              </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide bg-gradient-to-b from-transparent to-success/[0.01]">
              <AnimatePresence mode="popLayout">
                  {messages.map((msg, idx) => (
                      <motion.div 
                          key={msg._id || idx}
                          initial={{ opacity: 0, scale: 0.98, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          className={`flex ${(msg.sender?._id || msg.sender) === ((user as any)?._id || (user as any)?.user) ? 'justify-end' : 'justify-start'}`}
                      >
                          <div className={`max-w-[75%] space-y-1.5`}>
                              <div className={`p-4 px-6 rounded-2xl shadow-xl border ${
                                  (msg.sender?._id || msg.sender) === ((user as any)?._id || (user as any)?.user) 
                                  ? 'bg-success/90 text-black border-success/20 rounded-tr-sm' 
                                  : 'bg-white/[0.03] text-white border-white/5 rounded-tl-sm backdrop-blur-md'
                              }`}>
                                  <p className="font-bold leading-relaxed text-xs italic tracking-tight">{msg.content}</p>
                              </div>
                              <div className={`flex items-center gap-2 ${(msg.sender?._id || msg.sender) === ((user as any)?._id || (user as any)?.user) ? 'justify-end' : 'justify-start'} opacity-40 group-hover:opacity-100 transition-opacity`}>
                                  <ClockIcon size={8} className="text-gray-500" />
                                  <span className="text-[7px] font-black text-gray-500 uppercase tracking-[0.2em] italic">
                                      {new Date(msg.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </span>
                              </div>
                          </div>
                      </motion.div>
                  ))}
              </AnimatePresence>
              <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 bg-[#0a0a0a]/80 backdrop-blur-2xl border-t border-white/5">
              <div className="relative group/input flex items-center gap-4">
                  <div className="relative flex-1">
                      <input 
                          type="text"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                          placeholder="Transmit message to command center..."
                          className="w-full bg-white/[0.02] border border-white/5 rounded-2xl py-4 pl-6 pr-16 text-[11px] text-white font-bold placeholder:text-gray-600 outline-none focus:border-success/30 focus:bg-white/[0.04] transition-all italic tracking-tight"
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        <span className="text-[8px] font-black text-gray-700 uppercase tracking-widest pointer-events-none group-focus-within/input:opacity-0 transition-opacity">ENT_</span>
                      </div>
                  </div>
                  <button 
                      onClick={handleSend}
                      disabled={!input.trim()}
                      className="p-4 bg-success text-black rounded-xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-success/10 disabled:opacity-50 disabled:grayscale disabled:hover:scale-100 group/btn relative overflow-hidden"
                  >
                      <SendIcon size={16} />
                      <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-500" />
                  </button>
              </div>
          </div>
      </div>
    </div>
    );
};

export default UserChatPage;
