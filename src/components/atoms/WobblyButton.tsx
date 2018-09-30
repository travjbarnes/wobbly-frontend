import React, { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { colors, fontSizes } from "../../style/common";

interface IWobblyButtonProps {
  children: ReactNode;
  onPress?: () => void;
  disabled?: boolean;
}
/** The default RN button doesn't offer much customization so we use our own. */
const WobblyButton = ({ onPress, disabled, children }: IWobblyButtonProps) => {
  if (typeof children === "string") {
    children = <Text style={style.buttonText}>{children}</Text>;
  }
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[style.button, disabled ? style.disabled : null]}
      disabled={disabled || false}
    >
      {children}
    </TouchableOpacity>
  );
};
export default WobblyButton;

const style = StyleSheet.create({
  button: {
    flex: 1,
    margin: 8,
    padding: 8,
    borderRadius: 3,
    backgroundColor: colors.green
  },
  disabled: {
    backgroundColor: colors.lightGray
  },
  buttonText: {
    color: colors.white,
    fontSize: fontSizes.button,
    textAlign: "center"
  }
});
