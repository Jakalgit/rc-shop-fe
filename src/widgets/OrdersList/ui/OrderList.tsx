"use client";

import styles from "./OrderList.module.css"
import {OrderResponse} from "@/api/order/types";
import {motion} from "framer-motion";
import Link from "next/link";
import ChevronRightIcon from "@/components/icons/ChevronRightIcon";
import React from "react";
import {useTranslations} from "next-intl";

interface OrderListProps {
	orders: OrderResponse[];
}

export function OrderList({orders}: OrderListProps) {

	const t = useTranslations("OrderSearchPage");

	console.log(orders);

	return (
		<ul className={`flex flex-col ${styles.orderUl}`}>
			{orders.map((order, index) =>
				<motion.li
					key={index}
					initial={{opacity: 0}}
					animate={{opacity: 1}}
					className="flex justify-between"
				>
					<div className="h-full flex flex-col justify-between">
						<h2>{t("order")} № {order.orderNumber}</h2>
						<div className={`flex items-center ${styles.secondInfoLine}`}>
							<p>{order.guestName}</p>
							<p>{order.guestEmail}</p>
						</div>
					</div>
					<div className="h-full flex flex-col justify-between">
						<p className={`text-right ${styles.date}`}>
							{(new Date(order.createdAt)).toLocaleDateString("ru-RU", {
								day: "2-digit",
								month: "2-digit",
								year: "numeric",
							})}
						</p>
						<Link
							href={`/order/${order.orderNumber}`}
							title={t("buttonView.title")}
							aria-label={t("buttonView.ariaLabel", {orderId: order.orderNumber})}
							className={`flex items-center ${styles.viewLink}`}
						>
							{t("buttonView.title")}
							<ChevronRightIcon/>
						</Link>
					</div>
				</motion.li>
			)}
		</ul>
	)
}