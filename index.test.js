import { deepEqual, equal, throws } from 'node:assert/strict';
import test from 'node:test';
import {
	dateToDayWithOffset,
	dateToISOStringWithOffset,
	dateToSafeISOString,
	formDataToObject,
	generatePINString,
} from './index.js';

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
	// 2024-05-26 is Sunday
	const date = new Date('2024-05-26T11:00:00Z');
	equal(6, dateToDayWithOffset(date, '-12:00'));
	equal(0, dateToDayWithOffset(date, '+00:00'));
	equal(1, dateToDayWithOffset(date, '+14:00'));
});

test('Date to Safe ISO String', () => {
	equal(dateToSafeISOString(new Date('2024-05-26T00:00:00+09:00')), '20240525T150000.000Z');
});

test('FormData to Object with Types', () => {
	const formData = new FormData();
	formData.append('event-name', 'Touch Grass');
	formData.append('day-index', '0');
	formData.append('day-index', '6');

	// { eventName: 'Touch Grass', dayIndexes: [ '0', '6' ] }
	const formObject = formDataToObject(formData, {
		get: ['event-name'],
		getAll: [['day-index', 'day-indexes']],
	});

	deepEqual(formObject, { eventName: 'Touch Grass', dayIndexes: ['0', '6'] });
});

test('Generate PIN String', () => {
	equal(/^\d{6}$/.test(generatePINString()), true);
	equal(/^\d{8}$/.test(generatePINString(8)), true);
});
