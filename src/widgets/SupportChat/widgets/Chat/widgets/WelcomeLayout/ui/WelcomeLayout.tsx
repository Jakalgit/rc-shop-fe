"use client";

import React from "react";
import styles from './WelcomeLayout.module.css';
import {useTranslations} from "next-intl";
import Button from "@/components/buttons/Button";
import Cookies from "universal-cookie";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from 'uuid';
import {ChatLayoutEnum} from "../../../shared/types";
import {createChat} from "@/api/chat/api";

interface LayoutProps {
	setLayout: (value: ChatLayoutEnum) => void;
}

export const WelcomeLayout: React.FC<LayoutProps> = React.memo(({ setLayout }) => {

	const cookies = new Cookies();

	const t = useTranslations('chat.welcomeLayout');

	const [name, setName] = React.useState<string>('');
	const [loadingButton, setLoadingButton] = React.useState<boolean>(false);

	const handleClickNext = React.useCallback(async () => {
		if (name.length < 2) {
			alert(t('errorName'));
			return;
		}

		setLoadingButton(true);
		try {
			const clientId = uuidv4();
			await createChat({clientId, name});

			cookies.set('cc_id', clientId);

			setLayout(ChatLayoutEnum.CHAT);
		} catch (e: any) {
			if (e.status === 404) {
				alert('Произошла ошибка, пожалуйста, попробуйте позже');
				setLayout(ChatLayoutEnum.WELCOME);
			}
		}

		setLoadingButton(false);
	}, [name, setLayout]);

	return (
		<motion.section
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="relative flex items-center justify-center w-full h-full"
		>
			<h2 className={`absolute ${styles.welcome}`}>
				{t('welcome')}
			</h2>
			<section className={`flex flex-col ${styles.section}`}>
				<h3>
					{t('addressYou')}
				</h3>
				<div className={styles.inputWrapper}>
					<input
						className="w-full text-center"
						value={name}
						onChange={(e) => setName(e.target.value)}
						type="text"
						placeholder={t('namePlaceholder')}
					/>
				</div>
				<Button
					title={t('buttonNext.title')}
					aria-label={t('buttonNext.ariaLabel')}
					className={styles.buttonNext}
					onClick={handleClickNext}
					loading={loadingButton}
				>
					{t('buttonNext.title')}
				</Button>
			</section>
		</motion.section>
	)
})