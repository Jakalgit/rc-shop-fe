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
import {getContacts} from "@/api/contacts/api";
import {RichText} from "@/widgets/RichText";

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

	const contacts = await getContacts();

	return (
		<MotionMain>
			<section>
				<Container>
					<h1 className="headText">{t("head")}</h1>
					<div className={styles.infoWrapper}>
						<div className={styles.infoBlock}>
							<MapWidget />
							<p className={styles.address}>
								{contacts.address}
							</p>
						</div>
						<div className={styles.infoBlock}>
							<h2 className={styles.contactText}>{t("contacts")}</h2>
							<a
								href={`tel:${contacts.phone1}`}
								className={styles.contactItem}
							>
								<CallIcon/>
								<p>
									{formatPhoneNumber(contacts.phone1)}
								</p>
							</a>
							<a
								href={`tel:${contacts.phone2}`}
								className={styles.contactItem}
							>
								<CallIcon/>
								<p>
									{formatPhoneNumber(contacts.phone2)}
								</p>
							</a>
							<a
								className={styles.contactItem}
								href={`mailto:${contacts.email}`}
							>
								<MailIcon/>
								<p>
									{contacts.email}
								</p>
							</a>
							<div className={`flex ${styles.messengersBlock}`}>
								<a href={`https://t.me/${contacts.tgIdentifier}`}>
									<TelegramIcon/>
								</a>
								<a href={`https://wa.me/${contacts.whatsappIdentifier}`}>
									<WhatsappIcon/>
								</a>
							</div>
							<h2 className={`mt-auto ${styles.contactText}`}>{t("workTime")}</h2>
							<p>
								<RichText text={contacts.workTime}/>
							</p>
						</div>
					</div>
					<CompanyDesc/>
				</Container>
			</section>
		</MotionMain>
	);
}