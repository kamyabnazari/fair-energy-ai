<script>
	// @ts-nocheck

	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';

	export let data;

	let canvas;

	onMount(() => {
		const ctx = canvas.getContext('2d');
		new Chart(ctx, {
			type: 'line',
			data: {
				labels: data.labels,
				datasets: data.datasets.map((dataset) => ({
					label: dataset.label,
					data: dataset.data,
					fill: dataset.fill,
					borderColor: dataset.borderColor,
					tension: dataset.tension
				}))
			},
			options: {
				scales: {
					y: {
						beginAtZero: true
					}
				}
			}
		});
	});
</script>

<canvas bind:this={canvas}></canvas>
