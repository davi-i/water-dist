import { error } from "@sveltejs/kit";
import { env } from '$env/dynamic/private';
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = () => {
  console.log(env);
  const mapbox_key = env.MAPBOX_APIKEY;
  console.log(mapbox_key)
  if (mapbox_key) {
    return {
      mapbox_key
    };
  } else {
    throw error(500, "cannot access map");
  }
};
