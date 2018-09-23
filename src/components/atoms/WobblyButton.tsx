import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { colors, fontSizes } from "../../style/common";

interface IWobblyButtonProps {
  onPress?: () => void;
  text: string;
}
/** The default RN button doesn't offer much customization so we use our own. */
const WobblyButton = ({ onPress, text }: IWobblyButtonProps) => (
  <TouchableOpacity onPress={onPress} style={style.button}>
    <Text style={style.buttonText}>{text}</Text>
  </TouchableOpacity>
);
export default WobblyButton;

const style = StyleSheet.create({
  button: {
    flex: 1,
    margin: 8,
    padding: 8,
    borderRadius: 3,
    backgroundColor: colors.green
  },
  buttonText: {
    color: colors.white,
    fontSize: fontSizes.button,
    textAlign: "center"
  }
});
