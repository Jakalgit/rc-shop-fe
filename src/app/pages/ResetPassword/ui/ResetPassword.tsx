"use client";

import MotionMain from "@/components/MotionMain";
import React, {useCallback} from "react";
import {useTranslations} from "next-intl";
import {useRouter, useSearchParams} from "next/navigation";
import Input from "@/components/Input";
import styles from "./ResetPassword.module.css";
import Button from "@/components/buttons/Button";
import {confirmResetPassword} from "@/api/profile/api";
import {RoutesEnum} from "@/shared/lib/routes.enum";
import Head from "next/head";
import {Container} from "react-bootstrap";

export const ResetPassword = () => {

	const router = useRouter();
	const t = useTranslations("ResetPasswordPage");
	const searchParams = useSearchParams();

	const token: string = searchParams?.get("token") || "";

	const [buttonLoading, setButtonLoading] = React.useState(false);
	const [password, setPassword] = React.useState<string>("");
	const [repeatPassword, setRepeatPassword] = React.useState<string>("");

	const onClickSavePassword = useCallback(async () => {
		try {
			if (password.length < 8) {
				alert(t.rich("errors.minLength", { value: 8 }));
				return;
			}

			if (password !== repeatPassword) {
				alert(t("errors.passwordsNotEquals"));
				return;
			}

			setButtonLoading(true);
			await confirmResetPassword({token, password});

			alert(t("success"));
			router.push(RoutesEnum.PARTNERS);
		} catch (e) {
			console.error(e);
			alert(t("errors.result"))
		}
		setButtonLoading(false);
	}, [password, repeatPassword, token]);

	return (
		<>
			<Head>
				<title>{t("title")}</title>
				<meta name="description" content={t("description")} />
			</Head>
			<MotionMain className="flex items-center justify-center">
				<Container className={`flex flex-col ${styles.wrapper}`}>
					<Input
						inputAttrs={{
							value: password,
							onChange: e => setPassword(e.target.value),
							placeholder: `${t("passwordPlaceholder")}*`,
							type: "password",
						}}
					/>
					<Input
						inputAttrs={{
							value: repeatPassword,
							onChange: e => setRepeatPassword(e.target.value),
							placeholder: `${t("repeatPasswordPlaceholder")}*`,
							type: "password",
						}}
					/>
					<Button
						title={t("buttonSave.title")}
						aria-label={t("buttonSave.ariaLabel")}
						onClick={onClickSavePassword}
						loading={buttonLoading}
					>
						{t("buttonSave.title")}
					</Button>
				</Container>
			</MotionMain>
		</>
	)
}