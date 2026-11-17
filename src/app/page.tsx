import {getTranslations} from "next-intl/server";
import {Home} from "@/app/Pages/Home";

export async function generateMetadata({ params }: {params: Promise<{locale: string}>}) {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'HomePage' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {canonical: "/"},
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: "/",
      locale: "ru_RU",
      type: "website",
    },
  };
}

export default Home;
