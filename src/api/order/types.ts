
export enum DeliveryMethodEnum {
	SELF_PICKUP = "self_pickup",
	DELIVERY_COUNTRY = "delivery_country",
	DELIVERY_MOSCOW = "delivery_moscow",
}

export enum PaymentMethodEnum {
	CASH_ON_DELIVERY = "cash_on_delivery",
	ONLINE = "online",
}

export enum DeliveryStatusEnum {
	PENDING = "pending",
	SHIPPED = "shipped",
	DELIVERED = "delivered",
}

export enum PaymentStatusEnum {
	PENDING = "pending",
	PAID = "paid",
	FAILED = "failed",
	REFUNDED = "refunded",
}

export enum OrderStatusEnum {
	PENDING = "pending",
	CONFIRMED = "confirmed",
	CANCELED = "canceled",
	COMPLETED = "completed",
}

export type OrderItem = {
	name: string,
	price: number,
	quantity: number,
	article: string,
	productId: string,
}

export type OrderResponse = {
	orderNumber: string;
	guestName: string;
	guestPhone: string;
	guestEmail: string;
	address: string;
	deliveryMethod: DeliveryMethodEnum;
	deliveryPrice: number;
	deliveredAt: Date;
	deliveryStatus: DeliveryStatusEnum;
	trackingNumber: string;
	paymentMethod: PaymentMethodEnum;
	subtotal: number;
	discount: number;
	paidAt: Date;
	paymentStatus: PaymentStatusEnum;
	comment: string;
	systemComment: string;
	createdAt: string;
	status: OrderStatusEnum;
	items: OrderItem[];
}