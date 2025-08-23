import {$host} from "@/api";
import {LoginResponse, ProfileResponse} from "@/api/profile/types";

export const createPartner = async (
	{name, organization, phone, email, descriptionOfActivities}:
	{name: string, organization: string, phone: string, email: string, descriptionOfActivities: string},
): Promise<void> => {
	const {data} = await $host.post('/profile/partner', {name, organization, phone, email, descriptionOfActivities});
	return data;
}

export const loginProfile = async (
	{login, password}: {login: string, password: string},
): Promise<LoginResponse> => {
	const {data} = await $host.post('/profile/login', {login, password});
	return data;
}

export const updatePassword = async (
	{newPassword, oldPassword, token}: {newPassword: string, oldPassword: string, token: string},
): Promise<void> => {
	const {data} = await $host.post('/profile/update-password', {newPassword, oldPassword}, {headers: {Authorization: `Bearer ${token}`}});
	return data;
}

export const emailUpdateRequest = async (
	{email, password, token}: {email: string, password: string, token: string}
) => {
	const {data} = await $host.post('/profile/update-email', {email, password}, {headers: {Authorization: `Bearer ${token}`}});
	return data;
}

export const confirmUpdateEmail = async (token: string): Promise<void> => {
	const {data} = await $host.post('/profile/confirm-email', {token});
	return data;
}

export const resetPasswordByEmail = async (
	{email}: {email: string}
): Promise<void> => {
	const {data} = await $host.post('/profile/reset-password-by-email', {email});
	return data;
}

export const confirmResetPassword = async (
	{token, password}: {token: string, password: string}
): Promise<void> => {
	const {data} = await $host.put('/profile/confirm-new-password', {token, password});
	return data;
}

export const getProfileData = async (token: string): Promise<ProfileResponse> => {
	const {data} = await $host.get('/profile', {headers: {Authorization: `Bearer ${token}`}});
	return data;
}