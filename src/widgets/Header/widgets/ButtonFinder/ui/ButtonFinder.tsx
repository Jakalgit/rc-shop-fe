"use client";

import React from "react";
import {useTranslations} from "next-intl";
import {useActions} from "@/store/hooks";
import Button from "@/components/buttons/Button";
import styles from "./ButtonFinder.module.css";
import SearchIcon from "@/components/icons/SearchIcon";

export const ButtonFinder = React.memo(() => {

	const t = useTranslations("header");

	const {setIsOpenFinder} = useActions();

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