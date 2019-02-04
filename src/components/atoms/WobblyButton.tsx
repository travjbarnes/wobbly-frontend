import * as React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { colors, fontSizes, standardColors } from "../../style/common";

interface IWobblyButtonProps {
  children: React.ReactNode;
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
    margin: 8,
    padding: 8,
    borderRadius: 3,
    backgroundColor: standardColors.primaryButtonBackground
  },
  disabled: {
    backgroundColor: standardColors.disabledButtonBackground
  },
  buttonText: {
    color: colors.white,
    fontSize: fontSizes.button,
    textAlign: "center"
  }
});
