import {ProductResponse} from "@/api/products/types";
import {getCartFromLocalStorage} from "@/shared/lib/func/localStorageCart";

export function getBasketPrice(products: ProductResponse[]): number {
	const carts = getCartFromLocalStorage();

	return carts.reduce((acc, item) => {
		const product = products.find(el => el.article === item.article);
		return acc + item.qty * (product?.price || 0);
	}, 0);
}