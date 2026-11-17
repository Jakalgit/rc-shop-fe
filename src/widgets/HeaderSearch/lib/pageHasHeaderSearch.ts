export const pageHasHeaderSearch = (pathname: string) => {
	const path = pathname.split("?")[0].replace(/\/+$/, "") || "/";
	return path === "/" || path === "/catalog";
};
