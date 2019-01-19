import { buildRequest } from "./util";
import { APIError } from "./errors";

export const ROOT_URL = __DEV__ ? "http://0.0.0.0" : "https://production.wobbly.app";
export const API_PATH = "/api/v1";

/**
 * Creates the authorization header needed for any signed-in actions.
 * @param token The auth token received when logging in.
 */
export const getAuthHeader = (token: string) => {
  return {
    Authorization: `Bearer ${token}`
  };
};

/**
 * Transforms the response from the server to its JSON. Alternatively,
 * if the response has status 204 (No Content), this returns nothing.
 */
function transformResponse<D>(response: Response): Promise<D> {
  // HTTP 204: No Content
  if (response.status !== 204) {
    return response.json().then(data => {
      if (!response.ok) {
        throw new APIError(response.statusText, response.status, data);
      }
      return data;
    });
  }
  // If we got here, D should be void or an empty interface
  // i.e. we should not be expecting any content
  return Promise.resolve({} as D);
}

/**
 * Sends a GET request to the API.
 * Returns a Promise for the JSON of the response.
 * @param path the path of the endpoint. Should end in a trailing slash.
 * @param headers any headers (if needed) for the request
 */
export function get<D>(path: string, headers?: any): Promise<D> {
  const request = buildRequest(path);
  headers = { ...headers, "Content-Type": "application/json" };
  return fetch(request, {
    method: "GET",
    headers
  }).then(response => transformResponse<D>(response));
}

/** Sends a POST request to the API.
 * Returns a Promise for the JSON of the response.
 * @param path the path of the endpoint. Should end in a trailing slash.
 * @param headers any headers (if needed) for the request
 * @param body the request body
 */
export function post<D>(path: string, headers?: any, body?: any): Promise<D> {
  const request = buildRequest(path);
  headers = { ...headers, "Content-Type": "application/json" };
  return fetch(request, {
    method: "POST",
    headers,
    body: JSON.stringify(body)
  }).then(response => transformResponse<D>(response));
}

/** Sends a PUT request to the API.
 * Returns a Promise for the JSON of the response.
 * @param path the path of the endpoint. Should end in a trailing slash.
 * @param headers any headers (if needed) for the request
 * @param body the request body
 */
export function put<D>(path: string, headers?: any, body?: any): Promise<D> {
  const request = buildRequest(path);
  headers = { ...headers, "Content-Type": "application/json" };
  return fetch(request, {
    method: "PUT",
    headers,
    body: JSON.stringify(body)
  }).then(response => transformResponse<D>(response));
}
