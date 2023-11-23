<script lang="ts">
	// Icons imports
	import IconClose from '~icons/solar/alt-arrow-left-bold';

	// Essential imports
	import { goto } from '$app/navigation';

	let loading: boolean = false;
	let title: string = '';
	let description: string = '';

	let currentRating = 3;
	const maxRating = 5;

	function setRating(rating: number) {
		currentRating = rating;
	}

	function handleFormSub() {
		goto('/case-study/profile');
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
		<h1 class="mb-8 text-2xl font-bold md:text-3xl">Stakeholder Feedback</h1>
	</div>
	<div class="flex flex-row justify-center gap-4">
		<div class="mx-auto my-20 max-w-md">
			<div class="container mx-auto">
				<div
					class="bg-base-200 mx-auto flex max-w-md flex-1 flex-col justify-between gap-8 rounded-lg p-8 shadow-lg"
				>
					<div class="flex flex-row justify-center">
						<h1 class="text-l mb-8 font-bold md:text-xl">Enter your feedback</h1>
					</div>
					<div class="flex w-96 flex-row justify-center">
						<div class="flex w-full justify-center">
							<div class="form-control w-full">
								<label for="idea" class="label">
									<span class="label-text">The Topic of your feedback</span>
								</label>
								<input
									class="input input-bordered w-full rounded-md border-2"
									placeholder="Feedback Title"
									type="text"
									bind:value={title}
									disabled={loading}
								/>
							</div>
						</div>
					</div>
					<div class="flex w-96 flex-row justify-center">
						<div class="flex w-full justify-center">
							<div class="form-control w-full">
								<label for="idea" class="label">
									<span class="label-text">Please write us your concern!</span>
								</label>
								<textarea
									class="textarea textarea-bordered h-56 w-full rounded-md border-2"
									placeholder="I do not like..."
									bind:value={description}
									disabled={loading}
								/>
							</div>
						</div>
					</div>
					<div class="rating rating-lg">
						<label for="idea" class="label">
							<span class="label-text">What would you rate us?</span>
						</label>
						{#each Array(maxRating) as _, index (index)}
							<input
								type="radio"
								name="rating-8"
								class="mask mask-star-2 bg-orange-400"
								checked={currentRating === index + 1}
								on:change={() => setRating(index + 1)}
							/>
						{/each}
					</div>
					<div class="mt-8 flex flex-row justify-center">
						<div class="flex-auto">
							<button
								class="btn btn-ghost"
								on:click={() => goto('/case-study/profile')}
								disabled={loading}
							>
								Back
							</button>
						</div>
						<button
							class="btn btn-primary"
							type="button"
							disabled={loading || title === '' || description === ''}
							on:click={handleFormSub}
						>
							Sent
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
