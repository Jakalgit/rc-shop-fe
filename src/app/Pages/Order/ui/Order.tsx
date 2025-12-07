import styles from "./Order.module.css";
import MotionMain from "@/components/MotionMain";
import {Container} from "react-bootstrap";
import {getOrderByNumber} from "@/api/order/api";
import {getTranslations} from "next-intl/server";
import {formatPhoneNumber, formatPrice} from "@/functions/format";
import {DeliveryMethodEnum} from "@/api/order/types";
import {OrderItem, OrderItemAccessEnum} from "@/widgets/OrderItem";
import {CdekDeliveryEnum} from "@/api/order/cdek.types";


export async function Order(
	{params}: { params: Promise<{ orderNumber: string }> }
) {

	const [t, tEnums] = await Promise.all([
		getTranslations("OrderPage"),
		getTranslations("enums")
	]);

	const orderNumber = (await params).orderNumber || "";
	const responseOrder = await getOrderByNumber({orderNumber});

	const cdekDeliveryTypes: Record<CdekDeliveryEnum, string> = {
		[CdekDeliveryEnum.DOOR]: t('doorDelivery'),
		[CdekDeliveryEnum.OFFICE]: t('officeDelivery'),
	}

	const cdekMetadata = responseOrder.cdekMetadata;
	let addressValue: string = responseOrder.address;

	if (responseOrder.deliveryMethod === DeliveryMethodEnum.DELIVERY_COUNTRY && cdekMetadata) {
		if (cdekMetadata.delivery === CdekDeliveryEnum.DOOR) {
			addressValue = cdekMetadata.address.formatted;
		} else if (cdekMetadata.delivery === CdekDeliveryEnum.OFFICE) {
			addressValue = `${cdekMetadata.address.name} (${cdekMetadata.address.address})`
		}
		addressValue += ` | ${cdekDeliveryTypes[cdekMetadata.delivery]}`;
	}

	const fields = [
		{
			name: t("fields.name"),
			value: responseOrder.guestName,
		},
		{
			name: t("fields.paymentMethod"),
			value: tEnums(`paymentMethodEnum.${responseOrder.paymentMethod}.title`),
		},
		{
			name: t("fields.status"),
			value: tEnums(`orderStatusEnum.${responseOrder.status}`),
		},
		{
			name: t("fields.phone"),
			value: formatPhoneNumber(responseOrder.guestPhone),
		},
		{
			name: "E-Mail",
			value: responseOrder.guestEmail,
		},
		{
			name: t("fields.deliveryMethod"),
			value: tEnums(`deliveryMethodEnum.${responseOrder.deliveryMethod}`),
		},
		{
			name: t("fields.deliveryStatus"),
			value: responseOrder.deliveryStatus ? tEnums(`deliveryStatusEnum.${responseOrder.deliveryStatus}`) : "",
			hide: !responseOrder.deliveryStatus || responseOrder.deliveryMethod === DeliveryMethodEnum.SELF_PICKUP
		},
		{
			name: t("fields.address"),
			value: addressValue,
			hide: responseOrder.deliveryMethod === DeliveryMethodEnum.SELF_PICKUP,
		}
	]

	return (
		<MotionMain>
			<section>
				<Container>
					<h1 className="headText">Заказ № {orderNumber}</h1>
					<div className={`flex ${styles.infoWrapper}`}>
						<div className={styles.infoGrid}>
							{fields.map((field, index) => {
								if (!field.hide) {
									return (
										<div
											className={`flex flex-col ${styles.fieldBlock}`}
											key={index}
										>
											<h3>{field.name}</h3>
											<p>{field.value}</p>
										</div>
									)
								}
							})}
						</div>
						<p className={`${styles.price} text-nowrap`}>
							{t("fields.price")}:<br/>
							<span className="montserrat">{formatPrice(responseOrder.subtotal, 2)}</span>
						</p>
					</div>
				</Container>
			</section>
			{responseOrder.systemComment && (
				<section className={styles.orderBlockSection}>
					<Container>
						<div className={`flex flex-col ${styles.orderBlock}`}>
							<h3 className={styles.orderPageH3}>{t("systemNotificationTitle")}</h3>
							<p>
								{responseOrder.systemComment}
							</p>
						</div>
					</Container>
				</section>
			)}
			<section className={styles.orderBlockSection}>
				<Container>
					<h3
						style={{marginBottom: 0}}
						className={styles.orderPageH3}
					>
						{t("orderItemsTitle")}
					</h3>
					<ul
						className={styles.orderItemsUl}
						style={{listStyleType: 'none', padding: 0}}
					>
						{responseOrder.items.map((item, index) =>
							<OrderItem
								key={index}
								itemData={{
									count: item.quantity,
									...item
								}}
								itemType={OrderItemAccessEnum.READONLY}
							/>
						)}
					</ul>
				</Container>
			</section>
		</MotionMain>
	)
}