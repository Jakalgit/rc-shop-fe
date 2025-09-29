"use client";

import styles from "./HomeCategoryBlock.module.css";
import Image from "next/image";
import {useHomeHook} from "../../../providers/HomeProvider";
import {CategoryBlockResponse} from "@/api/category/types";

interface HomeCategoryBlockProps {
	item: CategoryBlockResponse
}

export function HomeCategoryBlock({item}: HomeCategoryBlockProps) {

	const {toggleSubCategoriesPopup, setSubCategories} = useHomeHook();

	const onClickBlock = () => {
		setSubCategories(item.subBlocks);
		toggleSubCategoriesPopup(true);
	}

	return (
		<div className={`flex flex-col ${styles.block}`}>
			<div
				onClick={onClickBlock}
				className={`flex justify-center items-center ${styles.imageWrapper}`}
			>
				<Image
					width={200}
					height={200}
					src={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${item.image}`}
					alt="image"
				/>
			</div>
			<div className={`flex-grow-1 ${styles.textPart}`}>
				<h3>
					{item.blockText}
				</h3>
				<div className={`flex flex-wrap ${styles.links}`}>
					{item.links.sort((a, b) => a.index - b.index).map((link, index) =>
						<a
							key={index}
							className={`flex items-center justify-center ${styles.link}`}
							href={link.link}
						>
							{link.linkText}
						</a>
					)}
				</div>
			</div>
		</div>
	)
}