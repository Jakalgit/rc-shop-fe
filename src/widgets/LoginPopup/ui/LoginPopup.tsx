"use client";

import {useTranslations} from "next-intl";
import React, {useEffect, useState} from "react";
import Button from "@/components/buttons/Button";
import {AnimatePresence, motion} from "framer-motion";
import stylesPopup from "@/styles/components/Popup.module.css";
import CloseIcon from "@/components/icons/CloseIcon";
import {LoginPopupState} from "../lib/states.enum";
import {LoginState} from "@/widgets/LoginPopup/ui/widgets/LoginState";
import {ForgotPasswordState} from "@/widgets/LoginPopup/ui/widgets/ForgotPasswordState";

interface LoginPopupProps {
	isOpen: boolean;
	setIsPopupOpenAction: (value: boolean) => void;
}

export const LoginPopup: React.FC<LoginPopupProps> = ({ isOpen, setIsPopupOpenAction }) => {

	const t = useTranslations("authPopup");

	const [viewState, setViewState] = useState<LoginPopupState>(LoginPopupState.LOGIN);

	const viewStates: Record<LoginPopupState, { tsx: React.ReactNode, title: string }> = {
		[LoginPopupState.LOGIN]: {
			tsx: <LoginState setViewState={setViewState} setIsPopupOpen={setIsPopupOpenAction} />,
			title: t("login.title"),
		},
		[LoginPopupState.FORGOT_PASSWORD]: {
			tsx: <ForgotPasswordState setViewState={setViewState} setIsPopupOpen={setIsPopupOpenAction} />,
			title: t("forgotPassword.title"),
		}
	}

	useEffect(() => {
		if (!isOpen) {
			setViewState(LoginPopupState.LOGIN);
		}
	}, [isOpen]);

	return (
		<>
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
									{viewStates[viewState].title}
								</h2>
								<Button
									className="p-0"
									onClick={() => setIsPopupOpenAction(false)}
									title={t("buttonClosePopup.title")}
									aria-label={t("buttonClosePopup.ariaLabel")}
								>
									<CloseIcon/>
								</Button>
							</div>
							<React.Fragment key={viewState}>
								{viewStates[viewState].tsx}
							</React.Fragment>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</>
	);
};