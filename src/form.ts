type KebabToCamelCase<S extends string> = S extends `${infer A}-${infer B}`
	? `${A}${Capitalize<KebabToCamelCase<B>>}`
	: S;

const formDataToObject = <
	const Get extends string[],
	const GetAll extends [string, string][],
	ReturnType = Record<KebabToCamelCase<Get[number]>, FormDataEntryValue | null> &
		Record<KebabToCamelCase<GetAll[number][1]>, FormDataEntryValue[] | null>,
>(
	formData: FormData,
	fields: { get: Get; getAll: GetAll },
): ReturnType => {
	const result: Partial<ReturnType> = {};
	return result as ReturnType;
};
