<script lang="ts">
	// Icons imports
	import IconCreate from '~icons/solar/clipboard-add-outline';
</script>

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
