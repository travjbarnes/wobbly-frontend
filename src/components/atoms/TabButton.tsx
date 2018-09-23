import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Link } from "../../router";
import { colors } from "../../style/common";

interface ITabButtonProps {
  text: string;
  url: string;
}
const TabButton = ({ text, url }: ITabButtonProps) => (
  <View style={style.tabButton}>
    <Link style={style.tabButtonLink} to={url}>
      <Text style={style.tabButtonText}>{text}</Text>
    </Link>
  </View>
);
export default TabButton;

const style = StyleSheet.create({
  tabButton: {
    flex: 1,
    alignItems: "center"
  },
  tabButtonLink: {
    flex: 1,
    width: "100%",
    margin: 5
  },
  tabButtonText: {
    color: colors.white,
    textAlign: "center"
  }
});
