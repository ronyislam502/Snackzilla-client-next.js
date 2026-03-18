import { useEffect, useRef, useState, useMemo } from "react";
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
            setIsConnected(true);
        });

        socket.on("disconnect", () => {
            setIsConnected(false);
        });

        return () => {
            socket.disconnect();
        };
    }, [url]);

    const emit = (event: string, data?: unknown) => {
        socketRef.current?.emit(event, data);
    };

    const on = (event: string, callback: (...args: unknown[]) => void) => {
        socketRef.current?.on(event, callback);
    };

    const off = (event: string, callback?: (...args: unknown[]) => void) => {
        socketRef.current?.off(event, callback);
    };

    const result = useMemo(() => ({
        isConnected,
        emit,
        on,
        off,
        socket: socketRef.current
    }), [isConnected]);

    return result;
};
