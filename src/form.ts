type CamelCase<KebabCase extends string> = KebabCase extends `${infer A}-${infer B}`
	? `${A}${Capitalize<CamelCase<B>>}`
	: KebabCase;

const kebabToCamelCase = <const K extends string>(kebabCase: K) =>
	kebabCase.replace(/-./g, (match) => match[1].toUpperCase()) as CamelCase<K>;

export const formDataToObject = <
	const GetNames extends string[],
	const GetAllNames extends [string, string][],
	Got = Record<CamelCase<GetNames[number]>, FormDataEntryValue | null>,
	GotAll = Record<CamelCase<GetAllNames[number][1]>, FormDataEntryValue[] | null>,
	ReturnType = Got & GotAll,
>(
	formData: FormData,
	names: Partial<{ get: GetNames; getAll: GetAllNames }>,
): ReturnType => {
	const obj: Partial<ReturnType> = {};

	for (const name of names.get || []) //
		(obj as any)[kebabToCamelCase(name)] = formData.get(name);

	for (const [name, plural] of names.getAll || [])
		(obj as any)[kebabToCamelCase(plural)] = formData.getAll(name);

	return obj as ReturnType;
};
