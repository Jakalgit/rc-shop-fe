import {ProductResponse} from "@/api/products/types";
import React from "react";
import {getTranslations} from "next-intl/server";
import styles from "./CatalogItem.module.css";
import Image from "next/image";
import {formatPrice} from "@/functions/format";
import {ButtonAddToCart} from "../widgets/ButtonAddToCart";
import {
	formatSchemaPrice,
	getAvailabilityUrl,
	getCloudImageUrl,
	getOfferDescription,
	getProductUrl,
	offerType,
	priceCurrency,
} from "@/shared/lib/schema/offerMicrodata";

interface IProps {
	item: ProductResponse
}

export const CatalogItem: React.FC<IProps>  = React.memo(async ({ item }) => {

	const t = await getTranslations("CatalogPage.item");

	const popular = "Популярное";
	const novelty = "Новинки";
	const onTheWay = "В пути"
	const inStock = item.availability && item.count > 0;
	const isOnTheWay = Boolean(item.tags.find(el => el.name === onTheWay));

	return (
		<article
			className={`relative flex flex-col ${styles.item}`}
			itemScope
			itemType={offerType}
			itemProp="itemListElement"
		>
			<link itemProp="url" href={getProductUrl(item.article)} />
			<meta itemProp="description" content={getOfferDescription(item.description, item.name)} />
			<link itemProp="image" href={getCloudImageUrl(item.images[0].filename)} />
			<meta itemProp="price" content={formatSchemaPrice(item.price)} />
			<meta itemProp="priceCurrency" content={priceCurrency} />
			<link itemProp="availability" href={getAvailabilityUrl(inStock, isOnTheWay)} />
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
				{item.tags.find(el => el.name === onTheWay) && (
					<span className={`flex items-center justify-center bg-[color:var(--blue-color-4)] ${styles.prompt}`}>
						{onTheWay}
					</span>
				)}
				{item.oldPrice && item.promotionPercentage && (
					<span className={`flex ml-auto items-center manrope justify-center bg-[var(--red-color)] ${styles.prompt}`}>
						-{item.promotionPercentage}%
					</span>
				)}
			</div>
			<a style={{textAlign: "center"}} href={`/product/${encodeURIComponent(item.article)}`}>
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
			<h2 className={styles.name} itemProp="name">{item.name}</h2>
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
				count={item.count}
			/>
		</article>
	);
})