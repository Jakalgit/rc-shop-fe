import MotionMain from "@/components/MotionMain";
import styles from "@/styles/pages/Home.module.css";
import {Container} from "react-bootstrap";
import ProductsSlider from "@/components/ProductsSlider";
import {getTranslations} from "next-intl/server";
import Button from "@/components/buttons/Button";
import ChevronRightIcon from "@/components/icons/ChevronRightIcon";
import CompanyDesc from "@/components/CompanyDesc";
import {getHomeCategories} from "@/api/home-category/api";
import HomeCategoryButton from "@/components/buttons/HomeCategoryButton";

export async function generateMetadata({ params }: {params: {locale: string}}) {
  const t = await getTranslations({ locale: params.locale, namespace: 'HomePage' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function Home() {

  const t = await getTranslations("HomePage");

  const response = await getHomeCategories();

  return (
    <MotionMain>
      <Container>
        <ProductsSlider />
        <CompanyDesc />
        {response.length > 0 && (
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
              {response.map((item, i) =>
                <HomeCategoryButton item={item} key={i} />
              )}
            </div>
          </div>
        )}
      </Container>
    </MotionMain>
  );
}
