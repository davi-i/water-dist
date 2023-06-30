<script lang="ts">
	import Map from '$lib/blocks/Map.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Map mapbox_key={data.mapbox_key} />
