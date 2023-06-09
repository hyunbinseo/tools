<script lang="ts">
	import { version } from '$app/environment';
	import { isHoliday } from '@hyunbinseo/holidays-kr';

	let selectedDays: Array<number> = [1, 3, 5];
	let excludeHolidays = true;

	const days = ['일', '월', '화', '수', '목', '금', '토'] as const;

	const generateStartDate = (date: Date = new Date()) =>
		[
			date.getFullYear(),
			(date.getMonth() + 1).toString().padStart(2, '0'),
			date.getDate().toString().padStart(2, '0')
		].join('-');

	let startDate = generateStartDate(new Date(Number(version))); // yyyy-MM-dd

	let copyButtonText: string;

	const resetCopyButtonText = () => (copyButtonText = '복사하기');
	resetCopyButtonText();

	$: dates = (() => {
		if (!startDate || !selectedDays.length) return [];

		const dates: string[] = [];

		const date = new Date(`${startDate}T09:00:00`);

		if (Number.isNaN(date.getTime())) return [];

		while (dates.length < 90) {
			const dayIndex = (days as Readonly<string[]>).indexOf(
				date.toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul', weekday: 'short' })
			);

			if (dayIndex === -1) throw new Error();

			if (selectedDays.includes(dayIndex) && (excludeHolidays ? !isHoliday(date) : true)) {
				dates.push(
					date.toLocaleDateString('ko-KR', {
						timeZone: 'Asia/Seoul',
						year: 'numeric',
						month: 'numeric',
						day: 'numeric',
						weekday: 'short'
					})
				);
			}

			date.setDate(date.getDate() + 1);
		}

		resetCopyButtonText();

		return dates;
	})();
</script>

<form on:submit|preventDefault>
	<fieldset>
		<legend>시작 날짜</legend>
		<input bind:value={startDate} type="date" min="2022-01-01" />
		<button type="button" on:click={() => (startDate = generateStartDate())}>오늘</button>
	</fieldset>
	<fieldset class="days">
		<legend>요일</legend>
		{#each days as text, index (text)}
			<label>
				<input bind:group={selectedDays} type="checkbox" value={index} />
				{text}
			</label>
		{/each}
	</fieldset>
	<fieldset class="options">
		<legend>설정</legend>
		<label>
			<input type="checkbox" bind:checked={excludeHolidays} />
			공휴일 제외 (월력요항 발표 연도로 한정)
		</label>
	</fieldset>
	<div class="list" style:padding={dates.length ? '0.75rem 2rem 0.5rem' : '1rem'}>
		{#if dates.length}
			<button
				on:click={async () => {
					try {
						const string = dates
							.slice(0, selectedDays.length * 5)
							.map((v, i) => `${i + 1}. ${v}`)
							.join('\n');
						await navigator.clipboard.writeText(string);
						copyButtonText = '복사되었습니다.';
					} catch {
						alert('복사에 실패했습니다.');
					}
				}}
			>
				{copyButtonText}
			</button>
			<ol>
				{#each dates as date}
					<li>{date}</li>
				{/each}
			</ol>
		{:else if startDate}
			<span>해당하는 날짜가 없습니다.</span>
		{/if}
	</div>
</form>

<style>
	form > * {
		margin-top: 1rem;
	}
	.days > label {
		margin-right: 0.375rem;
	}
	.options > label {
		display: block;
	}
	.list {
		border: 2px solid;
		user-select: text;
	}
	li {
		padding-left: 0.375rem;
	}
	li::marker {
		font-weight: bold;
	}
	li:nth-child(10n + 1) {
		margin-top: 1rem;
	}
</style>
