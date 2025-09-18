import MotionMain from "@/components/MotionMain";
import styles from "@/styles/pages/Home.module.css";
import {Container} from "react-bootstrap";
import PromotionsSlider from "@/components/PromotionsSlider";
import {getTranslations} from "next-intl/server";
import Button from "@/components/buttons/Button";
import ChevronRightIcon from "@/components/icons/ChevronRightIcon";
import CompanyDesc from "@/components/CompanyDesc";
import {getHomeCategories} from "@/api/home-category/api";
import HomeCategoryButton from "@/components/buttons/HomeCategoryButton";
import {getSlides} from "@/api/promotion-slider/api";

export async function generateMetadata({ params }: {params: Promise<{locale: string}>}) {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'HomePage' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function Home() {

  const t = await getTranslations("HomePage");

  const [responseHomeCategories, responseSliderItems] = await Promise.all([
    getHomeCategories(),
    getSlides(),
  ]);

  return (
    <MotionMain>
      <Container>
        <PromotionsSlider items={responseSliderItems.map(el => ({image: el.filename, href: el.href}))} />
        <CompanyDesc isHome={true} />
        {responseHomeCategories.length > 0 && (
          <div className={`flex flex-col ${styles.categories}`}>
            <div className="flex justify-between items-center">
              <h2>
                {t("categories")}
              </h2>
              <Button
                title={t("buttonShowCatalog.title")}
                aria-label={t("buttonShowCatalog.ariaLabel")}
                className={`flex items-center ${styles.showCatalogButton}`}
              >
                {t("buttonShowCatalog.title")}
                <ChevronRightIcon/>
              </Button>
            </div>
            <div className={`flex flex-wrap ${styles.categoryBlocks}`}>
              {responseHomeCategories.map((item, i) =>
                <HomeCategoryButton item={item} key={i} />
              )}
            </div>
          </div>
        )}
      </Container>
    </MotionMain>
  );
}
