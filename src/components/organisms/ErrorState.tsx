import { MaterialIcons } from "@expo/vector-icons";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "../../style/common";

interface IErrorStateProps {
  title: string;
}
const ErrorState: React.SFC<IErrorStateProps> = ({ title }) => (
  <View style={style.container}>
    <MaterialIcons name="error-outline" size={50} color={colors.darkGray5} />
    <Text style={style.errorText}>{title}</Text>
  </View>
);
export default ErrorState;

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  errorText: {
    marginTop: 5,
    color: colors.darkGray5
  }
});
