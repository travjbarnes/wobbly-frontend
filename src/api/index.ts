// need to polyfill URL because node/jest throws reference error
import { URL } from "whatwg-url";

import { IUserResponse } from "./types";

const ROOT_URL = "http://localhost/api/v1";

export const getUser = (id: number) => {
  const url = new URL(`/user/${id}`, ROOT_URL);
  const request = new Request(url.toString());
  return fetch(request);
};

export const login = (email: string, password: string): Promise<IUserResponse | Error> => {
  // TODO
  // Use something like axios to send a POST request and return the auth token (or the error)
  return new Promise(resolve => {
    setTimeout(
      () =>
        resolve({
          id: "14295d30-c274-11e8-b8a2-507b9d060c71",
          email,
          // TODO: don't actually store the password anywhere!!
          token: password
        }),
      1000
    );
  });
};

export const editUser = (email: string, displayName: string, password: string): Promise<IUserResponse | Error> => {
  // TODO
  return new Promise(resolve => {
    setTimeout(
      () =>
        resolve({
          id: "14295d30-c274-11e8-b8a2-507b9d060c71",
          displayName,
          email,
          // TODO: don't actually store the password anywhere!!
          token: password
        }),
      1000
    );
  });
};
