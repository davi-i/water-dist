<script lang="ts">
	
	import Map from '$lib/blocks/Map.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div class="navbar bg-neutral text-neutral-content">
	<span class="btn btn-ghost normal-case text-xl">Smart Water Distribution</span>
</div>

<Map mapbox_key={data.mapbox_key} lat={-1} long={1} />
	
