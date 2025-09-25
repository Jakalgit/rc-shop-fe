import {$host} from "@/api";
import {ContactResponse} from "@/api/contacts/types";

export const getContacts = async (): Promise<ContactResponse> => {
	const {data} = await $host.get('/contact');
	return data;
}