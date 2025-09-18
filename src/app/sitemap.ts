import {MetadataRoute} from "next";
import {getProductsSitemap} from "@/api/products/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://work-rc.ru";

	const staticPages: MetadataRoute.Sitemap = [
		{
			url: `${baseUrl}/`,
			lastModified: new Date(),
		},
		{
			url: `${baseUrl}/about-us`,
			lastModified: new Date(),
		},
		{
			url: `${baseUrl}/catalog`,
			lastModified: new Date(),
		},
		{
			url: `${baseUrl}/delivery-and-payments`,
			lastModified: new Date(),
		},
		{
			url: `${baseUrl}/order-search`,
			lastModified: new Date(),
		},
		{
			url: `${baseUrl}/partners`,
			lastModified: new Date(),
		},
		{
			url: `${baseUrl}/repair`,
			lastModified: new Date(),
		}
	];

	const products = await getProductsSitemap();

	const productPages: MetadataRoute.Sitemap = products.map(p => ({
		url: `${baseUrl}/product/${p.article}`,
		lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
	}));

	return [...staticPages, ...productPages];
}