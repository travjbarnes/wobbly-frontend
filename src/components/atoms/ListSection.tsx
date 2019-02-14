import * as React from "react";
import { StyleSheet, View } from "react-native";

interface IListSectionProps {
  children: React.ReactNode | React.ReactNode[];
}
const ListSection: React.FC<IListSectionProps> = ({ children }) => <View style={style.listSection}>{children}</View>;

const style = StyleSheet.create({
  listSection: {
    marginBottom: 20
  }
});

export default ListSection;
