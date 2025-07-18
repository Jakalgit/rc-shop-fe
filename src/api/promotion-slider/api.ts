import {$host} from "@/api";
import {SlideResponse} from "@/api/promotion-slider/types";

export const getSlides = async (): Promise<SlideResponse[]> => {
	const {data} = await $host.get('/promotion-slider');
	return data;
}