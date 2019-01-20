import { Reducer } from "redux";
import { getType } from "typesafe-actions";

import { editUserAction, loginAction, signupAction } from "./actions";
import { AuthAction, IAuthState } from "./types";

const initialState: IAuthState = {
  isEditingUser: false
};
/**
 * See https://github.com/piotrwitek/typesafe-actions#--the-reducer for details on how we use
 * typesafe-actions to make a reducer where each case has the specific type information for the given action.
 */
const authReducer: Reducer<IAuthState, AuthAction> = (state = initialState, action) => {
  switch (action.type) {
    // Login
    case getType(loginAction.request):
      return { ...state, loginError: undefined };
    case getType(loginAction.success):
      return { ...state, ...action.payload, loginError: undefined };
    case getType(loginAction.failure):
      return { ...state, loginError: action.payload.non_field_errors[0] };
    // Signup
    case getType(signupAction.request): // fall through
    case getType(signupAction.success):
      return { ...state, signupErrors: undefined };
    case getType(signupAction.failure):
      return { ...state, signupErrors: action.payload };
    // Edit user
    case getType(editUserAction.request):
      return { ...state, isEditingUser: true, editUserErrors: undefined };
    case getType(editUserAction.success):
      return { ...state, ...action.payload, isEditingUser: false, editUserErrors: undefined };
    case getType(editUserAction.failure):
      return { ...state, isEditingUser: false, editUserErrors: action.payload };
    default:
      return state;
  }
};

export default authReducer;
