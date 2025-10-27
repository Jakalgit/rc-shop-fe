export enum SortOrder {
	DEFAULT,
	PRICE_ASCENDING,
	PRICE_DESCENDING,
}

export function isSortOrder(value: unknown): value is SortOrder {
	if (value === null || value === undefined) return false;
	if (typeof value === "number") {
		return Object.values(SortOrder)
			.filter(v => typeof v === "number")
			.includes(value);
	}
	if (typeof value === "string" && /^\d+$/.test(value)) {
		const num = Number(value);
		return Object.values(SortOrder)
			.filter(v => typeof v === "number")
			.includes(num);
	}
	return false;
}