import * as React from "react";
import { Provider } from "react-redux";
import { Store } from "redux";

import Main from "./Main";
import { Router } from "./router";
import { reduxStore, persistor } from "./reduxStore";
import { PersistGate } from "redux-persist/integration/react";
import Splash from "./components/screens/Splash";

// see https://github.com/facebook/react-native/issues/14796
import { Buffer } from "buffer";
global.Buffer = Buffer;
// see https://github.com/facebook/react-native/issues/16434
import { URL, URLSearchParams } from "whatwg-url";
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
        <PersistGate loading={<Splash />} persistor={persistor}>
          <Router>
            <Main />
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}
