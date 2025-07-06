"use client";

import React from 'react';
import {useTranslations} from "next-intl";
import styles from "@/styles/components/CatalogItem.module.css";
import Button from "@/components/buttons/Button";
import {saveCartToCookie} from "@/consts/cookieCart";

interface IProps {
	article: string;
	availability: boolean;
}

const ButtonAddToCart: React.FC<IProps> = ({ availability, article }) => {

	const t = useTranslations("CatalogPage.item");

	const addToCart = () => {
		if (availability) {
			saveCartToCookie({article, qty: 1});
			alert(t("successAdded"));
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