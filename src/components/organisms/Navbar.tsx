import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { RouteComponentProps, withRouter } from "react-router";

import { colors } from "../../style/common";

interface INavBarProps extends RouteComponentProps {
  title: string;
  backButtonText?: string;
}
const NavBar: React.SFC<INavBarProps> = ({ title, backButtonText, history }) => {
  const goBack = () => history.goBack();
  const leftButton = backButtonText ? (
    <TouchableOpacity style={style.navBarButton} onPress={goBack}>
      <Text style={style.navBarButtonText}>{backButtonText}</Text>
    </TouchableOpacity>
  ) : (
    <View style={style.navBarButton} />
  );
  return (
    <View style={style.navBar}>
      {leftButton}
      <Text style={style.navBarTitle}>{title}</Text>
      <View style={style.navBarButton} />
    </View>
  );
};
export default withRouter(NavBar);

const style = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 10,
    height: 64,
    backgroundColor: colors.black
  },
  navBarTitle: {
    flex: 1,
    color: colors.white,
    fontWeight: "bold",
    textAlign: "center"
  },
  navBarButton: {
    flex: 1
  },
  navBarButtonText: {
    color: colors.white,
    textAlign: "left"
  }
});
