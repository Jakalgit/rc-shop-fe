"use client";

import React, {ComponentProps} from 'react';
import { motion } from 'framer-motion';
import styles from "@/styles/components/MotionMain.module.css";
import classNames from "classnames";

type Props = ComponentProps<typeof motion.main>

const MotionMain: React.FC<Props> = ({ ...rest }) => {

	const className = {...rest}.className

	return (
		<motion.main
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			{...rest}
			className={classNames(styles.MotionMain, className)}
		/>
	);
};

export default MotionMain;