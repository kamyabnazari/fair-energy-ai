<script lang="ts">
	// Icons imports
	import IconClose from '~icons/solar/alt-arrow-left-bold';

	// Essential imports
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import LineChart from '$lib/components/charts/LineChart.svelte';

	interface ChartData {
		labels: string[];
		values: number[];
		label: string;
	}

	let chartData: ChartData | null = null;

	onMount(async () => {
		if (browser) {
			const res = await fetch('/api/data/energy-prognosis');
			chartData = await res.json();
		}
	});
</script>

<div class="mx-auto flex min-h-screen max-w-7xl flex-col flex-wrap gap-4">
	<div class="flex items-start">
		<button
			class="btn btn-link text-primary"
			on:click={() => goto('/case-study/profile')}
			style="max-width: 150px;"
		>
			<IconClose style="font-size: x-large;" /> Back
		</button>
	</div>
	<div class="self-center">
		<h1 class="mb-8 text-2xl font-bold md:text-3xl">Prognosis</h1>
	</div>
	<div class="flex flex-row justify-center gap-4">
		{#if chartData}
			<LineChart data={chartData} />
		{:else}
			<p>Loading chart data...</p>
		{/if}
	</div>
</div>
