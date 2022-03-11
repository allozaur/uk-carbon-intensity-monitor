<script context="module">
	import "$lib/css/table.css";

	export async function load({ fetch }) {
		const res = await fetch(
			"https://api.carbonintensity.org.uk/regional/intensity/source/2022-02-14T18:00:00.000Z/fw24h"
		);
		const content = await res.json();

		if (res.ok) {
			return {
				props: {
					content,
				},
			};
		}

		return {
			status: res.status,
			error: new Error("Whoooooops!"),
		};
	}
</script>

<script>
	import { state } from "$lib/store";
	import { parseTime } from "$lib/utils";
	import CarbonIntensityIndex from "$lib/components/atoms/CarbonIntensityIndex/CarbonIntensityIndex.svelte";
	import {
		Table,
		TableRow,
	} from "$lib/components/atoms/Table";
	import TimeSelect from "$lib/components/atoms/TimeSelect/TimeSelect.svelte";
	import PieChart from "$lib/components/molecules/PieChart/PieChart.svelte";

	export let content = {};

	$state.datasets = content.data.reverse();

	const getSourceregionLabels = (stateArray) => {
		$state.sourceregionLabels = [];
		stateArray.forEach((element) => {
			if (element.perc) {
				if (
					!$state.sourceregionLabels.includes(
						element.source
					)
				)
					$state.sourceregionLabels.push(element.source);
			}
		});
	};

	const getSourceregionValues = (stateArray) => {
		$state.sourceregionValues = [];
		stateArray.forEach((element) => {
			if (element.perc) {
				$state.sourceregionValues.push(element.perc);
			}
		});
	};

	const getGenerationmixLabels = (stateArray) => {
		$state.generationmixLabels = [];
		stateArray.forEach((element) => {
			if (element.perc) {
				if (
					!$state.generationmixLabels.includes(element.fuel)
				)
					$state.generationmixLabels.push(element.fuel);
			}
		});
	};

	const getGenerationmixValues = (stateArray) => {
		$state.generationmixValues = [];
		stateArray.forEach((element) => {
			if (element.perc) {
				$state.generationmixValues.push(element.perc);
			}
		});
	};

	$: {
		getGenerationmixLabels($state.generationmix);
		getGenerationmixValues($state.generationmix);
		getSourceregionLabels($state.sourceregion);
		getSourceregionValues($state.sourceregion);
	}

	let generationmixChartData;
	$: generationmixChartData = {
		color: "#fff",
		labels: [...$state.generationmixLabels],
		datasets: [
			{
				data: [...$state.generationmixValues],
				backgroundColor: [...$state.chartColors],
				borderColor: [...$state.chartColors],
				borderWidth: 2,
			},
		],
	};

	let sourceregionChartData;
	$: sourceregionChartData = {
		labels: [...$state.sourceregionLabels],
		datasets: [
			{
				data: [...$state.sourceregionValues],
				backgroundColor: [...$state.chartColors],
				borderColor: [...$state.chartColors],
				borderWidth: 2,
			},
		],
	};
</script>

<main>
	<header class="choose-dataset">
		<TimeSelect datasets={$state.datasets} />
	</header>
	<article>
		<section class="options">
			<div class="region-selection">
				{#each $state.datasets as { regions, from, to }, i}
					{#if parseTime(from, to) === $state.dataset}
						<Table>
							{#each regions as { dnoregion, generationmix, intensity, regionid, shortname, sourceregion }}
								<TableRow
									{dnoregion}
									{generationmix}
									{intensity}
									{regionid}
									{shortname}
									{sourceregion}
								/>
							{/each}
						</Table>
					{/if}
				{/each}
			</div>
		</section>

		<section
			class="data"
			style={$state.dnoregion
				? $state.dnoregion
				: "align-content: center;"}
		>
			<h2 class="data__title">
				{$state.dnoregion
					? $state.dnoregion
					: "Choose a region"}
			</h2>
			{#if $state.intensity}
				<CarbonIntensityIndex
					forecast={$state.intensity.forecast}
					index={$state.intensity.index}
				/>
			{/if}

			<div class="charts">
				{#if $state.sourceregion.length}
					<div class="sourceregion">
						{#key generationmixChartData}
							<PieChart
								title="Generation mix"
								data={generationmixChartData}
							/>
						{/key}
					</div>
				{/if}

				{#if $state.generationmix.length}
					<div class="generationmix">
						{#key sourceregionChartData}
							<PieChart
								title="Source region"
								data={sourceregionChartData}
							/>
						{/key}
					</div>
				{/if}
			</div>
		</section>
	</article>
</main>

<style>
	:root {
		--choose-dataset-height: 6rem;
	}

	main {
		display: grid;
		gap: 1rem;
		padding: var(--header-height) 0 0 0;
	}

	.choose-dataset {
		background: var(--c-white-extra-dark);
		display: grid;
		height: var(--choose-dataset-height);
		padding: 0 1.5rem;
		place-content: center;
	}

	article {
		display: grid;
		gap: 4rem;
		grid-template-columns: repeat(
			auto-fit,
			minmax(32rem, 1fr)
		);
	}

	article > section {
		align-content: start;
		display: grid;
		gap: 1.5rem;
	}

	.data {
		padding: 0 1rem 2rem 1rem;
	}

	.data__title {
		font-size: 3rem;
		margin: 0 0 1rem 0;
		text-align: center;
	}

	.charts {
		display: grid;
		gap: 0.5rem;
		grid-template-columns: repeat(
			auto-fit,
			minmax(20rem, 1fr)
		);
		place-content: center;
	}

	.region-selection :global(table) {
		height: 100%;
		width: 100%;
	}

	@media all and (min-width: 1025px) {
		.choose-dataset {
			position: sticky;
			top: var(--header-height);
			z-index: var(--layer-1);
		}

		.options {
			max-height: calc(
				100vh - var(--header-height) -
					var(--choose-dataset-height)
			);
			overflow: scroll;
			position: sticky;
			top: calc(
				var(--header-height) + var(--choose-dataset-height)
			);
		}
	}
</style>
