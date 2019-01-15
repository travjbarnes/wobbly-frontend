import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";

import { AccountScreen, LoginScreen, NotificationScreen, GroupsScreen } from "./components/screens";
import { Redirect, Route, Switch } from "./router";
import { IApplicationState } from "./store";
import { colors } from "./style/common";
import PrivateRoute from "./components/atoms/PrivateRoute";

interface IMainProps extends RouteComponentProps {
  isAuthenticated: boolean;
}

class Main extends React.Component<IMainProps> {
  public render() {
    // Routes are matched in order, so make sure that e.g. /groups/create comes before /groups!
    const { isAuthenticated } = this.props;

    return (
      <View style={style.container}>
        <Switch>
          <PrivateRoute path="/groups" auth={isAuthenticated} component={GroupsScreen} />
          <PrivateRoute path="/notifications" auth={isAuthenticated} component={NotificationScreen} />
          <PrivateRoute path="/account" auth={isAuthenticated} component={AccountScreen} />
          <Route path="/login" component={LoginScreen} />
          {/* Catchall for undeclared routes */}
          <Route render={this.chooseInitialScreen} />
        </Switch>
      </View>
    );
  }

  private chooseInitialScreen = () =>
    this.props.isAuthenticated ? <Redirect to="/groups" /> : <Redirect to="/login" />;
}
const mapStateToProps = (state: IApplicationState) => ({
  isAuthenticated: !!state.currentUser
});

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(Main)
);

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkGray1
  }
});
