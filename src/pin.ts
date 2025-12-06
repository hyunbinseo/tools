export const generatePINString = (length = 6) => {
	if (!Number.isInteger(length) || length <= 0) throw new RangeError();

	const digits: string[] = [];

	while (digits.length < length) {
		const [randomValue] = crypto.getRandomValues(new Uint32Array(1));
		digits.push((randomValue! % 10).toString());
	}

	return digits.join('');
};
