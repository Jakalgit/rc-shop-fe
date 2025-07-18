"use client";

import React, {useEffect, useRef, useState} from 'react';
import {AnimatePresence, motion} from "framer-motion";
import stylesPopup from "@/styles/components/Popup.module.css";
import styles from "@/styles/components/ImageViewPopup.module.css"
import Button from "@/components/buttons/Button";
import CloseIcon from "@/components/icons/CloseIcon";
import {useTranslations} from "next-intl";
import Image from "next/image";

interface IProps {
	isOpen: boolean;
	closePopup: () => void;
	source: string;
}

const ImageViewPopup: React.FC<IProps> = ({ isOpen, closePopup, source }) => {

	const t = useTranslations("ProductPage.imagePopup");

	const wrapperRef = useRef<HTMLDivElement>(null);

	const [maxSize, setMaxSize] = useState<{width: number, height: number}>({width: 0, height: 0});

	useEffect(() => {
		if (wrapperRef.current) {
			setMaxSize({width: wrapperRef.current.clientWidth, height: wrapperRef.current.clientHeight});
		}
	}, [wrapperRef]);

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					<motion.div
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						exit={{opacity: 0}}
						className={stylesPopup.popupBackground}
						aria-hidden="true"
					/>
					<motion.div
						initial={{opacity: 0, marginTop: 80}}
						animate={{opacity: 1, marginTop: 0}}
						exit={{opacity: 0, marginTop: 80}}
						aria-modal="true"
						aria-labelledby="repair-popup-title"
						aria-describedby="repair-popup-desc"
						className={`flex flex-col ${stylesPopup.popupContent} ${styles.popup}`}
					>
						<div className={`flex items-center justify-between ${stylesPopup.popupHead}`}>
							<Button
								className="p-0 ml-auto"
								onClick={closePopup}
								title={t("buttonClosePopup.title")}
								aria-label={t("buttonClosePopup.ariaLabel")}
							>
								<CloseIcon/>
							</Button>
						</div>
						<div
							ref={wrapperRef}
							className="flex items-center justify-center flex-grow-1 w-full"
						>
							<Image
								src={source}
								alt="model image"
								width={800}
								height={800}
								style={{ maxWidth: maxSize.width, maxHeight: maxSize.height }}
								className={styles.image}
							/>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
};

export default ImageViewPopup;