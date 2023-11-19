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
			type: 'bar', // or 'line', 'pie', etc.
			data: {
				labels: data.map((d) => d.x),
				datasets: [
					{
						label: label,
						data: data.map((d) => d.y),
						backgroundColor: 'rgba(54, 162, 235, 0.2)',
						borderColor: 'rgba(54, 162, 235, 1)',
						borderWidth: 1
					}
				]
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
