
export enum SliderTagEnum {
	NONE = 'none',
	POPULAR = 'popular',
	ON_THE_WAY = 'on_the_way',
	NEW = 'new',
}

export type SlideResponse = {
	id: number;
	href: string;
	title: string;
	text: string;
	buttonText: string;
	imageId: number;
	filename: string;
	index: number;
	tagType: SliderTagEnum;
	price: number | null;
}