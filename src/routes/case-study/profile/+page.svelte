<script lang="ts">
	// Icons imports
	import IconCreate from '~icons/solar/clipboard-add-outline';
	import IconSunrise from '~icons/solar/sunrise-bold';
	import IconSunriseDown from '~icons/solar/sunset-bold';
	import IconSunStill from '~icons/solar/water-sun-broken';
	import IconFeed from '~icons/solar/feed-outline';
	import IconSadFace from '~icons/solar/sad-square-outline';
	import IconInfo from '~icons/solar/info-square-outline';

	// Essential imports
	import { goto } from '$app/navigation';
	import { clearCaseStudyData, localStorageUtil } from '$lib/localStorage';
	import { onDestroy, onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { slide } from 'svelte/transition';

	// Charts
	import BarChart from '$lib/components/charts/BarChart.svelte';

	let name: string = '';
	let gender: string = '';
	let age: string = '';
	let location: string = '';
	let maritalStatus: string = '';
	let energyConsumed: string = '';
	let energyConsumedGoal: string = '';

	let dailyConsumptionData: { x: string; y: number }[] = [];
	let monthlyConsumptionData: { x: string; y: number }[] = [];

	onMount(() => {
		name = localStorageUtil.getItem('name');
		gender = localStorageUtil.getItem('gender');
		age = localStorageUtil.getItem('age');
		location = localStorageUtil.getItem('location');
		maritalStatus = localStorageUtil.getItem('maritalStatus');
		energyConsumed = localStorageUtil.getItem('energyConsumed');
		energyConsumedGoal = localStorageUtil.getItem('energyConsumedGoal');

		if (!name || !gender || !age || !location || !energyConsumed || !energyConsumedGoal) {
			goto('/case-study/create');
		}
		randomAlert(); // Start the random alert process
	});

	onMount(async () => {
		if (browser) {
			const energyConsumed = localStorageUtil.getItem('energyConsumed') || 'default_value';
			const responseEnergyConsumption = await fetch(
				`/api/data/energy-consumption?energyConsumed=${energyConsumed}`
			);
			const dataEnergyConsumption = await responseEnergyConsumption.json();
			dailyConsumptionData = dataEnergyConsumption.dailyConsumption;
			monthlyConsumptionData = dataEnergyConsumption.monthlyConsumption;
		}
	});

	// State for alert visibility and positioning
	let showAlert = false;
	let alertTimeout: any;

	// Function to show the alert repeatedly
	function randomAlert() {
		const minDelay = 10000; // 10 seconds
		const maxDelay = 10000; // 10 seconds
		showAlert = true;

		// Hide alert after a short delay
		setTimeout(() => {
			showAlert = false;
			// Call randomAlert again after a delay to show the alert
			alertTimeout = setTimeout(randomAlert, Math.random() * (maxDelay - minDelay) + minDelay);
		}, 5000); // 5 seconds to auto-hide
	}

	onDestroy(() => {
		clearTimeout(alertTimeout as number);
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
					<p>Gender: {gender}</p>
					<p>Age: {age}</p>
				</div>
				<div class="flex flex-col">
					<p>Location: {location}</p>
					<p>Marital Status: {maritalStatus}</p>
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
					<IconSunStill style="font-size: x-large;" class="text-warning" />
				</div>
				<div class="stat-title">Previous Month Energy Consumption</div>
				<div class="stat-value text-warning">{formatNumber(Number(energyConsumed) ?? 0)}</div>
			</div>
			<div class="stat">
				<div class="stat-figure text-secondary">
					<IconSunrise style="font-size: x-large;" class="text-primary" />
				</div>
				<div class="stat-title">Current Months Energy Consumption</div>
				<div class="stat-value text-primary">
					{formatNumber(Number(energyConsumedGoal) * 0.7 ?? 0)}
				</div>
			</div>
			<div class="stat">
				<div class="stat-figure text-secondary">
					<IconSunriseDown style="font-size: x-large;" class="text-success" />
				</div>
				<div class="stat-title">This Month Energy Goal</div>
				<div class="stat-value text-success">{formatNumber(Number(energyConsumedGoal) ?? 0)}</div>
			</div>
		</div>
		<div class="flex items-center gap-8">
			{#if dailyConsumptionData && dailyConsumptionData.length > 0}
				<div class="flex w-1/2">
					<BarChart data={dailyConsumptionData} label="Daily Consumption" />
				</div>
			{/if}
			{#if monthlyConsumptionData && monthlyConsumptionData.length > 0}
				<div class="flex w-1/2">
					<BarChart data={monthlyConsumptionData} label="Monthly Consumption" />
				</div>
			{/if}
		</div>
		<div class="card bg-base-200 flex-1 shadow-lg">
			<div class="card-body">
				<h2 class="card-title">Future Prognosis</h2>
				<p>Do you want to see the AIs future prediction?</p>
				<div class="card-actions justify-end py-4">
					<a href="/case-study/prognosis">
						<button class="btn btn-warning gap-4">
							<IconFeed style="font-size: x-large" class="text-warning-content" />
							<span class="hidden sm:inline">Prognosis</span>
						</button>
					</a>
				</div>
			</div>
		</div>
		<div class="flex w-full gap-8">
			<div class="card bg-base-200 flex-1 shadow-lg">
				<div class="card-body">
					<h2 class="card-title">Do you want veto energy limits?</h2>
					<p>Look through the list of your actions and veto our actions!</p>
					<div class="card-actions justify-end py-4">
						<a href="/case-study/veto">
							<button class="btn btn-error gap-4">
								<IconSadFace style="font-size: x-large" class="text-error-content" />
								<span class="hidden sm:inline">Veto</span>
							</button>
						</a>
					</div>
				</div>
			</div>
			<div class="card bg-base-200 flex-1 shadow-lg">
				<div class="card-body">
					<h2 class="card-title">Stakeholder Feedback</h2>
					<p>Are you not satisfied with the your experience with Fair Energy AI?</p>
					<div class="card-actions justify-end py-4">
						<a href="/case-study/stakeholder-feedback">
							<button class="btn btn-neutral gap-4">
								<IconFeed style="font-size: x-large" class="text-primary-content" />
								<span class="hidden sm:inline">Sent Feedback</span>
							</button>
						</a>
					</div>
				</div>
			</div>
		</div>
		<div class="flex w-full gap-8">
			<div class="card bg-base-200 flex-1 shadow-lg">
				<div class="card-body">
					<h2 class="card-title">Do you want some tips to manage your energy?</h2>
					<p>Look at our suggestion on how to reduce your energy consumption!</p>
					<div class="card-actions justify-end py-4">
						<a href="/case-study/tips">
							<button class="btn btn-success gap-4">
								<IconCreate style="font-size: x-large" class="text-success-content" />
								<span class="hidden sm:inline">Tips</span>
							</button>
						</a>
					</div>
				</div>
			</div>
			<div class="card bg-base-200 flex-1 shadow-lg">
				<div class="card-body">
					<h2 class="card-title">Do you want to know what the benefits are?</h2>
					<p>So are you able to aquire bonuses while reaching your goals?</p>
					<div class="card-actions justify-end py-4">
						<a href="/case-study/bonuses">
							<button class="btn btn-primary gap-4">
								<IconCreate style="font-size: x-large" class="text-primary-content" />
								<span class="hidden sm:inline">Bonuses</span>
							</button>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

{#if showAlert}
	<div class="bottom-alert">
		<div
			role="alert"
			class="alert alert-info ml-16 mr-16 shadow-xl shadow-zinc-500"
			in:slide={{ duration: 500 }}
			out:slide={{ duration: 500 }}
		>
			<IconInfo style="font-size: x-large;" />
			<span>You have some veto options still open, decide on them please.</span>
		</div>
	</div>
{/if}

<style>
	.bottom-alert {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 1000; /* Ensure it's above other elements */
		display: flex;
		justify-content: center;
		margin: 1rem;
	}
</style>
