"use client";

import React, {useState} from 'react';
import styles from "@/styles/components/Slider.module.css";
import stylesPromotionsSlider from "@/styles/components/PromotionsSlider.module.css";
import ChevronRightIcon from "@/components/icons/ChevronRightIcon";
import {AnimatePresence, motion} from "framer-motion";
import Image from "next/image";
import {useTranslations} from "next-intl";

interface IProps {
	items: {image: string; href: string}[];
}

const PromotionsSlider: React.FC<IProps> = ({ items }) => {

	const t = useTranslations("promotionsSlider");

	const [index, setIndex] = useState(0);

	if (items.length === 0) {
		return null;
	}

	return (
		<div className="flex flex-col w-full">
			<div className="flex">
				<button
					className={`duration-300 ${styles.button}`}
					onClick={() => setIndex(prevState => prevState === 0 ? items.length - 1 : prevState - 1)}
				>
					<ChevronRightIcon style={{transform: "rotate(180deg)"}}/>
				</button>
				<a
					href={items[index].href}
					className={`relative flex justify-center flex-grow cursor-pointer ${stylesPromotionsSlider.itemSize} ${stylesPromotionsSlider.aBlock}`}
				>
					<AnimatePresence>
						<motion.div
							key={index}
							className="absolute"
							initial={{opacity: 0}}
							animate={{opacity: 1}}
							exit={{opacity: 0}}
							transition={{duration: 0.5}}
						>
							<Image
								src={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${items[index].image}`}
								alt="Slide image"
								width={500}
								height={500}
								className={stylesPromotionsSlider.itemSize}
							/>
						</motion.div>
					</AnimatePresence>
					<div className={`absolute ${stylesPromotionsSlider.textWrapper}`}>
						<p className={stylesPromotionsSlider.text}>{t("text")}</p>
					</div>
				</a>
				<button
					className={`duration-300 ${styles.button}`}
					onClick={() => setIndex(prevState => (prevState + 1) % items.length)}
				>
					<ChevronRightIcon/>
				</button>
			</div>
			<div className={`w-full max-w-full overflow-x-auto overflow-y-hidden ${styles.slides}`}>
				<div className="flex">
					{items.map((item, i) =>
						<Image
							key={i}
							src={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${item.image}`}
							width={500}
							height={500}
							alt="Slide image"
							style={i === index ? {outline: '1px solid red'} : {}}
							onClick={() => setIndex(i)}
						/>
					)}
				</div>
			</div>
		</div>
	)
};

export default PromotionsSlider;