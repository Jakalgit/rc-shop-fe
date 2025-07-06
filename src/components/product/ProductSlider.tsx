"use client";

import React from 'react';
import {Carousel} from "react-bootstrap";
import styles from "@/styles/pages/Product.module.css";
import Image from "next/image";

interface IProps {
	images: string[];
}

const ProductSlider: React.FC<IProps> = ({ images }) => {
	return (
		<Carousel className={styles.sliderImage}>
			{images.map((image, i) =>
				<Carousel.Item key={i}>
					<Image
						width={1000}
						height={1000}
						src={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${image}`}
						alt="slider image"
						className={styles.sliderImage}
					/>
				</Carousel.Item>
			)}
		</Carousel>
	)
};

export default ProductSlider;