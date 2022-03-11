<script>
	import Logo from "$lib/components/atoms/Logo/Logo.svelte";
</script>

<header class="header">
	<Logo />
</header>

<style>
	header {
		background: var(--c-primary);
		display: grid;
		min-height: var(--header-height);
		place-items: center;
	}

	header :global(.logo) {
		height: 3rem;
	}
</style>
