"use client";

import React from 'react';
import Button from "@/components/buttons/Button";
import styles from "./LoginPopupWrapper.module.css";
import {LoginPopup} from "@/widgets/LoginPopup";
import {useTranslations} from "next-intl";

export const LoginPopupWrapper = () => {

	const t = useTranslations("PartnersPage");

	const [isPopupOpen, setIsPopupOpen] = React.useState(false);

	return (
		<>
			<div className="flex justify-center">
				<Button
					className={`manrope ${styles.authButton}`}
					title={t("buttonLoginPopup.title")}
					aria-label={t("buttonLoginPopup.ariaLabel")}
					onClick={() => setIsPopupOpen(true)}
				>
					{t("buttonLoginPopup.title")}
				</Button>
			</div>
			<LoginPopup
				isOpen={isPopupOpen}
				setIsPopupOpenAction={setIsPopupOpen}
			/>
		</>
	);
};