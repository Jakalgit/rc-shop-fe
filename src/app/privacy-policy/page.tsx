import {PrivacyPolicy} from "../Pages/PrivacyPolicy";
import {getTranslations} from "next-intl/server";

export async function generateMetadata({ params }: {params: Promise<{locale: string}>}) {
	const { locale } = await params;

	const t = await getTranslations({ locale, namespace: 'PrivacyPolicyPage' });

	return {
		title: t('title'),
		description: t('description'),
	};
}

export default PrivacyPolicy;