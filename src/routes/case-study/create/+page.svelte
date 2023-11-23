<script lang="ts">
	// Icons imports
	import IconClose from '~icons/solar/alt-arrow-left-bold';
	import IconInfo from '~icons/solar/info-square-outline';

	// Essential imports
	import { goto } from '$app/navigation';
	import { clearCaseStudyData, localStorageUtil } from '$lib/localStorage';
	import { onMount } from 'svelte';
	import { countries } from '$lib/countries';

	let loading: boolean;
	let currentStep = 1;
	let name: string = '';
	let gender: string = '';
	let age: string = '1';
	let location: string = '';
	let maritalStatus: string = '';
	let energyConsumed: string = '';
	let energyConsumedGoal: string = '';

	const genderOptions: string[] = ['Male', 'Female', 'Non-Binary'];
	const maritalStatusOptions = ['Single', 'Married', 'Divorced', 'Widowed', 'Separated'];

	onMount(() => {
		name = localStorageUtil.getItem('name') || '';
		gender = localStorageUtil.getItem('gender') || '';
		age = localStorageUtil.getItem('age') || '';
		location = localStorageUtil.getItem('location') || '';
		maritalStatus = localStorageUtil.getItem('maritalStatus') || '';
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
		localStorageUtil.setItem('gender', gender);
		localStorageUtil.setItem('age', age);
		localStorageUtil.setItem('location', location);
		localStorageUtil.setItem('maritalStatus', maritalStatus);
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

	// Function to create an array from 1 to 99
	function createAgeOptions(): string[] {
		return Array.from({ length: 99 }, (_, i) => (i + 1).toString());
	}

	const ageOptions: string[] = createAgeOptions();
</script>

<div class="mx-auto flex min-h-screen max-w-7xl flex-col flex-wrap gap-4">
	<div class="flex items-start">
		<button
			class="btn btn-link text-primary"
			on:click={clearCaseStudyData}
			style="max-width: 150px;"
		>
			<IconClose style="font-size: x-large;" /> cancel
		</button>
	</div>
	<div class="self-center">
		<h1 class="mb-8 text-2xl font-bold md:text-3xl">Create a new example case!</h1>
	</div>
	<div class="self-center">
		<div role="alert" class="alert">
			<IconInfo style="font-size: x-large;" />
			<span>The following data will only be saved in your Browser Local Storage</span>
		</div>
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
								<span class="label-text">Your Gender?</span>
							</label>
							<select
								class="select select-bordered"
								id="gender"
								name="gender"
								disabled={loading}
								bind:value={gender}
							>
								<option disabled selected value="">Select gender</option>
								{#each genderOptions as option}
									<option value={option}>{option}</option>
								{/each}
							</select>
						</div>
					</div>
				</div>
				<div class="flex w-full flex-row justify-center">
					<div class="flex w-full justify-center">
						<div class="form-control w-full">
							<label for="idea" class="label">
								<span class="label-text">What is your age?</span>
							</label>
							<select
								class="select select-bordered"
								id="age"
								name="age"
								disabled={loading}
								bind:value={age}
							>
								<option disabled value="">Select age</option>
								{#each ageOptions as option}
									<option value={option}>{option}</option>
								{/each}
							</select>
						</div>
					</div>
				</div>
				<div class="flex w-full flex-row justify-center">
					<div class="flex w-full justify-center">
						<div class="form-control w-full">
							<label for="idea" class="label">
								<span class="label-text">Where do you live?</span>
							</label>
							<select
								class="select select-bordered"
								id="location"
								name="location"
								disabled={loading}
								bind:value={location}
							>
								<option disabled value="">Select country</option>
								{#each countries as country}
									<option value={country}>{country}</option>
								{/each}
							</select>
						</div>
					</div>
				</div>
				<div class="flex w-full flex-row justify-center">
					<div class="flex w-full justify-center">
						<div class="form-control w-full">
							<label for="marital-status" class="label">
								<span class="label-text">Your Marital Status?</span>
							</label>
							<select
								class="select select-bordered"
								id="marital-status"
								name="marital-status"
								disabled={loading}
								bind:value={maritalStatus}
							>
								<option disabled selected value="">Select marital status</option>
								{#each maritalStatusOptions as option}
									<option value={option}>{option}</option>
								{/each}
							</select>
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
							<label for="energyConsumed" class="label">
								<span class="label-text">How much energy do you think you consume?</span>
							</label>
							<div class="flex items-center gap-2">
								<input
									type="range"
									min="100"
									max="5000"
									step="1"
									class="range range-warning"
									id="energyConsumed"
									name="energyConsumed"
									disabled={loading}
									bind:value={energyConsumed}
									on:input={saveData}
								/>
								<span class="label-text" id="energyConsumedValue">{energyConsumed} kWh</span>
							</div>
						</div>
					</div>
				</div>
				<div class="flex w-full flex-row justify-center">
					<div class="flex w-full justify-center">
						<div class="form-control w-full">
							<label for="energyConsumedGoal" class="label">
								<span class="label-text">What would be your energy consumption goal?</span>
							</label>
							<div class="flex items-center gap-2">
								<input
									type="range"
									min="100"
									max="5000"
									step="1"
									class="range range-success"
									id="energyConsumedGoal"
									name="energyConsumedGoal"
									disabled={loading}
									bind:value={energyConsumedGoal}
									on:input={saveData}
								/>
								<span class="label-text" id="energyConsumedGoalValue">{energyConsumedGoal} kWh</span
								>
							</div>
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
	{#if currentStep === 2}
		<div class="mx-auto flex min-h-full max-w-7xl flex-col flex-wrap gap-4">
			<div class="divider">Information</div>
			<div class="mx-auto my-20 max-w-7xl">
				<h1 class="text-center text-3xl font-bold">Electricity Consumption Statistics</h1>
				<div class="mt-6 overflow-x-auto">
					<table class="table w-full">
						<!-- head -->
						<thead>
							<tr>
								<th>Single-Person Household</th>
								<th>Electricity Consumption for 1 Person</th>
								<th>Electricity Costs for 1 Person</th>
							</tr>
						</thead>
						<tbody>
							<!-- row 1 -->
							<tr>
								<td>1 Person in Apartment per Month</td>
								<td>108 kWh</td>
								<td>52 Euro</td>
							</tr>
							<!-- row 2 -->
							<tr>
								<td>1 Person in Apartment per Year</td>
								<td>1,300 kWh</td>
								<td>624 Euro</td>
							</tr>
							<!-- row 3 -->
							<tr>
								<td>1 Person in Single-Family House per Month</td>
								<td>192 kWh</td>
								<td>92 Euro</td>
							</tr>
							<!-- row 4 -->
							<tr>
								<td>1 Person in Single-Family House per Year</td>
								<td>2,300 kWh</td>
								<td>1,104 Euro</td>
							</tr>
						</tbody>
					</table>
				</div>
				<p class="mt-4 text-center">
					Source: GASAG, (2022). <a
						href="https://www.gasag.de/magazin/neudenken/stromverbrauch-ein-personen-haushalt#title-0"
						target="_blank"
						class="text-primary"
						rel="noopener noreferrer">How much electricity does 1 person consume?</a
					>
				</p>
			</div>
		</div>
	{/if}
</div>
