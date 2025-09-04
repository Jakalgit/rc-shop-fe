import React, {useCallback, useEffect, useState} from "react";
import Cookies from "universal-cookie";
import {useTranslations} from "next-intl";
import {emailUpdateRequest} from "@/api/profile/api";
import {AnimatePresence, motion} from "framer-motion";
import styles from "@/styles/components/Popup.module.css";
import Button from "@/components/buttons/Button";
import CloseIcon from "@/components/icons/CloseIcon";
import Input from "@/components/Input";

interface UpdateEmailPopupProps {
	isOpen: boolean;
	onClose: () => void;
}

export const UpdateEmailPopup: React.FC<UpdateEmailPopupProps> = ({ isOpen, onClose }) => {

	const cookies = new Cookies();

	const t = useTranslations("ProfilePage.updateEmailPopup");
	const tButtonClose = useTranslations("buttonClosePopup");

	const [newEmail, setNewEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loadingButton, setLoadingButton] = useState(false);

	const sendEmailUpdateRequest = useCallback(async () => {
		try {
			setLoadingButton(true);
			const act = cookies.get("act") || "";

			await emailUpdateRequest({email: newEmail, password, token: act});

			onClose();
			alert(t("success"));
		} catch (e: any) {
			console.error(e);
			alert(e?.response?.data?.message);
		}
		setLoadingButton(false);
	}, [newEmail, password]);

	useEffect(() => {
		if (!isOpen) {
			setNewEmail("");
			setPassword("");
		}
	}, [isOpen]);

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					<motion.div
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						exit={{opacity: 0}}
						className={styles.popupBackground}
						aria-hidden="true"
					/>
					<motion.div
						initial={{opacity: 0, marginTop: 80}}
						animate={{opacity: 1, marginTop: 0}}
						exit={{opacity: 0, marginTop: 80}}
						aria-modal="true"
						aria-labelledby="update-email-popup-title"
						aria-describedby="update-email-popup-desc"
						className={`flex flex-col ${styles.popupContent}`}
					>
						<div className={`flex items-center justify-between ${styles.popupHead}`}>
							<h2 id="update-popup-title">
								{t("title")}
							</h2>
							<Button
								className="p-0"
								onClick={onClose}
								title={tButtonClose("title")}
								aria-label={tButtonClose("ariaLabel")}
							>
								<CloseIcon/>
							</Button>
						</div>
						<Input
							inputAttrs={{
								value: newEmail,
								onChange: e => setNewEmail(e.target.value),
								placeholder: `${t("newEmailPlaceholder")}`,
							}}
						/>
						<Input
							inputAttrs={{
								value: password,
								onChange: e => setPassword(e.target.value),
								placeholder: `${t("passwordPlaceholder")}`,
								type: "password",
							}}
						/>
						<Button
							title={t("buttonSendRequest.title")}
							aria-label={t("buttonSendRequest.ariaLabel")}
							loading={loadingButton}
							onClick={sendEmailUpdateRequest}
							className={styles.resultButton}
						>
							{t("buttonSendRequest.title")}
						</Button>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
};