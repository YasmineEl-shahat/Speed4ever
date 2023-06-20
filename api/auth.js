import { api_url } from "../config/config";
import { http, authorizedHttp } from "../config/http";

export async function signUp(data) {
  return await http.post(`${api_url}/auth/signup`, data);
}

export async function verifyAccount(data) {
  return await http.post(`${api_url}/auth/verify`, data);
}

export async function sendCode(data) {
  return await http.post(`${api_url}/auth/send_code`, data);
}

export async function checkCode(data) {
  return await http.post(`${api_url}/auth/check_code`, data);
}

export async function resetPassword(data) {
  return await http.patch(`${api_url}/auth/reset_password`, data);
}

export async function logOut(data) {
  return await authorizedHttp.patch(`${api_url}/auth/logout`, data);
}

export async function login(data) {
  return await http.post(`${api_url}/auth/login`, data);
}
