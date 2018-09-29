import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";

import { AccountScreen, GroupsScreen, LoginScreen, NotificationScreen } from "./components/screens";
import { Redirect, Route, Switch } from "./router";
import { IApplicationState } from "./store";
import { ICurrentUser } from "./store/currentUser/types";
import { colors } from "./style/common";

interface IMainProps extends RouteComponentProps {
  currentUser: ICurrentUser | null;
}

const mapStateToProps = (state: IApplicationState) => ({
  currentUser: state.currentUser
});

class Main extends React.Component<IMainProps> {
  public render() {
    return (
      <View style={style.container}>
        <Switch>
          <Route exact={true} path="/" render={this.chooseInitialScreen} />
          <Route path="/groups" component={GroupsScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/notifications" component={NotificationScreen} />
          <Route path="/account" component={AccountScreen} />
        </Switch>
      </View>
    );
  }

  private chooseInitialScreen = () => (this.props.currentUser ? <Redirect to="/groups" /> : <Redirect to="/login" />);
}

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(Main)
);

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray
  }
});
