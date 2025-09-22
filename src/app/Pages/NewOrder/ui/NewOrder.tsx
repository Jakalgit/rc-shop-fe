"use client";

import React, {useCallback, useEffect, useState} from "react";
import MotionMain from "@/components/MotionMain";
import {useTranslations} from "next-intl";
import {Container} from "react-bootstrap";
import Button, {ButtonFillEnum} from "@/components/buttons/Button";
import InfoIcon from "@/components/icons/InfoIcon";
import {VariantSelector} from "@/widgets/VariantSelector/ui/VariantSelector";
import styles from "./NewOrder.module.css";
import classNames from "classnames";
import {CART_KEY, getCartFromLocalStorage, saveCartToLocalStorage} from "@/shared/lib/func/localStorageCart";
import {getProductsForBasket} from "@/api/products/api";
import Cookies from "js-cookie";
import {ProductResponse} from "@/api/products/types";
import LoadingPage from "@/components/LoadingPage";
import {ProductListPopup} from "@/app/Pages/NewOrder/widgets/ProductsListPopup/ui/ProductListPopup";
import {createOrder} from "@/api/order/api";
import {DeliveryMethodEnum, PaymentMethodEnum} from "@/api/order/types";
import {formatPrice} from "@/functions/format";
import {getBasketPrice} from "@/shared/lib/func/updateOrderPrice";
import {useRouter} from "next/navigation";
import {RoutesEnum} from "@/shared";
import Textarea from "@/components/Textarea";
import Input from "@/components/Input";

