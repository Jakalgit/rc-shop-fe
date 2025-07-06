import React from 'react';
import styles from "@/styles/components/Footer.module.css";
import {getTranslations} from "next-intl/server";
import Link from "next/link";
import {Container} from "react-bootstrap";
import CallIcon from "@/components/icons/CallIcon";
import {formatPhoneNumber} from "@/functions/format";

const Footer = async () => {

	const phoneNumber = "+74955743853";
	const address = "105082, г. Москва, Спартаковская площадь д. 10, стр. 12";

	const t = await getTranslations("footer");
	const tHeader = await getTranslations("header");

	const links = [
		{
			text: tHeader("links.catalog"),
			link: "/catalog",
		},
		{
			text: tHeader("links.yourOrder"),
			link: "/order-search",
		},
		{
			text: tHeader("links.deliveryAndPayments"),
			link: "/delivery-and-payments",
		},
		{
			text: tHeader("links.repair"),
			link: "/repair",
		},
		{
			text: tHeader("links.aboutUs"),
			link: "/about-us",
		}
	];

	return (
		<footer className={styles.footer}>
			<Container>
				<div className={`flex ${styles.linksLine}`}>
					{links.map((el, i) =>
						<Link href={el.link} key={i}>
							{el.text}
						</Link>
					)}
				</div>
				<div className="flex flex-col">
					<a
						className={`flex items-center ${styles.phoneLink}`}
						href={`tel:${phoneNumber}`}
					>
						<CallIcon />
						{formatPhoneNumber(phoneNumber)}
					</a>
					<p className={`text-white ${styles.address}`}>
						{address}
					</p>
				</div>
				<div className={`flex flex-col ${styles.secondaryInfo}`}>
					<span>
						{t("info1")}
					</span>
					<span>
						{t("info2")}
					</span>
				</div>
			</Container>
		</footer>
	);
};

export default Footer;