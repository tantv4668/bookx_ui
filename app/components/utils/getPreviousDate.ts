export const getPreviousDate = (days: number) => {
	const today = new Date();
	const previousDate = new Date();

	previousDate.setDate(today.getDate() - days);
	return previousDate.toLocaleDateString();
};
