import * as React from "react";
import { StyleSheet, Text, TextStyle } from "react-native";

import { fontSizes } from "../../style/common";
import { HeadingType } from "../../types";

interface IHeadingProps {
  level: HeadingType;
  children: string;
  style: TextStyle;
}
const Heading = ({ level, children, style }: IHeadingProps) => {
  const headingStyle = headingStyles[level];
  return <Text style={[style, headingStyle]}>{children}</Text>;
};
export default Heading;

const headingStyles = StyleSheet.create({
  h1: {
    fontSize: fontSizes.h1
  },
  h2: {
    fontSize: fontSizes.h2
  }
}) as any;
