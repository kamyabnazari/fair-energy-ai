<script>
	// @ts-nocheck

	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';

	export let data;
	export let label;
	let canvas;

	onMount(() => {
		const ctx = canvas.getContext('2d');
		new Chart(ctx, {
			type: 'pie',
			data: {
				labels: data.labels,
				datasets: [
					{
						label: label,
						data: data.values,
						backgroundColor: [
							// Add as many colors as you have data points
							'rgb(255, 99, 132)',
							'rgb(54, 162, 235)',
							'rgb(255, 205, 86)'
							// ...
						],
						hoverOffset: 4
					}
				]
			},
			options: {
				// Additional options if needed
			}
		});
	});
</script>

<canvas bind:this={canvas}></canvas>
