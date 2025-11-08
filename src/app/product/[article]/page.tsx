import MotionMain from "@/components/MotionMain";
import {Container} from "react-bootstrap";
import styles from "@/styles/pages/Product.module.css";
import {getTranslations} from "next-intl/server";
import CheckCircleIcon from "@/components/icons/CheckCircleIcon";
import CancelIcon from "@/components/icons/CancelIcon";
import {formatPrice} from "@/functions/format";
import ProductSlider from "@/components/product/ProductSlider";
import ProductActions from "@/components/product/ProductActions";
import SimilarProducts from "@/components/product/SimilarProducts";
import {getProducts} from "@/api/products/api";
import NotFound from "next/dist/client/components/not-found-error";
import {cookies} from "next/headers";

export async function generateMetadata({ params }: {params: any}) {
	const { locale, article } = params;
	const t = await getTranslations({ locale, namespace: 'ProductPage' });

	// Получаем токен авторизации
	const cookieStore = await cookies();
	const act: string = cookieStore.get("act")?.value || "";

	const response = await getProducts({ article, unavailable: Number(true), limit: 1 }, act);

	const product = response.records[0];

	if (!product) {
		return {
			title: t('notFound'),
			description: t('notFound'),
		};
	}

	return {
		title: product.name,
		description: product.description[0].text,
	};
}

export default async function ProductPage({params}: {params: Promise<{ article: string }>}) {

	const t = await getTranslations("ProductPage");
	const article = decodeURIComponent((await params).article || "");

	// Получаем токен авторизации
	const cookieStore = await cookies();
	const act: string = cookieStore.get("act")?.value || "";

	const response = await getProducts({article, unavailable: Number(true), limit: 1}, act);

	if (response.records.length === 0) {
		return NotFound();
	}

	const images = response.records[0].images.map(el => el.filename);

	const specification = response.records[0].specification;

	const equipment = response.records[0].equipment;

	const description = response.records[0].description;

	const name = response.records[0].name;
	const availability = response.records[0].availability && response.records[0].count > 0;

	const promotion = {
		oldPrice: response.records[0].oldPrice,
		percent: response.records[0].promotionPercentage,
	}

	const price = response.records[0].price;
	const wholesalePrice = response.records[0].wholesalePrice;

	return (
		<MotionMain>
			<Container>
				<section className={styles.sectionFirst}>
					<div className={styles.sliderWrapper}>
						<ProductSlider images={images} />
					</div>
					<div className={`flex flex-col ${styles.infoWrapper}`}>
						<h1 className={styles.name}>
							{name}
						</h1>
						<p className={`fw-bold ${styles.article}`}>
							{article}
						</p>
						<div className={`flex ${styles.availabilityBlock}`}>
							{availability ?
								<CheckCircleIcon className={styles.inStockIcon}/>
								:
								<CancelIcon className={styles.notAvailable}/>
							}
							<p>{t(availability ? "inStock" : "notAvailable")}</p>
						</div>
						<div className={`flex flex-col ${styles.priceBlock}`}>
							{promotion.oldPrice && (
								<p className={`montserrat fw-bold ${styles.additionalPrice}`}>
									{t("oldPrice")} <span className="line-through">{formatPrice(promotion.oldPrice, 2)}</span>
								</p>
							)}
							<div className={`flex items-center`}>
								<p className={`montserrat ${styles.price}`}>
									{formatPrice(price, 2)}
								</p>
								{promotion.percent && (
									<span className={`flex items-center justify-center manrope ${styles.discountPercent}`}>
									-{promotion.percent}%
								</span>
								)}
							</div>
							{wholesalePrice && (
								<p className={`montserrat fw-bold ${styles.additionalPrice} ${styles.wholesalePrice}`}>
									{formatPrice(wholesalePrice, 2)} - {t("wholesalePrice")}
								</p>
							)}
						</div>
						<ProductActions
							availableCount={response.records[0].count}
							article={article}
						/>
					</div>
				</section>
				<section className={`flex items-center justify-center ${styles.links}`}>
					{response.records[0].partsUrl && (
						<a className="flex items-center" href="">
							{t('partsLink')}
						</a>
					)}
					{response.records[0].tuningUrl && (
						<a className="flex items-center" href="">
							{t('tuningLink')}
						</a>
					)}
				</section>
				{response.records[0]?.productGroupId && (
					<SimilarProducts
						article={response.records[0].article}
						productGroupId={response.records[0].productGroupId}
					/>
				)}
				<section className="flex flex-col">
					<div className={`flex justify-between ${styles.specificationAndEquipment}`}>
						{specification.length > 0 && (
							<div>
								<h3>
									{t("specification")}
								</h3>
								<ul className="flex flex-col">
									{specification.map((item, i) =>
										<li className="flex items-center" key={i}>
											<span/>
											{item.text}
										</li>
									)}
								</ul>
							</div>
						)}
						{equipment.length > 0 && (
							<div>
								<h3>
									{t("equipment")}
								</h3>
								<ul className="flex flex-col">
									{equipment.map((item, i) =>
										<li className="flex items-center" key={i}>
											<span/>
											{item.text}
										</li>
									)}
								</ul>
							</div>
						)}
					</div>
					<ul className={`flex flex-col p-0 ${styles.descriptionList}`}>
						{description.map((item, i) =>
							<li key={i}>
								{item.text}
							</li>
						)}
					</ul>
				</section>
			</Container>
		</MotionMain>
	)
}