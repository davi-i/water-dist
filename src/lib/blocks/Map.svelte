<script lang="ts">
	import mapboxgl, { Map } from 'mapbox-gl';
	import { onMount } from 'svelte';

	export let mapbox_key: string;
	export let lat: number;
	export let long: number;
	export let zoom = 12;

	onMount(() => {
		mapboxgl.accessToken = mapbox_key;
		const map = new Map({
			container: 'map',
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [lat, long],
			zoom
		});
	});
</script>

<svelte:head>
	<link href="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css" rel="stylesheet" />
</svelte:head>

<div id="map" style="height: 400px;" />
