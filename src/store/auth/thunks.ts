import { NavigationActions } from "react-navigation";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

import { IApplicationState, resetAppAction } from "../";
import * as AuthAPI from "../../api/auth";
import { APIError } from "../../api/errors";
import { ICreateOrUpdateUserErrors } from "../../api/types";
import { persistor } from "../../reduxStore";
import NavigationService from "../../util/NavigationService";
import { fetchUserAction } from "../entities/actions";

import { editUserAction, loginAction, signupAction } from "./actions";
import { AuthAction } from "./types";

/** Sign up for a new account */
export const createUserThunk = (email: string, displayName: string, password: string) => (
  dispatch: ThunkDispatch<IApplicationState, void, AuthAction>
) => {
  dispatch(signupAction.request());
  AuthAPI.createUser(email, displayName, password)
    .then(() => {
      dispatch(signupAction.success());
      // We signed up, now log in
      dispatch(loginThunk(email, password));
    })
    .catch((error: APIError<ICreateOrUpdateUserErrors>) => {
      dispatch(signupAction.failure(error.json));
    });
};

/** Sends login details to the backend and sets the current user with auth token (if no error) */
export const loginThunk = (email: string, password: string) => (
  dispatch: ThunkDispatch<IApplicationState, void, AnyAction>
) => {
  dispatch(loginAction.request());
  AuthAPI.login(email, password)
    .then(response => {
      const token = response.auth_token;
      AuthAPI.getOwnUserDetails(token).then(userDetails => {
        // Save auth information
        dispatch(
          loginAction.success({
            token,
            ...userDetails
          })
        );
        // Also store our own user info in our collection of entities
        dispatch(fetchUserAction.success(userDetails));
        NavigationService.navigate("App");
      });
    })
    .catch(error => {
      dispatch(loginAction.failure(error.json));
    });
};

/**
 * Logs out the user (and disables the token), then resets the entire app state to its initial.
 * @param token
 */
export const logoutThunk = (token: string) => (dispatch: ThunkDispatch<IApplicationState, void, AnyAction>) => {
  // TODO: handle errors here
  AuthAPI.logout(token)
    .then(() => {
      dispatch(resetAppAction());
      // immediately write all pending state to disk (returns a promise)
      persistor.flush();
      NavigationService.navigate("Auth");
    })
    .catch((error: APIError<any>) => {
      if (error.status === 401) {
        // @ts-ignore
        // tslint:disable-next-line:no-console
        console.warn("Invalid token but logging out anyway!");
        // HTTP 401 Unauthorized
        // This means that the auth token is invalid. If this is the case, proceed with clearing the app state.
        dispatch(resetAppAction());
        // immediately write all pending state to disk (returns a promise)
        persistor.flush();
        NavigationService.navigate("Auth");
      } else {
        // TODO
        // @ts-ignore
        // tslint:disable-next-line:no-console
        console.error(error);
      }
    });
};

/** Edit the email, display name, or image of the current user */
export const editUserThunk = (token: string, email: string, displayName: string) => (
  dispatch: ThunkDispatch<IApplicationState, void, AuthAction>
) => {
  dispatch(editUserAction.request());
  AuthAPI.editUser(token, email, displayName)
    .then(response => {
      dispatch(editUserAction.success(response));
    })
    .catch(error => {
      // TODO
      // @ts-ignore
      // tslint:disable-next-line:no-console
      console.error(error.json);
      dispatch(editUserAction.failure(error.json));
    });
};
