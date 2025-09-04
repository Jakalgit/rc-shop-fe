"use client";

import MotionMain from "@/components/MotionMain";
import styles from "@/styles/pages/Basket.module.css";
import Button from "@/components/buttons/Button";
import {Container} from "react-bootstrap";
import {formatPrice} from "@/functions/format";
import ShoppingCartIcon from "@/components/icons/ShoppingCartIcon";
import {useTranslations} from "next-intl";
import React, {useCallback, useEffect, useState} from "react";
import {AnimatePresence} from "framer-motion";
import {ProductResponse} from "@/api/products/types";
import {COOKIE_CART_NAME, getCartFromCookie, removeItemFromCartByArticle, saveCartToCookie} from "@/shared/lib/func/cookieCart";
import {getProductsForBasket} from "@/api/products/api";
import Cookies from 'js-cookie';
import {OrderItem} from "@/widgets/OrderItem";
import LoadingPage from "@/components/LoadingPage";
import Head from "next/head";
import {useRouter} from "next/navigation";
import {getBasketPrice} from "@/shared/lib/func/updateOrderPrice";

export default function BasketPage() {

	const t = useTranslations("BasketPage");
	const router = useRouter();

	const [loading, setLoading] = useState(true);

	const [basketProducts, setBasketProducts] = useState<ProductResponse[]>([]);

	// Полная стоимость продуктов
	const [fullPrice, setFullPrice] = useState<number>(0);

	// Удаляем продукт из корзины
	const removeItem = (article: string) => {
		// Удаляем товар из стейта
		setBasketProducts(prevState => prevState.filter((item) => item.article !== article));
		// Удаляем товар из куков
		removeItemFromCartByArticle(article);
	}

	// Обработчик нажатия кнопки "Оформить заказ"
	const handleClickCheckOutOrder = useCallback(() => {
		router.push("/new-order");
	}, [])

	// Обновляем цену корзины
	const updateCartPrice = useCallback(() => {
		setFullPrice(
			getBasketPrice(basketProducts)
		);
	}, [basketProducts]);

	useEffect(() => {
		// Получение данных
		async function getData() {
			try {
				const carts = getCartFromCookie();
				// Получаем данные для товаров в корзине
				const response = await getProductsForBasket(
					carts.map(el => ({article: el.article})),
					Cookies.get("act") || ""
				);

				// Удаляем куки с данными о корзине
				Cookies.remove(COOKIE_CART_NAME);

				// Обновляем куки согласно с данными, полученными с сервара
			  carts.forEach(el => {
					const item = response.find(r => r.article === el.article)
					if (item) {
						saveCartToCookie({
							article: item.article,
							qty: el.qty > item.count ? item.count : el.qty,
						});
					}
				});

				// Устанавливаем состояние
				setBasketProducts(response);

				setLoading(false);
			} catch (e: any) {
				alert(e?.response?.data?.message);
			}
		}

		getData();
	}, []);

	// При обновлении товаров в корзине - обновляем цену заказа
	useEffect(() => {
		updateCartPrice();
	}, [basketProducts]);

	// Если данные загружаются
	if (loading) {
		return <LoadingPage />;
	}

	// Если товаров в корзине нет
	if (basketProducts.length === 0) {
		return (
			<MotionMain>
				<section className="flex items-center justify-center h-full">
					<a style={{color: 'black'}} href={'/catalog'}>{t("itemsNotFound")}</a>
				</section>
			</MotionMain>
		)
	}

	return (
		<>
			<Head>
				<title>{t("title")}</title>
				<meta name="description" content={t("description")} />
			</Head>
			<MotionMain>
				<section>
					<Container>
						<div className={`flex items-center ${styles.head}`}>
							<h1>
								{t("headText")}
							</h1>
							<div className={`flex items-center ${styles.headRightPart}`}>
								<p>
									<span className="fw-bold">{t("toPay")}</span><br/>
									<span className="montserrat">{formatPrice(fullPrice, 2)}</span>
								</p>
								<Button
									title={t("buttonPlaceAnOrder.title")}
									aria-label={t("buttonPlaceAnOrder.ariaLabel")}
									onClick={handleClickCheckOutOrder}
								>
									{t("buttonPlaceAnOrder.title")}
									<ShoppingCartIcon/>
								</Button>
							</div>
						</div>
						<ul className={`flex flex-col ${styles.list}`}>
							<AnimatePresence>
								{basketProducts.map((item) =>
									<OrderItem
										key={item.article}
										itemData={{...item}}
										removeItem={(article: string) => removeItem(article)}
										updateCartPrice={updateCartPrice}
									/>
								)}
							</AnimatePresence>
						</ul>
					</Container>
				</section>
			</MotionMain>
		</>
	)
}