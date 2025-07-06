import {defineRouting} from "next-intl/routing";
import {createNavigation} from "next-intl/navigation";
import {LOCALES} from "@/consts/locales";

export const routing = defineRouting({
	locales: LOCALES,
	defaultLocale: 'ru',
});

export const {Link, redirect, usePathname, useRouter, getPathname} =
	createNavigation(routing);