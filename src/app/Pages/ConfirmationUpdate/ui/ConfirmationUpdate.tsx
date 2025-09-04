"use client";

import {useTranslations} from "next-intl";
import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {confirmUpdateEmail} from "@/api/profile/api";
import LoadingPage from "@/components/LoadingPage";
import MotionMain from "@/components/MotionMain";
import {Container} from "react-bootstrap";
import styles from "./ConfirmationUpdate.module.css";
import Head from "next/head";

enum ConfirmationFieldEnum {
	EMAIL = "email",
}

export function ConfirmationUpdatePage() {

	const t = useTranslations("ConfirmationPage");
	const queryParams = useSearchParams();

	const token: string = queryParams?.get("token") || "";
	const field = queryParams?.get("confirmationField");
	const confirmationField: ConfirmationFieldEnum =
		field && isConfirmationFieldEnum(field) ? field : ConfirmationFieldEnum.EMAIL;

	const [loading, setLoading] = useState(true);
	const [resultText, setResultText] = useState<string>("");

	function isConfirmationFieldEnum(value: string): value is ConfirmationFieldEnum {
		return Object.values(ConfirmationFieldEnum).includes(value as ConfirmationFieldEnum);
	}

	useEffect(() => {
		async function getData() {
			try {
				switch (confirmationField) {
					case ConfirmationFieldEnum.EMAIL:
						await confirmUpdateEmail(token);
						setResultText(t("success"));
						break;
					default:
						setResultText(t("error"));
						break;
				}
			} catch (e: any) {
				console.error(e);
				setResultText(t("error"));
			}
			setLoading(false);
		}

		getData();
	}, []);

	if (loading) {
		return <LoadingPage />;
	}

	return (
		<>
			<Head>
				<title>{t("title")}</title>
				<meta name="description" content={t("description")} />
			</Head>
			<MotionMain>
				<section className={`h-full ${styles.ConfirmationUpdate}`}>
					<Container>
						<div className="flex flex-col items-center">
							<p>
								{resultText}
							</p>
							<a className={styles.link} href="/profile">перейти в профиль</a>
						</div>
					</Container>
				</section>
			</MotionMain>
		</>
	);
}