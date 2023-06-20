import axios from "axios";
import cookieCutter from "cookie-cutter";
const ISSERVER = typeof window === "undefined";
let savedToken;

if (!ISSERVER) {
  savedToken = cookieCutter.get("auth");
}

const token = `Bearer ` + savedToken;
export let http = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

export let authorizedHttp = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Authorization: token,
  },
});
