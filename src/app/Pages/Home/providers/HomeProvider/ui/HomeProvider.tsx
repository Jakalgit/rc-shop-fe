"use client";

import React, {ReactNode, useMemo, useState} from "react";
import {HomeContext} from "@/app/Pages/Home/providers/HomeProvider/lib/HomeContext";

export const HomeProvider: React.FC<{children: ReactNode}> = ({children}) => {

	const [visibleSubCategoriesPopup, setVisibleSubCategoriesPopup] = useState(false);
	const [subCategories, setSubCategories] = useState<any[]>([]);

	const defaultProps = useMemo(() => ({
		visibleSubCategoriesPopup,
		subCategories,
		setVisibleSubCategoriesPopup,
		setSubCategories
	}), [visibleSubCategoriesPopup, subCategories])


	return (
		<HomeContext.Provider value={defaultProps}>
			{children}
		</HomeContext.Provider>
	)
}