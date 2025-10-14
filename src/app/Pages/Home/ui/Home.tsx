import {getTranslations} from "next-intl/server";
import {getSlides} from "@/api/promotion-slider/api";
import MotionMain from "@/components/MotionMain";
import {Container} from "react-bootstrap";
import CompanyDesc from "@/components/CompanyDesc";
import styles from "./Home.module.css";
import Button from "@/components/buttons/Button";
import ChevronRightIcon from "@/components/icons/ChevronRightIcon";
import {HomeCategoryBlock} from "../widgets/HomeCategoryBlock";
import {SubCategoriesPopup} from "@/app/Pages/Home/widgets/SubCategoriesPopup";
import {HomeProvider} from "../providers/HomeProvider";
import {getCategories} from "@/api/category/api";
import {Slider} from "@/app/Pages/Home/widgets/Slider";

export async function Home() {

	const t = await getTranslations("HomePage");

	const [responseHomeCategories, responseSliderItems] = await Promise.all([
		getCategories(),
		getSlides(),
	]);

	return (
		<MotionMain>
			<HomeProvider>
				<Slider items={responseSliderItems} />
				<Container>
					<SubCategoriesPopup />
					{/*<PromotionsSlider items={responseSliderItems.map(el => ({image: el.filename, href: el.href}))} />*/}
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
								{responseHomeCategories.sort((a, b) => a.index - b.index).map((item, i) =>
									<HomeCategoryBlock
										key={i}
										item={item}
									/>
								)}
							</div>
						</div>
					)}
				</Container>
			</HomeProvider>
		</MotionMain>
	);
}