import * as React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

import Main from "./Main";
import { Router } from "./router";
import { rootReducer } from "./store";

export default class App extends React.Component<{}> {
  private store = createStore(rootReducer, applyMiddleware(thunk));

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
