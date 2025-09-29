"use client";

import React from 'react';

export interface HomeContextProps {
	visibleSubCategoriesPopup: boolean;
	subCategories: any[];
	setVisibleSubCategoriesPopup: (value: boolean) => void;
	setSubCategories: (value: any[]) => void;
}

export const HomeContext = React.createContext<HomeContextProps>(
	{
		visibleSubCategoriesPopup: false,
		setSubCategories: () => {},
		setVisibleSubCategoriesPopup: () => {},
		subCategories: []
	}
);