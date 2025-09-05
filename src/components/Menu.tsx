"use client";

import React, {useEffect, useRef, useState} from 'react';
import Button from "@/components/buttons/Button";
import MenuIcon from "@/components/icons/MenuIcon";
import styles from "@/styles/components/Menu.module.css";
import {motion, AnimatePresence} from "framer-motion";
import {useTranslations} from "next-intl";
import Link from "next/link";

interface MenuProps {
	links: {
		text: string;
		link: string;
	}[]
}

const Menu: React.FC<MenuProps> = ({ links }) => {

	const t = useTranslations("header");

	const buttonRef = useRef<HTMLButtonElement | null>(null);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	useEffect(() => {
		const handleClickOutside = (event: any) => {
			if (buttonRef.current && !buttonRef.current.contains(event.target)) {
				setTimeout(() => setIsMenuOpen(false), 100);
			}
		}

		document.addEventListener("pointerdown", handleClickOutside);

		return () => {
			document.removeEventListener("pointerdown", handleClickOutside);
		};
	}, [buttonRef.current]);

	return (
		<div className={`relative ${styles.blockSize}`}>
			<Button
				title={t("buttonMenu.title")}
				aria-label={t("buttonMenu.ariaLabel")}
				onClick={() => setIsMenuOpen(!isMenuOpen)}
				ref={buttonRef}
				className={`p-0 ${styles.buttonMenu}`}
			>
				<MenuIcon className={styles.blockSize} />
			</Button>
			<AnimatePresence>
				{isMenuOpen && (
					<motion.ul
						initial={{opacity: 0, height: 0}}
						animate={{opacity: 1, height: 'auto'}}
						exit={{opacity: 0, height: 0}}
						className={styles.buttonList}
					>
						{links.map((el, i) =>
							<motion.li
								key={i}
							>
								<Link
									className={styles.link}
									href={el.link}
								>
									{el.text}
								</Link>
							</motion.li>
						)}
					</motion.ul>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Menu;