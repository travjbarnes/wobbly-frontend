import React from "react";
import { StyleSheet, TextInput } from "react-native";

import { colors } from "../../style/common";

export interface IFormFieldProps {
  onChangeText: (e: string | React.ChangeEvent<any>) => void;
  onBlur?: ((s: string) => void);
  value?: string;
  secureTextEntry?: boolean;
  placeholder?: string;
  backgroundColor?: string;
}
/**
 * A wrapper for `<TextInput>` with custom styling.
 * Note that `onBlur` is a different type of function than the one for standard react native text inputs: instead of
 * `(e: NativeSyntheticEvent<TextInputFocusEventData>) => void`,
 * it's
 * `(s: string) -> void`
 * where `s` is the value of the input. In addition, `onBlur` is called not only when the user deselects the field,
 * but when the component is unmounted, too.
 */
class FormField extends React.PureComponent<IFormFieldProps> {
  public render() {
    const { onChangeText, value, secureTextEntry, placeholder, backgroundColor } = this.props;
    return (
      <TextInput
        style={[styles.textInput, { backgroundColor }]}
        onChangeText={onChangeText}
        onBlur={this.handleBlur}
        value={value}
        secureTextEntry={secureTextEntry || false}
        placeholder={placeholder}
      />
    );
  }

  public componentWillUnmount() {
    const { onBlur, value } = this.props;
    if (!onBlur) {
      return;
    }
    onBlur(value || "");
  }

  private handleBlur = (e: any) => {
    const { onBlur } = this.props;
    if (!onBlur) {
      return;
    }
    const fieldValue = e.currentTarget.value;
    onBlur(fieldValue);
  };
}

export default FormField;

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    margin: 8,
    padding: 8,
    borderRadius: 3,
    backgroundColor: colors.white,
    color: colors.black
  }
});
