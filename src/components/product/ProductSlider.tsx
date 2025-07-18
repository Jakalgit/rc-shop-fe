"use client";

import React, {useEffect, useRef, useState} from 'react';
import styles from "@/styles/components/Slider.module.css";
import Image from "next/image";
import {motion, AnimatePresence} from "framer-motion";
import ChevronRightIcon from "@/components/icons/ChevronRightIcon";
import {usePreloadImagesWithCallback} from "@/functions/usePreloadImages";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

interface IProps {
	images: string[];
}

const ProductSlider: React.FC<IProps> = ({ images }) => {

	const [loadingImages, setLoadingImages] = useState<boolean>(true);

	const [index, setIndex] = useState(0);
	const [listWidth, setListWidth] = useState(0);
	const [isOpenPopup, setIsOpenPopup] = useState(false);

	const wrapperRef = useRef<HTMLDivElement>(null);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	const updateIndex = (index: number) => {
		setIndex(index);
		restartSliderTimeout();
	}

	const genInterval = () => {
		return setInterval(() => {
			setIndex(prevState => (prevState + 1) % images.length);
		}, 10000);
	}

	const restartSliderTimeout = () => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = genInterval();
		}
	}

	const openImagePopup = () => {
		setIsOpenPopup(true);
	}

	const closeImagePopup = () => {
		setIsOpenPopup(false);
	}

	useEffect(() => {
		intervalRef.current = genInterval();

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		}
	}, []);

	useEffect(() => {
		if (wrapperRef.current) {
			setListWidth(wrapperRef.current.clientWidth);
		}
	}, [wrapperRef.current]);

	useEffect(() => {
		restartSliderTimeout();
	}, [isOpenPopup]);

	usePreloadImagesWithCallback(images, () => {
		setLoadingImages(false);
	});

	return (
		<>
			<Lightbox
				open={isOpenPopup}
				close={closeImagePopup}
				plugins={[Zoom]}
				zoom={{
					maxZoomPixelRatio: 5,
					zoomInMultiplier: 2,
					doubleTapDelay: 300,
					doubleClickDelay: 300,
					scrollToZoom: true,
				}}
				slides={images.map(el => ({src: `${process.env.NEXT_PUBLIC_CLOUD_URL}/${el}`}))}
			/>
			<div
				ref={wrapperRef}
				className="flex flex-col w-full"
			>
				<div className="flex">
					<button
						className={`duration-300 ${styles.button}`}
						onClick={() => updateIndex(index === 0 ? images.length - 1 : index - 1)}
						disabled={loadingImages}
					>
						<ChevronRightIcon style={{transform: "rotate(180deg)"}}/>
					</button>
					<div className={`relative flex justify-center flex-grow ${styles.imageWrapper}`}>
						<AnimatePresence initial={false}>
							<motion.div
								key={index}
								className="absolute"
								style={{transform: 'translateX(-50%)'}}
								initial={{opacity: 0, y: 50}}
								animate={{opacity: 1, y: 0}}
								exit={{opacity: 0, y: -50}}
								transition={{duration: 0.5}}
								onClick={openImagePopup}
							>
								{loadingImages ? (
									<>
										Loading...
									</>
								) : (
									<Image
										src={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${images[index]}`}
										alt="Slide image"
										width={500}
										height={500}
										className={styles.currentImage}
									/>
								)}
							</motion.div>
						</AnimatePresence>
					</div>
					<button
						className={`duration-300 ${styles.button}`}
						onClick={() => updateIndex((index + 1) % images.length)}
						disabled={loadingImages}
					>
						<ChevronRightIcon/>
					</button>
				</div>
				<div
					style={{maxWidth: listWidth}}
					className={`w-full max-w-full overflow-x-auto overflow-y-hidden ${styles.slides}`}
				>
					<div className="flex">
						{images.map((filename, i) =>
							<Image
								key={i}
								src={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${filename}`}
								width={500}
								height={500}
								alt="Slide image"
								style={i === index ? {outline: '1px solid red'} : {}}
								onClick={() => updateIndex(i)}
							/>
						)}
					</div>
				</div>
			</div>
		</>
	)
};

export default ProductSlider;