<script>
	import { toKebabCase } from "$lib/utils";

	export let forecast = 0;
	export let index = "";
</script>

<div class="carbon-intensity">
	<div class="carbon-intensity__inner">
		<h3 class="carbon-intensity__title">
			Carbon intensity
		</h3>
		<span
			class="carbon-intensity__value"
			style="color: var(--c-carbon-index-{toKebabCase(
				index
			)})"
		>
			{forecast}
		</span>
		<span class="carbon-intensity__unit"
			>gCO&#8322;/kWh</span
		>
	</div>
</div>

<style>
	.carbon-intensity,
	.carbon-intensity__inner {
		display: grid;
		place-content: center;
		text-align: center;
	}

	.carbon-intensity__inner {
		border: var(--b-secondary);
		border-radius: 2rem;
		padding: 3rem 6rem;
	}

	.carbon-intensity__title {
		font-weight: 600;
		margin: 0;
	}

	.carbon-intensity__value {
		font-size: 5rem;
		font-weight: 800;
		line-height: 1;
	}

	.carbon-intensity__unit {
		color: var(--c-text-light);
		font-size: 1.5rem;
	}
</style>
