import Cookies from 'js-cookie';

export const COOKIE_NAME = 'cart';
const COOKIE_EXP_DAYS = 7;

export function saveCartToCookie(newItem: { article: string; qty: number }) {
	const cartStr = Cookies.get(COOKIE_NAME);
	let cart: { article: string; qty: number }[] = [];

	try {
		cart = cartStr ? JSON.parse(cartStr) : [];
	} catch (err) {
		console.error('Invalid cart cookie:', err);
	}

	const itemIndex = cart.findIndex(item => item.article === newItem.article);

	if (itemIndex !== -1) {
		// Перезаписываем существующий товар
		cart[itemIndex] = newItem;
	} else {
		// Добавляем новый товар
		cart.push(newItem);
	}

	Cookies.set(COOKIE_NAME, JSON.stringify(cart), {
		expires: COOKIE_EXP_DAYS,
		sameSite: 'Lax',
		secure: process.env.NODE_ENV === 'production',
	});
}

export function getCartFromCookie(): { article: string; qty: number }[] {
	const cookie = Cookies.get(COOKIE_NAME);
	if (!cookie) return [];
	try {
		return JSON.parse(cookie);
	} catch {
		return [];
	}
}

export function removeItemFromCartByArticle(article: string) {
	const cartStr = Cookies.get(COOKIE_NAME);
	if (!cartStr) return;

	let cart: { article: string; qty: number }[] = [];
	try {
		cart = JSON.parse(cartStr);
	} catch (err) {
		console.error('Invalid cart cookie:', err);
		return;
	}

	const filteredCart = cart.filter(item => item.article !== article);

	Cookies.set(COOKIE_NAME, JSON.stringify(filteredCart), {
		expires: COOKIE_EXP_DAYS,
		sameSite: 'Lax',
		secure: process.env.NODE_ENV === 'production',
	});
}

export function decreaseQty(article: string, amount = 1) {
	const cart = getCartFromCookie();

	const index = cart.findIndex(item => item.article === article);
	if (index === -1) return; // товара нет, ничего не делаем

	cart[index].qty = Math.max(1, cart[index].qty - amount);

	Cookies.set(COOKIE_NAME, JSON.stringify(cart), {
		expires: COOKIE_EXP_DAYS,
		sameSite: 'Lax',
		secure: process.env.NODE_ENV === 'production',
	});
}
