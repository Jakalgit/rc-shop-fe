"use client";

import React, {useState} from 'react';
import styles from "@/styles/pages/Partners.module.css";
import Input from "@/components/Input";
import {useTranslations} from "next-intl";
import Textarea from "@/components/Textarea";
import Button from "@/components/buttons/Button";
import Image from "next/image";

const PartnersForm = () => {

	const t = useTranslations("PartnersPage.partnerForm");

	const [name, setName] = useState<string>("");
	const [organization, setOrganization] = useState<string>("");
	const [phone, setPhone] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [description, setDescription] = useState<string>("");

	const [buttonLoading, setButtonLoading] = useState<boolean>(false);

	const sendRequest = async () => {

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
				/>
				<Button
					title={t("buttonSendRequest.title")}
					aria-label={t("buttonSendRequest.ariaLabel")}
					onClick={sendRequest}
					loading={buttonLoading}
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
};

export default PartnersForm;