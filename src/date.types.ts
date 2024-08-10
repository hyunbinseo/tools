type PlusMinus = '+' | '-';

type Hour =
	| '00'
	| '01'
	| '02'
	| '03'
	| '04'
	| '05'
	| '06'
	| '07'
	| '08'
	| '09'
	| '10'
	| '11'
	| '12'
	| '13'
	| '14';

type Minute = '00' | '30' | '45';

// It is not permitted to state a zero value time offset with a negative sign.
// Reference https://en.wikipedia.org/wiki/ISO_8601#Other_time_offset_specifications
export type Offset = Exclude<`${PlusMinus}${Hour}:${Minute}`, '-00:00'>;
