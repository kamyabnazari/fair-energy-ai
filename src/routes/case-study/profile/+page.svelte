<script lang="ts">
	// Icons imports
	import IconCreate from '~icons/solar/clipboard-add-outline';
	import IconProject from '~icons/solar/clapperboard-text-outline';
	import IconFile from '~icons/solar/file-text-outline';
	import IconAsset from '~icons/solar/file-smile-outline';

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

<div class="mx-auto flex min-h-screen max-w-7xl flex-col gap-8">
	<div class="flex flex-col gap-8">
		<div class="flex justify-center">
			<h1 class="text-2xl font-bold md:text-3xl">Case Study</h1>
		</div>
		<div class="flex w-full flex-col gap-8 md:flex-row">
			<div class="card bg-base-200 flex-1 shadow-lg">
				<div class="card-body">
					<h2 class="card-title">How does our model decide?</h2>
					<p>
						Look at the step by step process the AI Model was trained to predict your Energy
						Consumption!
					</p>
					<div class="card-actions justify-end py-4">
						<a href="/case/stats">
							<button class="btn btn-primary gap-4">
								<IconCreate style="font-size: x-large" class="text-primary-content" />
								<span class="hidden sm:inline">View</span>
							</button>
						</a>
					</div>
				</div>
			</div>
		</div>
		<div class="stats stats-horizontal bg-base-200 flex-auto flex-nowrap shadow-lg">
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
	</div>
</div>
