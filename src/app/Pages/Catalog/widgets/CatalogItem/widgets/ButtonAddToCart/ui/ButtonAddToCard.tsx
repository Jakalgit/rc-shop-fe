"use client";

import React from "react";
import {useTranslations} from "next-intl";
import {saveCartToLocalStorage} from "@/shared/lib/func/localStorageCart";
import Button from "@/components/buttons/Button";
import styles from "./ButtonAddToCart.module.css";

interface IProps {
	article: string;
	availability: boolean;
	count: number;
}

export const ButtonAddToCart: React.FC<IProps> = React.memo(({ availability, article, count }) => {

	const t = useTranslations("CatalogPage.item");

	const addToCart = () => {
		if (availability && count > 0) {
			alert(t("successAdded"));
			saveCartToLocalStorage({article, qty: 1});
		} else {
			alert(t("notAvailable"));
		}
	}

	return (
		<Button
			title={t("buttonAddToCart.title")}
			aria-label={t("buttonAddToCart.ariaLabel")}
			className={styles.addToCart}
			onClick={addToCart}
		>
			{t("buttonAddToCart.title")}
		</Button>
	);
})