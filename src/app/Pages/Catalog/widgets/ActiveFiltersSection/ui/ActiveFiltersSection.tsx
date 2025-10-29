"use client";

import React, {useCallback} from "react";
import {useRouter} from "next/navigation";
import styles from "./ActiveFiltersSection.module.css";
import {useTranslations} from "next-intl";
import Button from "@/components/buttons/Button";
import RefreshIcon from "@/components/icons/RefreshIcon";
import RangeIcon from "@/components/icons/RangeIcon";
import {formatPrice} from "@/functions/format";
import {DEFAULT_MAX_PRICE, DEFAULT_MIN_PRICE} from "@/consts/filters";
import {TagFilersResponse} from "@/api/tags/types";

interface IProps {
	data: {
		minPrice: number;
		maxPrice: number;
		tagIds: number[];
		finder: string;
		partner: boolean;
		wMinPrice: number;
		wMaxPrice: number;
		tagsForFilter: TagFilersResponse
	}
}

export const ActiveFiltersSection: React.FC<IProps> = React.memo(({data}) => {

	const router = useRouter();
	const t = useTranslations("CatalogPage.activeFilters");

	// Обработчик нажатия на кнопку "Сбросить фильтры"
	const clearAllFilters = useCallback(() => {
		let url = `/catalog`;
		if (data.finder) {
			url += `?finder=${data.finder}`;
		}
		window.location.href = url;
	}, [router]);

	// Сравнение массивов
	const arraysEqual = (a: number[], b: number[]) => {
		if (a.length !== b.length) return false;
		return a.every((val, index) => val === b[index]);
	}

	let visiblePanel = false;

	if (
		data.minPrice !== DEFAULT_MIN_PRICE || data.maxPrice !== DEFAULT_MAX_PRICE ||
		data.wMinPrice !== DEFAULT_MIN_PRICE || data.wMaxPrice !== DEFAULT_MAX_PRICE ||
		!arraysEqual(data.tagIds, [])
	) {
		visiblePanel = true;
	}

	const groups = data.tagsForFilter.listOfGroups.filter(
		el => el.tags.every(t => data.tagIds.includes(t.id))
	).map(el => el.name);

	const tags = data.tagsForFilter.listOfTags.filter(
		el => data.tagIds.includes(el.id)
	).map(el => el.name);

	console.log(data);

	if (!visiblePanel) return null;

	return (
		<section className={styles.section}>
			<div className="flex items-center justify-between">
				<h3>
					{t('title')}
				</h3>
				<Button
					className={styles.clearButton}
					title={t('buttonClearFilter.title')}
					aria-label={t('buttonClearFilter.ariaLabel')}
					onClick={clearAllFilters}
				>
					<RefreshIcon />
					{t('buttonClearFilter.title')}
				</Button>
			</div>
			<div className={`grid ${styles.grid}`}>
				{(data.minPrice !== DEFAULT_MIN_PRICE || data.maxPrice !== DEFAULT_MAX_PRICE) && (
					<PriceRange
						title={t('priceTitle')}
						from={data.minPrice}
						to={data.maxPrice}
					/>
				)}
				{(data.wMinPrice !== DEFAULT_MIN_PRICE || data.wMaxPrice !== DEFAULT_MAX_PRICE) && data.partner && (
					<PriceRange
						title={t('wholesalePriceTitle')}
						from={data.wMinPrice}
						to={data.wMaxPrice}
					/>
				)}
				{groups.length > 0 && (
					<TagGroup
						title={t('groupsTitle')}
						names={groups}
					/>
				)}
				{tags.length > 0 && (
					<TagGroup
						title={t('tagsTitle')}
						names={tags}
					/>
				)}
			</div>
		</section>
	)
})

const PriceRange: React.FC<{ title: string, from: number, to: number}> = React.memo(
	({title, from, to}) => {

	const t = useTranslations("CatalogPage.activeFilters");

	return (
		<div className={`flex flex-col ${styles.gridCell}`}>
			<h4>{title}</h4>
			<div className={`flex items-center manrope fw-bold ${styles.priceRange}`}>
				<p>{t('priceRange.from')} {formatPrice(from, 2)}</p>
				<RangeIcon/>
				<p>{t('priceRange.to')} {formatPrice(to, 2)}</p>
			</div>
		</div>
	)
});

const TagGroup: React.FC<{title: string, names: string[]}> = React.memo(({ title, names }) => {

	return (
		<div className={`flex flex-col ${styles.gridCell}`}>
			<h4>{title}</h4>
			<ul className={`flex flex-wrap overflow-hidden ${styles.tagList}`}>
				{names.map((name, index) =>
					<li
						key={index}
						className="flex items-center justify-center"
					>
						{name}
					</li>
				)}
			</ul>
		</div>
	)
});