"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false, speed: 500, minimum: 0.25 });

export function ProgressBar() {
	const pathname = usePathname();

	useEffect(() => {
		NProgress.start();

		NProgress.done();
	}, [pathname]);

	return null;
}