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
						backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
						hoverOffset: 4
					}
				]
			},
			options: {
				plugins: {
					tooltip: {
						callbacks: {
							label: function (context) {
								let label = context.label || '';
								if (label) {
									label += ': ';
								}
								if (context.parsed !== null) {
									const total = context.dataset.data.reduce((acc, curr) => acc + curr, 0);
									const percentage = ((context.parsed / total) * 100).toFixed(2);
									label += `${percentage}%`;
								}
								return label;
							}
						}
					}
				}
			}
		});
	});
</script>

<canvas bind:this={canvas}></canvas>
