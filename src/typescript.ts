// See https://www.totaltypescript.com/concepts/the-prettify-helper
export type Prettify<T> = { [K in keyof T]: T[K] } & {};

type NullableKeys<T> = {
	[K in keyof T]: null extends T[K] ? K : undefined extends T[K] ? K : never;
}[keyof T];

// See https://github.com/microsoft/TypeScript/issues/28374#issuecomment-1907275765
export const hasNonNullableValues = <
	T extends Record<string, unknown>, //
	K extends NullableKeys<T>,
>(
	obj: T,
	keys: K[],
): obj is Prettify<T & { [P in K]: NonNullable<T[P]> }> =>
	keys.every((key) => obj[key] !== null && obj[key] !== undefined);

export function toReadonly<R extends Record<any, unknown>>(record: R): Readonly<R>;
export function toReadonly<T>(array: Array<T>): ReadonlyArray<T>;
export function toReadonly<K, V>(map: Map<K, V>): ReadonlyMap<K, V>;
export function toReadonly<T>(set: Set<T>): ReadonlySet<T>;
export function toReadonly<T>(input: T): T {
	return input;
}
