"use client";

import React from "react";
import {usePathname} from "next/navigation";
import {pageHasHeaderSearch} from "../lib/pageHasHeaderSearch";
import {HeaderSearch} from "./HeaderSearch";

export const HeaderSearchSlot = () => {
	const pathname = usePathname();

	if (!pageHasHeaderSearch(pathname)) return null;

	return <HeaderSearch />;
};
