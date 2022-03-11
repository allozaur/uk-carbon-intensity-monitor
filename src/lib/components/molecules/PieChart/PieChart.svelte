<script>
	import Pie from "svelte-chartjs/src/Pie.svelte";

	export let data = {};
	export let options = {
		plugins: {
			legend: {
				labels: {
					color: "hsla(225, 16%, 22%, 1)",
				},
			},
		},
	};
	export let title = "";
</script>

<div class="pie-chart">
	<h3 class="pie-chart__title">{title}</h3>
	<Pie {data} {options} width={100} height={50} />
</div>

<style>
	.pie-chart {
		display: grid;
		gap: 1rem;
	}
	.pie-chart__title {
		text-align: center;
		font-size: 1.5rem;
		font-weight: 600;
	}
</style>
