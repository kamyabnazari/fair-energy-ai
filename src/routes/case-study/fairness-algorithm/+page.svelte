<script lang="ts">
	// Icons imports
	import IconClose from '~icons/solar/alt-arrow-left-bold';

	// Essential imports
	import { goto } from '$app/navigation';
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
	<div class="flex flex-row justify-center gap-4">
		<div class="mx-auto my-20 max-w-md">
			<h1 class="text-5xl font-bold">Fairness Algorithm</h1>
			<div class="container mx-auto">
				<h2 class="py-4 text-3xl font-semibold">Fair Algorithms</h2>
				<p class="py-2">Text</p>
			</div>
		</div>
	</div>
</div>
