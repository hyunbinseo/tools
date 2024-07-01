import { timezoneToMinutes } from './timezone.js';

/** @param {import("../types/timezone.js").Timezone} timezone */
export const dateToISOStringWithOffset = (date = new Date(), timezone) => {
	const shifted = new Date(date.valueOf() + timezoneToMinutes(timezone) * 60 * 1000);
	return shifted.toISOString().substring(0, 19) + timezone;
};

export const dateToSafeISOString = (date = new Date()) => date.toISOString().replace(/[-:]/g, '');
