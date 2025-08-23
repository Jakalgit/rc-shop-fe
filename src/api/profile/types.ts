
export type LoginResponse = {
	jwt: string;
}

export type ProfileResponse = {
	id: string;
	name: string;
	phone: string;
	email: string;
	descriptionOfActivities?: string;
	organization?: string;
	status: string;
	type: string;
}