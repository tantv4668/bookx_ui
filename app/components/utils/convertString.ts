export const convertString = (text: string) => {
	const visiblePart = text.substring(0, 6);
	const hiddenPart = '*'.repeat(5);
	return `${visiblePart}${hiddenPart}`;
};
