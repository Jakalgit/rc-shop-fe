import React from 'react';
import styles from "@/styles/components/CatalogItem.module.css";
import Image from "next/image";
import {getTranslations} from "next-intl/server";
import {formatPrice} from "@/functions/format";
import {ProductResponse} from "@/api/products/types";
import ButtonAddToCart from "@/components/catalog/ButtonAddToCart";

interface IProps {
	item: ProductResponse
}

const CatalogItem: React.FC<IProps> = async ({ item }) => {

	const t = await getTranslations("CatalogPage.item");

	const popular = "Популярное";
	const novelty = "Новинки";

	return (
		<article className={`relative flex flex-col ${styles.item}`}>
			<div className={`absolute flex ${styles.promptLine}`}>
				{item.tags.find(el => el.name === popular) && (
					<span className={`flex items-center justify-center bg-[color:var(--yellow-color)] ${styles.prompt}`}>
						{popular}
					</span>
				)}
				{item.tags.find(el => el.name === novelty) && (
					<span className={`flex items-center justify-center bg-[color:var(--turquoise-color)] ${styles.prompt}`}>
						{novelty}
					</span>
				)}
				{item.oldPrice && item.promotionPercentage && (
					<span className={`flex ml-auto items-center manrope justify-center bg-[var(--red-color)] ${styles.prompt}`}>
						-{item.promotionPercentage}%
					</span>
				)}
			</div>
			<a style={{ textAlign: "center" }} href={`/product/${item.article}`}>
				<Image
					width={500}
					height={500}
					src={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${item.images[0].filename}`}
					alt={item.images[0].filename}
				/>
			</a>
			<p className={`fw-bold text-center ${styles.article}`}>
				{item.article}
			</p>
			<h2 className={styles.name}>
				{item.name}
			</h2>
			<div className="mt-auto">
				{item.oldPrice && item.promotionPercentage && (
					<p className={`montserrat fw-bold ${styles.oldPrice}`}>
						{t("oldPrice")}&nbsp;
						<span className="line-through">{formatPrice(item.oldPrice, 2)}</span>
					</p>
				)}
				<p className={`montserrat ${styles.price}`}>
					{formatPrice(item.price, 2)}
				</p>
			</div>
			{item.wholesalePrice && (
				<div className={`flex items-center justify-between ${styles.wholesalePriceBlock}`}>
					<p>
						{t("wholesalePrice")}
					</p>
					<p className="montserrat">
						{formatPrice(item.wholesalePrice, 2)}
					</p>
				</div>
			)}
			<ButtonAddToCart
				article={item.article}
				availability={item.availability}
			/>
		</article>
	);
};

export default CatalogItem;