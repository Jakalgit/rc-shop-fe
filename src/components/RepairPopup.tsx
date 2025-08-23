"use client";

import React, {useState} from 'react';
import Button from "@/components/buttons/Button";
import {AnimatePresence, motion} from "framer-motion";
import {useTranslations} from "next-intl";
import stylesRepairPage from "@/styles/pages/Repair.module.css";
import styles from "@/styles/components/Popup.module.css";
import CloseIcon from "@/components/icons/CloseIcon";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import {createRequest} from "@/api/user-request/api";

const RepairPopup = () => {

	const t = useTranslations("RepairPage");

	const [isOpen, setIsOpen] = useState(false);

	const [phoneNumber, setPhoneNumber] = useState("");
	const [name, setName] = useState("");
	const [comment, setComment] = useState("");

	const [buttonSendLoading, setButtonSendLoading] = useState(false);

	const sendRequest = async () => {
		try {
			setButtonSendLoading(true);

			await createRequest({name, phone: phoneNumber, text: comment});

			setPhoneNumber("");
			setName("");
			setComment("");

			alert(t("repairPopup.successRequest"));
			setIsOpen(false);
		} catch (e: any) {
			alert(e?.response?.data?.message);
		}
		setButtonSendLoading(false);
	}

	return (
		<>
			<Button
				title={t("buttonOpenPopup.title")}
				aria-label={t("buttonOpenPopup.ariaLabel")}
				onClick={() => setIsOpen(true)}
				className={stylesRepairPage.popupButton}
			>
				{t("buttonOpenPopup.title")}
			</Button>
			<AnimatePresence>
				{isOpen && (
					<>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className={styles.popupBackground}
							aria-hidden="true"
						/>
						<motion.div
							initial={{ opacity: 0, marginTop: 80 }}
							animate={{ opacity: 1, marginTop: 0 }}
							exit={{ opacity: 0, marginTop: 80 }}
							aria-modal="true"
							aria-labelledby="repair-popup-title"
							aria-describedby="repair-popup-desc"
							className={`flex flex-col ${styles.popupContent}`}
						>
							<div className={`flex items-center justify-between ${styles.popupHead}`}>
								<h2 id="repair-popup-titl">
									{t("repairPopup.title")}
								</h2>
								<Button
									className="p-0"
									onClick={() => setIsOpen(false)}
									title={t("repairPopup.buttonClosePopup.title")}
									aria-label={t("repairPopup.buttonClosePopup.ariaLabel")}
								>
									<CloseIcon />
								</Button>
							</div>
							<Input
								inputAttrs={{
									value: phoneNumber,
									onChange: e => setPhoneNumber(e.target.value),
									placeholder: `${t("repairPopup.phonePlaceholder")}*`,
								}}
							/>
							<Input
								inputAttrs={{
									value: name,
									onChange: e => setName(e.target.value),
									placeholder: `${t("repairPopup.namePlaceholder")}*`,
								}}
							/>
							<Textarea
								value={comment}
								onChange={e => setComment(e.target.value)}
								placeholder={t("repairPopup.commentPlaceholder")}
							/>
							<Button
								style={{ width: "100%" }}
								className={`mt-0 ${stylesRepairPage.popupButton}`}
								title={t("repairPopup.buttonSendRequest.title")}
								aria-label={t("repairPopup.buttonSendRequest.ariaLabel")}
								loading={buttonSendLoading}
								onClick={sendRequest}
							>
								{t("repairPopup.buttonSendRequest.title")}
							</Button>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</>
	);
};

export default RepairPopup;