import {HomeCategoryResponse} from "@/api/home-category/types";
import {$host} from "@/api";

export const getHomeCategories = async (): Promise<HomeCategoryResponse[]> => {
	const {data} = await $host.get('/home-category');
	return data;
}