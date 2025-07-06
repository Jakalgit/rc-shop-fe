"use client";

import React from 'react';
import Button from "@/components/buttons/Button";
import {useTranslations} from "next-intl";
import SearchIcon from "@/components/icons/SearchIcon";
import styles from "@/styles/components/Header.module.css";
import {useActions} from "@/store/hooks";

const ButtonFinder = () => {

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
};

export default ButtonFinder;