"use client";

import React, {useCallback} from 'react';
import Image from "next/image";
import Button from "@/components/buttons/Button";
import {HomeCategoryResponse} from "@/api/home-category/types";

interface IProps {
	item: HomeCategoryResponse;
}

const HomeCategoryButton: React.FC<IProps> = ({ item }) => {

	const toCatalog = useCallback(() => {
		if (item.tagIds.length > 0) {
			window.location.href = `/catalog?tagIds=${item.tagIds.join(',')}`;
		} else {
			window.location.href = `/catalog`;
		}
	}, []);

	return (
		<Button
			onClick={toCatalog}
			className="flex flex-col justify-between"
		>
			<Image
				width={400}
				height={400}
				src={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${item.image}`}
				alt={item.image}
			/>
			{item.name}
		</Button>
	);
};

export default HomeCategoryButton;