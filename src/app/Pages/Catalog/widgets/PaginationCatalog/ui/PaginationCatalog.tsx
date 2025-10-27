"use client";

import React, {useCallback} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import PaginationComponent from "@/components/PaginationComponent";

interface IProps {
	currentPage: number;
	totalPages: number;
}

export const PaginationCatalog: React.FC<IProps> = React.memo(({ currentPage, totalPages }) => {

	const router = useRouter();
	const searchParams = useSearchParams();

	const handlePageChange = useCallback((newPage: number) => {
		const params = new URLSearchParams(searchParams?.toString());
		params.set('page', newPage.toString());

		router.push(`?${params.toString()}`);
	}, [searchParams]);

	return (
		<PaginationComponent
			currentPage={currentPage}
			totalPages={totalPages}
			onPageChange={(page) => handlePageChange(page)}
			siblingCount={2}
		/>
	);
});