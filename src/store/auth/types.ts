import { ICreateOrUpdateUserErrors, IOwnUser } from "../../api/types";
import * as authActions from "./actions";
import { ActionType } from "typesafe-actions";

export const enum AuthActionType {
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

/** These fields are present when the user is authenticated. */
export interface IAuthenticated extends IOwnUser {
  token: string;
}

/**
 * By extending `Partial<IAuthenticated>`, we show that the authenticated fields (e.g. a bearer token)
 * may not be present.
 */
export interface IAuthState extends Partial<IAuthenticated> {
  isEditingUser: boolean;
  loginError?: string; // A string is enough for this. E.g. "Unable to login with provided credentials".
  signupErrors?: ICreateOrUpdateUserErrors;
  editUserErrors?: ICreateOrUpdateUserErrors;
}

export type AuthAction = ActionType<typeof authActions>;
