"use client";

import React, {useCallback, useEffect, useState} from 'react';
import {useTranslations} from "next-intl";
import Button from "@/components/buttons/Button";
import styles from "@/styles/components/filters/CatalogFilter.module.css";
import FilterCategory from "@/components/filters/FilterCategory";
import {TagFilersResponse} from "@/api/tags/types";
import {AnimatePresence, motion} from "framer-motion";
import {useRouter} from "next/navigation";
import FilterDropdownPriceRange from "@/components/filters/FilterDropdownPriceRange";

export interface IFilterProps {
	minPrice: number;
	maxPrice: number;
	tagIds: number[];
	finder: string;
	partner: boolean;
	wMinPrice: number;
	wMaxPrice: number;
	tagsForFilter: TagFilersResponse;
}

const FiltersComponent: React.FC<IFilterProps> = (
	{ minPrice, maxPrice, tagIds, finder, partner, wMaxPrice, wMinPrice, tagsForFilter }
) => {

	const priceFilterId = "price";
	const wholesaleFilterId = "wholesalePrice";
	const otherCategoryFilterId = "other";
	const allCategoryFilterId = "all";

	const router = useRouter();

	const [isVisibleSetFilters, setIsVisibleSetFilters] = useState(false);

	const t = useTranslations("CatalogPage.filters");

	const [tagsFilter, setTagsFilter] = useState<number[]>(tagIds);
	const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
	const [wholesalePriceRange, setWholesalePriceRange] = useState([wMinPrice, wMaxPrice]);

	const STEP = 100;

	const [openFilterId, setOpenFilterId] = useState<string | null>(null);

	// Обработчик нажатия на кнопки фильтра
	const onClickFilter = useCallback((filterId: string | null) => {
		if (openFilterId === filterId) {
			setOpenFilterId(null);
		} else {
			setOpenFilterId(filterId);
		}
	}, [openFilterId]);

	// Обработчик добавления тега в фильтры
	const addTagToFilter = useCallback((tagId: number) => {
		if (tagsFilter.includes(tagId)) {
			setTagsFilter(prevState => prevState.filter(el => el !== tagId));
		} else {
			setTagsFilter(prevState => [...prevState, tagId]);
		}
	}, [tagsFilter]);

	// Обработчик нажатия на кнопку "Применить фильтры"
	const setSelectedFilters = useCallback(() => {
		let url = `/catalog?min=${priceRange[0]}&max=${priceRange[1]}`;
		if (tagsFilter.length > 0) {
			url += `&tagIds=${tagsFilter.join(',')}`;
		}
		if (partner) {
			url += `&wMin=${wholesalePriceRange[0]}&wMax=${wholesalePriceRange[1]}`;
		}
		if (finder) {
			url += `&finder=${finder}`;
		}
		window.location.href = url;
	}, [priceRange, wholesalePriceRange, tagsFilter, router]);

	// Сравнение массивов
	const arraysEqual = (a: number[], b: number[]) => {
		if (a.length !== b.length) return false;
		return a.every((val, index) => val === b[index]);
	}

	useEffect(() => {
		if (
			minPrice !== priceRange[0] || maxPrice !== priceRange[1] ||
			wMinPrice !== wholesalePriceRange[0] || wMaxPrice !== wholesalePriceRange[1] ||
			!arraysEqual(tagIds, tagsFilter)
		) {
			setIsVisibleSetFilters(true);
		} else {
			setIsVisibleSetFilters(false);
		}
	}, [priceRange, wholesalePriceRange, tagsFilter]);

	return (
		<>
			<AnimatePresence initial={false}>
				{isVisibleSetFilters && (
					<motion.div
						key="setFilters"
						style={{overflow: "hidden"}}
						initial={{opacity: 0, height: 0}}
						animate={{opacity: 1, height: 'auto'}}
						exit={{opacity: 0, height: 0}}
					>
						<Button
							onClick={() => setSelectedFilters()}
							title={t("buttonSetFilter.title")}
							aria-label={t("buttonSetFilter.ariaLabel")}
							className={`w-full ${styles.clearFilters} ${styles.setFilters}`}
						>
							{t("buttonSetFilter.title")}
						</Button>
					</motion.div>
				)}
			</AnimatePresence>
			<FilterDropdownPriceRange
				title={t("price.title")}
				priceRange={priceRange}
				setPriceRange={setPriceRange}
				openFilterId={openFilterId}
				filterId={priceFilterId}
				step={STEP}
				onClick={onClickFilter}
			/>
			{partner && (
				<FilterDropdownPriceRange
					title={t("price.wholesaleTitle")}
					priceRange={wholesalePriceRange}
					setPriceRange={setWholesalePriceRange}
					openFilterId={openFilterId}
					filterId={wholesaleFilterId}
					step={STEP}
					onClick={onClickFilter}
				/>
			)}
			{tagsForFilter?.listOfGroups.map((item, index) =>
				<FilterCategory
					title={item.name}
					isFilterOpen={openFilterId === item.name}
					onClick={() => onClickFilter(item.name)}
					tags={item.tags || []}
					selectedTagIds={tagsFilter}
					addTagToFilter={addTagToFilter}
					key={index}
				/>
			)}
			<FilterCategory
				title={t("buttonOtherCategory.title")}
				isFilterOpen={openFilterId === otherCategoryFilterId}
				onClick={() => onClickFilter(otherCategoryFilterId)}
				tags={tagsForFilter?.tagsWithoutGroup || []}
				selectedTagIds={tagsFilter}
				addTagToFilter={addTagToFilter}
			/>
			<FilterCategory
				title={t("buttonAllCategory.title")}
				isFilterOpen={openFilterId === allCategoryFilterId}
				onClick={() => onClickFilter(allCategoryFilterId)}
				tags={tagsForFilter?.listOfTags || []}
				addTagToFilter={addTagToFilter}
				selectedTagIds={tagsFilter}
			/>
		</>
	);
};

export default FiltersComponent;