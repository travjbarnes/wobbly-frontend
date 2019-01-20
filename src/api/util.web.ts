// need to polyfill URL because node/jest throws reference error (but only for web)
import { URL } from "whatwg-url";

import { ROOT_URL } from ".";

/**
 * Create a Request object for the given path.
 * @param path the API endpoint to send the request to
 */
export const buildRequest = (path: string) => {
  // The backend always expects URLs with a trailing slash. It will fail otherwise.
  path += path.endsWith("/") ? "" : "/";
  const url = new URL(path, ROOT_URL);
  return new Request(url.toString());
};
