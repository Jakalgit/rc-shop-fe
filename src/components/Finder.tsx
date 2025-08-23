"use client";

import React, {useCallback, useEffect, useRef, useState} from 'react';
import styles from "@/styles/components/Finder.module.css";
import {Container} from "react-bootstrap";
import {motion, AnimatePresence} from "framer-motion";
import {useTranslations} from "next-intl";
import SearchIcon from "@/components/icons/SearchIcon";
import Button from "@/components/buttons/Button";
import CloseIcon from "@/components/icons/CloseIcon";
import {useActions} from "@/store/hooks";
import {useSelector} from "react-redux";
import {RootState} from "@/store";

const Finder = () => {

	const t = useTranslations("finder");
	const isOpen = useSelector((state: RootState) => state.finder.isOpen);

	const [text, setText] = useState<string>("");
	const inputRef = useRef<HTMLInputElement>(null);

	const {setIsOpenFinder} = useActions();

	const closeFinder = useCallback(() => {
		setIsOpenFinder(false);
		setText("");
	}, []);

	const findProducts = useCallback(() => {
		if (text.length >= 3) {
			window.location.href = `/catalog?finder=${text}`
			closeFinder();
		}
	}, [text]);

	const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			findProducts();
		}
	}, [findProducts]);

	useEffect(() => {
		if (isOpen) {
			inputRef.current?.focus();
		}
	}, [isOpen]);

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className={`fixed w-full h-full top-0 ${styles.wrapper}`}
				>
					<Container>
						<div className={`bg-white flex items-center ${styles.inputWrapper}`}>
							<Button
								onClick={findProducts}
								title={t("buttonSearch.title")}
								aria-label={t("buttonSearch.ariaLabel")}
								className="p-0"
							>
								<SearchIcon className={styles.icons}/>
							</Button>
							<input
								className={styles.input}
								value={text}
								onChange={(e) => setText(e.target.value)}
								type="text"
								placeholder={t("inputPlaceholder")}
								onKeyDown={handleKeyDown}
								ref={inputRef}
							/>
							<Button
								onClick={closeFinder}
								title={t("buttonClose.title")}
								aria-label={t("buttonClose.ariaLabel")}
								className="p-0"
							>
								<CloseIcon className={styles.icons}/>
							</Button>
						</div>
						<AnimatePresence>
							{text.length < 3 && (
								<motion.p
									initial={{opacity: 0, transform: 'translateX(100px)'}}
									animate={{opacity: 1, transform: 'none'}}
									exit={{opacity: 0, transform: 'translateX(100px)'}}
									className={`text-white ${styles.prompt}`}
								>
									{t("prompt")}
								</motion.p>
							)}
						</AnimatePresence>
					</Container>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Finder;