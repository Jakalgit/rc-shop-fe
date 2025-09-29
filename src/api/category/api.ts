import {$host} from "@/api";
import {CategoryBlockResponse} from "./types";

export const getCategories = async (): Promise<CategoryBlockResponse[]> => {
	const {data} = await $host.get('/category-block/usr');
	return data;
}