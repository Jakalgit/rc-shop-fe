"use client";

import React, {useCallback} from "react";
import {useTranslations} from "next-intl";
import styles from "./ClearFinderSection.module.css";
import Button from "@/components/buttons/Button";

interface IProps {
	finder: string;
	maxPrice: number;
	minPrice: number;
	tagIds: number[];
	partner: boolean;
	wMinPrice: number;
	wMaxPrice: number;
}

export const ClearFinderSection: React.FC<IProps> = React.memo(({ finder, maxPrice, minPrice, tagIds, partner, wMaxPrice, wMinPrice }) => {

	const t = useTranslations("CatalogPage");

	// Обработчик нажатия на кнопку "Очистить поиск"
	const clearFinder = useCallback(() => {
		let url = `/catalog?min=${minPrice}&max=${maxPrice}`;
		if (tagIds.length > 0) {
			url += `&tagIds=${tagIds.join(',')}`;
		}
		if (partner) {
			url += `&wMin=${wMinPrice}&wMax=${wMaxPrice}`;
		}
		window.location.href = url;
	}, [minPrice, maxPrice, tagIds]);

	const formatFinderRequest = useCallback((text: string) => {
		if (text.length > 25) {
			text = text.slice(0, 25);
			return `${text}...`;
		}

		return text;
	}, [])

	return (
		<>
			{finder && (
				<section className={`flex items-center justify-between ${styles.finderBlock}`}>
					<p>
						{t.rich("finderRequest", {
							request: formatFinderRequest(finder),
							bold: (chunk) => <span className="fw-bold">{chunk}</span>
						})}
					</p>
					<Button
						title={t("buttonClearFinder.title")}
						aria-label={t("buttonClearFinder.ariaLabel")}
						onClick={clearFinder}
					>
						{t("buttonClearFinder.title")}
					</Button>
				</section>
			)}
		</>
	);
})