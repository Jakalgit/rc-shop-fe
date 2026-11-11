"use client";

import React, {useEffect, useRef, useState} from "react";
import styles from "./Slider.module.css";
import stylesShared from "../shared-styles/SliderShared.module.css";
import classNames from "classnames";
import {SliderItem} from "../widgets/SliderItem";
import {SlideResponse} from "@/api/promotion-slider/types";
import ChevronRightIcon from "@/components/icons/ChevronRightIcon";

interface SliderProps {
	items: SlideResponse[];
}

const AUTOPLAY_MS = 10000;

export const Slider: React.FC<SliderProps> = React.memo(({ items }) => {

	const [slideIndex, setSlideIndex] = useState<number>(0);
	const dotsRef = useRef<HTMLDivElement>(null);

	const count = items.length;

	useEffect(() => {
		if (count < 2) return;

		const id = window.setTimeout(() => {
			setSlideIndex((prev) => (prev + 1) % count);
		}, AUTOPLAY_MS);

		return () => window.clearTimeout(id);
	}, [slideIndex, count]);

	useEffect(() => {
		const root = dotsRef.current;
		const active = root?.querySelector<HTMLButtonElement>("[aria-selected='true']");
		if (!root || !active) return;

		const left = active.offsetLeft - root.clientWidth / 2 + active.clientWidth / 2;
		root.scrollTo({left, behavior: "smooth"});
	}, [slideIndex]);

	const goTo = (index: number) => {
		if (index === slideIndex) return;
		setSlideIndex(index);
	};

	const nextSlide = () => {
		goTo((slideIndex + 1) % count);
	};

	const prevSlide = () => {
		goTo((slideIndex - 1 + count) % count);
	};

	if (count === 0) return null;

	return (
		<div
			className={`relative w-full overflow-hidden ${styles.wrapper} ${stylesShared.contentHeight}`}
		>
			{items.map((slide, index) =>
				<SliderItem
					key={slide.id}
					slideIndex={slideIndex}
					currentIndex={index}
					item={slide}
				/>
			)}
			{count > 1 && (
				<>
					<button
						type="button"
						onClick={prevSlide}
						className={classNames(styles.navBtn, styles.leftBtn)}
						aria-label="Предыдущий слайд"
						title="Предыдущий слайд"
					>
						<ChevronRightIcon className={classNames(styles.icon, styles.iconPrev)} />
					</button>
					<button
						type="button"
						onClick={nextSlide}
						className={classNames(styles.navBtn, styles.rightBtn)}
						aria-label="Следующий слайд"
						title="Следующий слайд"
					>
						<ChevronRightIcon className={styles.icon} />
					</button>
					<div
						ref={dotsRef}
						className={styles.sliderDots}
						role="tablist"
						aria-label="Слайды"
					>
						{items.map((slide, index) => (
							<button
								key={slide.id}
								type="button"
								role="tab"
								aria-label={`Слайд ${index + 1}`}
								aria-selected={index === slideIndex}
								className={classNames(styles.dot, {[styles.dotActive]: index === slideIndex})}
								onClick={() => goTo(index)}
							/>
						))}
					</div>
				</>
			)}
		</div>
	)
})
