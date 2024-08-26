type CamelCase<KebabCase extends string> = KebabCase extends `${infer A}-${infer B}`
	? `${A}${Capitalize<CamelCase<B>>}`
	: KebabCase;

const kebabCaseRegex = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;

const kebabCaseToCamelCase = <const S extends string>(string: S) => {
	if (!kebabCaseRegex.test(string)) throw new Error(`field name must be in kebab-case`);
	return string.replace(/-./g, (match) => match[1].toUpperCase()) as CamelCase<S>;
};

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
		(obj as any)[kebabCaseToCamelCase(name)] = formData.get(name);

	for (const [name, plural] of names.getAll || [])
		(obj as any)[kebabCaseToCamelCase(plural)] = formData.getAll(name);

	return obj as ReturnType;
};
