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

export type Timezone = `${PlusMinus}${Hour}:${Minute}`;
