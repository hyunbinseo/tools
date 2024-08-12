import { equal, throws } from 'node:assert/strict';
import test from 'node:test';
import {
	dateToDayWithOffset,
	dateToISOStringWithOffset,
	dateToSafeISOString,
	generatePINString,
} from './index.js';

test(() => {
	const date = new Date('2024-05-26T00:00:00Z');

	equal('2024-05-25T14:30:00-09:30', dateToISOStringWithOffset(date, '-09:30'));
	equal('2024-05-25T14:30:00-09:30', dateToISOStringWithOffset(date, 570));

	equal('2024-05-26T00:00:00+00:00', dateToISOStringWithOffset(date, '+00:00'));
	equal('2024-05-26T00:00:00+00:00', dateToISOStringWithOffset(date, 0));

	equal('2024-05-26T08:45:00+08:45', dateToISOStringWithOffset(date, '+08:45'));
	equal('2024-05-26T08:45:00+08:45', dateToISOStringWithOffset(date, -525));

	throws(() => dateToISOStringWithOffset(date, 0.1));
});

test(() => {
	// 2024-05-26 is Sunday
	const date = new Date('2024-05-26T11:00:00Z');
	equal(6, dateToDayWithOffset(date, '-12:00'));
	equal(0, dateToDayWithOffset(date, '+00:00'));
	equal(1, dateToDayWithOffset(date, '+14:00'));
});

test(() => {
	equal(dateToSafeISOString(new Date('2024-05-26T00:00:00+09:00')), '20240525T150000.000Z');
});

test(() => {
	equal(/^\d{6}$/.test(generatePINString()), true);
	equal(/^\d{8}$/.test(generatePINString(8)), true);
});
