"use client";

import React from 'react';
import PaginationComponent from "@/components/PaginationComponent";
import { useRouter, useSearchParams } from 'next/navigation';

interface IProps {
	currentPage: number;
	totalPages: number;
}

const PaginationCatalog: React.FC<IProps> = ({ currentPage, totalPages }) => {

	const router = useRouter();
	const searchParams = useSearchParams();

	const handlePageChange = (newPage: number) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set('page', newPage.toString());

		router.push(`?${params.toString()}`);
	};

	return (
		<PaginationComponent
			currentPage={currentPage}
			totalPages={totalPages}
			onPageChange={(page) => handlePageChange(page)}
			siblingCount={5}
		/>
	);
};

export default PaginationCatalog;