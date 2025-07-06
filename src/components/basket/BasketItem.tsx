"use client";

import React, {useEffect, useRef, useState} from 'react';
import {ProductResponse} from "@/api/products/types";
import {getCartFromCookie, removeItemFromCartByArticle, saveCartToCookie} from "@/consts/cookieCart";
import styles from "@/styles/pages/Basket.module.css";
import Button from "@/components/buttons/Button";
import CloseIcon from "@/components/icons/CloseIcon";
import Image from "next/image";
import ChevronRightIcon from "@/components/icons/ChevronRightIcon";
import {formatPrice} from "@/functions/format";
import {motion} from "framer-motion";
import {useTranslations} from "next-intl";

interface IProps {
	item: ProductResponse;
	removeItem: (article: string) => void;
	updateItemQty: () => void;
}

const BasketItem: React.FC<IProps> = ({ item, removeItem, updateItemQty }) => {

	const t = useTranslations("BasketPage");
	const cart = getCartFromCookie().find(el => el.article === item.article);

	const [count, setCount] = useState(cart?.qty || 1);
	const hasMounted = useRef(false);

	useEffect(() => {
		hasMounted.current = true;
	}, []);

	const incrementItem = () => {
		if (count < 99 && count < item.count) {
			setCount(count + 1);
		}
	}

	const decrementItem = () => {
		if (count > 1) {
			setCount(count - 1);
		}
	}

	const deleteItem = () => {
		removeItemFromCartByArticle(item.article);
		removeItem(item.article);
	}

	useEffect(() => {
		saveCartToCookie({article: item.article, qty: count})
		updateItemQty();
	}, [count]);

	return (
		<motion.li
			layout
			initial={hasMounted.current ? {opacity: 0, scale: 0.8} : false}
			animate={{opacity: 1, scale: 1}}
			exit={{opacity: 0, scale: 0.5}}
			key={item.article}
		>
			<article className={`relative ${styles.item}`}>
				<Button
					onClick={deleteItem}
					title={t("buttonRemoveItem.title")}
					aria-label={t.rich("buttonRemoveItem.ariaLabel", {name: item.name}) as string}
					className={styles.removeButton}
				>
					<CloseIcon/>
				</Button>
				<a href={`/product/${item.article}`}>
					<Image
						width={100}
						height={100}
						src={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${item.images[0].filename}`}
						alt={item.images[0].filename}
						style={{ objectFit: "contain" }}
					/>
				</a>
				<h2>
					{item.name}
				</h2>
				<p className={`fw-bold ${styles.article}`}>
					{item.article}
				</p>
				<div className={`flex items-center justify-between ${styles.countControlWrapper}`}>
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
				</div>
				<div className={`flex flex-col montserrat ${styles.priceWrapper}`}>
					<p>{formatPrice(item.price * count, 2)}</p>
					<p>
						<span className="fw-bold geologica">{
							t("pricePerItem")}
						</span>&nbsp;
						{formatPrice(item.price, 2)}
					</p>
				</div>
			</article>
		</motion.li>
	);
};

export default BasketItem;