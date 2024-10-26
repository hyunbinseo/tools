// Reference https://github.com/microsoft/TypeScript/issues/28374#issuecomment-1907275765

type NullableKeys<T> = {
	[K in keyof T]: null extends T[K] ? K : undefined extends T[K] ? K : never;
}[keyof T];

export const hasNonNullableValues = <
	T extends Record<string, unknown>, //
	K extends NullableKeys<T>,
>(
	obj: T,
	keys: K[],
): obj is T & { [P in K]: NonNullable<T[P]> } => {
	for (const key of keys) {
		if (obj[key] === null || obj[key] === undefined) return false;
	}
	return true;
};
