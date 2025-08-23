"use client";

import React from 'react';
import styles from "@/styles/components/LoadingPage.module.css";
import Loading from "@/components/Loading";
import {motion} from "framer-motion";
import MotionMain from "@/components/MotionMain";

const LoadingPage = () => {
	return (
		<MotionMain>
			<motion.section
				initial={{opacity: 0}}
				animate={{opacity: 1}}
				className="flex items-center justify-center h-full"
			>
				<Loading className={styles.svg}/>
			</motion.section>
		</MotionMain>
	);
};

export default LoadingPage;