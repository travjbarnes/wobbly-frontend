import { SecureStore } from "expo";

import { NavigationService } from "./services";

/**
 * Sometimes we want a function that takes no arguments and, when called, navigates to a new page.
 * We don't want to put lambda functions in JSX (for perf reasons).
 *
 * @param route the route to navigate to when the function is called
 * @param params an object with any other parameters to be passed to `navigate`
 */
export const createNavigatorFunction = (route: string, params?: any): (() => void) => {
  return () => {
    NavigationService.navigate(route, params);
  };
};

/**
 * Saves the auth token to secure storage and redirects to the groups list
 * @param token the JWT
 */
export const saveTokenAndRedirect = async (token: string) => {
  await SecureStore.setItemAsync("token", token, {
    keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY // iOS only
  });
  NavigationService.navigate("GroupsList");
};
