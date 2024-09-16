export const getPreviousDate = (days: number) => {
	const today = new Date();
	const previousDate = new Date();

	previousDate.setDate(today.getDate() - days);
	return previousDate.toLocaleDateString();
};

export const formatPreviousDate = (days: number) => {
	const today = new Date();
	const previousDate = new Date();

	previousDate.setDate(today.getDate() - days);

	const month = String(previousDate.getMonth() + 1).padStart(2, '0');
	const day = String(previousDate.getDate()).padStart(2, '0');
	const year = previousDate.getFullYear();

	return `${year}-${month}-${day}`;
};

export const formatDate = (dateString: string) => {
	const [year, month, day] = dateString.split('-');
	const formattedDay = parseInt(day, 10);
	const formattedMonth = parseInt(month, 10);
	return `${formattedDay}/${formattedMonth}/${year}`;
};
