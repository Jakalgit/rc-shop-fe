import React from 'react';
import styles from "@/styles/components/Footer.module.css";
import {getTranslations} from "next-intl/server";
import Link from "next/link";
import {Container} from "react-bootstrap";
import CallIcon from "@/components/icons/CallIcon";
import {formatPhoneNumber} from "@/functions/format";
import {generateNavLinks} from "@/functions/generateNavLinks";
import Cookies from "universal-cookie";

interface FooterProps {
	phone: string;
	address: string;
}

const Footer: React.FC<FooterProps> = async ({phone, address}) => {

	const cookies = new Cookies();

	const t = await getTranslations("footer");
	const tHeader = await getTranslations("header");
	const act = cookies.get("act") || "";

	const links = generateNavLinks(tHeader, act);

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
						href={`tel:${phone}`}
					>
						<CallIcon />
						{formatPhoneNumber(phone)}
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