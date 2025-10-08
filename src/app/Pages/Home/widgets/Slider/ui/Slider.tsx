"use client";

import React, {useEffect, useRef, useState} from "react";
import styles from "./Slider.module.css";
import {AnimatePresence, motion} from "framer-motion";
import classNames from "classnames";
import {Container} from "react-bootstrap";

const slides = [
	{
		id: 1,
		image: "/test/GOARC_hero.jpg",
		title: "Ремонт моделей",
		text: "Обслуживание и тюнинг вашей модели",
		button: "Подробнее"
	},
	{
		id: 2,
		image: "/test/GOARC_hero.jpg",
		title: "Модели Traxxas",
		text: "Открой для себя лучшие новинки сезона",
		button: "Смотреть"
	},
	{
		id: 3,
		image: "/test/GOARC_hero.jpg",
		title: "Ремонт моделей",
		text: "Обслуживание и тюнинг вашей модели",
		button: "Подробнее"
	},
	{
		id: 4,
		image: "/test/GOARC_hero.jpg",
		title: "Модели Traxxas",
		text: "Открой для себя лучшие новинки сезона",
		button: "Смотреть"
	},
	{
		id: 5,
		image: "/test/GOARC_hero.jpg",
		title: "Ремонт моделей",
		text: "Обслуживание и тюнинг вашей модели",
		button: "Подробнее"
	},
	{
		id: 6,
		image: "/test/GOARC_hero.jpg",
		title: "Модели Traxxas",
		text: "Открой для себя лучшие новинки сезона",
		button: "Смотреть"
	},
	{
		id: 7,
		image: "/test/GOARC_hero.jpg",
		title: "Ремонт моделей",
		text: "Обслуживание и тюнинг вашей модели",
		button: "Подробнее"
	},
	{
		id: 8,
		image: "/test/GOARC_hero.jpg",
		title: "Модели Traxxas",
		text: "Открой для себя лучшие новинки сезона",
		button: "Смотреть"
	},
	{
		id: 9,
		image: "/test/GOARC_hero.jpg",
		title: "Ремонт моделей",
		text: "Обслуживание и тюнинг вашей модели",
		button: "Подробнее"
	},
	{
		id: 10,
		image: "/test/GOARC_hero.jpg",
		title: "Модели Traxxas",
		text: "Открой для себя лучшие новинки сезона",
		button: "Смотреть"
	},
	{
		id: 11,
		image: "/test/GOARC_hero.jpg",
		title: "Ремонт моделей",
		text: "Обслуживание и тюнинг вашей модели",
		button: "Подробнее"
	},
	{
		id: 12,
		image: "/test/GOARC_hero.jpg",
		title: "Модели Traxxas",
		text: "Открой для себя лучшие новинки сезона",
		button: "Смотреть"
	}
];

export const Slider = React.memo(() => {

	const [direction, setDirection] = useState<number>(0);
	const [index, setIndex] = useState<number>(1);

	const [dotSize, setDotSize] = useState<number>(0);
	const [dotMarginLeft, setDotMarginLeft] = useState<number>(0);

	const sliderDotsRef = useRef<HTMLDivElement>(null);

	const nextSlide = () => {
		setDirection(1);
		setIndex((prev) => (prev + 1) % slides.length);
	};

	const prevSlide = () => {
		setDirection(-1);
		setIndex((prev) => (prev - 1 + slides.length) % slides.length);
	};

	const variants = {
		enter: (dir: 1 | -1) => ({
			x: dir > 0 ? 200 : -200,
			opacity: 0,
			scale: 0.95,
		}),
		center: {
			x: 0,
			opacity: 1,
			scale: 1,
			transition: { duration: 0.8, ease: "easeOut" },
		},
		exit: (dir: 1 | -1) => ({
			x: dir > 0 ? -200 : 200,
			opacity: 0,
			scale: 0.95,
			transition: { duration: 0.6, ease: "easeIn" },
		}),
	};

	const slide = slides[index];

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
		<div className={`relative w-full overflow-hidden ${styles.wrapper}`}>
			<AnimatePresence custom={direction}>

			</AnimatePresence>

			<div className={`absolute w-full h-full ${styles.content}`}>
				<Container>

				</Container>
			</div>

			<nav
				ref={sliderDotsRef}
				className={`absolute ${styles.sliderDots}`}
			>
				<motion.ul
					style={{ width: `${(dotMarginLeft + dotSize) * slides.length}px` }}
					animate={{
						left: -dotMarginLeft - (index - 1) * (dotMarginLeft + dotSize)
					}}
				>
					{slides.map((s, i) => (
						<li className={classNames(styles.dot, styles.sliderDotsLi)} key={i} />
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