import React from 'react';
import MotionMain from "@/components/MotionMain";
import {Container} from "react-bootstrap";
import {getTranslations} from "next-intl/server";
import styles from "@/styles/pages/OrderSearch.module.css"
import OrderSearchList from "@/components/OrderSearchList";

export default async function OrderSearchPage() {

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
				<OrderSearchList />
			</Container>
		</MotionMain>
	);
};