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
		const measure = () => {
			if (!sectionRef.current || !sliderRef.current) return;

			const style = getComputedStyle(sectionRef.current);
			setCardSize(parseFloat(style.getPropertyValue('--card-size')));
			setRibbonGap(parseFloat(style.getPropertyValue('--ribbon-gap')));

			const totalWidth = sliderRef.current.scrollWidth;
			const visibleWidth = sliderRef.current.offsetWidth;
			setMaxOffset(Math.max(0, totalWidth - visibleWidth));
		};

		measure();
		window.addEventListener("resize", measure);
		return () => window.removeEventListener("resize", measure);
	}, [groupItems]);

	if (loading && groupItems.length > 0) return null;

	return (
		<section
			ref={sectionRef}
			className={`relative flex flex-col ${styles.similarProductsSection}`}
		>
			<h2>{t("similarProducts.head")}</h2>
			<div className={styles.similarRibbon}>
				<Button
					className={`absolute flex items-center justify-center ${styles.changeSlideButton} ${styles.leftChangeButton}`}
					title={t("similarProducts.buttonPreviousSlide.title")}
					aria-label={t("similarProducts.buttonPreviousSlide.ariaLabel")}
					onClick={scrollLeft}
					disabled={position >= 0}
				>
					<ChevronRightIcon style={{transform: `rotate(180deg)`}} />
				</Button>
				<Button
					className={`absolute flex items-center justify-center ${styles.changeSlideButton} ${styles.rightChangeButton}`}
					title={t("similarProducts.buttonNextSlide.title")}
					aria-label={t("similarProducts.buttonNextSlide.ariaLabel")}
					onClick={scrollRight}
					disabled={maxOffset <= 0 || position <= -maxOffset}
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
						{groupItems.map((item) =>
							<motion.a
								key={item.article}
								className={styles.sliderHref}
								href={`/product/${encodeURIComponent(item.article)}`}
							>
								<span className={styles.imageFrame}>
									<Image
										width={1000}
										height={1000}
										src={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${item.filename}`}
										alt={item.name || item.article}
										className={styles.imageSlider}
									/>
								</span>
								<span className={styles.cardName}>
									{item.name || item.article}
								</span>
							</motion.a>
						)}
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default SimilarProducts;