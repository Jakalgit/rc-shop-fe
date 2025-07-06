import {$host} from "@/api";

export const createRequest = async ({name, phone, text}: {name: string; phone: string, text?: string}) => {
	const {data} = await $host.post('/user-request', {name, phone, text});
	return data;
}