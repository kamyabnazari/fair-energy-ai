<script lang="ts">
	// Icons imports
	import IconClose from '~icons/solar/alt-arrow-left-bold';

	// Essential imports
	import { goto } from '$app/navigation';
	import { clearCaseStudyData, localStorageUtil } from '$lib/localStorage';
	import { onMount } from 'svelte';

	let loading: boolean;
	let currentStep = 1;
	let name: string = '';
	let age: string = '';
	let location: string = '';
	let energyConsumed: string = '';
	let energyConsumedGoal: string = '';

	onMount(() => {
		name = localStorageUtil.getItem('name') || '';
		age = localStorageUtil.getItem('age') || '';
		location = localStorageUtil.getItem('location') || '';
		energyConsumed = localStorageUtil.getItem('energyConsumed') || '';
		energyConsumedGoal = localStorageUtil.getItem('energyConsumedGoal') || '';

		if (name && age && location) {
			currentStep = 2;
		}
		if (energyConsumed && energyConsumedGoal) {
			currentStep = 3;
		}
		if (name && age && location && energyConsumed && energyConsumedGoal) {
			goto('/case-study/profile');
		}
	});

	function saveData() {
		localStorageUtil.setItem('name', name);
		localStorageUtil.setItem('age', age);
		localStorageUtil.setItem('location', location);
		localStorageUtil.setItem('energyConsumed', energyConsumed);
		localStorageUtil.setItem('energyConsumedGoal', energyConsumedGoal);
	}

	function handleBackStep() {
		if (currentStep > 1) {
			currentStep--;
		} else {
			clearCaseStudyData();
		}
	}

	function handleNextStep() {
		saveData();
		if (currentStep === 1 && name && age && location) {
			currentStep = 2;
		} else if (currentStep === 2 && energyConsumed && energyConsumedGoal) {
			currentStep = 3;
		} else if (currentStep === 3) {
			goto('/case-study/profile');
		}
	}
</script>

