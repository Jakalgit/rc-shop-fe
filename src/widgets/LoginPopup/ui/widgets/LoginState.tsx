import Input from "@/components/Input";
import Button from "@/components/buttons/Button";
import styles from "@/styles/components/Popup.module.css";
import stylesLoginPopup from "../LoginPopup.module.css";
import React, {useCallback, useState} from "react";
import {loginProfile} from "@/api/profile/api";
import {RoutesEnum} from "@/shared/lib/routes.enum";
import {useRouter} from "next/navigation";
import Cookies from "universal-cookie";
import {useTranslations} from "next-intl";
import {StateWidgetProps} from "../../lib/state.props";
import {LoginPopupState} from "../../lib/states.enum";

export const LoginState: React.FC<StateWidgetProps> = ({ setIsPopupOpen, setViewState }) => {

	const router = useRouter();
	const cookies = new Cookies();
	const t = useTranslations("authPopup.login");

	const [buttonLoading, setButtonLoading] = useState<boolean>(false);
	const [identifier, setIdentifier] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const login = useCallback(async () => {
		try {
			if (identifier.length === 0 || password.length === 0) return;

			setButtonLoading(true);

			const response = await loginProfile({login: identifier, password: password});

			cookies.set("act", response.jwt);
			router.push(RoutesEnum.PROFILE)

			setIdentifier("");
			setPassword("");

			setIsPopupOpen(false);
		} catch (e: any) {
			alert(e?.response?.data?.message);
		}

		setButtonLoading(false);
	}, [identifier, password, router]);

	const switchToForgotPasswordState = useCallback(() => {
		setViewState(LoginPopupState.FORGOT_PASSWORD);
	}, [setViewState]);

	return (
		<>
			<Input
				inputAttrs={{
					value: identifier,
					onChange: e => setIdentifier(e.target.value),
					placeholder: `${t("identifierPlaceholder")}*`,
				}}
			/>
			<Input
				inputAttrs={{
					value: password,
					onChange: e => setPassword(e.target.value),
					placeholder: `${t("passwordPlaceholder")}*`,
					type: "password",
				}}
			/>
			<Button
				style={{ width: "100%" }}
				className={`mt-0 ${styles.resultButton}`}
				title={t("buttonLogin.title")}
				aria-label={t("buttonLogin.ariaLabel")}
				loading={buttonLoading}
				onClick={login}
			>
				{t("buttonLogin.title")}
			</Button>
			<Button
				title={t("buttonForgotPassword.title")}
				aria-label={t("buttonForgotPassword.ariaLabel")}
				onClick={switchToForgotPasswordState}
				className={`mt-0 ${stylesLoginPopup.switchStateButton}`}
			>
				{t("buttonForgotPassword.title")}
			</Button>
		</>
	)
}