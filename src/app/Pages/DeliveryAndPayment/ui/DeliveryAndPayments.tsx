import styles from "./DeliveryAndPayments.module.css";
import MotionMain from "@/components/MotionMain";
import {getTranslations} from "next-intl/server";
import {Container} from "react-bootstrap";
import {RichText} from "@/widgets/RichText";
import {PageBlockResponse, PageEnum} from "@/api/page-blocks/types";
import {getPageBlocks} from "@/api/page-blocks/api";

export async function DeliveryAndPayments() {

	const t = await getTranslations("DeliveryAndPaymentsPage");

	let response: PageBlockResponse[] = [];

	try {
		response = await getPageBlocks(PageEnum.DELIVERY_AND_PAYMENTS);
	} catch (e) {
		console.error(e);
	}

	return (
		<MotionMain>
			<section>
				<Container>
					<h1 className="headText">
						{t("head")}
					</h1>
					{response.map((item, index) =>
						<section
							className={`flex flex-col ${styles.block}`}
							key={index}
						>
							<header className={`flex items-center ${styles.header}`}>
								<div className={styles.pill} />
								<h2>
									{item.title}
								</h2>
							</header>
							<p>
								<RichText text={item.description} />
							</p>
						</section>
					)}
				</Container>
			</section>
		</MotionMain>
	)
}