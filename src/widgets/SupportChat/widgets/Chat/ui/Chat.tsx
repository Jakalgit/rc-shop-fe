import React from "react";
import {AnimatePresence, motion} from "framer-motion";
import styles from './Chat.module.css';
import {WelcomeLayout} from "../widgets/WelcomeLayout";
import {ChatLayoutEnum} from "../shared/types";
import {ChatLayout} from "../widgets/ChatLayout";
import Cookies from "universal-cookie";
import {getChatInfo, getChatMessages} from "@/api/chat/api";
import {Message} from "@/api/chat/types";

interface ChatProps {
	visible: boolean;
	setVisible: (visible: boolean) => void;
}

export const Chat: React.FC<ChatProps> = React.memo(({ visible, setVisible }) => {

	const cookies = new Cookies();
	const [layout, setLayout] = React.useState<ChatLayoutEnum>(ChatLayoutEnum.WELCOME);
	const [messages, setMessages] = React.useState<Message[]>([]);
	const [loading, setLoading] = React.useState(true);

	const dialogRef = React.useRef<HTMLDialogElement>(null);

	React.useEffect(() => {
		async function getData() {
			try {
				const clientId = cookies.get('cc_id');

				if (!clientId) {
					setLayout(ChatLayoutEnum.WELCOME);
					return;
				}

				try {
					await getChatInfo({clientId});
				} catch (e: any) {
					if (e.status === 404) {
						setLayout(ChatLayoutEnum.WELCOME);
						return;
					}
				}

				const response = await getChatMessages({clientId});
				setMessages(response);

				setLayout(ChatLayoutEnum.CHAT);
				setLoading(false);
			} catch (e) {

			}
		}

		console.log('render');
		getData();
	}, []);

	return (
		<>
			<AnimatePresence>
				{visible && (
					<motion.dialog
						className={styles.chat}
						initial={{opacity: 0, transform: 'translateX(100%)'}}
						animate={{opacity: 1, transform: 'none'}}
						exit={{opacity: 0, transform: 'translateX(100%)'}}
						ref={dialogRef}
						aria-labelledby="support-chat-title"
					>
						{layout === ChatLayoutEnum.WELCOME && (
							<WelcomeLayout setLayout={setLayout}/>
						)}
						{layout === ChatLayoutEnum.CHAT && (
							<ChatLayout
								setLayout={setLayout}
								messages={messages}
								setMessages={setMessages}
								setVisible={setVisible}
							/>
						)}
					</motion.dialog>
				)}
			</AnimatePresence>
		</>
	)
})