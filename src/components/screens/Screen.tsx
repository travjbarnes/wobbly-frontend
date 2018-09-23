import React from "react";
import { StyleSheet, View } from "react-native";

import { colors } from "../../style/common";
import { NavBar } from "../organisms";
import TabBar from "../organisms/TabBar";

interface IScreenProps {
  title: string;
  children: JSX.Element | JSX.Element[];
}
/** All screens implement this component. */
const Screen = ({ title, children }: IScreenProps) => (
  <View style={style.contentWrapper}>
    <NavBar title={title} />
    <View style={style.content}>{children}</View>
    <TabBar />
  </View>
);
export default Screen;

const style = StyleSheet.create({
  contentWrapper: {
    flex: 1
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white
  }
});
