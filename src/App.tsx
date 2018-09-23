import * as React from "react";

import Main from "./Main";
import { Router } from "./router";

export default class App extends React.Component<{}> {
  public render() {
    return (
      <Router>
        <Main />
      </Router>
    );
  }
}
