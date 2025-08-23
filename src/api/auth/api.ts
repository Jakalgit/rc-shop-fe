import {$host} from "@/api";
import {ProfileAuthResponse} from "@/api/auth/types";

export const checkProfileAct = async (token: string): Promise<ProfileAuthResponse> => {
	const {data} = await $host.get('/auth/checkProfileAct', {headers: {Authorization: `Bearer ${token}`}});
	return data;
}