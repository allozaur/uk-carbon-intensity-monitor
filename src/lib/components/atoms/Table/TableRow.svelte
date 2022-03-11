<script>
	import { state } from "$lib/store";
	import { toKebabCase } from "$lib/utils";

	export let regionid = "";
	export let dnoregion = "";
	export let shortname = "";
	export let generationmix = [];
	export let sourceregion = [];
	export let intensity = null;

	const selectRow = (
		dnoregion,
		regionid,
		shortname,
		generationmix,
		intensity,
		sourceregion
	) => {
		$state.dnoregion = dnoregion;
		$state.regionid = regionid;
		$state.shortname = shortname;
		$state.generationmix = generationmix;
		$state.intensity = intensity;
		$state.sourceregion = sourceregion;
	};
</script>

<tr
	class:selected={regionid === $state.regionid}
	on:click={() =>
		selectRow(
			dnoregion,
			regionid,
			shortname,
			generationmix,
			intensity,
			sourceregion
		)}
>
	{#if dnoregion}
		<td>
			{dnoregion}
		</td>
	{/if}

	{#if shortname}
		<td>
			{shortname}
		</td>
	{/if}

	{#if intensity}
		<td
			style="color: var(--c-carbon-index-{toKebabCase(
				intensity.index
			)})"
		>
			{intensity.forecast}
		</td>
	{/if}
</tr>

<style>
	.selected td {
		background: var(--c-primary-dark);
		color: var(--c-white) !important;
		opacity: 1 !important;
	}
</style>
