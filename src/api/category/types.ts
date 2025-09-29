
export type CategoryBlockResponse = {
	blockText: string;
	index: number;
	image: string;
	links: CategoryLinkResponse[];
	subBlocks: CategorySubBlockResponse[];
}

export type CategoryLinkResponse = {
	link: string;
	linkText: string;
	index: number;
}

export type CategorySubBlockResponse = {
	blockLink: string;
	name: string;
	index: number;
	image: string;
}