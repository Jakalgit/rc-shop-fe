import { getProductsSitemap } from "@/api/products/api";

export const dynamic = "force-dynamic";

let cachedSitemap: string | null = null;
let lastGenerated = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 минут

export default async function sitemap(): Promise<Response> {
	const now = Date.now();

	if (cachedSitemap && now - lastGenerated < CACHE_TTL) {
		return new Response(cachedSitemap, {
			headers: { "Content-Type": "application/xml" },
		});
	}

	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://work-rc.ru";

	const staticPages: string[] = [
		"/",
		"/about-us",
		"/catalog",
		"/delivery-and-payments",
		"/order-search",
		"/partners",
		"/repair",
	];

	let products: { article: string; updatedAt?: string }[] = [];
	try {
		products = await getProductsSitemap();
	} catch (e) {
		console.error("Sitemap generation failed", e);
	}

	const urls = [
		...staticPages.map(
			(path) =>
				`<url><loc>${baseUrl}${path}</loc><lastmod>${new Date().toISOString()}</lastmod></url>`
		),
		...products.map(
			(p) =>
				`<url><loc>${baseUrl}/product/${p.article}</loc><lastmod>${
					p.updatedAt ? new Date(p.updatedAt).toISOString() : new Date().toISOString()
				}</lastmod></url>`
		),
	];

	const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join(
		""
	)}</urlset>`;

	cachedSitemap = xml;
	lastGenerated = now;

	return new Response(xml, { headers: { "Content-Type": "application/xml" } });
}