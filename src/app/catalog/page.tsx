import {getTranslations} from "next-intl/server";
import {Catalog} from "@/app/Pages/Catalog";

export async function generateMetadata({ params }: {params: Promise<{locale: string}>}) {
	const { locale } = await params;

	const t = await getTranslations({ locale, namespace: 'CatalogPage' });

	return {
		title: t('title'),
		description: t('description'),
		alternates: {canonical: "/catalog"},
		openGraph: {
			title: t('title'),
			description: t('description'),
			url: "/catalog",
			locale: "ru_RU",
			type: "website",
		},
	};
}

export default Catalog;