import {OrderSearch} from "@/app/Pages/OrderSearch";
import {getTranslations} from "next-intl/server";

export async function generateMetadata({ params }: {params: Promise<{locale: string}>}) {
	const { locale } = await params;

	const t = await getTranslations({ locale, namespace: 'OrderSearchPage' });

	return {
		title: t('title'),
		description: t('description'),
		alternates: {canonical: "/order-search"},
		openGraph: {
			title: t('title'),
			description: t('description'),
			url: "/order-search",
			locale: "ru_RU",
			type: "website",
		},
	};
}

export default OrderSearch;