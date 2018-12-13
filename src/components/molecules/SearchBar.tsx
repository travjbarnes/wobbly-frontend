import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { colors } from "../../style/common";

export interface ISearchBarProps {
  placeholder?: string;
}
export default ({ placeholder }: ISearchBarProps) => (
  <View style={styles.searchBar}>
    <Ionicons style={styles.searchIcon} name="ios-search" size={20} />
    <TextInput style={styles.searchInput} placeholder={placeholder || "Search..."} />
  </View>
);

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.veryLightGray,
    borderRadius: 20
  },
  searchIcon: {
    padding: 10,
    paddingLeft: 20
  },
  searchInput: {
    flex: 1,
    padding: 10
  }
});
