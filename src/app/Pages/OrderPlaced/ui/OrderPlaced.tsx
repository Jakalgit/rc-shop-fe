import MotionMain from "@/components/MotionMain";
import {Container} from "react-bootstrap";
import {getTranslations} from "next-intl/server";
import styles from "./OrderPlaced.module.css";

export async function OrderPlaced() {

	const t = await getTranslations("NewOrderPage");

	return (
		<MotionMain>
			<Container>
				<h1 className="headText">Спасибо за покупку!</h1>
				<p className={styles.text}>{t('success')}</p>
			</Container>
		</MotionMain>
	)
}