export const NewOrder: React.FC = () => {

	const t = useTranslations("NewOrderPage");
	const tEnums = useTranslations("enums");
	const router = useRouter();

	const [loading, setLoading] = React.useState<boolean>(false);
	const [loadingButton, setLoadingButton] = React.useState<boolean>(false);

	const [name, setName] = React.useState<string>("");
	const [surname, setSurname] = React.useState<string>("");
	const [patronymic, setPatronymic] = React.useState<string>("");

	const [phone, setPhone] = React.useState<string>("");
	const [email, setEmail] = React.useState<string>("");

	const [address, setAddress] = React.useState<string>("");
	const [comment, setComment] = React.useState<string>("");

	const [deliveryMethod, setDeliveryMethod] = React.useState<DeliveryMethodEnum>(DeliveryMethodEnum.SELF_PICKUP);
	const [paymentMethod, setPaymentMethod] = React.useState<PaymentMethodEnum>(PaymentMethodEnum.CASH_ON_DELIVERY);

	const [basketProducts, setBasketProducts] = React.useState<ProductResponse[]>([]);
	const [isOpenProductList, setIsOpenProductList] = React.useState<boolean>(false);
	const [policyChecked, setPolicyChecked] = React.useState<boolean>(false);

	// Полная стоимость продуктов
	const [fullPrice, setFullPrice] = useState<number>(0);

	// Обработчик нажатия кнопки "Посмотреть товары"
	const handleClickOpenProductList = useCallback(() => {
		setIsOpenProductList(true);
	}, []);

	// Обработчик нажатия кнопки "Отправить заказ"
	const handleClickSendOrder = useCallback(async () => {
		if (name.length < 1 || name.length > 30) {
			alert(t.rich("errors.name", {min: 1, max: 30}));
			return;
		}

		if (surname.length < 1 || surname.length > 30) {
			alert(t.rich("errors.surname", {min: 1, max: 30}));
			return;
		}

		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			alert(t("errors.email"));
			return;
		}

		if (!/^(\+7)\d{10}$/.test(phone)) {
			alert(t("errors.phone"));
			return;
		}

		if (deliveryMethod !== DeliveryMethodEnum.SELF_PICKUP && paymentMethod === PaymentMethodEnum.CASH_ON_DELIVERY) {
			alert(t("errors.selectDeliveryMethod"));
			return;
		}

		if (deliveryMethod !== DeliveryMethodEnum.SELF_PICKUP && address.length < 5) {
			alert(t("errors.address"));
			return;
		}

		try {
			setLoadingButton(true);

			const cart = getCartFromLocalStorage();
			const act = Cookies.get("act") || "";

			await createOrder({
				name, surname, patronymic, phone, email, deliveryMethod,
				paymentMethod, address, comment, items: cart, token: act
			});

			alert(t("success"));
			Cookies.remove(CART_KEY);
			router.push(RoutesEnum.CATALOG);
		} catch (e: any) {
			alert(e?.response?.data?.message);
		}
		setLoadingButton(false);
	}, [name, surname, patronymic, phone, email, address, comment, deliveryMethod, paymentMethod]);

	type InputBlocksType = {
		placeholder: string;
		value: string;
		onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
		required?: boolean;
		hide?: boolean;
		type?: string;
	}[][];

	const inputBlocks: InputBlocksType = [
		[
			{
				placeholder: t("inputPlaceholders.surnamePlaceholder"),
				value: surname,
				onChange: (e: React.ChangeEvent<HTMLInputElement>) => setSurname(e.target.value),
				required: true,
			},
			{
				placeholder: t("inputPlaceholders.namePlaceholder"),
				value: name,
				onChange: (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value),
				required: true,
			},
			{
				placeholder: t("inputPlaceholders.patronymicPlaceholder"),
				value: patronymic,
				onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPatronymic(e.target.value),
			},
		],
		[
			{
				placeholder: t("inputPlaceholders.phonePlaceholder"),
				value: phone,
				onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value),
				required: true,
				type: "tel",
			},
			{
				placeholder: t("inputPlaceholders.emailPlaceholder"),
				value: email,
				onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
				required: true,
				type: "email",
			},
		],
		[
			{
				placeholder: t("inputPlaceholders.addressPlaceholder"),
				value: address,
				onChange: (e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value),
				hide: deliveryMethod === DeliveryMethodEnum.SELF_PICKUP,
				required: true,
			},
		]
	];

	const variantSelectors = [
		{
			title: t("paymentMethod.title"),
			selectedVariantId: paymentMethod,
			setSelectedVariant: setPaymentMethod,
			variants: [
				{
					id: PaymentMethodEnum.CASH_ON_DELIVERY,
					title: tEnums(`paymentMethodEnum.${PaymentMethodEnum.CASH_ON_DELIVERY}.title`),
					clue: tEnums(`paymentMethodEnum.${PaymentMethodEnum.CASH_ON_DELIVERY}.clue`),
					hide: deliveryMethod !== DeliveryMethodEnum.SELF_PICKUP,
				},
				{
					id: PaymentMethodEnum.SBP,
					title: tEnums(`paymentMethodEnum.${PaymentMethodEnum.SBP}.title`),
					clue: tEnums(`paymentMethodEnum.${PaymentMethodEnum.SBP}.clue`),
				},
				{
					id: PaymentMethodEnum.BANK_TRANSFER,
					title: tEnums(`paymentMethodEnum.${PaymentMethodEnum.BANK_TRANSFER}.title`),
					clue: tEnums(`paymentMethodEnum.${PaymentMethodEnum.BANK_TRANSFER}.clue`),
				},
			]
		},
		{
			title: t("deliveryMethod.title"),
			selectedVariantId: deliveryMethod,
			setSelectedVariant: setDeliveryMethod,
			variants: [
				{ id: DeliveryMethodEnum.SELF_PICKUP, title: tEnums(`deliveryMethodEnum.${DeliveryMethodEnum.SELF_PICKUP}`) },
				{ id: DeliveryMethodEnum.DELIVERY_COUNTRY, title: tEnums(`deliveryMethodEnum.${DeliveryMethodEnum.DELIVERY_COUNTRY}`) },
				{ id: DeliveryMethodEnum.DELIVERY_MOSCOW, title: tEnums(`deliveryMethodEnum.${DeliveryMethodEnum.DELIVERY_MOSCOW}`) },
			]
		}
	];

	// Получение данных корзины
	async function getData() {
		try {
			// Получаем данные и куки
			const cart = getCartFromLocalStorage();
			// Получаем актуальные данные о товарах с сервера
			const response = await getProductsForBasket(
				cart.map(el => ({article: el.article})),
				Cookies.get("act") || ""
			);

			// Удаляем куки с данными о корзине
			localStorage.removeItem(CART_KEY);

			let productError = false;

			// Обновляем куки согласно с данными, полученными с сервера
			cart.forEach(el => {
				const item = response.find(r => r.article === el.article)
				if (item) {
					saveCartToLocalStorage({
						article: item.article,
						qty: el.qty > item.count ? item.count : el.qty,
					});
				}

				if (!item || el.qty > item.count) productError = true;
			});

			if (productError) {
				alert(t("errors.product"));
			}

			if (response.length === 0) {
				alert(t("errors.emptyBasket"));
				router.push(RoutesEnum.CATALOG)
			}

			// Устанавливаем состояние
			setBasketProducts(response);

			setLoading(false);
		} catch (e: any) {
			alert(e?.response?.data?.message);
		}
	}

	useEffect(() => {
		setFullPrice(
			getBasketPrice(basketProducts)
		);
	}, [basketProducts]);

	useEffect(() => {
		if (deliveryMethod !== DeliveryMethodEnum.SELF_PICKUP && paymentMethod === PaymentMethodEnum.CASH_ON_DELIVERY) {
			setPaymentMethod(PaymentMethodEnum.SBP);
		}
	}, [deliveryMethod]);

	useEffect(() => {
		getData();
	}, []);

	if (loading) {
		return <LoadingPage />
	}

	return (
		<>
			<title>{t("title")}</title>
			<meta name="description" content={t("description")}/>
			<ProductListPopup
				isOpen={isOpenProductList}
				onClose={() => setIsOpenProductList(false)}
				basketProducts={basketProducts}
			/>
			<MotionMain>
				<section>
					<Container>
						<h1 className="headText">
							{t("head")}
						</h1>
						<div className={`grid ${styles.blocksGrid}`}>
							<div className={`flex flex-col ${styles.inputBlocks}`}>
								{inputBlocks.map((inputs, i) => {
									const filteredInputs = inputs.filter(el => !el.hide);
									if (filteredInputs.length > 0) {
										return (
											<div
												key={i}
												className={`flex flex-col ${styles.inputBlock}`}
											>
												{filteredInputs.map((el, index) =>
													<Input
														key={index}
														inputAttrs={{
															placeholder: `${el.placeholder}${el.required ? "*" : ""}`,
															value: el.value,
															onChange: el.onChange,
															className: styles.input,
															type: el.type || "text",
														}}
														wrapperAttrs={{
															className: styles.inputWrapper
														}}
													/>
												)}
											</div>
										)
									}
								})}
								<div className={`flex flex-col ${classNames(styles.inputBlock, styles.textarea)}`}>
									<Textarea
										placeholder={t("inputPlaceholders.commentPlaceholder")}
										value={comment}
										onChange={(e) => setComment(e.target.value)}
										className={styles.input}
										rows={5}
									/>
								</div>
							</div>
							<div className={`flex flex-col ${styles.selectorBlocks}`}>
								<div className={`flex items-center justify-between ${styles.totalPriceBlock}`}>
									<p className="montserrat">
										<span className="geologica fw-bold">{t("totalPrice")}</span><br/>
										{formatPrice(fullPrice, 2)}
									</p>
									<Button
										title={t("buttonShowItems.title")}
										aria-label={t("buttonShowItems.ariaLabel")}
										className={`flex items-center ${styles.buttonShowItems}`}
										onClick={handleClickOpenProductList}
									>
										{t("buttonShowItems.title")}
										<InfoIcon/>
									</Button>
								</div>
								{variantSelectors.map((el, i) =>
									<VariantSelector
										key={i}
										title={el.title}
										variants={el.variants}
										selectedVariantId={el.selectedVariantId}
										setSelectedVariant={el.setSelectedVariant}
									/>
								)}
								<label className={`flex items-center ${styles.labelCheckbox}`}>
									<input
										type="checkbox"
										name="privacyPolicy"
										checked={policyChecked}
										onChange={(e) => setPolicyChecked(e.target.checked)}
										required
									/>
									Я согласен(а) с
									&nbsp;<a href="/privacy-policy" target="_blank" rel="noopener noreferrer">политикой
									конфиденциальности</a>
									&nbsp;и
									&nbsp;<a href="/user-agreement" target="_blank" rel="noopener noreferrer">пользовательским
									соглашением</a>
								</label>
								<Button
									title={t("buttonSendOrder.title")}
									aria-label={t("buttonSendOrder.ariaLabel")}
									fill={ButtonFillEnum.DARK}
									loading={loadingButton}
									onClick={handleClickSendOrder}
									clickable={policyChecked}
								>
									{t("buttonSendOrder.title")}
								</Button>
							</div>
						</div>
					</Container>
				</section>
			</MotionMain>
		</>
	)
}