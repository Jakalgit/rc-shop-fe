import {HomeContext} from "./HomeContext";
import {useContext} from "react";
import {CategorySubBlockResponse} from "@/api/category/types";

interface UseHomeHookResult {
	visibleSubCategoriesPopup: boolean;
	subCategories: CategorySubBlockResponse[];
	toggleSubCategoriesPopup: (value: boolean) => void;
	setSubCategories: (value: CategorySubBlockResponse[]) => void;
}

export function useHomeHook(): UseHomeHookResult {
	const {
		visibleSubCategoriesPopup,
		subCategories,
		setVisibleSubCategoriesPopup,
		setSubCategories
	} = useContext(HomeContext);

	const toggleSubCategoriesPopup = (value: boolean) => {
		setVisibleSubCategoriesPopup(value);
	}

	return {
		visibleSubCategoriesPopup,
		subCategories,
		toggleSubCategoriesPopup,
		setSubCategories,
	}

}