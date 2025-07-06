import React from "react";
import styles from "@/styles/pages/Catalog.module.css";
import MotionMain from "@/components/MotionMain";
import {Container} from "react-bootstrap";
import ProductsSlider from "@/components/ProductsSlider";
import {getTranslations} from "next-intl/server";
import NewIcon from "@/components/icons/NewIcon";
import StarIcon from "@/components/icons/StarIcon";
import PercentIcon from "@/components/icons/PercentIcon";
import RepairIcon from "@/components/icons/RepairIcon";
import CatalogFilters from "@/components/filters/CatalogFilters";
import CatalogItem from "@/components/CatalogItem";
import FilterPopup from "@/components/filters/FilterPopup";
import {DEFAULT_MAX_PRICE, DEFAULT_MIN_PRICE} from "@/consts/filters";
import ClearFinderSection from "@/components/catalog/ClearFinderSection";
import {getProducts} from "@/api/products/api";
import PaginationCatalog from "@/components/catalog/PaginationCatalog";
import {ProductPaginationResponse} from "@/api/products/types";

export async function generateMetadata({ params }: {params: Promise<{locale: string}>}) {
	const { locale } = await params;

	const t = await getTranslations({ locale, namespace: 'CatalogPage' });

	return {
		title: t('title'),
		description: t('description'),
	};
}

export default async function CatalogPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {

	const t = await getTranslations("CatalogPage");

	const sp = await searchParams;

	const finder = sp.finder || "";

	const minPrice = Number(sp.min) || DEFAULT_MIN_PRICE;
	const maxPrice = Number(sp.max) || DEFAULT_MAX_PRICE;
	const page = Number(sp.page) || 1;

	const tagIdsParam = sp.tagIds;
	const tagIds = tagIdsParam
		? tagIdsParam.split(',').map(x => Number(x)).filter(x => !isNaN(x))
		: [];

	let response: ProductPaginationResponse | undefined = undefined;

	try {
		response = await getProducts({
			page,
			tagIds: tagIds.length > 0 ? tagIds : undefined,
			limit: 12,
			finder,
			maxPrice,
			minPrice
		});
	} catch (e) {
		console.error(e);
	}

	const panelButtons = [
		{
			translateName: "buttonNovelty",
			wrapperStyle: styles.noveltyIconWrapper,
			icon: <NewIcon />,
			href: '/catalog?tagIds=1'
		},
		{
			translateName: "buttonPopular",
			wrapperStyle: styles.popularIconWrapper,
			icon: <StarIcon />,
			href: '/catalog?tagIds=2'
		},
		{
			translateName: "buttonPromotions",
			wrapperStyle: styles.promotionsIconWrapper,
			icon: <PercentIcon />,
			href: '/catalog?tagIds=3'
		},
		{
			translateName: "buttonRepair",
			wrapperStyle: styles.repairIconWrapper,
			icon: <RepairIcon />,
			href: '/repair'
		}
	];

	return (
		<>
			<FilterPopup />
			<MotionMain>
				<Container>
					<ProductsSlider />
					<section className={`grid ${styles.panelsGrid}`}>
						{panelButtons.map((button, index) =>
							<a
								key={index}
								title={t(`panels.${button.translateName}.title`)}
								aria-label={t(`panels.${button.translateName}.ariaLabel`)}
								className="flex flex-col items-start justify-start bg-white"
								href={button.href}
							>
								{t(`panels.${button.translateName}.title`)}
								<span className={`flex justify-center items-center ${styles.buttonIconWrapper} ${button.wrapperStyle}`}>
									{button.icon}
								</span>
							</a>
						)}
					</section>
					<ClearFinderSection
						finder={finder}
						maxPrice={maxPrice}
						minPrice={minPrice}
						tagIds={tagIds}
					/>
					<section className="flex justify-between">
						<CatalogFilters
							minPrice={minPrice}
							maxPrice={maxPrice}
							tagIds={tagIds}
							finder={finder}
						/>
						<section className={styles.catalogGridWrapper}>
							{response?.records.length || 0 > 0 ? (
								<>
									<div className={`grid ml-auto ${styles.catalogGrid}`}>
										{response?.records.map((item, index) =>
											<CatalogItem
												key={index}
												item={item}
											/>
										)}
									</div>
									<PaginationCatalog
										currentPage={page}
										totalPages={response?.totalPages || 0}
									/>
								</>
							) : (
								<div className="flex items-center justify-center h-full">
									<p className="text-center">Товары не найдены, попробуйте сбросить параметры фильтров или поиска</p>
								</div>
							)}
						</section>
					</section>
				</Container>
			</MotionMain>
		</>
	)
}