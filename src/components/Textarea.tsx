import React from 'react';
import styles from "@/styles/components/Textarea.module.css";

const Textarea: React.FC<React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>> = ({ ...rest }) => {

	const className = {...rest};

	return (
		<textarea
			{...rest}
			className={`${className} ${styles.textarea}`}
		/>
	);
};

export default Textarea;