import { api_url } from "../config/config";
import { authorizedHttp } from "../config/http";

export async function addToFav(data) {
  return await authorizedHttp.post(`${api_url}/add-to-fav`, data);
}

export async function getMyFav() {
  return await authorizedHttp.get(`${api_url}/myFavourites`);
}
