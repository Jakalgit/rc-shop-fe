import {getTranslations} from "next-intl/server";
import MotionMain from "@/components/MotionMain";
import {Container} from "react-bootstrap";
import styles from "./OrderSearch.module.css";
import React from "react";
import {OrdersFinder} from "../widgets/OrdersFinder";

export async function OrderSearch() {

	const t = await getTranslations("OrderSearchPage");

	return (
		<MotionMain>
			<Container>
				<h1 className="headText">
					{t("head")}
				</h1>
				<p className={styles.text}>
					{t("text")}
				</p>
				<OrdersFinder />
			</Container>
		</MotionMain>
	);
}