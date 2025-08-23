import {RoutesEnum} from "@/shared/lib/routes.enum";

export const generateNavLinks = (t: any, act: string) => {
	return [
		{
			text: t("links.catalog"),
			link: RoutesEnum.CATALOG,
		},
		{
			text: t("links.yourOrder"),
			link: RoutesEnum.ORDER_SEARCH,
		},
		{
			text: t("links.deliveryAndPayments"),
			link: "/delivery-and-payments",
		},
		{
			text: t("links.repair"),
			link: RoutesEnum.REPAIR,
		},
		{
			text: t("links.aboutUs"),
			link: RoutesEnum.ABOUT_US,
		},
		{
			text: t("links.becomePartner"),
			link: act?.length || 0 > 0 ? RoutesEnum.PROFILE : RoutesEnum.PARTNERS,
		}
	];
}