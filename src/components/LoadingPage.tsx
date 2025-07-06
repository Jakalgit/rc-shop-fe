"use client";

import React from 'react';
import styles from "@/styles/components/LoadingPage.module.css";
import Loading from "@/components/Loading";
import {motion} from "framer-motion";

const LoadingPage = () => {
	return (
		<motion.section
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="flex items-center justify-center"
		>
			<Loading className={styles.svg} />
		</motion.section>
	);
};

export default LoadingPage;