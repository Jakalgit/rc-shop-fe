import styles from "@/styles/components/buttons/Button.module.css";
import React from 'react';
import Loading from "@/components/Loading";
import classNames from "classnames";

export interface IButton extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	clickable?: boolean;
	loading?: boolean;
	loadingComponent?: React.ReactNode;
	children?: React.ReactNode;
}

const Button: React.FC<IButton> = (
	{
		clickable = true,
		loading = false,
		loadingComponent = <Loading className={styles.progress} />,
		children,
		...rest
	}
) => {

	const className = rest.className || '';

	return (
		<button
			{...rest}
			className={classNames(styles.componentButton, className, !clickable || loading ? styles.nonClickable : "")}
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