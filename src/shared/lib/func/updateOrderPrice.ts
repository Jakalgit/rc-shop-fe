import {ProductResponse} from "@/api/products/types";
import {getCartFromCookie} from "@/shared/lib/func/cookieCart";

export function getBasketPrice(products: ProductResponse[]): number {
	const carts = getCartFromCookie();

	return carts.reduce((acc, item) => {
		const product = products.find(el => el.article === item.article);
		return acc + item.qty * (product?.price || 0);
	}, 0);
}