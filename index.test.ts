import { equal, throws } from 'node:assert/strict';
import test from 'node:test';
import {
	ExtendedDate,
	dateToDayWithOffset,
	dateToISOStringWithOffset,
	dateToSafeISOString,
	generatePINString,
	hasNonNullableValues,
} from './index.ts';

test('Extended Date Class', () => {
	// 2024-05-26 is Sunday(0)
	const date = new Date('2024-05-26T00:00:00Z');
	const extendedDate = new ExtendedDate(date);

	equal(6, extendedDate.getDay('-09:30'));
	equal(0, extendedDate.getDay('+09:00'));

	equal('2024-05-26T00:00:00.000Z', extendedDate.toISOString());
	equal('2024-05-26T00:00:00+00:00', extendedDate.toISOString(0));
	equal('2024-05-26T00:00:00+00:00', extendedDate.toISOString('+00:00'));
	equal('2024-05-25T14:30:00-09:30', extendedDate.toISOString('-09:30'));

	equal(extendedDate.format['yyyy-mm-dd hh:mm:ss']('+09:00'), '2024-05-26 09:00:00');
	equal(extendedDate.format['yyyy-mm-dd hh:mm']('+09:00'), '2024-05-26 09:00');
	equal(extendedDate.format['yyyy-mm-dd']('-09:30'), '2024-05-25');
	equal(extendedDate.format['hh:mm:ss']('-09:30'), '14:30:00');
	equal(extendedDate.format['hh:mm']('-09:30'), '14:30');
});

test('Date to ISO String with Timezone', () => {
	const date = new Date('2024-05-26T00:00:00Z');

	equal('2024-05-25T14:30:00-09:30', dateToISOStringWithOffset(date, '-09:30'));
	equal('2024-05-25T14:30:00-09:30', dateToISOStringWithOffset(date, 570));

	equal('2024-05-26T00:00:00+00:00', dateToISOStringWithOffset(date, '+00:00'));
	equal('2024-05-26T00:00:00+00:00', dateToISOStringWithOffset(date, 0));

	equal('2024-05-26T08:45:00+08:45', dateToISOStringWithOffset(date, '+08:45'));
	equal('2024-05-26T08:45:00+08:45', dateToISOStringWithOffset(date, -525));

	throws(() => dateToISOStringWithOffset(date, 0.1));
});

test('Date to Day of the Week with Timezone', () => {
	// 2024-05-26 is Sunday(0)
	const date = new Date('2024-05-26T11:00:00Z');
	equal(6, dateToDayWithOffset(date, '-12:00'));
	equal(0, dateToDayWithOffset(date, '+00:00'));
	equal(1, dateToDayWithOffset(date, '+14:00'));
});

test('Date to Safe ISO String', () => {
	equal(dateToSafeISOString(new Date('2024-05-26T00:00:00+09:00')), '20240525T150000.000Z');
});

test('Generate PIN String', () => {
	equal(/^\d{6}$/.test(generatePINString()), true);
	equal(/^\d{1}$/.test(generatePINString(1)), true);

	throws(() => generatePINString(0), RangeError);
	throws(() => generatePINString(-1), RangeError);
	throws(() => generatePINString(5.5), RangeError);
});

test('Deep-NonNullable Record', () => {
	const record: { a?: string; b?: number } = { a: 'Hello!' };

	if (!record.a) throw new Error();
	record; //  { a?: string; b?: number };
	record.a; // string

	if (!hasNonNullableValues(record, ['a'])) throw new Error();
	record; // { a: string; b?: number | undefined }
});
