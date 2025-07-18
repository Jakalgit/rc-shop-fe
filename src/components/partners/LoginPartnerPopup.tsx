"use client";

import React, {useState} from 'react';
import Button from "@/components/buttons/Button";
import {useTranslations} from "next-intl";
import {AnimatePresence, motion} from "framer-motion";
import stylesPopup from "@/styles/components/Popup.module.css";
import CloseIcon from "@/components/icons/CloseIcon";
import Input from "@/components/Input";
import stylesRepairPage from "@/styles/pages/Repair.module.css";
import styles from "@/styles/pages/Partners.module.css";

const LoginPartnerPopup = () => {

	const t = useTranslations("PartnersPage");

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [buttonLoading, setButtonLoading] = useState<boolean>(false);

	const [identifier, setIdentifier] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const login = async () => {
		try {

		} catch (e) {

		}
	}

	return (
		<>
			<div className="flex justify-center">
				<Button
					className={`manrope ${styles.authButton}`}
					title={t("buttonLoginPopup.title")}
					aria-label={t("buttonLoginPopup.ariaLabel")}
					onClick={() => setIsOpen(true)}
				>
					{t("buttonLoginPopup.title")}
				</Button>
			</div>
			<AnimatePresence>
				{isOpen && (
					<>
						<motion.div
							initial={{opacity: 0}}
							animate={{opacity: 1}}
							exit={{opacity: 0}}
							className={stylesPopup.popupBackground}
							aria-hidden="true"
						/>
						<motion.div
							initial={{opacity: 0, marginTop: 80}}
							animate={{opacity: 1, marginTop: 0}}
							exit={{opacity: 0, marginTop: 80}}
							aria-modal="true"
							aria-labelledby="login-popup-title"
							aria-describedby="login-popup-desc"
							className={`flex flex-col ${stylesPopup.popupContent}`}
						>
							<div className={`flex items-center justify-between ${stylesPopup.popupHead}`}>
								<h2 id="login-popup-title">
									{t("loginPopup.title")}
								</h2>
								<Button
									className="p-0"
									onClick={() => setIsOpen(false)}
									title={t("loginPopup.buttonClosePopup.title")}
									aria-label={t("loginPopup.buttonClosePopup.ariaLabel")}
								>
									<CloseIcon/>
								</Button>
							</div>
							<Input
								inputAttrs={{
									value: identifier,
									onChange: e => setIdentifier(e.target.value),
									placeholder: `${t("loginPopup.identifierPlaceholder")}*`,
								}}
							/>
							<Input
								inputAttrs={{
									value: password,
									onChange: e => setPassword(e.target.value),
									placeholder: `${t("loginPopup.passwordPlaceholder")}*`,
								}}
							/>
							<Button
								style={{ width: "100%" }}
								className={`mt-0 ${stylesRepairPage.popupButton}`}
								title={t("loginPopup.buttonLogin.title")}
								aria-label={t("loginPopup.buttonLogin.ariaLabel")}
								loading={buttonLoading}
								onClick={login}
							>
								{t("loginPopup.buttonLogin.title")}
							</Button>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</>
	);
};

export default LoginPartnerPopup;