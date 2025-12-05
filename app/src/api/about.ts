import { API_BASE_URL } from "../constants/url";
import { AboutResponse } from "../interfaces/about";

//Imitation of the slow endpoint.
export async function getAbout(): Promise<AboutResponse> {
  const url = `${API_BASE_URL}/slow`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(
      `Failed to fetch About Screen data.\nStatus code: ${res.status}`
    );
  }

  const data: AboutResponse = await res.json();
  return data;
}
