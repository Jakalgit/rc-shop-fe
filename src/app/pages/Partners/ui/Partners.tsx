import {getTranslations} from "next-intl/server";
import {cookies} from "next/headers";
import {checkProfileAct} from "@/api/auth/api";
import {redirect} from "next/navigation";
import {RoutesEnum} from "@/shared/lib/routes.enum";
import MotionMain from "@/components/MotionMain";
import {Container} from "react-bootstrap";
import styles from "./Partners.module.css";
import React from "react";
import {LoginPopupWrapper} from "../widgets/LoginPopupWrapper";
import {BecomePartnerForm} from "../widgets/BecomePartnerForm/ui/BecomePartnerForm";

export const Partners = async () => {

	const t = await getTranslations("PartnersPage");
	const listLength = [3, 3];

	// Получаем токен авторизации
	const cookieStore = await cookies();
	const act: string = cookieStore.get("act")?.value || "";

	let redirectToProfilePage = false;

	try {
		const response = await checkProfileAct(act);
		redirectToProfilePage = response.isValid;
	} catch {}

	if (redirectToProfilePage) {
		redirect(RoutesEnum.PROFILE);
	}

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
					<BecomePartnerForm />
					<LoginPopupWrapper />
				</Container>
			</section>
		</MotionMain>
	);
};