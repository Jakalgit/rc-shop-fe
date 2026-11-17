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
	phone1: string;
	phone2: string;
}

export const Header: React.FC<HeaderProps> = async ({ phone1, phone2 }) => {

	const t = await getTranslations("header");

	// Получаем токен авторизации
	const cookieStore = await cookies();
	const act: string = cookieStore.get("act")?.value || "";

	const links = generateNavLinks(t, act);

	return (
		<header className={`${styles.header} bg-[color:var(--foreground-color)] flex`}>
			<Container className="flex items-center justify-between">
				<Link className="text-decoration-none" href="/" aria-label="WORK-RC, на главную">
					<p className={`${styles.brand} text-white fw-bold`}>
						WORK-RC
					</p>
				</Link>
				<div className={`flex items-center ${styles.phoneLinks}`}>
					<a className={`flex items-center ${styles.phoneLink}`} href={`tel:${phone1}`}>
						{formatPhoneNumber(phone1)}
					</a>
					<a className={`flex items-center ${styles.phoneLink} ${styles.secondPhone}`} href={`tel:${phone2}`}>
						{formatPhoneNumber(phone2)}
					</a>
				</div>
				<nav className={`${styles.contentGap} flex items-center`} aria-label="Основное меню">
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
						aria-label="Корзина"
					>
						<ShoppingBasketIcon className={styles.icon}/>
					</a>
					<ButtonFinder/>
					<Menu links={links}/>
				</nav>
			</Container>
		</header>
	);
}