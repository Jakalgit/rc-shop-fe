"use client";

import styles from "./SliderItem.module.css";
import stylesShared from "../../../shared-styles/SliderShared.module.css";
import {AnimatePresence, motion} from "framer-motion";
import {RichText} from "@/widgets/RichText";
import ArrowRightIcon from "@/widgets/icons/ArrowRightIcon";
import React, {useEffect, useRef} from "react";
import {SlideResponse} from "@/api/promotion-slider/types";
import {FastAverageColor} from "fast-average-color";
import classNames from "classnames";

interface SliderItemProps {
	slideIndex: number;
	currentIndex: number;
	item: SlideResponse;
}

const fac = new FastAverageColor();

export const SliderItem: React.FC<SliderItemProps> = ({ slideIndex, currentIndex, item }) => {

	const imgRef = useRef<HTMLImageElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [isLightClass, setIsLightClass] = React.useState(true);

	useEffect(() => {
		const img = imgRef.current;
		if (!img) return;

		if (img.complete) {
			const color = fac.getColor(img);
			setIsLightClass(color.isLight);
		} else {
			img.onload = () => {
				const color = fac.getColor(img);
				setIsLightClass(color.isLight);
			};
		}
	}, [currentIndex, imgRef]);

	useEffect(() => {
		if (containerRef.current) {
			console.log(containerRef.current.getBoundingClientRect().width);
		}
	}, [containerRef]);

	return (
		<AnimatePresence>
			<motion.div
				ref={containerRef}
				className={`relative ${styles.slideWrapper}`}
				initial={{ width: currentIndex === slideIndex ? "100%" : 0 }}
				animate={{ width: currentIndex === slideIndex ? "100%" : 0 }}
				transition={{duration: 0.8, ease: "easeInOut"}}
			>
				<div className={`absolute flex flex-col items-end justify-center w-full h-full ${styles.contentWrapper}`}>
					<motion.div
						className={classNames(styles.content, {[styles.light]: isLightClass}, {[styles.dark]: !isLightClass})}
						initial={{opacity: 0}}
						animate={{opacity: currentIndex === slideIndex ? 1 : 0}}
						transition={{delay: 0.6, duration: 0.2}}
					>
						<div>
							<motion.h2
								initial={{opacity: 0}}
								animate={{opacity: currentIndex === slideIndex ? 1 : 0}}
								transition={{delay: 0.8, duration: 0.5}}
							>
								{item.title}
							</motion.h2>
							<motion.div
								className={styles.description}
								initial={{opacity: 0}}
								animate={{opacity: currentIndex === slideIndex ? 1 : 0}}
								transition={{delay: 0.9, duration: 0.5}}
							>
								<RichText text={item.text}/>
							</motion.div>
							<motion.div
								initial={{opacity: 0}}
								animate={{opacity: currentIndex === slideIndex ? 1 : 0}}
								transition={{delay: 1, duration: 0.5}}
							>
								<button className={styles.buttonView}>
									{item.buttonText}
									<ArrowRightIcon/>
								</button>
							</motion.div>
						</div>
					</motion.div>
				</div>
				<motion.img
					ref={imgRef}
					src={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${item.filename}`}
					alt="Slide"
					className={`absolute ${styles.image} ${stylesShared.contentHeight}`}
				/>
			</motion.div>
		</AnimatePresence>
	)
}