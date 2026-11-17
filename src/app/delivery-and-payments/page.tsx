import {DeliveryAndPayments} from "@/app/Pages/DeliveryAndPayment";
import {getTranslations} from "next-intl/server";

export async function generateMetadata({ params }: {params: Promise<{locale: string, article: string}>}) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: 'DeliveryAndPaymentsPage' });

	return {
		title: t("title"),
		description: t("description"),
		alternates: {canonical: "/delivery-and-payments"},
		openGraph: {
			title: t("title"),
			description: t("description"),
			url: "/delivery-and-payments",
			locale: "ru_RU",
			type: "website",
		},
	};
}

export default DeliveryAndPayments;