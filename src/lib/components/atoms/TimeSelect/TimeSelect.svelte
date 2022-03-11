<script>
	import { state } from "$lib/store";
	import { parseTime } from "$lib/utils";

	let selectedDataset;

	export let datasets = [];

	$state.dataset = parseTime(
		datasets[0].from,
		datasets[0].to
	);

	const onChange = () => {
		$state.dataset = selectedDataset;

		if (!$state.regionid) return;
		$state.dnoregion = "";
		$state.regionid = "";
		$state.shortname = "";
		$state.generationmix = [];
		$state.intensity = "";
		$state.sourceregion = [];
	};
</script>

<div class="time-select">
	<select bind:value={selectedDataset} on:change={onChange}>
		{#each datasets as { from, to }, i}
			<option value={parseTime(from, to)}>
				{parseTime(from, to)}
			</option>
		{/each}
	</select>
</div>
