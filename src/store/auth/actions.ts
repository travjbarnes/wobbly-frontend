import { createAsyncAction } from "typesafe-actions";

import { ICreateOrUpdateUserErrors, ILoginErrors, IOwnUser } from "../../api/types";

import { AuthActionType, IAuthenticated } from "./types";

export const loginAction = createAsyncAction(
  AuthActionType.LOGIN_REQUEST,
  AuthActionType.LOGIN_SUCCESS,
  AuthActionType.LOGIN_FAILURE
)<void, IAuthenticated, ILoginErrors>();

export const signupAction = createAsyncAction(
  AuthActionType.SIGNUP_REQUEST,
  AuthActionType.SIGNUP_SUCCESS,
  AuthActionType.SIGNUP_FAILURE
)<void, void, ICreateOrUpdateUserErrors>();

export const editUserAction = createAsyncAction(
  AuthActionType.EDIT_USER_REQUEST,
  AuthActionType.EDIT_USER_SUCCESS,
  AuthActionType.EDIT_USER_FAILURE
)<void, IOwnUser, ICreateOrUpdateUserErrors>();
