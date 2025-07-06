import React from 'react';
import styles from "@/styles/pages/Home.module.css";
import LogoIcon from "@/components/icons/LogoIcon";
import {getTranslations} from "next-intl/server";

const CompanyDesc = async () => {

	const t = await getTranslations("HomePage");

	const jobListLength = 4;

	return (
		<div className={`flex flex-col ${styles.textBlock}`}>
			<h1>
				{t.rich("firstText", {
					bold: (chunk) => <span className="fw-bold">{chunk}</span>,
					br: () => <br/>
				})}
			</h1>
			<div className="flex flex-col items-center">
				<p className="fw-bold">{t("ourJob")}</p>
				<ul className={`flex flex-col ${styles.ulWrapper}`}>
					{new Array(jobListLength).fill(0).map((_, i) =>
						<li key={i}>
							{t(`jobList.${i + 1}`)}
						</li>
					)}
				</ul>
				<LogoIcon className={styles.logoIcon}/>
				<p className="fw-bold">
					{t("readyToHelp")}
				</p>
			</div>
		</div>
	);
};

export default CompanyDesc;