"use client";

import React from 'react';
import {Carousel} from "react-bootstrap";
import Image from "next/image";
import styles from "@/styles/pages/Repair.module.css";

const RepairSlider = () => {

	const images = [
		"sett.jpg", "short.jpg",
		"printer1.jpg", "printer2.jpg",
		"oils.jpg", "wheels.jpg",
	]

	return (
		<Carousel
			className={styles.slider}
			variant="dark"
		>
			{images.map((image, index) =>
				<Carousel.Item key={index}>
					<div className="flex items-center justify-center">
						<Image
							width={1500}
							height={1500}
							src={`/repair/${image}`}
							alt="slider image"
							className={styles.sliderImage}
						/>
					</div>
				</Carousel.Item>
			)}
		</Carousel>
	);
};

export default RepairSlider;