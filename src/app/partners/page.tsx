import React from 'react';
import MotionMain from "@/components/MotionMain";
import {Container} from "react-bootstrap";
import {getTranslations} from "next-intl/server";
import styles from "@/styles/pages/Partners.module.css";
import PartnersForm from "@/components/partners/PartnersForm";
import LoginPartnerPopup from "@/components/partners/LoginPartnerPopup";

export async function generateMetadata({ params }: {params: Promise<{locale: string}>}) {
	const { locale } = await params;

	const t = await getTranslations({ locale, namespace: 'PartnersPage' });

	return {
		title: t('title'),
		description: t('description'),
	};
}

export default async function PartnersPage() {

	const t = await getTranslations("PartnersPage");

	const listLength = [3, 3];

	return (
		<MotionMain>
			<section>
				<Container>
					<h1 className="headText">
						{t("head")}
					</h1>
					<p className={styles.text}>
						{t("text")}
					</p>
					{listLength.map((item, i) =>
						<div
							key={i}
							className={styles.listBlock}
						>
							<h3>
								{t(`list${i + 1}.head`)}
							</h3>
							<ul aria-label={t(`list${i + 1}.head`)}>
								{new Array(item).fill(0).map((_, k) =>
									<li
										className="flex items-center"
										key={k}
									>
										<span/>
										{t(`list${i + 1}.i${k + 1}`)}
									</li>
								)}
							</ul>
						</div>
					)}
				</Container>
			</section>
			<section className={styles.sectionForm}>
				<Container>
					<h2 className={`text-center ${styles.partnerRegText}`}>
						{t("partnerReg")}
					</h2>
					<PartnersForm />
					<LoginPartnerPopup />
				</Container>
			</section>
		</MotionMain>
	);
};