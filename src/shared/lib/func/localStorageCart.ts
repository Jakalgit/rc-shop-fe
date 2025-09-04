
export const CART_KEY = 'cart';

export function saveCartToLocalStorage(newItem: { article: string; qty: number }) {
	let cart: { article: string; qty: number }[] = [];

	try {
		const stored = localStorage.getItem(CART_KEY);
		cart = stored ? JSON.parse(stored) : [];
	} catch (err) {
		console.error('Invalid cart in localStorage:', err);
	}

	const itemIndex = cart.findIndex(item => item.article === newItem.article);

	if (itemIndex !== -1) {
		// Перезаписываем существующий товар
		cart[itemIndex] = newItem;
	} else {
		// Добавляем новый товар
		cart.push(newItem);
	}

	localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function getCartFromLocalStorage(): { article: string; qty: number }[] {
	try {
		const stored = localStorage.getItem(CART_KEY);
		return stored ? JSON.parse(stored) : [];
	} catch {
		return [];
	}
}

export function removeItemFromCartByArticle(article: string) {
	let cart: { article: string; qty: number }[] = [];

	try {
		const stored = localStorage.getItem(CART_KEY);
		cart = stored ? JSON.parse(stored) : [];
	} catch (err) {
		console.error('Invalid cart in localStorage:', err);
		return;
	}

	const filteredCart = cart.filter(item => item.article !== article);
	localStorage.setItem(CART_KEY, JSON.stringify(filteredCart));
}

export function decreaseQty(article: string, amount = 1) {
	const cart = getCartFromLocalStorage();

	const index = cart.findIndex(item => item.article === article);
	if (index === -1) return;

	cart[index].qty = Math.max(1, cart[index].qty - amount);
	localStorage.setItem(CART_KEY, JSON.stringify(cart));
}
