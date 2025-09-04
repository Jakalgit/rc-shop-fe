import React, {useCallback, useEffect, useState} from "react";
import Cookies from "universal-cookie";
import {useTranslations} from "next-intl";
import {updatePassword} from "@/api/profile/api";
import {AnimatePresence, motion} from "framer-motion";
import styles from "@/styles/components/Popup.module.css";
import Button from "@/components/buttons/Button";
import CloseIcon from "@/components/icons/CloseIcon";
import Input from "@/components/Input";

interface UpdatePasswordPopupProps {
	isOpen: boolean;
	onClose: () => void;
}

export const UpdatePasswordPopup: React.FC<UpdatePasswordPopupProps> = ({ isOpen, onClose }) => {

	const cookies = new Cookies();

	const t = useTranslations("ProfilePage.updatePasswordPopup");
	const tButtonClose = useTranslations("buttonClosePopup")

	const [loadingButton, setLoadingButton] = useState(false);

	const [newPassword, setNewPassword] = React.useState<string>("");
	const [oldPassword, setOldPassword] = React.useState<string>("");

	const requestUpdatePassword = useCallback(async () => {
		try {
			setLoadingButton(true);
			const act = cookies.get("act") || "";

			await updatePassword({newPassword, oldPassword, token: act});

			onClose();
			alert(t("success"));
		} catch (e: any) {
			console.error(e);
			alert(e?.response?.data?.message);
		}
		setLoadingButton(false);
	}, [newPassword, oldPassword]);

	useEffect(() => {
		if (!isOpen) {
			setNewPassword("");
			setOldPassword("");
		}
	}, []);

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
						aria-labelledby="update-password-popup-title"
						aria-describedby="update-popup-desc"
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
								value: oldPassword,
								onChange: e => setOldPassword(e.target.value),
								placeholder: `${t("oldPasswordPlaceholder")}`,
								type: "password",
							}}
						/>
						<Input
							inputAttrs={{
								value: newPassword,
								onChange: e => setNewPassword(e.target.value),
								placeholder: `${t("newPasswordPlaceholder")}`,
								type: "password",
							}}
						/>
						<Button
							title={t("buttonSavePassword.title")}
							aria-label={t("buttonSavePassword.ariaLabel")}
							loading={loadingButton}
							onClick={requestUpdatePassword}
							className={styles.resultButton}
						>
							{t("buttonSavePassword.title")}
						</Button>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
};