<script context="module">
	import "$lib/css/index.css";
</script>

<script>
	import Header from "$lib/components/molecules/Header/Header.svelte";
</script>

<Header />

<slot />

<style>
	:global(.header) {
		left: 0;
		position: fixed;
		right: 0;
		top: 0;
		z-index: var(--layer-2);
	}
</style>
