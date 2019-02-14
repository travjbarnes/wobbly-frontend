/**
 * From https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html#docsNav
 */
import { NavigationActions, NavigationContainerComponent, NavigationParams } from "react-navigation";

let navigator: NavigationContainerComponent | null;

function setTopLevelNavigator(navigatorRef: NavigationContainerComponent | null) {
  navigator = navigatorRef;
}

function navigate(routeName: string, params?: NavigationParams) {
  if (!navigator) {
    throw new Error("Could not navigate; navigator was not initialized");
  }
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
}

function goBack() {
  if (!navigator) {
    throw new Error("Could not navigate; navigator was not initialized");
  }
  navigator.dispatch(NavigationActions.back());
}

export default {
  navigate,
  goBack,
  setTopLevelNavigator
};
