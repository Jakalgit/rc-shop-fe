import {getTranslations} from "next-intl/server";
import {cookies} from "next/headers";
import {generateNavLinks} from "@/functions/generateNavLinks";
import styles from "./Header.module.css";
import {Container} from "react-bootstrap";
import Link from "next/link";
import ShoppingBasketIcon from "@/components/icons/ShoppingBasketIcon";
import React from "react";
import {formatPhoneNumber} from "@/functions/format";
import {Menu} from "../widgets/Menu";
import {ButtonFinder} from "@/widgets/Header/widgets/ButtonFinder";

interface HeaderProps {
	phone: string;
}

export const Header: React.FC<HeaderProps> = async ({ phone }) => {

	const t = await getTranslations("header");

	// Получаем токен авторизации
	const cookieStore = await cookies();
	const act: string = cookieStore.get("act")?.value || "";

	const links = generateNavLinks(t, act);

	return (
		<header className={`${styles.header} bg-[color:var(--foreground-color)] sticky top-0 left-0 flex`}>
			<Container className="flex items-center justify-between">
				<Link className="text-decoration-none" href="/">
					<h1 className={`${styles.brand} text-white fw-bold`}>
						WORK-RC
					</h1>
				</Link>
				<a className={`flex items-center ${styles.phoneLink}`} href={`tel:${phone}`}>
					{formatPhoneNumber(phone)}
				</a>
				<div className={`${styles.contentGap} flex items-center`}>
					{links.map((el, i) =>
						<Link
							className={`duration-200 ${styles.link}`}
							href={el.link}
							key={i}
						>
							{el.text}
						</Link>
					)}
					<a
						href="/basket"
					>
						<ShoppingBasketIcon className={styles.icon} />
					</a>
					<ButtonFinder />
					<Menu links={links} />
				</div>
			</Container>
		</header>
	);
}