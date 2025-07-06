"use client";

import React, {useEffect, useState} from 'react';
import FilterDropdown from "@/components/filters/FilterDropdown";
import styles from "@/styles/components/filters/FilterCategory.module.css";
import {useTranslations} from "next-intl";
import Button from "@/components/buttons/Button";
import {Tag} from "@/api/tags/types";

interface IProps {
	title: string;
	isFilterOpen?: boolean;
	onClick?: () => void;
	tags: Tag[];
	selectedTagIds?: number[];
	addTagToFilter?: (tagId: number) => void;
}

const FilterCategory: React.FC<IProps> = (
	{title, isFilterOpen, onClick, tags, selectedTagIds, addTagToFilter = () => {} }
) => {

	const t = useTranslations("CatalogPage.filters");

	const [finderText, setFinderText] = useState("");
	const [findTags, setFindTags] = useState<Tag[]>(tags);

	useEffect(() => {
		if (finderText) {
			setFindTags(tags.filter(t => t.name.toLowerCase().includes(finderText.toLowerCase())));
		} else {
			setFindTags(tags);
		}
	}, [finderText, tags]);

	useEffect(() => {
		if (!isFilterOpen) {
			setFinderText("");
		}
	}, [isFilterOpen]);

	return (
		<FilterDropdown
			title={title}
			isFilterOpen={isFilterOpen}
			onClick={onClick}
		>
			<input
				type="text"
				value={finderText}
				onChange={(e) => setFinderText(e.target.value)}
				className={`duration-300 w-full ${styles.input}`}
				placeholder={t("inputPlaceholder")}
			/>
			<div className={styles.tagsWrapper}>
				{findTags.map(tag =>
					<Button
						key={tag.id}
						className={`duration-300 ${styles.tag} ${selectedTagIds?.includes(tag.id) ? styles.selectedTag : ''}`}
						onClick={() => addTagToFilter(tag.id)}
					>
						{tag.name}
					</Button>
				)}
			</div>
		</FilterDropdown>
	);
};

export default FilterCategory;