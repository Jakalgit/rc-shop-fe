"use client";

import React, {useCallback, useEffect, useState} from 'react';
import {useTranslations} from "next-intl";
import Button from "@/components/buttons/Button";
import styles from "@/styles/components/filters/CatalogFilter.module.css";
import FilterDropdown from "@/components/filters/FilterDropdown";
import {formatPrice} from "@/functions/format";
import {getTrackBackground, Range} from "react-range";
import FilterCategory from "@/components/filters/FilterCategory";
import {TagFilersResponse} from "@/api/tags/types";
import {getTagsForFilter} from "@/api/tags/api";
import {AnimatePresence, motion} from "framer-motion";
import {DEFAULT_MAX_PRICE, DEFAULT_MIN_PRICE} from "@/consts/filters";
import {useRouter} from "next/navigation";
import Loading from "@/components/Loading";

export interface IFilterProps {
	minPrice: number;
	maxPrice: number;
	tagIds: number[];
	finder: string;
}

const FiltersComponent: React.FC<IFilterProps> = ({ minPrice, maxPrice, tagIds, finder }) => {

	const priceFilterId = "price";
	const otherCategoryFilterId = "other";
	const allCategoryFilterId = "all";

	const router = useRouter();

	const [responseTags, setResponseTags] = useState<TagFilersResponse | null>(null);
	const [loading, setLoading] = useState(true);

	const [isVisibleClearFilters, setIsVisibleClearFilters] = useState(false);
	const [isVisibleSetFilters, setIsVisibleSetFilters] = useState(false);

	const t = useTranslations("CatalogPage.filters");

	const [tagsFilter, setTagsFilter] = useState<number[]>(tagIds);
	const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);

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

	// Обработчик нажатия на кнопку "Сбросить фильтры"
	const clearAllFilters = useCallback(() => {
		let url = `/catalog`;
		if (finder) {
			url += `?finder=${finder}`;
		}
		router.replace(url);
		window.location.reload();
	}, [router]);

	// Обработчик нажатия на кнопку "Применить фильтры"
	const setSelectedFilters = useCallback(() => {
		let url = `/catalog?min=${priceRange[0]}&max=${priceRange[1]}`;
		if (tagsFilter.length > 0) {
			url += `&tagIds=${tagsFilter.join(',')}`;
		}
		if (finder) {
			url += `&finder=${finder}`;
		}
		router.replace(url);
		window.location.reload();
	}, [priceRange, tagsFilter, router]);

	// Сравнение массивов
	const arraysEqual = (a: number[], b: number[]) => {
		if (a.length !== b.length) return false;
		return a.every((val, index) => val === b[index]);
	}

	useEffect(() => {
		async function getData() {
			try {
				const response = await getTagsForFilter();

				setResponseTags(response);

				setLoading(false);
			} catch (e: any) {
				alert(e?.response?.data?.message);
			}
		}

		getData();
	}, []);

	useEffect(() => {
		if (minPrice !== DEFAULT_MIN_PRICE || maxPrice !== DEFAULT_MAX_PRICE || !arraysEqual(tagIds, [])) {
			setIsVisibleClearFilters(true);
		} else {
			setIsVisibleClearFilters(false);
		}
	}, []);

	useEffect(() => {
		if (minPrice !== priceRange[0] || maxPrice !== priceRange[1] || !arraysEqual(tagIds, tagsFilter)) {
			setIsVisibleSetFilters(true);
		} else {
			setIsVisibleSetFilters(false);
		}
	}, [priceRange, tagsFilter]);

	if (loading) {
		return (
			<div className="flex items-center justify-center">
				<Loading className={styles.loadingSvg} />
			</div>
		)
	}

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
				{isVisibleClearFilters && (
					<motion.div
						key="clearFilters"
						style={{overflow: "hidden"}}
					>
						<Button
							onClick={() => clearAllFilters()}
							title={t("buttonClearFilter.title")}
							aria-label={t("buttonClearFilter.ariaLabel")}
							className={`w-full ${styles.clearFilters}`}
						>
							{t("buttonClearFilter.title")}
						</Button>
					</motion.div>
				)}
			</AnimatePresence>
			<FilterDropdown
				title={"Цена"}
				isFilterOpen={openFilterId === priceFilterId}
				onClick={() => onClickFilter(priceFilterId)}
			>
				<div className={`flex manrope fw-bold items-center justify-between ${styles.priceRange}`}>
					<p>
						{t("price.from")}<br/>
						{formatPrice(priceRange[0], 2)}
					</p>
					<p className="text-right">
						{t("price.to")}<br/>
						{formatPrice(priceRange[1], 2)}
					</p>
				</div>
				<div className={styles.priceSliderWrapper}>
					<Range
						values={priceRange}
						step={STEP}
						min={DEFAULT_MIN_PRICE}
						max={DEFAULT_MAX_PRICE}
						onChange={setPriceRange}
						renderTrack={({ props, children }) => {
							const { key, ...restProps } = props as any;

							return (
								<div
									key={key}
									{...restProps}
									style={{
										...props.style,
										height: '6px',
										width: '100%',
										background: getTrackBackground({
											values: priceRange,
											colors: ['#ccc', '#007bff', '#ccc'],
											min: DEFAULT_MIN_PRICE,
											max: DEFAULT_MAX_PRICE,
										}),
										borderRadius: '4px',
										marginTop: '20px',
									}}
								>
									{children}
								</div>
							);
						}}
						renderThumb={({ props }) => {
							const { key, ...restProps } = props;

							return (
								<div
									key={key}
									{...restProps}
									style={{
										height: '20px',
										width: '20px',
										borderRadius: '50%',
										backgroundColor: '#007bff',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										boxShadow: '0 2px 6px #aaa',
										...props.style,
									}}
								>
									<div
										style={{
											position: 'absolute',
											top: '-28px',
											color: '#000',
											fontSize: '12px',
											fontWeight: 'bold',
										}}
									/>
								</div>
							);
						}}
					/>
				</div>
			</FilterDropdown>
			{responseTags?.listOfGroups.map((item, index) =>
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
				tags={responseTags?.tagsWithoutGroup || []}
				selectedTagIds={tagsFilter}
				addTagToFilter={addTagToFilter}
			/>
			<FilterCategory
				title={t("buttonAllCategory.title")}
				isFilterOpen={openFilterId === allCategoryFilterId}
				onClick={() => onClickFilter(allCategoryFilterId)}
				tags={responseTags?.listOfTags || []}
				addTagToFilter={addTagToFilter}
				selectedTagIds={tagsFilter}
			/>
		</>
	);
};

export default FiltersComponent;