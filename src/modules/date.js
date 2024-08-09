/** @import {Timezone} from "./date.types.js" */

/** @param {Timezone} timezone */
const timezoneToMinutes = (timezone) => {
	const multiplier = Number(timezone.substring(0, 1) + '1');
	const hour = Number(timezone.substring(1, 3));
	const minute = Number(timezone.substring(4));
	return multiplier * (60 * hour + minute);
};

/** @param {Timezone} timezone */
export const dateToISOStringWithOffset = (date = new Date(), timezone) => {
	const shifted = new Date(date.valueOf() + timezoneToMinutes(timezone) * 60 * 1000);
	return shifted.toISOString().substring(0, 19) + timezone;
};

export const dateToSafeISOString = (date = new Date()) => date.toISOString().replace(/[-:]/g, '');
