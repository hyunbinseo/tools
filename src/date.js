/** @import {Offset} from "./date.types.js" */

/** @param {Offset} offset */
const offsetToMinutes = (offset) => {
	const multiplier = Number(offset.substring(0, 1) + '1');
	const hour = Number(offset.substring(1, 3));
	const minute = Number(offset.substring(4));
	return multiplier * (60 * hour + minute);
};

/** @param {Offset} offset */
export const dateToISOStringWithOffset = (date = new Date(), offset) => {
	const shifted = new Date(date.valueOf() + offsetToMinutes(offset) * 60 * 1000);
	return shifted.toISOString().substring(0, 19) + offset;
};

export const dateToSafeISOString = (date = new Date()) => date.toISOString().replace(/[-:]/g, '');
