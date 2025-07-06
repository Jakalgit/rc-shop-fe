
export const formatPrice = (value: number, fractionDigits: number = 0) => {
	return value.toLocaleString('ru-RU', {
		minimumFractionDigits: fractionDigits,
		maximumFractionDigits: fractionDigits,
	}) + ' ₽';
};

export const formatPhoneNumber = (phone: string) => {
	const match = phone.match(/^\+7(\d{3})(\d{3})(\d{2})(\d{2})$/);
	if (!match) return phone;

	return `+7 (${match[1]}) ${match[2]}-${match[3]}-${match[4]}`;
}