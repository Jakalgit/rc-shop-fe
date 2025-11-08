"use client";

import React, {useEffect, useRef, useState} from 'react';
import styles from "@/styles/pages/Product.module.css";
import {useTranslations} from "next-intl";
import Button from "@/components/buttons/Button";
import ChevronRightIcon from "@/components/icons/ChevronRightIcon";
import {motion} from "framer-motion";
import Image from "next/image";
import {ProductGroupItemResponse} from "@/api/product-groups/types";
import {getProductGroupItems} from "@/api/product-groups/api";

interface IProps {
	article: string;
	productGroupId: number;
}

const SimilarProducts: React.FC<IProps> = ({ productGroupId, article }) => {

	const t = useTranslations("ProductPage");

	const [loading, setLoading] = useState<boolean>(true);
	const [groupItems, setGroupItems] = useState<ProductGroupItemResponse[]>([]);

	const [position, setPosition] = useState(0);
	const [maxOffset, setMaxOffset] = useState(0);

	const [cardSize, setCardSize] = useState(0);
	const [ribbonGap, setRibbonGap] = useState(0);

	const sliderRef = useRef<HTMLDivElement>(null);
	const sectionRef = useRef<HTMLElement>(null);

	const scrollLeft = () => {
		setPosition(prev => Math.min(prev + cardSize + ribbonGap, 0));
	};

	const scrollRight = () => {
		setPosition(prev => Math.max(prev - (cardSize + ribbonGap), -maxOffset));
	};

	async function getData() {
		try {
			const response = await getProductGroupItems(productGroupId);

			setGroupItems(response.filter(el => el.article !== article));
			setLoading(false);
		} catch {}
	}

	useEffect(() => {
		getData();
	}, []);

	useEffect(() => {
		if (sliderRef.current) {
			const totalWidth = sliderRef.current.scrollWidth;
			const visibleWidth = sliderRef.current.offsetWidth;
			setMaxOffset(totalWidth - visibleWidth);
		}
	}, []);

	useEffect(() => {
		if (sectionRef.current) {
			const style = getComputedStyle(sectionRef.current);
			const valueSize = style.getPropertyValue('--card-size');
			const valueGap = style.getPropertyValue('--ribbon-gap');

			setCardSize(parseFloat(valueSize));
			setRibbonGap(parseFloat(valueGap));
		}
	}, [sectionRef]);

	if (loading && groupItems.length > 0) return null;

	return (
		<section
			ref={sectionRef}
			className={`relative flex flex-col ${styles.similarProductsSection}`}
		>
			<h2>{t("similarProducts.head")}</h2>
			<Button
				className={`absolute flex items-center justify-center ${styles.changeSlideButton} ${styles.leftChangeButton}`}
				title={t("similarProducts.buttonPreviousSlide.title")}
				aria-label={t("similarProducts.buttonPreviousSlide.ariaLabel")}
				onClick={scrollLeft}
			>
				<ChevronRightIcon style={{transform: `rotate(180deg)`}} />
			</Button>
			<Button
				className={`absolute flex items-center justify-center ${styles.changeSlideButton} ${styles.rightChangeButton}`}
				title={t("similarProducts.buttonNextSlide.title")}
				aria-label={t("similarProducts.buttonNextSlide.ariaLabel")}
				onClick={scrollRight}
			>
				<ChevronRightIcon />
			</Button>
			<div className="overflow-hidden">
				<motion.div
					ref={sliderRef}
					className="flex"
					style={{ gap: 'var(--ribbon-gap)' }}
					animate={{ x: position }}
					transition={{ type: 'spring', stiffness: 300, damping: 30 }}
				>
					{groupItems.map((item, i) =>
						<motion.a
							key={i}
							className={styles.sliderHref}
							href={`https://work-rc.ru/product/${item.article}`}
						>
							<Image
								width={1000}
								height={1000}
								src={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${item.filename}`}
								alt=""
								className={styles.imageSlider}
							/>
						</motion.a>
					)}
				</motion.div>
			</div>
		</section>
	);
};

export default SimilarProducts;