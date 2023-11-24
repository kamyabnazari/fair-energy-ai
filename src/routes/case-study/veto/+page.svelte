<script lang="ts">
	import { writable } from 'svelte/store';
	import IconClose from '~icons/solar/alt-arrow-left-bold';
	import { goto } from '$app/navigation';

	interface EnergyPrognosisItem {
		id: number;
		date: string;
		startTime: string;
		endTime: string;
		vetoes: number;
		vetoed: boolean;
		accepted: boolean;
	}

	// Function to generate random date and time
	function randomDateTime() {
		const start = new Date();
		const end = new Date(2024, 0, 1);
		const randomDate = new Date(
			start.getTime() + Math.random() * (end.getTime() - start.getTime())
		);
		return randomDate.toLocaleDateString('en-CA') + ' ' + randomDate.toTimeString().substr(0, 5);
	}

	const randomVetoItems = Array.from({ length: 5 }, (_, i) => {
		const dateTime = randomDateTime().split(' ');
		return {
			id: i + 1,
			date: dateTime[0],
			startTime: dateTime[1],
			endTime: dateTime[1], // Adjust this to make sense for an end time
			vetoes: Math.floor(Math.random() * 3) + 1, // Random vetoes between 1 and 3
			vetoed: false, // Initialize vetoed as false
			accepted: false // Initialize accepted as false
		};
	});

	const vetoItems = writable<EnergyPrognosisItem[]>(randomVetoItems);

	function handleVeto(itemId: number) {
		vetoItems.update((items) =>
			items.map((item) =>
				item.id === itemId ? { ...item, vetoes: item.vetoes - 1, vetoed: item.vetoes > 0 } : item
			)
		);
	}

	function handleAccept(itemId: number) {
		vetoItems.update((items) =>
			items.map((item) => (item.id === itemId ? { ...item, accepted: true } : item))
		);
	}
</script>

<div class="mx-auto flex min-h-screen max-w-7xl flex-col flex-wrap gap-4">
	<div class="flex items-start">
		<button
			class="btn btn-link text-primary"
			on:click={() => goto('/case-study/profile')}
			style="max-width: 150px;"
		>
			<IconClose style="font-size: x-large;" /> back
		</button>
	</div>
	<div class="self-center">
		<h1 class="mb-8 text-2xl font-bold md:text-3xl">Veto!</h1>
	</div>
	<div class="flex flex-row justify-center gap-4">
		<div class="mx-auto my-20">
			<div class="container mx-auto">
				<div
					class="bg-base-200 mx-auto flex flex-1 flex-col justify-between gap-8 rounded-lg p-8 shadow-lg"
				>
					<div class="flex w-full flex-row justify-center">
						<h1 class="text-l mb-4 font-bold md:text-xl">Place your Veto</h1>
					</div>
					<div class="flex flex-col justify-center gap-8">
						{#each $vetoItems as item (item.id)}
							<div role="alert" class="alert bg-base-300 min-w-max shadow-md">
								<span>Energy Outage on {item.date} at {item.startTime} until {item.endTime}</span>
								{#if item.vetoed}
									<span class="text-red-500">Vetoed</span>
								{:else if item.accepted}
									<span class="text-green-500">Accepted</span>
								{:else}
									<button class="btn btn-sm" on:click={() => handleAccept(item.id)}>Accept</button>
									<button
										class="btn btn-sm btn-error"
										on:click={() => handleVeto(item.id)}
										disabled={item.vetoes === 0}>Veto</button
									>
								{/if}
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
