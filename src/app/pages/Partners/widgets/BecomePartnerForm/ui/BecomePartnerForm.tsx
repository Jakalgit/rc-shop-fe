"use client";

import {useTranslations} from "next-intl";
import React, {useState} from "react";
import {createPartner} from "@/api/profile/api";
import styles from "./BecomePartnerForm.module.css";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import Button from "@/components/buttons/Button";
import Image from "next/image";

export const BecomePartnerForm = () => {

	const t = useTranslations("PartnersPage.partnerForm");

	const [name, setName] = useState<string>("");
	const [organization, setOrganization] = useState<string>("");
	const [phone, setPhone] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [description, setDescription] = useState<string>("");

	const [buttonLoading, setButtonLoading] = useState<boolean>(false);

	const [policyChecked, setPolicyChecked] = useState<boolean>(false);

	const sendRequest = async () => {
		try {
			if (!policyChecked) {
				alert("errors.policyChecked");
				return;
			}

			if (name.length < 2 || name.length > 50) {
				alert(t.rich("errors.name", { min: 2, max: 50 }));
				return;
			}

			if (organization.length < 10 || organization.length > 90) {
				alert(t.rich("errors.organization", { min: 10, max: 90 }));
				return;
			}

			if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
				alert(t("errors.email"));
				return;
			}

			if (!/^(\+7)\d{10}$/.test(phone)) {
				alert(t("errors.phone"));
				return;
			}

			if (description.length < 50 || description.length > 500) {
				alert(t.rich("errors.description", { min: 50, max: 500 }));
				return;
			}

			setButtonLoading(true);

			await createPartner({
				name,
				organization,
				phone,
				email,
				descriptionOfActivities: description,
			});

			alert(t("resultRequest"));

			setName("");
			setOrganization("");
			setPhone("");
			setEmail("");
			setDescription("");
			setPolicyChecked(false);
		} catch (e: any) {
			alert(e?.response?.data?.message);
		}

		setButtonLoading(false);
	}

	return (
		<div className={`flex ${styles.form}`}>
			<div className={`flex flex-col ${styles.partForm}`}>
				<Input
					inputAttrs={{
						placeholder: t("namePlaceholder"),
						value: name,
						onChange: (e) => setName(e.target.value),
					}}
				/>
				<Input
					inputAttrs={{
						placeholder: t("organizationPlaceholder"),
						value: organization,
						onChange: (e) => setOrganization(e.target.value),
					}}
				/>
				<Input
					inputAttrs={{
						placeholder: t("phonePlaceholder"),
						value: phone,
						onChange: (e) => setPhone(e.target.value),
					}}
				/>
				<Input
					inputAttrs={{
						placeholder: t("emailPlaceholder"),
						value: email,
						onChange: (e) => setEmail(e.target.value),
					}}
				/>
				<Textarea
					placeholder={t("descriptionPlaceholder")}
					rows={3}
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					symbolCount
				/>
				<label className={`flex items-center ${styles.labelCheckbox}`}>
					<input
						type="checkbox"
						name="privacyPolicy"
						checked={policyChecked}
						onChange={(e) => setPolicyChecked(e.target.checked)}
						required
					/>
					Я согласен(а) с
					&nbsp;<a href="/privacy-policy" target="_blank" rel="noopener noreferrer">политикой конфиденциальности</a>
					&nbsp;и
					&nbsp;<a href="/user-agreement" target="_blank" rel="noopener noreferrer">пользовательским соглашением</a>
				</label>
				<Button
					title={t("buttonSendRequest.title")}
					aria-label={t("buttonSendRequest.ariaLabel")}
					onClick={sendRequest}
					loading={buttonLoading}
					clickable={policyChecked}
					className={styles.button}
				>
					{t("buttonSendRequest.title")}
				</Button>
			</div>
			<div className={`flex items-center justify-center ${styles.partForm}`}>
				<Image
					src={'/partners/gklasse.jpg'}
					alt="g-class 6x6"
					className={styles.formImage}
					width={200}
					height={200}
				/>
			</div>
		</div>
	);
}