/** @import {OffsetString} from "./date.types.js" */

/** @param {OffsetString} offset */
const offsetToMinutes = (offset) => {
	if (offset === '+00:00') return 0;
	const multiplier = Number(offset.substring(0, 1) + '1');
	const hour = Number(offset.substring(1, 3));
	const minute = Number(offset.substring(4));
	return multiplier * (60 * hour + minute);
};

/** @param {number} offset */
const offsetToString = (offset) => {
	if (!Number.isInteger(offset)) throw new Error(`${offset} is not a integer`);
	const multiplier = offset >= 0 ? '+' : '-';
	// prettier-ignore
	const hour = Math.floor(Math.abs(offset) / 60).toString().padStart(2, '0');
	const minute = (Math.abs(offset) % 60).toString().padStart(2, '0');
	return `${multiplier}${hour}:${minute}`;
};

/** @param {OffsetString | number} offset */
export const dateToISOStringWithOffset = (date = new Date(), offset = date.getTimezoneOffset()) => {
	const offsetMinutes = typeof offset === 'number' ? offset : offsetToMinutes(offset);
	const offsetString = typeof offset === 'string' ? offset : offsetToString(offset);
	const shifted = new Date(date.valueOf() + offsetMinutes * 60 * 1000);
	return shifted.toISOString().substring(0, 19) + offsetString;
};

export const dateToSafeISOString = (date = new Date()) => date.toISOString().replace(/[-:]/g, '');
