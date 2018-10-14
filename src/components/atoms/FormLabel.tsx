import * as React from "react";
import { StyleSheet, Text } from "react-native";

import { colors } from "../../style/common";

interface IFormLabelProps {
  children: string;
}

const FormLabel = ({ children }: IFormLabelProps) => <Text style={style.label}>{children}</Text>;
export default FormLabel;

const style = StyleSheet.create({
  label: {
    color: colors.gray
  }
});
