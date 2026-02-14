import {$host} from "@/api";
import {ChatInfoResponse, Message} from "./types";

export const createChat = async (
	{clientId, name}: {clientId: string, name: string},
): Promise<void> => {
	const {data} = await $host.post(`/support-chat`, {clientId, name});
	return data;
}

export const sendChatMessage = async (
	{clientId, message}: {clientId: string, message: string},
): Promise<void> => {
	const {data} = await $host.post(`/support-chat/send`, {clientId, message});
	return data;
}

export const getChatInfo = async (
	{clientId}: {clientId: string}
): Promise<ChatInfoResponse> => {
	const {data} = await $host.get(`/support-chat/info/${clientId}`);
	return data;
}

export const getChatMessages = async (
	{clientId}: {clientId: string}
): Promise<Message[]> => {
	const {data} = await $host.get(`/support-chat/messages/${clientId}`);
	return data;
}