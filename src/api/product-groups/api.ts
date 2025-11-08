import {$host} from "..";
import {ProductGroupItemResponse} from "@/api/product-groups/types";

export const getProductGroupItems = async (
	productGroupId: number
): Promise<ProductGroupItemResponse[]> => {
	const {data} = await $host.get(`/product/items-product-group/${productGroupId}`);
	return data;
}