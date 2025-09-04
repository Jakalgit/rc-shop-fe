"use client";

import React from 'react';
import {useTranslations} from "next-intl";
import Button from "@/components/buttons/Button";
import {saveCartToLocalStorage} from "@/shared/lib/func/localStorageCart";
import styles from "@/styles/components/CatalogItem.module.css";

interface IProps {
	article: string;
	availability: boolean;
}

const ButtonAddToCart: React.FC<IProps> = ({ availability, article }) => {

	const t = useTranslations("CatalogPage.item");

	const addToCart = () => {
		if (availability) {
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
};

export default ButtonAddToCart;