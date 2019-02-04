import { ActionType } from "typesafe-actions";

import * as authActions from "./actions";

export enum AuthActionType {
  // Login
  LOGIN_REQUEST = "LOGIN_REQUEST",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAILURE = "LOGIN_FAILURE",
  // Signup
  SIGNUP_REQUEST = "SIGNUP_REQUEST",
  SIGNUP_FAILURE = "SIGNUP_FAILURE",
  SIGNUP_SUCCESS = "SIGNUP_SUCCESS",
  // Edit user
  EDIT_USER_REQUEST = "EDIT_USER_REQUEST",
  EDIT_USER_SUCCESS = "EDIT_USER_SUCCESS",
  EDIT_USER_FAILURE = "EDIT_USER_FAILURE"
}

export interface ICreateOrUpdateUserErrors {
  // A list of the errors for each field
  [field: string]: string[];
}

// This will always be a single-element list with the string
// "Unable to login with provided credentials".
export interface ILoginErrors {
  non_field_errors: string[];
}

/** Public fields of any user. */
export interface IUser {
  uuid: string;
  displayName: string;
  image?: any; // TODO
}

/** Users can see their own email, but not that of others. */
/** These fields are present when the user is authenticated. */
export interface IOwnUser extends IUser {
  email: string;
  token: string;
}

/**
 * By extending `Partial<IOwnUser>`, we show that the authenticated fields (e.g. a bearer token)
 * may not be present.
 */
export interface IAuthState extends Partial<IOwnUser> {
  isEditingUser: boolean;
  loginError?: string; // A string is enough for this. E.g. "Unable to login with provided credentials".
  signupErrors?: ICreateOrUpdateUserErrors;
  editUserErrors?: ICreateOrUpdateUserErrors;
}

export type AuthAction = ActionType<typeof authActions>;
