"use client";

import styles from "./Profile.module.css";
import {useRouter} from "next/navigation";
import Cookies from "universal-cookie";
import {useTranslations} from "next-intl";
import React, {useCallback, useEffect, useState} from "react";
import {ProfileResponse} from "@/api/profile/types";
import {RoutesEnum} from "@/shared/lib/routes.enum";
import {getProfileData} from "@/api/profile/api";
import LoadingPage from "@/components/LoadingPage";
import MotionMain from "@/components/MotionMain";
import {Container} from "react-bootstrap";
import Button from "@/components/buttons/Button";
import {UpdateEmailPopup, UpdatePasswordPopup} from "../../widgets";
import Head from "next/head";

export function Profile() {

	const router = useRouter();
	const cookies = new Cookies();
	const t = useTranslations("ProfilePage");

	// Состояние окна для смены пароля
	const [isOpenChangePasswordPopup, setIsOpenChangePasswordPopup] = useState<boolean>(false);
	// Состояние окна для смены почты
	const [isOpenChangeEmailPopup, setIsOpenChangeEmailPopup] = useState<boolean>(false);
	// Данные пользователя
	const [profileData, setProfileData] = useState<ProfileResponse | null>(null);

	const [loading, setLoading] = useState<boolean>(true);

	// Обработчик нажатия на кнопку изменения пароля
	const onClickChangePassword = useCallback(() => {
		setIsOpenChangePasswordPopup(true);
	}, []);

	// Обработчик нажатия на кнопку изменения почты
	const onClickChangeEmail = useCallback(() => {
		setIsOpenChangeEmailPopup(true);
	}, []);

	// Обработчик нажатия на кнопку выхода из аккаунта
	const onClickLogout = useCallback(() => {
		cookies.remove("act");
		router.push(RoutesEnum.PARTNERS);
	}, []);

	const infoBlocks = [
		[
			{
				head: t("name"),
				content: profileData?.name,
			},
			{
				head: t("email"),
				content: profileData?.email,
				fieldChangeOnClick: onClickChangeEmail,
			}
		],
		[
			{
				head: t("organization"),
				content: profileData?.organization,
			},
			{
				head: t("phone"),
				content: profileData?.phone,
			}
		]
	];

	useEffect(() => {
		async function getData() {
			// Флаг редиректа
			let redirectToPartnerPage = true;

			// Проверяем токен пользователя, если он есть
			try {
				const response = await getProfileData(cookies.get("act") || "");
				redirectToPartnerPage = false;

				setProfileData(response);
			} catch (e) {
				cookies.remove("act");
				console.log(e);
			}

			// Редирект на страницу регистрации, если пользователь не авторизован
			if (redirectToPartnerPage) {
				router.push(RoutesEnum.PARTNERS);
			} else {
				setLoading(false);
			}
		}

		getData();
	}, []);

	if (loading) {
		return <LoadingPage />
	}

	return (
		<>
			<Head>
				<title>{t("title")}</title>
				<meta name="description" content={t("description")}/>
			</Head>
			<MotionMain>
				<UpdateEmailPopup
					isOpen={isOpenChangeEmailPopup}
					onClose={() => setIsOpenChangeEmailPopup(false)}
				/>
				<UpdatePasswordPopup
					isOpen={isOpenChangePasswordPopup}
					onClose={() => setIsOpenChangePasswordPopup(false)}
				/>
				<section>
					<Container>
						<div className="flex items-center justify-between">
							<h1 className="headText">
								{t("head")}
							</h1>
							<Button
								title={t("buttonLogout.title")}
								aria-label={t("buttonLogout.ariaLabel")}
								className={styles.logoutButton}
								onClick={onClickLogout}
							>
								{t("buttonLogout.text")}
							</Button>
						</div>
						<div className={`flex flex-col ${styles.profileInfo}`}>
							{infoBlocks.map((block, index) =>
								<div className={`flex justify-between`} key={index}>
									{block.map((el, i) =>
										<React.Fragment key={i}>
											{el.content && (
												<div style={{minWidth: 0}}>
													<h3 className={styles.infoHead}>
														{el.head}
													</h3>
													<div className={`flex items-center ${styles.infoTextWrapper}`}>
														<p>
															{el.content}
														</p>
														{el.fieldChangeOnClick && (
															<Button
																title={t.rich("buttonChangeField.title", {dataName: el.head}) as string}
																aria-label={t.rich("buttonChangeField.ariaLabel", {dataName: el.head}) as string}
																className={styles.changeButton}
																onClick={el.fieldChangeOnClick}
															>
																{t("buttonChangeField.text")}
															</Button>
														)}
													</div>
												</div>
											)}
										</React.Fragment>
									)}
								</div>
							)}
							{profileData?.descriptionOfActivities && (
								<div style={{gridTemplateColumns: `repeat(1, 1fr)`}}>
									<div>
										<h3 className={styles.infoHead}>
											{t("activity")}
										</h3>
										<div className={`${styles.infoTextWrapper} ${styles.activityDescription}`}>
											{profileData.descriptionOfActivities}
										</div>
									</div>
								</div>
							)}
						</div>
						<div className="flex justify-center">
							<Button
								title={t("buttonChangePassword.title")}
								aria-label={t("buttonChangePassword.ariaLabel")}
								className={`${styles.changeButton} ${styles.changePassword}`}
								onClick={onClickChangePassword}
							>
								{t("buttonChangePassword.title")}
							</Button>
						</div>
					</Container>
				</section>
			</MotionMain>
		</>
	);
}