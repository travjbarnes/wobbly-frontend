import React from "react";
import { StyleSheet, View } from "react-native";

import { AccountScreen, GroupScreen, NotificationScreen } from "./components/screens";
import { Redirect, Route } from "./router";
import { colors } from "./style/common";

class Main extends React.Component {
  public render() {
    return (
      <View style={style.container}>
        <Route exact={true} path="/" render={this.chooseInitialScreen} />
        <Route path="/groups" component={GroupScreen} />
        <Route path="/notifications" component={NotificationScreen} />
        <Route path="/account" component={AccountScreen} />
      </View>
    );
  }

  // TODO: if no user, show splash
  // return <Splash />;
  private chooseInitialScreen = () => <Redirect to="/groups" />;
}

export default Main;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray
  }
});
