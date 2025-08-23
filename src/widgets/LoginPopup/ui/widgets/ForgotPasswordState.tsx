import React, {useCallback, useState} from "react";
import Input from "@/components/Input";
import {useTranslations} from "next-intl";
import Button from "@/components/buttons/Button";
import {StateWidgetProps} from "@/widgets/LoginPopup/lib/state.props";
import {LoginPopupState} from "@/widgets/LoginPopup/lib/states.enum";
import {resetPasswordByEmail} from "@/api/profile/api";
import styles from "@/styles/components/Popup.module.css";
import stylesLoginPopup from "../LoginPopup.module.css";

export const ForgotPasswordState: React.FC<StateWidgetProps> = ({ setIsPopupOpen, setViewState }) => {

	const t = useTranslations("authPopup.forgotPassword");

	const [buttonLoading, setButtonLoading] = useState<boolean>(false);
	const [email, setEmail] = useState<string>("");

	const sendResetRequest = useCallback(async () => {
		try {
			setButtonLoading(true);

			await resetPasswordByEmail({email});

			alert(t("success"));
			setIsPopupOpen(false);
		} catch (e: any) {
			console.error(e);
			alert(e?.response?.data?.message);
		}
		setButtonLoading(false);
	}, [email]);

	const switchToLoginState = useCallback(() => {
		setViewState(LoginPopupState.LOGIN);
	}, [setViewState])

	return (
		<>
			<Input
				inputAttrs={{
					value: email,
					onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
					placeholder: t("emailPlaceholder"),
					type: "email"
				}}
			/>
			<Button
				style={{ width: "100%" }}
				className={`mt-0 ${styles.resultButton}`}
				title={t("buttonRequest.title")}
				aria-label={t("buttonRequest.ariaLabel")}
				loading={buttonLoading}
				onClick={sendResetRequest}
			>
				{t("buttonRequest.title")}
			</Button>
			<Button
				title={t("buttonLogin.title")}
				aria-label={t("buttonLogin.ariaLabel")}
				onClick={switchToLoginState}
				className={`mt-0 ${stylesLoginPopup.switchStateButton}`}
			>
				{t("buttonLogin.title")}
			</Button>
		</>
	)
}