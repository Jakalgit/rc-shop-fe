"use client";

import MotionMain from "@/components/MotionMain";
import styles from "@/styles/pages/Basket.module.css";
import Button from "@/components/buttons/Button";
import {Container} from "react-bootstrap";
import {formatPrice} from "@/functions/format";
import ShoppingCartIcon from "@/components/icons/ShoppingCartIcon";
import {useTranslations} from "next-intl";
import {useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {ProductResponse} from "@/api/products/types";
import {COOKIE_NAME, getCartFromCookie, saveCartToCookie} from "@/consts/cookieCart";
import {getProductsForBasket} from "@/api/products/api";
import Cookies from 'js-cookie';
import BasketItem from "@/components/basket/BasketItem";
import LoadingPage from "@/components/LoadingPage";

export default function BasketPage() {

	const t = useTranslations("BasketPage");

	const [loading, setLoading] = useState(true);

	const [basketProducts, setBasketProducts] = useState<ProductResponse[]>([]);

	// Полная стоимость продуктов
	const [fullPrice, setFullPrice] = useState<number>(0);

	// Удаляем продукт из корзины
	const removeItem = (article: string) => {
		setBasketProducts(prevState => prevState.filter((item) => item.article !== article));
		updateItemQty(basketProducts);
	}

	const updateItemQty = (products: ProductResponse[]) => {
		const carts = getCartFromCookie();

		const price = carts.reduce((acc, item) => {
			const product = products.find(el => el.article === item.article);
			return acc + item.qty * (product?.price || 0);
		}, 0);

		setFullPrice(price);
	}

	useEffect(() => {
		document.title = t("title");
	}, []);

	useEffect(() => {
		// Получение данных
		async function getData() {
			try {
				const carts = getCartFromCookie();
				// Получаем данные для товаров в корзине
				const response = await getProductsForBasket(carts.map(el => ({article: el.article})));

				// Удаляем куки с данными о корзине
				Cookies.remove(COOKIE_NAME);

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

				// Обновляем полную цену корзины
				updateItemQty(response);

				setLoading(false);
			} catch (e: any) {
				alert(e?.response?.data?.message);
			}
		}

		getData();
	}, [])

	// Если данные загружаются
	if (loading) {
		return <LoadingPage />;
	}

	// Если товаров в корзине нет
	if (basketProducts.length === 0) {
		return (
			<motion.section
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className="flex items-center justify-center"
			>
				<a style={{ color: 'black' }} href={'/catalog'}>{t("itemsNotFound")}</a>
			</motion.section>
		)
	}

	return (
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
							>
								{t("buttonPlaceAnOrder.title")}
								<ShoppingCartIcon/>
							</Button>
						</div>
					</div>
					<ul className={`flex flex-col ${styles.list}`}>
						<AnimatePresence>
							{basketProducts.map((item) =>
								<BasketItem
									key={item.article}
									item={item}
									removeItem={(article: string) => removeItem(article)}
									updateItemQty={() => updateItemQty(basketProducts)}
								/>
							)}
						</AnimatePresence>
					</ul>
				</Container>
			</section>
		</MotionMain>
	)
}