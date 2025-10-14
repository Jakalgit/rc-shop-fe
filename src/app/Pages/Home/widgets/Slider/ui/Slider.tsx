"use client";

import React, {useEffect, useRef, useState} from "react";
import styles from "./Slider.module.css";
import stylesShared from "../shared-styles/SliderShared.module.css";
import {motion} from "framer-motion";
import classNames from "classnames";
import {SliderItem} from "../widgets/SliderItem";
import {SlideResponse} from "@/api/promotion-slider/types";

interface SliderProps {
	items: SlideResponse[];
}

export const Slider: React.FC<SliderProps> = React.memo(({ items }) => {

	const [slideIndex, setSlideIndex] = useState<number>(0);

	const [dotSize, setDotSize] = useState<number>(0);
	const [dotMarginLeft, setDotMarginLeft] = useState<number>(0);

	const sliderDotsRef = useRef<HTMLDivElement>(null);

	const nextSlide = () => {
		setSlideIndex((prev) => (prev + 1) % items.length);
	};

	const prevSlide = () => {
		setSlideIndex((prev) => (prev - 1 + items.length) % items.length);
	};

	useEffect(() => {
		if (sliderDotsRef.current) {
			const dotWidth = Number(getComputedStyle(sliderDotsRef.current).getPropertyValue("--dot-size").replace("px", ""));
			const dotMarginLeft = Number(getComputedStyle(sliderDotsRef.current).getPropertyValue("--dot-margin-left").replace("px", ""));
			const newWidth = (dotWidth + dotMarginLeft) * 5;
			sliderDotsRef.current.style.width = `${newWidth}px`;
			setDotSize(dotWidth);
			setDotMarginLeft(dotMarginLeft);
		}
	}, [sliderDotsRef]);

	return (
		<div className={`relative w-full overflow-hidden ${styles.wrapper} ${stylesShared.contentHeight}`}>
			{items.map((slide, index) =>
				<SliderItem
					key={index}
					slideIndex={slideIndex}
					currentIndex={index}
					item={slide}
				/>
			)}
			<nav
				ref={sliderDotsRef}
				className={`absolute ${styles.sliderDots}`}
			>
				<motion.ul
					style={{width: `${(dotMarginLeft + dotSize) * items.length}px`}}
					animate={{
						left: -dotMarginLeft - (slideIndex - 1) * (dotMarginLeft + dotSize)
					}}
				>
					{items.map((s, i) => (
						<li className={classNames(styles.dot, styles.sliderDotsLi)} key={i}/>
					))}
				</motion.ul>
			</nav>
			<button
				onClick={prevSlide}
				className={classNames(styles.button, styles.leftBtn)}
			/>
			<button
				onClick={nextSlide}
				className={classNames(styles.button, styles.rightBtn)}
			/>
		</div>
	)
})