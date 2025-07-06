
export type Tag = {
	id: number;
	name: string;
	groupId: number | null;
	createdAt: Date;
	updatedAt: Date;
}

export type TagFilersResponse = {
	listOfTags: Tag[],
	listOfGroups: {
		name: string;
		tags: Tag[];
	}[];
	tagsWithoutGroup: Tag[];
}