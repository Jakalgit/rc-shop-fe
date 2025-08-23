import React from 'react';
import styles from "@/styles/components/Textarea.module.css";
import {useTranslations} from "next-intl";

interface TextareaProps extends React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
	symbolCount?: boolean;
}

const Textarea: React.FC<TextareaProps> = ({ symbolCount, ...rest }) => {

	const t = useTranslations("textarea");
	const { className, value } = {...rest};

	return (
		<div className="flex flex-col">
			<textarea
				{...rest}
				className={`${className} ${styles.textarea}`}
			/>
			{symbolCount && (
				<span className={styles.symbolCount}>
					{t("symbolCount")}: {value?.toString().length}
				</span>
			)}
		</div>
	);
};

export default Textarea;