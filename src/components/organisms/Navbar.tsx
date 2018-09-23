import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "../../style/common";

interface INavBarProps {
  title: string;
}
const NavBar = ({ title }: INavBarProps) => (
  <View style={style.navBar}>
    <Text style={style.navBarTitle}>{title}</Text>
  </View>
);
export default NavBar;

/*
react-native-web doesn't like components from
react-router styled with a `StyleSheet`, so we use
a plain object instead.
*/
const style = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    paddingTop: 30,
    height: 64,
    backgroundColor: colors.black
  },
  navBarTitle: {
    flex: 1,
    color: colors.white,
    fontWeight: "bold",
    textAlign: "center"
  }
});
