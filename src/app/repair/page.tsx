import React from 'react';
import MotionMain from "@/components/MotionMain";
import {getTranslations} from "next-intl/server";
import styles from "@/styles/pages/Repair.module.css";
import {Container} from "react-bootstrap";
import RepairSlider from "@/components/RepairSlider";
import RepairPopup from "@/components/RepairPopup";
import parse from 'html-react-parser';
import "@/styles/globals.css";
import {getRepairServices} from "@/api/repair-service/api";

export async function generateMetadata({ params }: {params: Promise<{locale: string}>}) {
	const { locale } = await params;

	const t = await getTranslations({ locale, namespace: 'RepairPage' });

	return {
		title: t('title'),
		description: t('description'),
	};
}

export default async function RepairPage() {

	const t = await getTranslations("RepairPage");

	const response = await getRepairServices();

	return (
		<MotionMain>
			<section>
				<Container>
					<h1 className="headText">{t("head")}</h1>
					<RepairSlider />
					<div className="flex justify-center">
						<p className={styles.underSliderText}>
							{t.rich("text1", {
								bold: (chunks) => <span className="fw-bold">{chunks}</span>
							})}
						</p>
					</div>
				</Container>
			</section>
			<section>
				<div className={styles.repairServicesSection}>
					<Container>
						<table className={styles.table}>
							<thead>
								<tr>
									<th scope="col">{t("services")}</th>
									<th scope="col">{t("prices")}</th>
								</tr>
							</thead>
							<tbody>
								{response.map((item, i) =>
									<tr key={i}>
										<td className="flex items-center justify-center">
											<div className={styles.tableCircle}/>
											{item.service}
										</td>
										<td className="montserrat text-center">{parse(item.price)}</td>
									</tr>
								)}
							</tbody>
						</table>
					</Container>
				</div>
				<Container className="flex flex-col items-center">
					<p className={styles.underSliderText}>
						{t.rich("text2", {
							bold: (chunks) => <span className="fw-bold">{chunks}</span>
						})}
					</p>
					<RepairPopup/>
				</Container>
			</section>
		</MotionMain>
	)
}