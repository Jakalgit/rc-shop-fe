import styles from "@/styles/components/buttons/Button.module.css";
import React from 'react';
import Loading from "@/components/Loading";
import classNames from "classnames";

export enum ButtonFillEnum {
	NONE = 0,
	DARK,
	LIGHT
}

export interface IButton extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	clickable?: boolean;
	loading?: boolean;
	loadingComponent?: React.ReactNode;
	children?: React.ReactNode;
	fill?: ButtonFillEnum;
}

const Button: React.FC<IButton> = (
	{
		clickable = true,
		loading = false,
		loadingComponent = <Loading className={styles.progress} />,
		children,
		fill = ButtonFillEnum.NONE,
		...rest
	}
) => {

	const className = rest.className || '';

	return (
		<button
			{...rest}
			className={classNames(
				styles.componentButton,
				{[`${styles.none}`]: fill === ButtonFillEnum.NONE},
				{[`${styles.dark}`]: fill === ButtonFillEnum.DARK},
				{[`${styles.light}`]: fill === ButtonFillEnum.LIGHT},
				className,
				{[`${styles.nonClickable}`]: !clickable || loading},
			)}
		>
			{loading ? (
				<>
					{loadingComponent}
				</>
			): (
				<>
					{children}
				</>
			)}
		</button>
	);
};

export default Button;