"use client";

import React, {useState} from 'react';
import styles from "@/styles/components/filters/FilterPopup.module.css";
import {useTranslations} from "next-intl";
import FilterIcon from "@/components/icons/FilterIcon";
import Button from "@/components/buttons/Button";
import {motion, AnimatePresence} from "framer-motion";
import FiltersComponent from "@/components/filters/FiltersComponent";
import CloseIcon from "@/components/icons/CloseIcon";
import { useSearchParams } from 'next/navigation';
import {DEFAULT_MAX_PRICE, DEFAULT_MIN_PRICE} from "@/consts/filters";
import {TagFilersResponse} from "@/api/tags/types";

interface FilterPopupProps {
	partner: boolean;
	tagsForFilter: TagFilersResponse;
}

const FilterPopup: React.FC<FilterPopupProps> = ({ partner, tagsForFilter }) => {

	const t = useTranslations("CatalogPage.filters");
	const searchParams = useSearchParams();

	const finder = searchParams.get("finder") || "";

	const minPrice = Number(searchParams.get("min")) || DEFAULT_MIN_PRICE;
	const maxPrice = Number(searchParams.get("max")) || DEFAULT_MAX_PRICE;
	const wMinPrice = Number(searchParams.get("wMin")) || DEFAULT_MIN_PRICE;
	const wMaxPrice = Number(searchParams.get("wMax")) || DEFAULT_MAX_PRICE;

	const tagIdsParam = searchParams.get("tagIds");
	const tagIds = tagIdsParam
		? tagIdsParam.split(',').map(x => Number(x)).filter(x => !isNaN(x))
		: [];

	const [isOpenFilters, setIsOpenFilters] = useState<boolean>(false);

	let isFilterActive = false;

	if (
		minPrice !== DEFAULT_MIN_PRICE || maxPrice !== DEFAULT_MAX_PRICE ||
		wMinPrice !== DEFAULT_MIN_PRICE || wMaxPrice !== DEFAULT_MAX_PRICE ||
		tagIds.length !== 0) {
		isFilterActive = true;
	}

	return (
		<div className={styles.wrapper}>
			<Button
				title={t("buttonFilterPopup.title")}
				aria-label={t("buttonFilterPopup.ariaLabel")}
				className={`${styles.buttonFilter} ${isFilterActive && styles.buttonActiveFilters}`}
				onClick={() => setIsOpenFilters(!isOpenFilters)}
			>
				<FilterIcon />
			</Button>
			<AnimatePresence>
				{isOpenFilters && (
					<motion.div
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						exit={{opacity: 0}}
						className={styles.popupWrapper}
					>
						<motion.div
							initial={{opacity: 0, marginTop: 100}}
							animate={{opacity: 1, marginTop: 0}}
							exit={{opacity: 0, marginTop: 100}}
							className={styles.popup}
						>
							<div className={`flex items-center justify-between ${styles.head}`}>
								<h2>
									{t("popup.head")}
								</h2>
								<Button
									title={t("popup.buttonClosePopup.title")}
									aria-label={t("popup.buttonClosePopup.ariaLabel")}
									onClick={() => setIsOpenFilters(false)}
								>
									<CloseIcon />
								</Button>
							</div>
							<div className={styles.contentWrapper}>
								<div className={`flex flex-col ${styles.filtersContent}`}>
									<FiltersComponent
										tagIds={tagIds}
										maxPrice={maxPrice}
										minPrice={minPrice}
										finder={finder || ""}
										wMinPrice={wMinPrice}
										wMaxPrice={wMaxPrice}
										partner={partner}
										tagsForFilter={tagsForFilter}
									/>
								</div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default FilterPopup;