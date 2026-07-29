"use client";

import React from "react";
import {motion} from "framer-motion";
import {useTranslations} from "next-intl";
import styles from './ChatLayout.module.css';
import Button from "@/components/buttons/Button";
import CloseIcon from "@/components/icons/CloseIcon";
import SendIcon from "@/widgets/icons/SendIcon";
import classNames from "classnames";
import {Message} from "@/api/chat/types";
import Cookies from "universal-cookie";
import {ChatLayoutEnum} from "@/widgets/SupportChat/widgets/Chat/shared/types";
import {sendChatMessage} from "@/api/chat/api";
import {useChatSocket} from "../lib/utils";

interface ChatLayoutProps {
	messages: Message[];
	setLayout: (value: ChatLayoutEnum) => void;
	setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
	setVisible: (visible: boolean) => void;
}

export const ChatLayout: React.FC<ChatLayoutProps> = React.memo(({ messages, setLayout, setMessages, setVisible }) => {

	const cookies = new Cookies();
	const t = useTranslations('chat.chatLayout');
	const tChat = useTranslations('chat');
	const socketRef = useChatSocket();

	const inputLineRef = React.useRef<HTMLDivElement>(null);
	const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
	const scrollableRef = React.useRef<HTMLDivElement>(null);

	const [loadingSendButton, setLoadingSendButton] = React.useState(false);
	const [inputLineHeight, setInputLineHeight] = React.useState<number>(0);
	const [message, setMessage] = React.useState<string>('');

	const handleTextAreaChange = React.useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const textarea = textAreaRef.current;
		if (!textarea) return;
		const oldHeight = Number(textarea.style.height.replace("px", ""));
		textarea.style.height = 'auto';
		textarea.style.height = `${textarea.scrollHeight}px`;
		const newHeight = Number(textarea.style.height.replace("px", ""));
		if (textarea.scrollHeight <= textarea.clientHeight) {
			if (inputLineHeight + newHeight - oldHeight < textarea.scrollHeight) {
				setInputLineHeight(textarea.scrollHeight)
			} else {
				setInputLineHeight(inputLineHeight + newHeight - oldHeight)
			}
		}
		setMessage(e.target.value)
	}, [inputLineHeight, textAreaRef.current]);

	const handleClickEnter = React.useCallback(async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			await handleClickSendMessage();
		}
	}, [message, loadingSendButton]);

	const handleClickSendMessage = React.useCallback(async () => {
		try {
			if (message.length === 0) {
				alert('Введите сообщение');
				return;
			}

			if (loadingSendButton) return;
			setLoadingSendButton(true);

			const clientId: string = cookies.get("cc_id");

			await sendChatMessage({message, clientId});

			setMessage('');
			setMessages(prev => [...prev, {message, fromUser: true}]);
		} catch (e: any) {
			console.error(e);
			if (e.status === 404) {
				alert('Произошла ошибка, пожалуйста, введите ваше имя заново');
				setLayout(ChatLayoutEnum.WELCOME);
			}
		}
		setLoadingSendButton(false);
	}, [message, loadingSendButton]);

	const scrollRibbonToBottom = React.useCallback(() => {
		if (scrollableRef.current) {
			scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight + 20;
		}
	}, [scrollableRef.current]);

	React.useEffect(() => {
		scrollRibbonToBottom();
	}, [messages]);

	React.useEffect(() => {
		if (inputLineHeight !== 0) {
			const inputLine = inputLineRef.current;
			if (!inputLine) return;
			inputLine.style.height = `${inputLineHeight}px`;
		}
	}, [inputLineHeight]);

	React.useEffect(() => {
		scrollRibbonToBottom();
	}, [scrollableRef]);

	React.useEffect(() => {
		const socket = socketRef.current;
		if (!socket) return;

		const handler = (data: Message) => {
			if (data.fromUser) return;
			setMessages((prev) => [...prev, data]);
			scrollRibbonToBottom();
		};

		socket.on("new-message", handler);

		return () => {
			socket.off("new-message", handler);
			socket.disconnect();
		};
	}, [])

	return (
		<motion.section
			initial={{opacity: 0}}
			animate={{opacity: 1}}
			className={`relative flex flex-col w-full h-full ${styles.section}`}
		>
			<header className={`flex items-center justify-between ${styles.header}`}>
				<h2 id="support-chat-title">
					{t('header')}&nbsp;
					<span className="fw-bold">
						WORK-RC
					</span>
				</h2>
				<Button
					title={tChat('buttonClose.title')}
					aria-label={tChat('buttonClose.ariaLabel')}
					onClick={() => setVisible(false)}
				>
					<CloseIcon/>
				</Button>
			</header>
			<div
				className={styles.chatLog}
				role="log"
				aria-live="polite"
				ref={scrollableRef}
			>
				<div className={`flex flex-col justify-end ${styles.ribbon}`}>
					{messages.map((el, i) =>
						<div
							key={i}
							className={classNames('flex', {'justify-end': el.fromUser}, {'justify-start': !el.fromUser})}
						>
							<p
								className={classNames(styles.message, {[styles.clientMessage]: el.fromUser}, {[styles.supportMessage]: !el.fromUser})}>
								{el.message}
							</p>
						</div>
					)}
				</div>
			</div>
			<form className={`flex items-center ${styles.form}`}>
				<label htmlFor="support-chat-input" className="visually-hidden">
					Сообщение
				</label>
				<div ref={inputLineRef} style={{transition: 'height 0.2s ease'}} className="flex flex-grow-1">
					<div className="flex items-center" style={{flex: "1 0 auto"}}>
						<textarea
							className={styles.textarea}
							placeholder={t('textareaPlaceholder')}
							id="support-chat-input"
							rows={1}
							ref={textAreaRef}
							value={message}
							onChange={handleTextAreaChange}
							onKeyDown={handleClickEnter}
						/>
					</div>
				</div>
				<Button
					type="button"
					title={t('buttonSend.title')}
					aria-label={t('buttonSend.ariaLabel')}
					className={styles.buttonSend}
					onClick={handleClickSendMessage}
					loading={loadingSendButton}
				>
					<SendIcon />
				</Button>
			</form>
		</motion.section>
	)
});