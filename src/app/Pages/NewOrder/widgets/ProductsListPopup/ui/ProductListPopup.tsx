"use client";

import stylesPopup from "@/styles/components/Popup.module.css";
import styles from "./ProductListPopup.module.css";

import {AnimatePresence, motion} from "framer-motion";
import React, {useEffect} from "react";
import {useTranslations} from "next-intl";
import Button from "@/components/buttons/Button";
import CloseIcon from "@/components/icons/CloseIcon";
import {OrderItem, OrderItemAccessEnum} from "@/widgets/OrderItem";
import {ProductResponse} from "@/api/products/types";
import classNames from "classnames";

interface ProductListProps {
	isOpen: boolean;
	onClose: () => void;
	basketProducts: ProductResponse[];
}

export function ProductListPopup({isOpen, onClose, basketProducts}: ProductListProps) {

	const t = useTranslations("NewOrderPage.productList");
	const itemRef = React.useRef<HTMLDivElement>(null);
	const listRef = React.useRef<HTMLUListElement>(null);

	useEffect(() => {
		if (!isOpen) return;
		if (itemRef.current && listRef.current) {
			const itemHeight = itemRef.current.clientHeight;
			const listHeight = listRef.current.clientHeight;
			const itemCount = Math.floor(listHeight / itemHeight);
			listRef.current.style.height = `${itemCount * itemHeight}px`;
		}
	}, [isOpen]);

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
						aria-labelledby="login-popup-title"
						aria-describedby="login-popup-desc"
						className={`flex flex-col ${classNames(stylesPopup.popupContent, styles.popupContent)}`}
					>
						<div className={`flex items-center justify-between ${stylesPopup.popupHead}`}>
							<h2 id="login-popup-title">
								{t("title")}
							</h2>
							<Button
								className="p-0"
								onClick={onClose}
								title={t("buttonClosePopup.title")}
								aria-label={t("buttonClosePopup.ariaLabel")}
							>
								<CloseIcon/>
							</Button>
						</div>
						<p className={styles.clue}>
							{t("clue")}
						</p>
						<ul
							className={styles.list}
							ref={listRef}
						>
							{basketProducts.map((item) =>
								<div
									ref={itemRef}
									key={item.article}
								>
									<OrderItem
										itemData={{...item}}
										removeItem={() => {}}
										updateCartPrice={() => {}}
										itemType={OrderItemAccessEnum.READONLY}
									/>
								</div>
							)}
						</ul>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	)
}