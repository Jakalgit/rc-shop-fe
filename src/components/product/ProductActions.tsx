"use client";

import React, {useCallback, useState} from 'react';
import styles from "@/styles/pages/Product.module.css";
import Button from "@/components/buttons/Button";
import ChevronRightIcon from "@/components/icons/ChevronRightIcon";
import {useTranslations} from "next-intl";
import {saveCartToCookie} from "@/consts/cookieCart";

interface IProps {
	availableCount: number;
	article: string;
}

const ProductActions: React.FC<IProps> = ({ availableCount, article }) => {

	const t = useTranslations("ProductPage");

	const [count, setCount] = useState<number>(1);

	const addCount = useCallback(() => {
		setCount(prevState => {
			if (prevState < 99) {
				return prevState + 1;
			} else {
				return prevState;
			}
		})
	}, []);

	const reduceCount = useCallback(() => {
		setCount(prevState => {
			if (prevState > 1) {
				return prevState - 1;
			} else {
				return prevState;
			}
		})
	}, []);

	const onClickAddToCard = () => {
		if (availableCount < count) {
			alert(t("notAvailableCount", {count: availableCount}));
		} else {
			saveCartToCookie({article, qty: count});
			alert(t("successAdded"));
		}
	}

	return (
		<div className={`flex flex-col mt-auto items-center ${styles.productActions}`}>
			<div className={`flex items-center justify-between ${styles.countWrapper}`}>
				<Button
					onClick={reduceCount}
					className="p-0"
					title={t("buttonReduceCount.title")}
					aria-label={t("buttonReduceCount.ariaLabel")}
				>
					<ChevronRightIcon style={{transform: `rotate(180deg)`}}/>
				</Button>
				<p className="montserrat">
					{count}
				</p>
				<Button
					onClick={addCount}
					className="p-0"
					title={t("buttonAddCount.title")}
					aria-label={t("buttonAddCount.ariaLabel")}
				>
					<ChevronRightIcon/>
				</Button>
			</div>
			<Button
				onClick={onClickAddToCard}
				title={t("buttonAddToBasket.title")}
				aria-label={t("buttonAddToBasket.ariaLabel")}
				className={styles.addToBasket}
			>
				{t("buttonAddToBasket.title")}
			</Button>
		</div>
	);
};

export default ProductActions;