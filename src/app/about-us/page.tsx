import MotionMain from "@/components/MotionMain";
import {Container} from "react-bootstrap";
import styles from "@/styles/pages/AboutUs.module.css";
import "@/styles/globals.css";
import {getTranslations} from "next-intl/server";
import MapWidget from "@/components/MapWidget";
import CallIcon from "@/components/icons/CallIcon";
import {formatPhoneNumber} from "@/functions/format";
import MailIcon from "@/components/icons/MailIcon";
import TelegramIcon from "@/components/icons/TelegramIcon";
import WhatsappIcon from "@/components/icons/WhatsappIcon";
import CompanyDesc from "@/components/CompanyDesc";

export async function generateMetadata({ params }: {params: Promise<{locale: string}>}) {
	const { locale } = await params;

	const t = await getTranslations({ locale, namespace: 'AboutUsPage' });

	return {
		title: t('title'),
		description: t('description'),
	};
}

export default async function AboutUsPage() {

	const t = await getTranslations("AboutUsPage");

	const phoneNumber = "+74955743853";
	const mail = "support@work-rc.ru";

	const address = "м. Бауманская, Спартаковская площадь д. 10 c12";

	const workTime = "Пн - пт: 10:00 - 20:00";
	const workTimeWeekend = "Cб - вс: 10:00 - 18:00";

	return (
		<MotionMain>
			<section>
				<Container>
					<h1 className="headText">{t("head")}</h1>
					<div className={styles.infoWrapper}>
						<div className={styles.infoBlock}>
							<MapWidget />
							<p className={styles.address}>
								{address}
							</p>
						</div>
						<div className={styles.infoBlock}>
							<h2 className={styles.contactText}>{t("contacts")}</h2>
							<a
								href={`tel:${phoneNumber}`}
								className={styles.contactItem}
							>
								<CallIcon/>
								<p>
									{formatPhoneNumber(phoneNumber)}
								</p>
							</a>
							<a
								className={styles.contactItem}
								href={`mailto:${mail}`}
							>
								<MailIcon/>
								<p>
									{mail}
								</p>
							</a>
							<div className={`flex ${styles.messengersBlock}`}>
								<a href="">
									<TelegramIcon/>
								</a>
								<a href="">
									<WhatsappIcon/>
								</a>
							</div>
							<h2 className={`mt-auto ${styles.contactText}`}>{t("workTime")}</h2>
							<p className={styles.contactItem}>
								{workTime}
							</p>
							<p className={styles.contactItem}>
								{workTimeWeekend}
							</p>
						</div>
					</div>
					<CompanyDesc />
				</Container>
			</section>
		</MotionMain>
	);
}