import {VariantType} from "../lib/VariantType";
import React from "react";
import styles from "./VariantSelector.module.css";

interface VariantSelectorProps {
	title: string;
	variants: VariantType[];
	selectedVariantId: string;
	setSelectedVariant: (variantId: any) => void;
}

export function VariantSelector({title, variants, selectedVariantId, setSelectedVariant}: VariantSelectorProps) {

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
		if (event.target.checked) {
			setSelectedVariant(id);
		}
	}

	return (
		<div className={`flex flex-col ${styles.VariantSelector}`}>
			<p className={`fw-bold ${styles.title}`}>
				{title}
			</p>
			<div className={`flex flex-col ${styles.labels}`}>
				{variants.map(variant =>
					<label
						key={variant.id}
						className={`flex items-center ${styles.label}`}
						htmlFor={`variant_selector`}
					>
						<input
							type="radio"
							id={`variant_selector`}
							checked={selectedVariantId === variant.id}
							onChange={(e) => handleChange(e, variant.id)}
						/>
						<span>{variant.title}</span>
						{variant.clue && (
							<p>
								{variant.clue}
							</p>
						)}
					</label>
				)}
			</div>
		</div>
	)
}