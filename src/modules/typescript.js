/** @type {<K, V>(map: Map<K, V>) => ReadonlyMap<K, V>} */
export const toReadonlyMap = (map) => map;

/** @type {<T>(set: Set<T>) => ReadonlySet<T>} */
export const toReadonlySet = (set) => set;