<div class="mx-auto flex min-h-screen max-w-7xl flex-col flex-wrap gap-4">
	<div class="flex items-start">
		<button
			class="btn btn-link text-primary"
			on:click={clearCaseStudyData}
			style="max-width: 150px;"
		>
			<IconClose style="font-size: x-large;" /> close
		</button>
	</div>
	<div class="self-center">
		<h1 class="mb-8 text-2xl font-bold md:text-3xl">Create a new example case!</h1>
	</div>
	<div class="flex flex-row justify-center gap-4">
		{#if currentStep === 1}
			<div
				class="bg-base-200 mx-auto flex max-w-md flex-1 flex-col justify-between gap-8 rounded-lg p-8 shadow-lg"
			>
				<div class="flex flex-row justify-center">
					<h1 class="text-l mb-8 font-bold md:text-xl">Enter your information</h1>
				</div>
				<ul class="steps">
					<li class="step step-primary">Personal</li>
					<li class="step">Usage</li>
					<li class="step">Done</li>
				</ul>
				<div class="flex w-full flex-row justify-center">
					<div class="flex w-full justify-center">
						<div class="form-control w-full">
							<label for="idea" class="label">
								<span class="label-text">What is your name?</span>
							</label>
							<input
								class="input input-bordered w-full rounded-md border-2"
								placeholder="Jon Doe"
								type="text"
								id="name"
								name="name"
								disabled={loading}
								bind:value={name}
								on:input={saveData}
							/>
						</div>
					</div>
				</div>
				<div class="flex w-full flex-row justify-center">
					<div class="flex w-full justify-center">
						<div class="form-control w-full">
							<label for="idea" class="label">
								<span class="label-text">What is your age?</span>
							</label>
							<input
								class="input input-bordered w-full rounded-md border-2"
								placeholder="50 Years"
								type="text"
								id="name"
								name="name"
								disabled={loading}
								bind:value={age}
								on:input={saveData}
							/>
						</div>
					</div>
				</div>
				<div class="flex w-full flex-row justify-center">
					<div class="flex w-full justify-center">
						<div class="form-control w-full">
							<label for="idea" class="label">
								<span class="label-text">Where do you live?</span>
							</label>
							<input
								class="input input-bordered w-full rounded-md border-2"
								placeholder="Germany"
								type="text"
								id="name"
								name="name"
								disabled={loading}
								bind:value={location}
								on:input={saveData}
							/>
						</div>
					</div>
				</div>
				<div class="mt-8 flex flex-row justify-center">
					<div class="flex-auto">
						<button class="btn btn-ghost" on:click={handleBackStep} disabled={loading}>
							Cancel
						</button>
					</div>
					<button
						class="btn btn-primary"
						type="button"
						on:click={handleNextStep}
						disabled={loading ||
							(currentStep === 1 && (location === '' || name === '' || age === ''))}
					>
						Next
					</button>
				</div>
			</div>
		{:else if currentStep === 2}
			<div
				class="bg-base-200 mx-auto flex max-w-md flex-1 flex-col justify-between gap-8 rounded-lg p-8 shadow-lg"
			>
				<div class="flex flex-row justify-center">
					<h1 class="text-l mb-8 font-bold md:text-xl">Enter your usage</h1>
				</div>
				<ul class="steps">
					<li class="step step-primary">Personal</li>
					<li class="step step-primary">Usage</li>
					<li class="step">Done</li>
				</ul>
				<div class="flex w-full flex-row justify-center">
					<div class="flex w-full justify-center">
						<div class="form-control w-full">
							<label for="idea" class="label">
								<span class="label-text">How much do think you consume Energy?</span>
							</label>
							<input
								class="input input-bordered w-full rounded-md border-2"
								placeholder="80 KWats"
								type="text"
								id="energyConsumed"
								name="energyConsumed"
								disabled={loading}
								bind:value={energyConsumed}
								on:input={saveData}
							/>
						</div>
					</div>
				</div>
				<div class="flex w-full flex-row justify-center">
					<div class="flex w-full justify-center">
						<div class="form-control w-full">
							<label for="idea" class="label">
								<span class="label-text">What would be your goal?</span>
							</label>
							<input
								class="input input-bordered w-full rounded-md border-2"
								placeholder="50 KWats"
								type="text"
								id="energyConsumedGoal"
								name="energyConsumedGoal"
								disabled={loading}
								bind:value={energyConsumedGoal}
								on:input={saveData}
							/>
						</div>
					</div>
				</div>
				<div class="mt-8 flex flex-row justify-center">
					<div class="flex-auto">
						<button class="btn btn-ghost" on:click={handleBackStep} disabled={loading}>
							Back
						</button>
					</div>
					<button
						class="btn btn-primary"
						type="button"
						on:click={handleNextStep}
						disabled={loading ||
							(currentStep === 2 && (energyConsumed === '' || energyConsumedGoal === ''))}
					>
						Next
					</button>
				</div>
			</div>
		{:else if currentStep === 3}
			<div
				class="bg-base-200 mx-auto flex max-w-md flex-1 flex-col justify-between gap-8 rounded-lg p-8 shadow-lg"
			>
				<div class="flex flex-row justify-center">
					<h1 class="text-l mb-8 font-bold md:text-xl">You now ready!</h1>
				</div>
				<ul class="steps">
					<li class="step step-primary">Personal</li>
					<li class="step step-primary">Usage</li>
					<li class="step">Done</li>
				</ul>
				<div class="mt-8 flex flex-row justify-center">
					<div class="flex-auto">
						<button class="btn btn-ghost" on:click={handleBackStep} disabled={loading}>
							Back
						</button>
					</div>
					<button
						class="btn btn-primary"
						type="button"
						on:click={handleNextStep}
						disabled={loading}
					>
						Create
					</button>
				</div>
			</div>
		{/if}
	</div>
</div>
