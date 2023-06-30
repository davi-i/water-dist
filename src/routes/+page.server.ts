import { error } from "@sveltejs/kit";
import { env } from '$env/dynamic/private';
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url, fetch }) => {
  const mapbox_key = env.MAPBOX_APIKEY;
  console.log(mapbox_key)
  if (mapbox_key) {
    return {
      mapbox_key
    };
  } else {
    throw error(500, "erro interno");
  }
};
