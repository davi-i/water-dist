import { error } from "@sveltejs/kit";
import { env } from '$env/dynamic/private';
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = () => {
  const mapbox_key = env.MAPBOX_APIKEY;
  if (mapbox_key) {
    return {
      mapbox_key
    };
  } else {
    throw error(500, "cannot access map");
  }
};
