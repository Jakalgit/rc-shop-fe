import {OrderSearch} from "@/app/Pages/OrderSearch";
import {getTranslations} from "next-intl/server";

export async function generateMetadata({ params }: {params: Promise<{locale: string}>}) {
	const { locale } = await params;

	const t = await getTranslations({ locale, namespace: 'OrderSearchPage' });

	return {
		title: t('title'),
		description: t('description'),
	};
}

export default OrderSearch;