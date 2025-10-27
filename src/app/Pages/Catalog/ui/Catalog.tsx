import {getTranslations} from "next-intl/server";
import {DEFAULT_MAX_PRICE, DEFAULT_MIN_PRICE} from "@/consts/filters";
import {ProductPaginationResponse} from "@/api/products/types";
import {cookies} from "next/headers";
import {getProducts} from "@/api/products/api";
import styles from "./Catalog.module.css";
import NewIcon from "@/components/icons/NewIcon";
import StarIcon from "@/components/icons/StarIcon";
import PercentIcon from "@/components/icons/PercentIcon";
import RepairIcon from "@/components/icons/RepairIcon";
import FilterPopup from "@/components/filters/FilterPopup";
import MotionMain from "@/components/MotionMain";
import {Container} from "react-bootstrap";
import {ClearFinderSection} from "../widgets/ClearFinderSection";
import LargeScreenFilters from "@/components/filters/LargeScreenFilters";
import {CatalogItem} from "../widgets/CatalogItem";
import {PaginationCatalog} from "../widgets/PaginationCatalog";
import React from "react";
import {ActiveFiltersSection} from "../widgets/ActiveFiltersSection";
import {getTagsForFilter} from "@/api/tags/api";
import {SortingSection} from "@/app/Pages/Catalog/widgets/SortingSection";
import {isSortOrder, SortOrder} from "@/shared/lib/sorting/sorting";

export const Catalog = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) => {

	const t = await getTranslations("CatalogPage");

	// Получаем параметры поиска
	const sp = await searchParams;

	const finder = decodeURIComponent(sp.finder || "");

	const minPrice = Number(sp.min) || DEFAULT_MIN_PRICE;
	const maxPrice = Number(sp.max) || DEFAULT_MAX_PRICE;
	const wMaxPrice = Number(sp.wMax) || DEFAULT_MAX_PRICE;
	const wMinPrice = Number(sp.wMin) || DEFAULT_MIN_PRICE;
	const page = Number(sp.page) || 1;
	const unavailable = Number(sp.unavailable) || 0;
	let sort: SortOrder = SortOrder.DEFAULT;
	if (isSortOrder(sp.sort)) {
		sort = sp.sort as SortOrder;
	}


	const tagIdsParam = sp.tagIds;
	const tagIds = tagIdsParam
		? tagIdsParam.split(',').map(x => Number(x)).filter(x => !isNaN(x))
		: [];

	let response: ProductPaginationResponse | undefined = undefined;

	// Получаем токен авторизации
	const cookieStore = await cookies();
	const act: string = cookieStore.get("act")?.value || "";

	// Запрашиваем данные
	try {
		response = await getProducts({
			page,
			tagIds: tagIds.length > 0 ? tagIds : undefined,
			limit: 12,
			finder,
			maxPrice,
			minPrice,
			wMaxPrice,
			wMinPrice,
			sort,
			unavailable,
		}, act);
	} catch (e) {
		console.error(e);
	}

	const tagsForFilterResponse = await getTagsForFilter();

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

	const data = {
		minPrice,
		maxPrice,
		tagIds,
		finder,
		partner: !!response?.partner,
		wMinPrice,
		wMaxPrice,
		tagsForFilter: tagsForFilterResponse
	}

	return (
		<>
			<FilterPopup
				tagsForFilter={tagsForFilterResponse}
				partner={!!response?.partner}
			/>
			<MotionMain>
				<Container>
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
					<ActiveFiltersSection data={data} />
					<ClearFinderSection
						finder={finder}
						maxPrice={maxPrice}
						minPrice={minPrice}
						tagIds={tagIds}
						partner={!!response?.partner}
						wMinPrice={wMinPrice}
						wMaxPrice={wMaxPrice}
					/>
					<section className="flex justify-between">
						<LargeScreenFilters
							minPrice={minPrice}
							maxPrice={maxPrice}
							tagIds={tagIds}
							finder={finder}
							partner={!!response?.partner}
							wMinPrice={wMinPrice}
							wMaxPrice={wMaxPrice}
							tagsForFilter={tagsForFilterResponse}
						/>
						<section className={styles.catalogGridWrapper}>
							<SortingSection />
							{response?.records.length || 0 > 0 ? (
								<>
									<div className={`grid ml-auto ${styles.catalogGrid}`}>
										{response?.records.map((item) =>
											<CatalogItem
												key={item.article}
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