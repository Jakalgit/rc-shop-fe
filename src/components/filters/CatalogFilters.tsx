"use client";

import React from 'react';
import styles from "@/styles/components/filters/CatalogFilter.module.css";
import FiltersComponent, {IFilterProps} from "@/components/filters/FiltersComponent";

const CatalogFilters: React.FC<IFilterProps> = (props) => {
	return (
		<section className={styles.filtersSection}>
			<FiltersComponent {...props} />
		</section>
	);
};

export default CatalogFilters;