/** @param {import("../types/timezone.js").Timezone} timezone */
export const timezoneToMinutes = (timezone) => {
	const multiplier = Number(timezone.substring(0, 1) + '1');
	const hour = Number(timezone.substring(1, 3));
	const minute = Number(timezone.substring(4));
	return multiplier * (60 * hour + minute);
};
