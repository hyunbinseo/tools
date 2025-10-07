type PlusMinus = '+' | '-';

type Hour =
	| '00'
	| '01'
	| '02'
	| '03'
	| '04'
	| '05'
	| '06'
	| '07'
	| '08'
	| '09'
	| '10'
	| '11'
	| '12'
	| '13'
	| '14';

type Minute = '00' | '30' | '45';

// It is not permitted to state a zero value time offset with a negative sign.
// Reference https://en.wikipedia.org/wiki/ISO_8601#Other_time_offset_specifications
type OffsetString = Exclude<`${PlusMinus}${Hour}:${Minute}`, '-00:00'>;

export const utcOffsetToMinutes = (offset: OffsetString) => {
	if (offset === '+00:00') return 0;
	// positive if the local time zone is behind UTC
	// negative if the local time zone is ahead of UTC
	const multiplier = offset[0] === '+' ? -1 : 1;
	const hour = Number(offset.substring(1, 3));
	const minute = Number(offset.substring(4));
	return multiplier * (60 * hour + minute);
};

export const utcOffsetToString = (offset: number) => {
	if (offset === 0) return '+00:00';
	if (!Number.isInteger(offset)) throw new RangeError(`${offset} is not an integer`);
	// positive if the local time zone is behind UTC
	// negative if the local time zone is ahead of UTC
	const sign = offset < 0 ? '+' : '-';
	// prettier-ignore
	const hour = Math.floor(Math.abs(offset) / 60).toString().padStart(2, '0');
	const minute = (Math.abs(offset) % 60).toString().padStart(2, '0');
	return `${sign}${hour}:${minute}`;
};

export const dateToISOStringWithOffset = (
	date = new Date(),
	offset: OffsetString | number = date.getTimezoneOffset(),
) => {
	const offsetMinutes = typeof offset === 'number' ? offset : utcOffsetToMinutes(offset);
	const offsetString = typeof offset === 'string' ? offset : utcOffsetToString(offset);
	const shifted = new Date(date.valueOf() - offsetMinutes * 60 * 1000);
	return shifted.toISOString().substring(0, 19) + offsetString;
};

export const dateToDayWithOffset = (
	date = new Date(),
	offset: OffsetString | number = date.getTimezoneOffset(),
) => {
	const offsetMinutes = typeof offset === 'number' ? offset : utcOffsetToMinutes(offset);
	const shifted = new Date(date.valueOf() - offsetMinutes * 60 * 1000);
	return shifted.getUTCDay();
};

export const dateToSafeISOString = (date = new Date()) => date.toISOString().replace(/[-:]/g, '');

export class ExtendedDate extends Date {
	getDay(offset?: OffsetString | number) {
		return typeof offset === 'undefined' //
			? super.getDay()
			: dateToDayWithOffset(this, offset);
	}
	toISOString(offset?: OffsetString | number) {
		return typeof offset === 'undefined'
			? super.toISOString()
			: dateToISOStringWithOffset(this, offset);
	}
	toSafeISOString() {
		return dateToSafeISOString(this);
	}
	format(offset: OffsetString | number) {
		const isoString = dateToISOStringWithOffset(this, offset);
		return {
			'yyyy-mm-dd': isoString.substring(0, 10),
			'hh:mm:ss': isoString.substring(11, 19),
			'hh:mm': isoString.substring(11, 16),
		};
	}
}
