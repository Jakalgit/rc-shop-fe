import React from 'react';
import styles from "@/styles/components/filters/CatalogFilter.module.css";
import {formatPrice} from "@/functions/format";
import {getTrackBackground, Range} from "react-range";
import {DEFAULT_MAX_PRICE, DEFAULT_MIN_PRICE} from "@/consts/filters";
import FilterDropdown from "@/components/filters/FilterDropdown";
import {useTranslations} from "next-intl";

interface IProps {
	title: string;
	openFilterId: string | null;
	filterId: string;
	priceRange: number[];
	setPriceRange: (value: number[]) => void;
	step: number;
	onClick: (id: string | null) => void;
}

const FilterDropdownPriceRange: React.FC<IProps> = ({ title, openFilterId, filterId, priceRange, setPriceRange, step, onClick }) => {

	const t = useTranslations("CatalogPage.filters");

	return (
		<FilterDropdown
			title={title}
			isFilterOpen={openFilterId === filterId}
			onClick={() => onClick(filterId)}
		>
			<div className={`flex manrope fw-bold items-center justify-between ${styles.priceRange}`}>
				<p>
					{t("price.from")}<br/>
					{formatPrice(priceRange[0], 2)}
				</p>
				<p className="text-right">
					{t("price.to")}<br/>
					{formatPrice(priceRange[1], 2)}
				</p>
			</div>
			<div className={styles.priceSliderWrapper}>
				<Range
					values={priceRange}
					step={step}
					min={DEFAULT_MIN_PRICE}
					max={DEFAULT_MAX_PRICE}
					onChange={setPriceRange}
					renderTrack={({ props, children }) => {
						const { key, ...restProps } = props as any;

						return (
							<div
								key={key}
								{...restProps}
								style={{
									...props.style,
									height: '6px',
									width: '100%',
									background: getTrackBackground({
										values: priceRange,
										colors: ['#ccc', '#007bff', '#ccc'],
										min: DEFAULT_MIN_PRICE,
										max: DEFAULT_MAX_PRICE,
									}),
									borderRadius: '4px',
									marginTop: '20px',
								}}
							>
								{children}
							</div>
						);
					}}
					renderThumb={({ props }) => {
						const { key, ...restProps } = props;

						return (
							<div
								key={key}
								{...restProps}
								style={{
									height: '20px',
									width: '20px',
									borderRadius: '50%',
									backgroundColor: '#007bff',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									boxShadow: '0 2px 6px #aaa',
									...props.style,
								}}
							>
								<div
									style={{
										position: 'absolute',
										top: '-28px',
										color: '#000',
										fontSize: '12px',
										fontWeight: 'bold',
									}}
								/>
							</div>
						);
					}}
				/>
			</div>
		</FilterDropdown>
	);
};

export default FilterDropdownPriceRange;