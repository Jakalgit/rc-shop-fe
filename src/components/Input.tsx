"use client";

import React, {useCallback} from 'react';
import styles from "@/styles/components/Input.module.css";
import VisibilityIcon from "@/components/icons/VisibilityIcon";
import VisibilityOffIcon from "@/components/icons/VisibilityOffIcon";
import Button from "@/components/buttons/Button";
import {useTranslations} from "next-intl";

interface IProps {
	wrapperAttrs?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
	inputAttrs?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
}

const Input: React.FC<IProps> = ({ wrapperAttrs, inputAttrs }) => {

	const t = useTranslations("inputComponent");

	const wrapperClassName = wrapperAttrs?.className || '';
	const type = inputAttrs?.type || 'text';

	const [visibilityPassword, setVisibilityPassword] = React.useState<boolean>(false);

	const setVisibilityPasswordOn = useCallback(() => {
		setVisibilityPassword(true);
	}, []);

	const setVisibilityPasswordOff = useCallback(() => {
		setVisibilityPassword(false);
	}, []);

	return (
		<div
			{...wrapperAttrs}
			className={`${styles.wrapper} ${wrapperClassName}`}
		>
			<input
				{...inputAttrs}
				type={visibilityPassword ? "text" : type}
			/>
			{type === "password" && (
				<>
					{visibilityPassword ? (
						<Button
							title={t("buttonVisibilityOff.title")}
							aria-label={t("buttonVisibilityOff.ariaLabel")}
							onClick={setVisibilityPasswordOff}
							className={styles.buttonVisibility}
						>
							<VisibilityOffIcon className={styles.icon} />
						</Button>
					) : (
						<Button
							title={t("buttonVisibilityOn.title")}
							aria-label={t("buttonVisibilityOn.ariaLabel")}
							onClick={setVisibilityPasswordOn}
							className={styles.buttonVisibility}
						>
							<VisibilityIcon className={styles.icon} />
						</Button>
					)}
				</>
			)}
		</div>
	);
};

export default Input;