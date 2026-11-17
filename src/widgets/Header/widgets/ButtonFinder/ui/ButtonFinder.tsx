"use client";

import React from "react";
import {usePathname} from "next/navigation";
import {useTranslations} from "next-intl";
import {useActions} from "@/store/hooks";
import Button from "@/components/buttons/Button";
import styles from "./ButtonFinder.module.css";
import SearchIcon from "@/components/icons/SearchIcon";
import {pageHasHeaderSearch} from "@/widgets/HeaderSearch/lib/pageHasHeaderSearch";

export const ButtonFinder = React.memo(() => {

	const pathname = usePathname();
	const t = useTranslations("header");

	const {setIsOpenFinder} = useActions();

	if (pageHasHeaderSearch(pathname)) return null;

	const openFinder = () => {
		setIsOpenFinder(true);
	}

	return (
		<Button
			className={styles.button}
			title={t("buttonFinder.title")}
			aria-label={t("buttonFinder.ariaLabel")}
			onClick={openFinder}
		>
			{t("buttonFinder.title")}
			<SearchIcon />
		</Button>
	);
});