import * as React from "react";
import { Provider } from "react-redux";
import { Store } from "redux";

import Main from "./Main";
import { Router } from "./router";
import reduxStore from "./reduxStore";

export default class App extends React.Component<{}> {
  private store: Store;

  public constructor(props: {}) {
    super(props);
    this.store = reduxStore;
  }

  public render() {
    return (
      <Provider store={this.store}>
        <Router>
          <Main />
        </Router>
      </Provider>
    );
  }
}
