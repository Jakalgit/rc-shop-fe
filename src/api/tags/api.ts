import {$host} from "@/api";
import {TagFilersResponse} from "@/api/tags/types";

export const getTagsForFilter = async (): Promise<TagFilersResponse> => {
	const {data} = await $host.get('/tag/user-filters');
	return data;
}