// Reference https://github.com/microsoft/TypeScript/issues/28374#issuecomment-1907275765

type DeepNonNullable<T> = { [P in keyof T]-?: NonNullable<T[P]> };

export const hasNonNullableValues = <T extends Record<string, unknown>, K extends Array<keyof T>>(
	obj: T,
	keys: K,
): obj is Omit<T, K[number]> & Pick<DeepNonNullable<T>, K[number]> => {
	for (const key of keys) {
		if (obj[key] === null || obj[key] === undefined) return false;
	}
	return true;
};
