"use client";

import React, {useState} from 'react';
import {Col, Row} from "react-bootstrap";
import Button from "@/components/buttons/Button";
import {useTranslations} from "next-intl";
import styles from "@/styles/pages/OrderSearch.module.css";
import ChevronRightIcon from "@/components/icons/ChevronRightIcon";
import Link from "next/link";

const OrderSearchList = () => {

	const t = useTranslations("OrderSearchPage");

	const [orderIdentifier, setOrderIdentifier] = useState<string>("");

	return (
		<Row className={styles.searchList}>
			<Col lg={{span: 8, offset: 2}}>
				<div className={`w-full flex items-center ${styles.inputWrapper}`}>
					<input
						type="text"
						placeholder={t("inputPlaceholder")}
						value={orderIdentifier}
						onChange={(e) => setOrderIdentifier(e.target.value)}
					/>
					<Button
						className="h-full"
						title={t("buttonFind.title")}
						aria-label={t("buttonFind.ariaLabel")}
					>
						{t("buttonFind.title")}
					</Button>
				</div>
				<ul className={`flex flex-col ${styles.orderUl}`}>
					<li className="flex justify-between">
						<div className="h-full flex flex-col justify-between">
							<h2>Заказ №18487395839</h2>
							<div className={`flex items-center ${styles.secondInfoLine}`}>
								<p>Иванов Иван Иванович</p>
								<p>+7 (495) 574-38-53</p>
							</div>
						</div>
						<div className="h-full flex flex-col justify-between">
							<p className={`text-right ${styles.date}`}>02.05.2025</p>
							<Link
								href={'/'}
								title={t("buttonView.title")}
								aria-label={t("buttonView.ariaLabel", {orderId: 123})}
								className={`flex items-center ${styles.viewLink}`}
							>
								{t("buttonView.title")}
								<ChevronRightIcon />
							</Link>
						</div>
					</li>
				</ul>
			</Col>
		</Row>
	);
};

export default OrderSearchList;