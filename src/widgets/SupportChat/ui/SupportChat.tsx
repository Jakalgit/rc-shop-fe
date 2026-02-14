"use client";

import React from "react";
import styles from './SupportChat.module.css';
import Button from "@/components/buttons/Button";
import ChatIcon from "@/widgets/icons/ChatIcon";
import {useTranslations} from "next-intl";
import {Chat} from '../widgets/Chat';

export const SupportChat = React.memo(() => {

	const t = useTranslations('chat');

	const [isOpen, setIsOpen] = React.useState(false);

	return (
		<>
			<Button
				title={t('buttonOpen.title')}
				aria-label={t('buttonOpen.ariaLabel')}
				className={`fixed ${styles.buttonOpen}`}
				aria-haspopup="dialog"
				aria-expanded={isOpen}
				onClick={() => setIsOpen(true)}
			>
				<ChatIcon />
			</Button>
			<Chat
				visible={isOpen}
				setVisible={setIsOpen}
			/>
		</>
	);
})