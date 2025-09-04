"use client";

import styles from "./OrderItem.module.css";
import {useTranslations} from "next-intl";
import {getCartFromCookie, saveCartToCookie} from "@/shared/lib/func/cookieCart";
import React, {useEffect, useRef, useState} from "react";
import {motion} from "framer-motion";
import Button from "@/components/buttons/Button";
import CloseIcon from "@/components/icons/CloseIcon";
import Image from "next/image";
import ChevronRightIcon from "@/components/icons/ChevronRightIcon";
import {formatPrice} from "@/functions/format";
import {OrderItemAccessEnum} from "@/widgets/OrderItem";

interface IProps {
	itemData: {
		price: number;
		name: string;
		count: number;
		article: string;
		images?: {
			index: number;
			filename: string;
			previewId: number;
			imageId: number;
		}[];
	}
	removeItem?: (article: string) => void;
	updateCartPrice?: () => void;
	itemType?: OrderItemAccessEnum;
}

export function OrderItem({ itemData, removeItem, updateCartPrice, itemType = OrderItemAccessEnum.FULL_ACCESS }: IProps) {

	const t = useTranslations("orderItemComponent");
	const cart = getCartFromCookie().find(
		el => el.article === itemData.article
	);

	const [count, setCount] = useState(cart?.qty || 1);
	const hasMounted = useRef(false);

	useEffect(() => {
		hasMounted.current = true;
	}, []);

	const incrementItem = () => {
		if (count < 99 && count < itemData.count) {
			setCount(count + 1);
		}
	}

	const decrementItem = () => {
		if (count > 1) {
			setCount(count - 1);
		}
	}

	const deleteItem = () => {
		if (removeItem) {
			removeItem(itemData.article);
		}
	}

	useEffect(() => {
		if (updateCartPrice) {
			// Меняем данные корзины в куках
			saveCartToCookie({article: itemData.article, qty: count})
			// Вызываем функцию пересчёта цены заказа
			updateCartPrice();
		}
	}, [count]);

	return (
		<motion.li
			layout
			initial={hasMounted.current ? {opacity: 0, scale: 0.8} : false}
			animate={{opacity: 1, scale: 1}}
			exit={{opacity: 0, scale: 0.5}}
			key={itemData.article}
			style={{display: "flow-root"}}
		>
			<article className={`relative ${styles.item}`}>
				{itemType === OrderItemAccessEnum.FULL_ACCESS && (
					<Button
						onClick={deleteItem}
						title={t("buttonRemoveItem.title")}
						aria-label={t.rich("buttonRemoveItem.ariaLabel", {name: itemData.name}) as string}
						className={styles.removeButton}
					>
						<CloseIcon/>
					</Button>
				)}
				{itemData.images && itemData.images.length > 0 && (
					<a href={`/product/${itemData.article}`}>
						<Image
							width={100}
							height={100}
							src={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${itemData.images[0].filename}`}
							alt={itemData.images[0].filename}
							style={{objectFit: "contain"}}
						/>
					</a>
				)}
				<h2>
					{itemData.name}
				</h2>
				<p className={`fw-bold text-center ${styles.article}`}>
					{itemData.article}
				</p>
				<div className={`flex justify-between ${styles.rightPart}`}>
					<div className={`flex items-center justify-between ${styles.countControlWrapper}`}>
						{itemType === OrderItemAccessEnum.FULL_ACCESS ? (
							<>
								<Button
									onClick={decrementItem}
								>
									<ChevronRightIcon style={{transform: `rotate(180deg)`}}/>
								</Button>
								<p className="montserrat">
									{count}
								</p>
								<Button
									onClick={incrementItem}
								>
									<ChevronRightIcon/>
								</Button>
							</>
						) : (
							<p className="w-full text-center montserrat">
								{count}
								<span>{t("thing")}</span>
							</p>
						)}
					</div>
					<div className={`flex flex-col montserrat ${styles.priceWrapper}`}>
						<p>{formatPrice(itemData.price * count, 2)}</p>
						<p>
						<span className="fw-bold geologica">{
							t("pricePerItem")}
						</span>&nbsp;
							{formatPrice(itemData.price, 2)}
						</p>
					</div>
				</div>
			</article>
		</motion.li>
	);
}