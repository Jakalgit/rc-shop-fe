"use client";

import React, {useCallback, useEffect, useRef, useState} from "react";
import styles from "./SortingSection.module.css";
import {useTranslations} from "next-intl";
import CheckIcon from "@/components/icons/CheckIcon";
import Button from "@/components/buttons/Button";
import FormatLineSpacingIcon from "@/components/icons/FormatLineSpacingIcon";
import {AnimatePresence, motion} from "framer-motion"
import {isSortOrder, SortOrder} from "@/shared/lib/sorting/sorting";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

export const SortingSection = React.memo(() => {

	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const sortRaw = searchParams.get('sort');
	const unavailable = !!Number(searchParams.get('unavailable'));

	let sort: SortOrder = SortOrder.DEFAULT;
	if (isSortOrder(sortRaw)) {
		sort = Number(sortRaw) as SortOrder;
	}

	const sortTypesList = [
		{
			tName: "default",
			value: SortOrder.DEFAULT,
		},
		{
			tName: "priceAsc",
			value: SortOrder.PRICE_ASCENDING,
		},
		{
			tName: "priceDesc",
			value: SortOrder.PRICE_DESCENDING,
		}
	]

	const t = useTranslations("CatalogPage.sortingSection");

	const buttonRef = useRef<HTMLButtonElement | null>(null);
	const [isListOpen, setIsListOpen] = useState(false);

	const updateParam = ({key, value, delPage}: {key: string, value?: string, delPage?: boolean}) => {
		const params = new URLSearchParams(searchParams);
		if (value) params.set(key, value);
		else params.delete(key);
		if (delPage) {
			params.delete('page');
		}
		router.push(`${pathname}?${params.toString()}`);
	};

	const updateShowUnavailable = useCallback((value?: boolean) => {
		if (value) {
			updateParam({key:'unavailable', value: '1', delPage: true});
		} else {
			updateParam({key:'unavailable', delPage: true});
		}
	}, [])

	const updateSortType = useCallback((value: SortOrder) => {
		if (value === SortOrder.DEFAULT) {
			updateParam({key: 'sort', delPage: true});
		} else {
			updateParam({key: 'sort', value: value.toString(), delPage: true});
		}
	}, []);

	useEffect(() => {
		const handleClickOutside = (event: any) => {
			if (buttonRef.current && !buttonRef.current.contains(event.target)) {
				setTimeout(() => setIsListOpen(false), 200);
			}
		}

		document.addEventListener("pointerdown", handleClickOutside);

		return () => {
			document.removeEventListener("pointerdown", handleClickOutside);
		};
	}, [buttonRef.current]);

	return (
		<section className={`flex items-center justify-between ${styles.section}`}>
			<label className={`flex items-center ${styles.labelCheckbox}`}>
				<input
					checked={unavailable}
					onChange={(e) => updateShowUnavailable(e.target.checked)}
					type="checkbox"
				/>
				<span className="flex items-center justify-center">
					<CheckIcon />
				</span>
				{t("availabilityCheckbox")}
			</label>
			<div className="relative">
				<Button
					title={t("buttonSorting.title")}
					aria-label={t("buttonSorting.ariaLabel")}
					className={styles.buttonSorting}
					ref={buttonRef}
					onClick={() => setIsListOpen(!isListOpen)}
				>
					{sort === SortOrder.DEFAULT ?
						t("buttonSorting.title")
						:
						t(`sortTypes.${sortTypesList.find(el => el.value === sort)?.tName}.title`)
					}
					<FormatLineSpacingIcon />
				</Button>
				<AnimatePresence>
					{isListOpen && (
						<motion.ul
							initial={{opacity: 0, scale: 0.92 }}
							animate={{opacity: 1, scale: 1 }}
							exit={{opacity: 0, scale: 0.92 }}
							transition={{ duration: 0.2, ease: "easeInOut" }}
							className={`absolute ${styles.sortUl}`}
						>
							{sortTypesList.map((sortType) =>
								<li key={sortType.value}>
									<Button
										title={t(`sortTypes.${sortType.tName}.title`)}
										aria-label={`sortTypes.${sortType.tName}.ariaLabel`}
										className="flex items-center justify-between"
										onClick={() => updateSortType(sortType.value)}
									>
										{t(`sortTypes.${sortType.tName}.title`)}
										{sort === sortType.value && (
											<CheckIcon/>
										)}
									</Button>
								</li>
							)}
						</motion.ul>
					)}
				</AnimatePresence>
			</div>
		</section>
	)
});