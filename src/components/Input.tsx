"use client";

import React from 'react';
import styles from "@/styles/components/Input.module.css";

interface IProps {
	wrapperAttrs?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
	inputAttrs?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
}

const Input: React.FC<IProps> = ({ wrapperAttrs, inputAttrs }) => {

	const wrapperClassName = wrapperAttrs?.className || '';

	return (
		<div
			{...wrapperAttrs}
			className={`${styles.wrapper} ${wrapperClassName}`}
		>
			<input
				type="text"
				{...inputAttrs}
			/>
		</div>
	);
};

export default Input;