import React from 'react';
import styles from "@/styles/components/Header.module.css";
import {Container} from "react-bootstrap";
import Link from "next/link";
import {getTranslations} from "next-intl/server";
import ShoppingBasketIcon from "@/components/icons/ShoppingBasketIcon";
import ButtonFinder from "@/components/buttons/ButtonFinder";
import Menu from "@/components/Menu";
import {generateNavLinks} from "@/functions/generateNavLinks";

const Header = async () => {

	const t = await getTranslations("header");

	const links = generateNavLinks(t);

	return (
		<header className={`${styles.header} bg-[color:var(--foreground-color)] sticky top-0 left-0 flex`}>
			<Container className="flex items-center justify-between">
				<Link className="text-decoration-none" href="/">
					<h1 className={`${styles.brand} text-white fw-bold`}>
						WORK-RC
					</h1>
				</Link>
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
};

export default Header;