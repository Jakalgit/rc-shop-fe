import {getTranslations} from "next-intl/server";
import {getSlides} from "@/api/promotion-slider/api";
import MotionMain from "@/components/MotionMain";
import {Container} from "react-bootstrap";
import styles from "./Home.module.css";
import ChevronRightIcon from "@/components/icons/ChevronRightIcon";
import {HomeCategoryBlock} from "../widgets/HomeCategoryBlock";
import {SubCategoriesPopup} from "@/app/Pages/Home/widgets/SubCategoriesPopup";
import {HomeProvider} from "../providers/HomeProvider";
import {getCategories} from "@/api/category/api";
import {Slider} from "@/app/Pages/Home/widgets/Slider";
import Link from "next/link";
import {RoutesEnum} from "@/shared";

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
					{responseHomeCategories.length > 0 && (
						<div className={`flex flex-col ${styles.categories}`}>
							<div className="flex justify-between items-center">
								<h2>
									{t("categories")}
								</h2>
								<Link
									href={RoutesEnum.CATALOG}
									title={t("buttonShowCatalog.title")}
									aria-label={t("buttonShowCatalog.ariaLabel")}
									className={`flex items-center justify-center ${styles.showCatalogButton}`}
								>
									{t("buttonShowCatalog.title")}
									<ChevronRightIcon/>
								</Link>
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