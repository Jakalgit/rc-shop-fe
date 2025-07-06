"use client";

import React from 'react';
import {AnimatePresence, motion} from "framer-motion";
import {useTranslations} from "next-intl";
import Button from "@/components/buttons/Button";
import styles from "@/styles/components/filters/FilterDropdown.module.css";
import ChevronRightIcon from "@/components/icons/ChevronRightIcon";

interface IProps {
	title: string;
	children?: React.ReactNode;
	isFilterOpen?: boolean;
	onClick?: () => void;
}

const FilterDropdown: React.FC<IProps> = ({ title, children, isFilterOpen, onClick }) => {

	const t = useTranslations("CatalogPage.filters");

	return (
		<fieldset
			className={styles.filter}
		>
			<legend className="m-0">
				<Button
					title={title}
					aria-label={t.rich("buttonOpenFilter.ariaLabel", {name: title}) as string}
					className={`flex items-center justify-between w-full ${styles.filterButton}`}
					onClick={onClick}
				>
					{title}
					<ChevronRightIcon
						style={{transform: `rotate(${isFilterOpen ? '90deg' : '0deg'})`}}
					/>
				</Button>
			</legend>
			<AnimatePresence>
				{isFilterOpen && (
					<motion.div
						initial={{opacity: 0, height: 0}}
						animate={{opacity: 1, height: 'auto'}}
						exit={{opacity: 0, height: 0}}
					>
						<div className={styles.contentWrapper}>
							{children}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</fieldset>
	);
};

export default FilterDropdown;