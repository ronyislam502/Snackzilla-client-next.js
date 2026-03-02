"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSocket } from "@/hooks/useSocket";
import { useAppSelector } from "@/redux/hooks";
import { TUser } from "@/redux/features/auth/authSlice";
import { useGetAllChatsQuery, useGetMessagesByChatIdQuery } from "@/redux/features/chat/chatApi";
import { SendIcon, UserIcon, ClockIcon, SearchIcon, MailIcon } from "@/components/shared/Icons";

const AdminChatManagement = () => {
    const user = useAppSelector((state) => state.auth.user) as TUser;
    const socket = useSocket("http://localhost:5000");
    const [selectedChat, setSelectedChat] = useState<any>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState("");
    const chatEndRef = useRef<HTMLDivElement>(null);

    const { data: allChats } = useGetAllChatsQuery({});
    const { data: initialMessages } = useGetMessagesByChatIdQuery(selectedChat?._id, { skip: !selectedChat });

    useEffect(() => {
        if (selectedChat) {
            socket.emit("join-chat", selectedChat._id);
        }
    }, [selectedChat, socket]);

    useEffect(() => {
        if (initialMessages?.data) {
            setMessages(initialMessages.data);
        }
    }, [initialMessages]);

    useEffect(() => {
        socket.on("receive-message", (message: any) => {
            if (message.chatId === selectedChat?._id) {
                setMessages((prev) => [...prev, message]);
            }
        });
        return () => socket.off("receive-message");
    }, [socket, selectedChat]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = () => {
        if (!input.trim() || !selectedChat) return;
        const messageData = {
            chatId: selectedChat._id,
            senderId: (user as any)?._id || (user as any)?.user,
            content: input.trim(),
        };
        socket.emit("send-message", messageData);
        setInput("");
    };

    return (
        <div className="h-[calc(100vh-140px)] flex gap-6 p-2">
            {/* Sidebar: Chat List */}
            <div className="w-80 flex flex-col gap-6">
                <div className="space-y-1 px-4">
                    <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic leading-none">
                        Support <span className="text-success">Hub.</span>
                    </h2>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 font-bold tracking-[0.2em] uppercase text-[8px] italic">Active Intelligence</span>
                        <div className="h-px w-4 bg-success/20"></div>
                        <span className="text-gray-600 font-bold text-[7px] uppercase tracking-widest italic opacity-60">
                            LIVE STREAM
                        </span>
                    </div>
                </div>

                <div className="flex-1 bg-[#0a0a0a]/60 backdrop-blur-3xl border border-white/5 rounded-[2rem] overflow-hidden flex flex-col shadow-2xl relative group">
                    <div className="absolute inset-0 bg-gradient-to-b from-success/[0.01] to-transparent pointer-events-none"></div>
                    
                    <div className="p-5 border-b border-white/5 relative z-10">
                        <div className="relative group/search">
                            <SearchIcon size={12} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within/search:text-success transition-colors" />
                            <input 
                                type="text" 
                                placeholder="IDENTIFY_TRANSMISSION..."
                                className="w-full bg-white/[0.02] border border-white/5 rounded-xl py-3 pl-10 pr-4 text-[10px] font-black text-white outline-none focus:border-success/20 transition-all italic placeholder:text-gray-700"
                            />
                        </div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-3 space-y-1.5 scrollbar-hide relative z-10">
                        {allChats?.data?.map((chat: any) => (
                            <button 
                                key={chat._id}
                                onClick={() => setSelectedChat(chat)}
                                className={`w-full p-4 rounded-2xl text-left transition-all border group/item ${
                                    selectedChat?._id === chat._id 
                                    ? 'bg-success text-black border-success shadow-lg scale-[1.02]' 
                                    : 'bg-white/[0.01] text-white border-white/5 hover:bg-white/[0.03] hover:border-white/10'
                                }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                                        selectedChat?._id === chat._id ? 'bg-black/10 border-black/20' : 'bg-white/5 border-white/5 group-hover/item:border-success/20'
                                    }`}>
                                        <UserIcon size={18} className={selectedChat?._id === chat._id ? 'text-black' : 'text-gray-600 group-hover/item:text-success'} />
                                    </div>
                                    <div className="flex-1 overflow-hidden">
                                        <p className="font-black uppercase tracking-tight truncate text-[12px] italic">{chat?.user?.name || chat?.userId?.name || 'Customer'}</p>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            <div className={`w-1 h-1 rounded-full animate-pulse ${selectedChat?._id === chat._id ? 'bg-black' : 'bg-success'}`} />
                                            <p className={`text-[8px] font-bold uppercase tracking-widest italic truncate ${
                                                selectedChat?._id === chat._id ? 'text-black/60' : 'text-gray-500'
                                            }`}>
                                                Transmitting Signal
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col bg-[#0a0a0a]/60 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl relative group/main">
                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-success/[0.02] to-transparent pointer-events-none"></div>
                
                <AnimatePresence mode="wait">
                    {selectedChat ? (
                        <motion.div 
                            key={selectedChat._id}
                            initial={{ opacity: 0, scale: 0.99 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.99 }}
                            className="flex flex-col h-full relative z-10"
                        >
                            {/* Header */}
                            <div className="p-6 border-b border-white/5 bg-white/[0.01] flex items-center justify-between backdrop-blur-3xl">
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 rounded-[1.25rem] bg-success/10 flex items-center justify-center text-success border border-success/20 shadow-[0_0_30px_rgba(34,197,94,0.1)] relative group/avatar">
                                        <div className="absolute inset-0 bg-success/20 blur-xl opacity-0 group-hover/avatar:opacity-100 transition-opacity"></div>
                                        <UserIcon size={22} className="relative z-10" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-white uppercase tracking-tighter italic leading-none group-hover/main:text-success transition-colors">
                                            {selectedChat?.user?.name || selectedChat?.userId?.name || 'Customer'}
                                        </h3>
                                        <div className="flex items-center gap-3 mt-1.5">
                                            <div className="flex items-center gap-1.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse shadow-[0_0_8px_rgba(34,197,94,1)]"></span>
                                                <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest italic">Live Discussion Active</span>
                                            </div>
                                            <div className="h-px w-4 bg-white/10"></div>
                                            <div className="text-[8px] font-black text-gray-600 uppercase tracking-widest italic flex items-center gap-1.5">
                                                <MailIcon size={10} className="text-success/50" />
                                                {selectedChat?.user?.email || selectedChat?.userId?.email}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
                                {messages.map((msg, idx) => {
                                    const isMe = msg.senderId === ((user as any)?._id || (user as any)?.user);
                                    return (
                                        <motion.div 
                                            key={msg._id || idx}
                                            initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div className={`max-w-[75%] space-y-2`}>
                                                <div className={`p-5 px-6 rounded-3xl shadow-2xl relative group/msg ${
                                                    isMe 
                                                    ? 'bg-success text-black rounded-tr-sm shadow-success/10' 
                                                    : 'bg-white/[0.03] text-white border border-white/5 rounded-tl-sm backdrop-blur-xl'
                                                }`}>
                                                    <p className="font-bold leading-relaxed text-[13px] italic">{msg.content}</p>
                                                    <div className={`absolute top-2 ${isMe ? '-right-1' : '-left-1'} w-2 h-2 rotate-45 ${isMe ? 'bg-success' : 'bg-white/[0.03] border-l border-t border-white/5'}`}></div>
                                                </div>
                                                <div className={`flex items-center gap-2 px-1 ${isMe ? 'justify-end' : 'justify-start'}`}>
                                                    <ClockIcon size={9} className="text-gray-700" />
                                                    <span className="text-[8px] font-black text-gray-700 uppercase tracking-tighter italic">
                                                        {new Date(msg.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                                <div ref={chatEndRef} />
                            </div>

                            {/* Input */}
                            <div className="p-8 bg-white/[0.01] border-t border-white/5">
                                <div className="relative group/input">
                                    <div className="absolute inset-0 bg-success/5 blur-2xl opacity-0 group-focus-within/input:opacity-100 transition-opacity pointer-events-none"></div>
                                    <input 
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                        placeholder="FORMULATE_ENCRYPTED_RESPONSE..."
                                        className="w-full bg-white/[0.03] border border-white/5 rounded-[1.5rem] py-5 pl-8 pr-24 text-[12px] text-white font-black placeholder:text-gray-700 outline-none focus:border-success/30 focus:bg-white/[0.05] transition-all shadow-inner italic relative z-10"
                                    />
                                    <button 
                                        onClick={handleSend}
                                        disabled={!input.trim()}
                                        className="absolute right-2.5 top-1/2 -translate-y-1/2 p-4 bg-success text-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl disabled:opacity-30 disabled:grayscale z-10 group-hover/input:shadow-success/20"
                                    >
                                        <SendIcon size={18} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center p-20 space-y-8">
                            <motion.div 
                                initial={{ rotate: -10, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                className="w-24 h-24 bg-white/[0.02] rounded-[2rem] flex items-center justify-center text-gray-800 border border-white/5 shadow-inner relative group/empty"
                            >
                                <div className="absolute inset-0 bg-success/10 blur-3xl opacity-0 group-hover/empty:opacity-100 transition-opacity"></div>
                                <SendIcon size={40} className="opacity-20 relative z-10" />
                            </motion.div>
                            <div className="text-center space-y-2">
                                <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic leading-none">Select <span className="text-success">Node.</span></h3>
                                <p className="text-gray-700 font-bold uppercase tracking-[0.4em] text-[10px] italic opacity-60">Awaiting user synchronization</p>
                            </div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default AdminChatManagement;
