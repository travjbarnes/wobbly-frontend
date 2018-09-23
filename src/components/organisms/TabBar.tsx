import React from "react";
import { StyleSheet, View } from "react-native";

import TabButton from "../atoms/TabButton";

const TabBar = () => (
  <View style={style.tabBar}>
    <TabButton text="Groups" url="/groups" />
    <TabButton text="Notifications" url="/notifications" />
    <TabButton text="Account" url="/account" />
  </View>
);
export default TabBar;

const style = StyleSheet.create({
  tabBar: {
    height: 50,
    flexDirection: "row"
  }
});
