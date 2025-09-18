import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://work-rc.ru";

	return {
		rules: [
			{
				userAgent: "*",
				disallow: ["/reset-password", "/profile", "/order", "/new-order", "/confirmation-update"],
			},
			{
				userAgent: "*",
				allow: "/",
			},
		],
		sitemap: `${baseUrl}/sitemap.xml`,
	};
}