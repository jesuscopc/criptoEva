import { API_CONFIG } from "../constants/api";

export async function getCriptos() {
  return fetch(API_CONFIG.CRIPTOS)
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
}