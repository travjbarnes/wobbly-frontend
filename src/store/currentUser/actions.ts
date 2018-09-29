import { createAsyncAction, createStandardAction } from "typesafe-actions";

import { ISignupFormFields } from "../../components/screens/LoginScreen/types";
import { CurrentUserActionType, ICurrentUser } from "./types";

export const loginSuccess = createStandardAction(CurrentUserActionType.LOGIN_SUCCESS)<ICurrentUser>();

export const signupAction = createAsyncAction(
  CurrentUserActionType.SIGNUP_REQUEST,
  CurrentUserActionType.SIGNUP_SUCCESS,
  CurrentUserActionType.SIGNUP_FAILURE
)<ISignupFormFields, ICurrentUser, Error>();
