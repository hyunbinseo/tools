export const toReadonlyMap = <K, V>(map: Map<K, V>) => map as ReadonlyMap<K, V>;
export const toReadonlySet = <T>(set: Set<T>) => set as ReadonlySet<T>;
