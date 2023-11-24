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
			<h1 class="text-5xl font-bold">Tips</h1>
			<div class="container mx-auto">
				<h2 class="py-4 text-3xl font-semibold">Quick Tips</h2>
				<p class="py-2">
					Upgrade to energy-efficient appliances, switch to LED lighting, use smart thermostats, and
					unplug electronics when not in use.
				</p>
				<h2 class="py-4 text-3xl font-semibold">Quick Tips</h2>
				<ul class="list-disc pl-6">
					<li>Upgrade to Energy-Efficient Appliances.</li>
					<li>Switch to LED Lighting.</li>
					<li>Invest in Smart Thermostats.</li>
					<li>Seal Leaks and Insulate your home.</li>
					<!-- Add more tips from the previous list here -->
				</ul>
				<h2 class="py-4 text-3xl font-semibold">Advanced Strategies</h2>
				<ul class="list-disc pl-6">
					<li>Regularly maintain HVAC systems.</li>
					<li>Use smart power strips to manage phantom loads.</li>
					<li>Switch to renewable energy sources when possible.</li>
					<li>Maintain appliances for optimal performance.</li>
					<li>Adopt efficient cooking methods like pressure cooking or using microwaves.</li>
					<li>Practice energy-efficient laundry habits.</li>
					<li>Install low-flow showerheads for water conservation.</li>
					<li>Plant trees for shade and natural cooling.</li>
					<li>Automate lighting with timers and motion sensors.</li>
					<li>Engage in community energy conservation programs.</li>
				</ul>
				<h2 class="py-4 text-3xl font-semibold">Fair Algorithms in Energy Management</h2>
				<p>
					Understanding the role of fair algorithms in optimizing energy usage and promoting
					sustainable practices.
				</p>
			</div>
		</div>
	</div>
</div>
