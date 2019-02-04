import { AuthApi, Configuration, ConfigurationParameters } from "@wobbly/api-client";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

import { IApplicationState, resetAppAction } from "../";
import { persistor } from "../../reduxStore";
import NavigationService from "../../util/NavigationService";
import { fetchUserAction } from "../entities/actions";

import { editUserAction, loginAction, signupAction } from "./actions";
import { AuthAction, ICreateOrUpdateUserErrors, ILoginErrors } from "./types";

// If using genymotion: localhost IP is 10.0.3.2
const defaultConfig: ConfigurationParameters = { basePath: "http://10.0.3.2/api/v1" };
let authApi = new AuthApi(new Configuration(defaultConfig));

/** Sign up for a new account */
export const createUserThunk = (email: string, displayName: string, password: string) => (
  dispatch: ThunkDispatch<IApplicationState, void, AuthAction>
) => {
  dispatch(signupAction.request());
  authApi
    .authUsersCreateCreate({ data: { displayName, email, password } })
    .then(() => {
      dispatch(signupAction.success());
      // We signed up, now log in
      dispatch(loginThunk(email, password));
    })
    .catch(errorResponse => {
      errorResponse.json().then((json: ICreateOrUpdateUserErrors) => {
        dispatch(signupAction.failure(json));
      });
    });
};

/** Sends login details to the backend and sets the current user with auth token (if no error) */
export const loginThunk = (email: string, password: string) => (
  dispatch: ThunkDispatch<IApplicationState, void, AnyAction>
) => {
  dispatch(loginAction.request());
  let token: string;
  authApi
    .authTokenLoginCreate({ data: { email, password } })
    .then(response => {
      token = response.auth_token!;
      // There's no way to update the configuration of an existing authApi instance so we overwrite the existing one
      authApi = new AuthApi(new Configuration({ ...defaultConfig, apiKey: `Bearer ${token}` }));
      // Get details of own user
      return authApi.authUsersMeRead();
    })
    .then(userDetails => {
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
    })
    .catch(errorResponse => {
      if (errorResponse.json) {
        errorResponse.json().then((json: ILoginErrors) => {
          dispatch(loginAction.failure(json));
        });
      } else {
        dispatch(loginAction.failure({ non_field_errors: ["Connection failed."] }));
      }
    });
};

/**
 * Logs out the user (and disables the token), then resets the entire app state to its initial.
 * @param token
 */
export const logoutThunk = () => (dispatch: ThunkDispatch<IApplicationState, void, AnyAction>) => {
  // TODO: handle errors here
  const logoutPromise = authApi
    .authTokenLogoutCreate()
    .then(() => {
      dispatch(resetAppAction());
      // We cannot remove the token from an existing authApi instance so we overwrite the existing one
      authApi = new AuthApi(new Configuration(defaultConfig));
      return true;
    })
    .catch(errorResponse => {
      if (errorResponse.status === 401) {
        // @ts-ignore
        // tslint:disable-next-line:no-console
        console.warn("Invalid token but logging out anyway!");
        // HTTP 401 Unauthorized
        // This means that the auth token is invalid. If this is the case, proceed with clearing the app state.
        dispatch(resetAppAction());
        return true;
      } else {
        // @ts-ignore
        // tslint:disable-next-line:no-console
        console.error(errorResponse);
        return false;
      }
    });
  logoutPromise
    .then(didLogOut => {
      if (didLogOut) {
        // Clear the persisted state from disk
        return persistor.flush();
      }
      return;
    })
    .then(() => {
      // Return to log-in screen
      NavigationService.navigate("Auth");
    });
};

/** Edit the email, display name, or image of the current user */
export const editUserThunk = (email: string, displayName: string) => (
  dispatch: ThunkDispatch<IApplicationState, void, AuthAction>
) => {
  dispatch(editUserAction.request());
  authApi
    .authUsersMeUpdate({ data: { email, displayName } })
    .then(response => {
      dispatch(editUserAction.success(response));
    })
    .catch(errorResponse => {
      errorResponse.json().then((json: ICreateOrUpdateUserErrors) => {
        dispatch(editUserAction.failure(json));
      });
    });
};
