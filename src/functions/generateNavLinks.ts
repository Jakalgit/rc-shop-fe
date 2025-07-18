
export const generateNavLinks = (t: any) => {
	return [
		{
			text: t("links.catalog"),
			link: "/catalog",
		},
		{
			text: t("links.yourOrder"),
			link: "/order-search",
		},
		{
			text: t("links.deliveryAndPayments"),
			link: "/delivery-and-payments",
		},
		{
			text: t("links.repair"),
			link: "/repair",
		},
		{
			text: t("links.aboutUs"),
			link: "/about-us",
		},
		{
			text: t("links.becomePartner"),
			link: '/partners'
		}
	];
}