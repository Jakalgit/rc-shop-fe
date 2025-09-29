"use client";

import {AnimatePresence, motion} from "framer-motion";
import stylesPopup from "@/styles/components/Popup.module.css";
import styles from "./SubCategoriesPopup.module.css";
import React, {useEffect, useRef} from "react";
import Button from "@/components/buttons/Button";
import CloseIcon from "@/components/icons/CloseIcon";
import {useTranslations} from "next-intl";
import {useHomeHook} from "../../../providers/HomeProvider";
import Image from "next/image";
import {useRouter} from "next/navigation";

export function SubCategoriesPopup() {

	const router = useRouter();

	const t = useTranslations("HomePage.SubCategoriesPopup");
	const gridRef = useRef<HTMLDivElement>(null);
	const itemRef = useRef<HTMLButtonElement>(null);

	const {visibleSubCategoriesPopup, toggleSubCategoriesPopup, subCategories} = useHomeHook();

	const onClickSubBlock = (href: string) => {
		router.push(href);
	}

	useEffect(() => {
		if (!visibleSubCategoriesPopup) return;
		if (gridRef.current && itemRef.current) {
			const gap = Number(getComputedStyle(gridRef.current).getPropertyValue("--gap").replace("px", ""));
			const itemHeight = itemRef.current.clientHeight;
			const newHeight = itemHeight * 3 + gap * 2 + 10;
			gridRef.current.style.height = `${newHeight}px`;
		}
	}, [visibleSubCategoriesPopup]);

	return (
		<AnimatePresence>
			{visibleSubCategoriesPopup && (
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
						aria-labelledby="show-sub-categories-popup-label"
						aria-describedby="show-sub-categories-describe"
						className={`flex flex-col ${stylesPopup.popupContent} ${styles.popupContent}`}
					>
						<div className={`flex items-center justify-between ${stylesPopup.popupHead}`}>
							<h2 id="login-popup-title">
								{t("title")}
							</h2>
							<Button
								className="p-0"
								onClick={() => toggleSubCategoriesPopup(false)}
								title={t("buttonClosePopup.title")}
								aria-label={t("buttonClosePopup.ariaLabel")}
							>
								<CloseIcon/>
							</Button>
						</div>
						<div
							ref={gridRef}
							className={`grid ${styles.grid}`}
						>
							{subCategories.sort((a, b) => a.index - b.index).map((el, i) =>
								<Button
									key={i}
									ref={itemRef}
									className={`flex flex-col justify-between ${styles.gridItem}`}
									onClick={() => onClickSubBlock(el.blockLink)}
								>
									<div className={`flex items-center justify-center ${styles.imageWrapper}`}>
										<Image
											width={100}
											height={100}
											src={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${el.image}`}
											alt={"image"}
										/>
									</div>
									<h3 className="fw-normal">
										{el.name}
									</h3>
								</Button>
							)}
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	)
}