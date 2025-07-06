"use client";

import React, {ComponentProps} from 'react';
import { motion } from 'framer-motion';

type Props = ComponentProps<typeof motion.main>

const MotionMain: React.FC<Props> = ({ ...rest }) => {
	return (
		<motion.main
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			{...rest}
		/>
	);
};

export default MotionMain;