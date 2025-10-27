import {getTranslations} from "next-intl/server";
import {PersonalData} from "@/app/Pages/PersonalData";

export async function generateMetadata({ params }: {params: Promise<{locale: string}>}) {
	const { locale } = await params;

	const t = await getTranslations({ locale, namespace: 'PersonalDataPage' });

	return {
		title: t('title'),
		description: t('description'),
	};
}

export default PersonalData;