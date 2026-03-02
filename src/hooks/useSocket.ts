import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

export const useSocket = (url: string) => {
    const socketRef = useRef<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const socket = io(url, {
            withCredentials: true,
            transports: ["websocket"],
        });

        socketRef.current = socket;

        socket.on("connect", () => {
            console.log("Socket connected:", socket.id);
            setIsConnected(true);
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected");
            setIsConnected(false);
        });

        return () => {
            socket.disconnect();
        };
    }, [url]);

    const emit = (event: string, data: any) => {
        socketRef.current?.emit(event, data);
    };

    const on = (event: string, callback: (...args: any[]) => void) => {
        socketRef.current?.on(event, callback);
    };

    const off = (event: string, callback?: (...args: any[]) => void) => {
        socketRef.current?.off(event, callback);
    };

    return { isConnected, emit, on, off, socket: socketRef.current };
};
