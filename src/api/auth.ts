import { post, getAuthHeader, get, put } from ".";
import { ILoginResponse, IOwnUser } from "./types";

const AUTH_PATH = "/auth";

/**
 * Register a new user.
 * @param email
 * @param password
 */
export const createUser = (email: string, displayName: string, password: string): Promise<IOwnUser> => {
  return post(`${AUTH_PATH}/users/create/`, undefined, { email, displayName, password });
};

/**
 * Get an authorization token for the given email/password.
 * @param email
 * @param password
 */
export const login = (email: string, password: string): Promise<ILoginResponse> => {
  return post(`${AUTH_PATH}/token/login/`, undefined, { email, password });
};

/**
 * Delete the current authorization token. It will no longer be accepted by the backend.
 * @param token auth token for the current user
 */
export const logout = (token: string): Promise<void> => {
  // TODO: handle errors here
  return post(`${AUTH_PATH}/token/logout/`, getAuthHeader(token));
};

/**
 * Gets the user details for the current user (the display name, image, etc.)
 * @param token auth token for the current user
 */
export const getOwnUserDetails = (token: string): Promise<IOwnUser> => {
  return get(`${AUTH_PATH}/users/me/`, getAuthHeader(token));
};

/**
 * Updates the details of the current user.
 * @param token auth token for the current user
 * @param email the new email to use
 * @param displayname the new display name to use
 */
export const editUser = (token: string, email: string, displayName: string): Promise<IOwnUser> => {
  return put(`${AUTH_PATH}/users/me/`, getAuthHeader(token), { email, displayName });
};
