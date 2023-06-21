import { api_url } from "../config/config";
import { authorizedHttp } from "../config/http";

export async function getHome() {
  return await authorizedHttp.get(`${api_url}/home`);
}
