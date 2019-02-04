import * as React from "react";
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from "react-native";

/**
 * Wrap a view in this component and any tap on blank space will dismiss the keyboard.
 * Only supports one child -- if you need more, wrap then in a `View`.
 * TODO: make this work with `KeyboardAvoidingView`.
 */
const KeyboardDismissingTouchable: React.SFC<{}> = ({ children }) => (
  <TouchableWithoutFeedback style={style.view} onPress={Keyboard.dismiss}>
    {children}
  </TouchableWithoutFeedback>
);

const style = StyleSheet.create({
  view: {
    flex: 1
  }
});

export default KeyboardDismissingTouchable;
