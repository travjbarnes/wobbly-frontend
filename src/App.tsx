import * as React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore, Store } from "redux";
import thunk from "redux-thunk";

import Main from "./Main";
import { Router } from "./router";
import { rootReducer } from "./store";

export default class App extends React.Component<{}> {
  private store: Store;

  public constructor(props: {}) {
    super(props);
    // enable Redux Devtools extension
    const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    this.store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
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
