import * as React from "react";
import { StyleSheet, Text, TextProps } from "react-native";

import { colors } from "../../style/common";

interface IWobblyText extends TextProps {
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  listHeading?: boolean;
}
const WobblyText: React.FC<IWobblyText> = ({ h1, h2, h3, h4, listHeading, children, style, ...rest }) => {
  const isHeading = h1 || h2 || h3 || h4;
  return (
    <Text
      style={StyleSheet.flatten([
        styles.text,
        isHeading && styles.heading,
        h1 && styles.h1,
        h2 && styles.h2,
        h3 && styles.h3,
        h4 && styles.h4,
        listHeading && styles.listHeading,
        style && style
      ])}
      {...rest}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    // fontFamily: "montserrat-regular"
  },
  heading: {
    fontFamily: "open-sans-semi-bold"
  },
  h1: {
    fontSize: 40
  },
  h2: {
    fontSize: 34
  },
  h3: {
    fontSize: 28
  },
  h4: {
    fontSize: 22
  },
  listHeading: {
    fontSize: 14,
    color: colors.gray2,
    marginHorizontal: 10
  }
});
export default WobblyText;
