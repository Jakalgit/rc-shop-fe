import {getTranslations} from "next-intl/server";
import {Partners} from "@/app/Pages/Partners";

export async function generateMetadata({ params }: {params: Promise<{locale: string}>}) {
	const { locale } = await params;

	const t = await getTranslations({ locale, namespace: 'PartnersPage' });

	return {
		title: t('title'),
		description: t('description'),
	};
}

export default Partners;