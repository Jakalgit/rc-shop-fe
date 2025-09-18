
export enum PageEnum {
	DELIVERY_AND_PAYMENTS = "DELIVERY_AND_PAYMENTS",
}

export type PageBlockResponse = {
	id: number;
	title: string;
	description: string;
	pageType: PageEnum;
}