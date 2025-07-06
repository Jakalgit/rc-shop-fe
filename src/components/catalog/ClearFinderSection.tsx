"use client";

import React, {useCallback} from 'react';
import styles from "@/styles/pages/Catalog.module.css";
import Button from "@/components/buttons/Button";
import {useTranslations} from "next-intl";
import {useRouter} from "next/navigation";

interface IProps {
	finder: string;
	maxPrice: number;
	minPrice: number;
	tagIds: number[];
}

const ClearFinderSection: React.FC<IProps> = ({ finder, maxPrice, minPrice, tagIds }) => {

	const router = useRouter();
	const t = useTranslations("CatalogPage");

	// Обработчик нажатия на кнопку "Применить фильтры"
	const clearFinder = useCallback(() => {
		router.replace(`/catalog?minPrice=${minPrice}&maxPrice=${maxPrice}&tagIds=${JSON.stringify(tagIds)}`);
		window.location.reload();
	}, [router]);

	const formatFinderRequest = (text: string) => {
		if (text.length > 25) {
			text = text.slice(0, 25);
			return `${text}...`;
		}

		return text;
	}

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
};

export default ClearFinderSection;