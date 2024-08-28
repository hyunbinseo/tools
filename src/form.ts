type CamelCase<KebabCase extends string> = KebabCase extends `${infer A}-${infer B}`
	? `${A}${Capitalize<CamelCase<B>>}`
	: KebabCase;

const toCamelCase = <const S extends string>(string: S) =>
	string.replace(/-./g, (match) => match[1].toUpperCase()) as CamelCase<S>;

type FormObject<
	Get extends string[], //
	GetAll extends [string, string][],
> = (Get extends []
	? Record<never, never>
	: Record<CamelCase<Get[number]>, FormDataEntryValue | null>) &
	(GetAll extends []
		? Record<never, never>
		: Record<CamelCase<GetAll[number][1]>, FormDataEntryValue[] | null>);

export const formDataToObject = <
	const Get extends string[] = [],
	const GetAll extends [string, string][] = [],
>(
	formData: FormData,
	names: Partial<{ get: Get; getAll: GetAll }>,
): FormObject<Get, GetAll> => {
	const obj: Partial<FormObject<Get, GetAll>> = {};

	for (const name of names.get || []) //
		(obj as any)[toCamelCase(name)] = formData.get(name);

	for (const [name, plural] of names.getAll || [])
		(obj as any)[toCamelCase(plural)] = formData.getAll(name);

	return obj as FormObject<Get, GetAll>;
};
