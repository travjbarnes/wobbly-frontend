import { IUser } from "../entities/types";

export const enum CurrentUserActionType {
  // Login
  // No actions for login request/login failure, since these don't need to be stored in the global application state.
  // Instead, they live in the `LoginScreen` component state.
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  // Signup
  SIGNUP_REQUEST = "SIGNUP_REQUEST",
  SIGNUP_SUCCESS = "SIGNUP_SUCCESS",
  SIGNUP_FAILURE = "SIGNUP_FAILURE",
  // Editing
  USER_EDIT_REQUEST = "USER_EDIT_REQUEST",
  USER_EDIT_SUCCESS = "USER_EDIT_SUCCESS",
  USER_EDIT_FAILURE = "USER_EDIT_FAILURE"
}

export interface ICurrentUser extends IUser {
  token: string;
  email: string;
  isUpdating: boolean;
}
