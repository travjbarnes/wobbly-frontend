import * as React from "react";
import { NavigationContainerComponent } from "react-navigation";
import { Provider } from "react-redux";
import { Store } from "redux";
import { PersistGate } from "redux-persist/integration/react";

import AppNavigation from "./AppNavigation";
import SplashScreen from "./components/screens/SplashScreen";
import { persistor, reduxStore } from "./reduxStore";
import NavigationService from "./util/NavigationService";

export default class App extends React.Component<{}> {
  private store: Store;

  public constructor(props: {}) {
    super(props);
    this.store = reduxStore;
  }

  public render() {
    return (
      <Provider store={this.store}>
        <PersistGate loading={<SplashScreen />} persistor={persistor}>
          <AppNavigation
            ref={(el: NavigationContainerComponent | null) => {
              NavigationService.setTopLevelNavigator(el);
            }}
          />
        </PersistGate>
      </Provider>
    );
  }
}
