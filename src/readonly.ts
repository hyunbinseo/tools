export function toReadonly<R extends Record<any, unknown>>(record: R): Readonly<R>;
export function toReadonly<T>(array: Array<T>): ReadonlyArray<T>;
export function toReadonly<K, V>(map: Map<K, V>): ReadonlyMap<K, V>;
export function toReadonly<T>(set: Set<T>): ReadonlySet<T>;
export function toReadonly(input: any): any {
	return input;
}
