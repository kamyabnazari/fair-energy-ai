<script lang="ts">
	// Icons imports
	import IconCreate from '~icons/solar/clipboard-add-outline';
	import IconProject from '~icons/solar/clapperboard-text-outline';
	import IconFile from '~icons/solar/file-text-outline';
	import IconAsset from '~icons/solar/file-smile-outline';

	// Essential imports
	import { goto } from '$app/navigation';
	import { clearCaseStudyData, localStorageUtil } from '$lib/localStorage';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	// Charts
	import BarChart from '$lib/components/charts/BarChart.svelte';
	import PieChart from '$lib/components/charts/PieChart.svelte';

	let name: string = '';
	let age: string = '';
	let location: string = '';
	let energyConsumed: string = '';
	let energyConsumedGoal: string = '';

	let dailyConsumptionData: { x: string; y: number }[] = [];
	let monthlyConsumptionData: { x: string; y: number }[] = [];
	let energySourcesData = { labels: [], values: [] };

	onMount(() => {
		name = localStorageUtil.getItem('name');
		age = localStorageUtil.getItem('age');
		location = localStorageUtil.getItem('location');
		energyConsumed = localStorageUtil.getItem('energyConsumed');
		energyConsumedGoal = localStorageUtil.getItem('energyConsumedGoal');

		if (!name || !age || !location || !energyConsumed || !energyConsumedGoal) {
			goto('/case-study/create');
		}
	});

	onMount(async () => {
		if (browser) {
			const responseEnergyConsumption = await fetch('/api/data/energy-consumption');
			const dataEnergyConsumption = await responseEnergyConsumption.json();
			dailyConsumptionData = dataEnergyConsumption.dailyConsumption;
			monthlyConsumptionData = dataEnergyConsumption.monthlyConsumption;

			const responseEnergySources = await fetch('/api/data/energy-sources');
			const dataEnergySources = await responseEnergySources.json();
			energySourcesData = dataEnergySources;
		}
	});

	function formatNumber(num: number) {
		if (num >= 1000000) {
			return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
		}
		if (num >= 1000) {
			return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
		}
		return num;
	}
</script>

<div class="mx-auto flex min-h-screen max-w-7xl flex-col flex-wrap gap-4">
	<div class="flex flex-col gap-8">
		<div class="flex justify-center">
			<h1 class="text-2xl font-bold md:text-3xl">Profile</h1>
		</div>
		<div class="flex flex-row items-center justify-between gap-8">
			<div class="flex flex-row gap-8">
				<div class="avatar">
					<div class="w-24 rounded-xl shadow-md">
						<img src={`https://ui-avatars.com/api/?name=${name}`} alt="user avatar" id="avatar" />
					</div>
				</div>
				<div class="flex flex-col">
					<p>Name: {name}</p>
					<p>Age: {age}</p>
					<p>Location: {location}</p>
				</div>
			</div>
			<div class="flex justify-end py-4">
				<button class="btn btn-error" on:click={clearCaseStudyData}>
					Delete Case Study Data
				</button>
			</div>
		</div>
		<div class="stats bg-base-200 stats-vertical md:stats-horizontal shadow-lg">
			<div class="stat">
				<div class="stat-figure text-secondary">
					<IconProject style="font-size: x-large;" class="text-primary" />
				</div>
				<div class="stat-title">Energy Consumption Total</div>
				<div class="stat-value">{formatNumber(0 ?? 0)}</div>
			</div>
			<div class="stat">
				<div class="stat-figure text-secondary">
					<IconFile style="font-size: x-large;" class="text-primary" />
				</div>
				<div class="stat-title">Current Consumption</div>
				<div class="stat-value">{formatNumber(0 ?? 0)}</div>
			</div>
			<div class="stat">
				<div class="stat-figure text-secondary">
					<IconAsset style="font-size: x-large;" class="text-primary" />
				</div>
				<div class="stat-title">Future Consumption</div>
				<div class="stat-value">{formatNumber(0 ?? 0)}</div>
			</div>
		</div>
		<div class="flex w-full gap-8">
			<div class="card bg-base-200 flex-1 shadow-lg">
				<div class="card-body">
					<h2 class="card-title">Do you want to know how this demo work?</h2>
					<p>So just visit the following documentation!</p>
					<div class="card-actions justify-end py-4">
						<a href="/case-study/fairness-algorithm">
							<button class="btn btn-primary gap-4">
								<IconCreate style="font-size: x-large" class="text-primary-content" />
								<span class="hidden sm:inline">Documentation</span>
							</button>
						</a>
					</div>
				</div>
			</div>
			<div class="card bg-base-200 flex-1 shadow-lg">
				<div class="card-body">
					<h2 class="card-title">How does the AI model decide?</h2>
					<p>
						Look at the step by step process the AI Model was trained to predict your Energy
						Consumption!
					</p>
					<div class="card-actions justify-end py-4">
						<a href="/case-study/documentation">
							<button class="btn btn-primary gap-4">
								<IconCreate style="font-size: x-large" class="text-primary-content" />
								<span class="hidden sm:inline">Fairness Algorithm</span>
							</button>
						</a>
					</div>
				</div>
			</div>
		</div>
		<div class="flex items-center gap-8">
			<div class="flex w-1/2 flex-col">
				{#if dailyConsumptionData && dailyConsumptionData.length > 0}
					<div>
						<BarChart data={dailyConsumptionData} label="Daily Consumption" />
					</div>
				{/if}
				{#if monthlyConsumptionData && monthlyConsumptionData.length > 0}
					<div>
						<BarChart data={monthlyConsumptionData} label="Monthly Consumption" />
					</div>
				{/if}
			</div>
			<div class="flex flex-col"></div>
			{#if energySourcesData && energySourcesData.labels.length > 0}
				<div>
					<PieChart data={energySourcesData} label="Energy Distribution" />
				</div>
			{/if}
		</div>
	</div>
</div>
