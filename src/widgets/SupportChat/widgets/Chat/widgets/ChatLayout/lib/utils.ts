"use client";

import { io, Socket } from "socket.io-client";
import { useEffect, useRef } from "react";
import Cookies from "js-cookie";

export function useChatSocket() {
	const socketRef = useRef<Socket | null>(null);

	useEffect(() => {
		socketRef.current = io(`${process.env.NEXT_PUBLIC_BACKEND_URL}/ws/chat`, {
			transports: ["websocket"],
			auth: {
				clientId: Cookies.get("cc_id"),
			},
		});

		return () => {
			socketRef.current?.disconnect();
		};
	}, []);

	return socketRef;
}