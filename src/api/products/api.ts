import {$host} from "@/api";
import {GetProductPagination, ProductPaginationResponse, ProductResponse} from "@/api/products/types";

export const getProducts = async (
	params: GetProductPagination
): Promise<ProductPaginationResponse> => {

	const searchParams = new URLSearchParams();

	Object.entries(params).forEach(([key, value]) => {
		if (value === undefined || value === null) return;
		if (Array.isArray(value)) {
			value.forEach(v => searchParams.append(key, String(v)));
		} else {
			searchParams.append(key, String(value));
		}
	});

	const str = searchParams.toString();

	const {data} = await $host.get(
		`/product/catalog${str.length > 0 ? `?${str}` : ''}`,
	);
	return data;
}

export const getProductsForBasket = async (items: {article: string}[]): Promise<ProductResponse[]> => {
	const {data} = await $host.get(`/product/basket?cart=${items.map(el => el.article).join(',')}`);
	return data;
}