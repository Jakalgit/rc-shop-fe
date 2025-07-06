"use client";

import React from 'react';
import Image from "next/image";
import Button from "@/components/buttons/Button";
import {HomeCategoryResponse} from "@/api/home-category/types";
import { useRouter } from 'next/navigation';

interface IProps {
	item: HomeCategoryResponse;
}

const HomeCategoryButton: React.FC<IProps> = ({ item }) => {

	const router = useRouter();

	const toCatalog = async () => {
		if (item.tagIds.length > 0) {
			router.push(`/catalog?tagIds=${item.tagIds.join(',')}`);
		} else {
			router.push(`/catalog`);
		}
		window.location.reload();
	}

	return (
		<Button
			onClick={toCatalog}
			className="flex flex-col justify-between"
		>
			<Image
				width={100}
				height={100}
				src={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${item.image}`}
				alt={item.image}
			/>
			{item.name}
		</Button>
	);
};

export default HomeCategoryButton;