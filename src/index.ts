export const dateToSafeISOString = (date = new Date()) => date.toISOString().replace(/[-:]/g, '');

export const dateToSafeIsoString = dateToSafeISOString;

//

export const generatePINString = (length = 6) => {
	let pin = '';

	while (pin.length < length) {
		const [randomValue] = crypto.getRandomValues(new Uint32Array(1));
		pin = pin + randomValue.toString(); // 0 ~ 4294967295 (2^32-1)
	}

	return pin.substring(0, length);
};

export const generatePinString = generatePINString;
