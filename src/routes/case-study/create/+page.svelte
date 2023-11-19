<script lang="ts">
	// Icons imports
	import IconClose from '~icons/solar/alt-arrow-left-bold';

	// Essential imports
	import { goto } from '$app/navigation';

	let loading: boolean;
	let name: string = '';
	let age: string = '';
	let location: string = '';
</script>

<div class="mx-auto flex min-h-screen max-w-7xl flex-col gap-8">
	<div class="flex items-start">
		<button class="btn btn-link text-primary" on:click={() => goto('/')} style="max-width: 150px;">
			<IconClose style="font-size: x-large;" /> close
		</button>
	</div>
	<div class="self-center">
		<h1 class="mb-8 text-2xl font-bold md:text-3xl">Create a new example case!</h1>
	</div>
	<div class="flex flex-row justify-center gap-8">
		<div
			class="bg-base-200 mx-auto flex max-w-md flex-1 flex-col justify-between gap-8 rounded-lg p-8 shadow-lg"
		>
			<div class="flex flex-row justify-center">
				<h1 class="text-l mb-8 font-bold md:text-xl">Your Name</h1>
			</div>
			<div class="flex w-full flex-row justify-center">
				<div class="flex w-full justify-center">
					<div class="form-control w-full">
						<label for="idea" class="label">
							<span class="label-text">What is your project's name?</span>
						</label>
						<input
							class="input input-bordered w-full rounded-md border-2"
							placeholder="Project name..."
							type="text"
							id="name"
							name="name"
							disabled={loading}
							bind:value={name}
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
							placeholder="Project name..."
							type="text"
							id="name"
							name="name"
							disabled={loading}
							bind:value={age}
						/>
					</div>
				</div>
			</div>
			<div class="flex w-full flex-row justify-center">
				<div class="flex w-full justify-center">
					<div class="form-control w-full">
						<label for="idea" class="label">
							<span class="label-text">What is your location?</span>
						</label>
						<input
							class="input input-bordered w-full rounded-md border-2"
							placeholder="Project name..."
							type="text"
							id="name"
							name="name"
							disabled={loading}
							bind:value={location}
						/>
					</div>
				</div>
			</div>
			<div class="mt-8 flex flex-row justify-center">
				<div class="flex-auto">
					<button class="btn btn-ghost" on:click={() => goto('/')} disabled={loading}>
						Cancel
					</button>
				</div>
				<a href="/case-study/profile" class="btn btn-primary">Create</a>
				<button
					class="btn btn-primary"
					type="button"
					disabled={loading || location === '' || name === '' || age === ''}
				>
					Start
				</button>
			</div>
		</div>
	</div>
</div>
