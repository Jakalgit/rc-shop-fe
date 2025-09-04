"use client";

import {useTranslations} from "next-intl";
import React, {useCallback, useState} from "react";
import {OrderResponse} from "@/api/order/types";
import {getOrderByNumber} from "@/api/order/api";
import {Col, Row} from "react-bootstrap";
import styles from "./OrdersFinder.module.css";
import Button from "@/components/buttons/Button";
import {OrderList} from "@/widgets/OrdersList";

export function OrdersFinder() {

	const t = useTranslations("OrderSearchPage");

	const [orderIdentifier, setOrderIdentifier] = useState<string>("");
	const [loadingButton, setLoadingButton] = useState<boolean>(false);
	const [foundOrder, setFoundOrder] = useState<OrderResponse[]>([]);

	const handleClickSearch = useCallback(async () => {
		try {
			setLoadingButton(true);

			const order = await getOrderByNumber({orderNumber: orderIdentifier});
			setFoundOrder([order]);
		} catch (e: any) {
			alert(e?.response?.data?.message);
			setFoundOrder([]);
		}
		setLoadingButton(false);
	}, [orderIdentifier])

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
						loading={loadingButton}
						onClick={handleClickSearch}
					>
						{t("buttonFind.title")}
					</Button>
				</div>
				<OrderList orders={foundOrder} />
			</Col>
		</Row>
	);
}