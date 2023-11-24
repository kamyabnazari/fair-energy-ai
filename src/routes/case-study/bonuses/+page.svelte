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
			<h1 class="text-5xl font-bold">Bonuses</h1>
			<div class="container mx-auto">
				<h2 class="py-4 text-3xl font-semibold">Goals and Rewards</h2>
				<p class="py-2">
					Reduction of annual electricity consumption by 10%: This goal will be rewarded with 50 out
					of a maximum 100 points. Successful implementation will earn the household a cash bonus of
					50 Euros.
				</p>
				<p class="py-2">
					Increase in the use of renewable energy sources by 15%: For this goal, up to 75 out of 100
					points could be awarded. A reward of a 75 Euro discount on the next energy bill will be
					granted.
				</p>
				<p class="py-2">
					Reduction of annual electricity consumption by 20%: Successful achievement of this goal
					will earn 100 out of 100 points. The household will receive a bonus of a 100 Euro discount
					on the total cost of their energy bill.
				</p>
			</div>
		</div>
	</div>
</div>
