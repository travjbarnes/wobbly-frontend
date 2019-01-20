/** Entrypoint for react-native on iOS and Android. */
import { Buffer } from "buffer";
import * as React from "react";
import { Provider } from "react-redux";
import { Store } from "redux";
import { PersistGate } from "redux-persist/integration/react";
import { URL, URLSearchParams } from "whatwg-url";

import AppNavigation from "./AppNavigation";
import SplashScreen from "./components/screens/SplashScreen";
import { persistor, reduxStore } from "./reduxStore";
import NavigationService from "./util/NavigationService";

// see https://github.com/facebook/react-native/issues/14796
global.Buffer = Buffer;

// see https://github.com/facebook/react-native/issues/16434
// @ts-ignore
global.URL = URL;
// @ts-ignore
global.URLSearchParams = URLSearchParams;

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
            ref={el => {
              NavigationService.setTopLevelNavigator(el);
            }}
          />
        </PersistGate>
      </Provider>
    );
  }
}
