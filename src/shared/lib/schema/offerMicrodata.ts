const SCHEMA = "https://schema.org";

export const offerCatalogType = `${SCHEMA}/OfferCatalog`;
export const offerType = `${SCHEMA}/Offer`;
export const productType = `${SCHEMA}/Product`;
export const priceCurrency = "RUB";

export const getSiteUrl = () =>
	(process.env.NEXT_PUBLIC_SITE_URL || "https://work-rc.ru").replace(/\/$/, "");

export const getProductUrl = (article: string) =>
	`${getSiteUrl()}/product/${encodeURIComponent(article)}`;

export const getCatalogImageUrl = () => `${getSiteUrl()}/logo512.png`;

export const getCloudImageUrl = (filename: string) =>
	`${process.env.NEXT_PUBLIC_CLOUD_URL}/${filename}`;

export const formatSchemaPrice = (price: number) => {
	const value = Number(price);
	return Number.isFinite(value) ? value.toFixed(2) : "0.00";
};

export const getAvailabilityUrl = (inStock: boolean, onTheWay = false) => {
	if (inStock) return `${SCHEMA}/InStock`;
	if (onTheWay) return `${SCHEMA}/PreOrder`;
	return `${SCHEMA}/OutOfStock`;
};

const toPlainText = (value: string) =>
	value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

export const getOfferDescription = (
	details: {text?: string}[] | undefined,
	fallback: string,
) => {
	const text = (details ?? [])
		.map((detail) => toPlainText(detail.text ?? ""))
		.filter(Boolean)
		.join(" ");

	return text || fallback;
};
