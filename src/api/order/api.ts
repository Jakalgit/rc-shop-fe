import {$host} from "@/api";
import {DeliveryMethodEnum, OrderResponse, PaymentMethodEnum} from "@/api/order/types";

export const createOrder = async (
	{name, surname, patronymic, phone, email, deliveryMethod, paymentMethod, address, comment, items, token}:
	{
		name: string,
		surname: string,
		patronymic: string,
		phone: string,
		email: string,
		deliveryMethod: DeliveryMethodEnum,
		paymentMethod: PaymentMethodEnum,
		address?: string,
		comment?: string,
		items: {article: string, qty: number}[],
		token: string,
	},
): Promise<void> => {
	const {data} = await $host.post(
		'/order',
		{name, surname, patronymic, phone, email, deliveryMethod, paymentMethod, address, comment, items},
		{headers: {Authorization: `Bearer ${token}`}}
	);
	return data;
}

export const getOrderByNumber = async (
	{orderNumber}: {orderNumber: string}
): Promise<OrderResponse> => {
	const {data} = await $host.get(`/order/by-number/${orderNumber}`);
	return data;
}

export const getOrdersByProfileId = async (
	{token, page, limit}: {token: string, page: number, limit: number}
): Promise<{totalPages: number, records: OrderResponse[]}> => {
	const {data} = await $host.get(`/order/by-profile?page=${page}&limit=${limit}`, {headers: {Authorization: `Bearer ${token}`}});
	return data;
}