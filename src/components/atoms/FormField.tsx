import * as React from "react";
import { KeyboardTypeOptions, StyleSheet, TextInput, View } from "react-native";

import { colors } from "../../style/common";

export interface IFormFieldProps {
  onChangeText: (e: string | React.ChangeEvent<any>) => void;
  onBlur?: (s: string) => void;
  value?: string;
  secureTextEntry?: boolean;
  placeholder?: string;
  backgroundColor?: string;
  keyboardType?: KeyboardTypeOptions;
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
    const { onChangeText, value, secureTextEntry, placeholder, backgroundColor, keyboardType } = this.props;
    const wrapperStyle = backgroundColor ? [styles.wrapper, { backgroundColor }] : styles.wrapper;
    return (
      <View style={wrapperStyle}>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeText}
          onBlur={this.handleBlur}
          value={value}
          secureTextEntry={secureTextEntry || false}
          placeholder={placeholder}
          keyboardType={keyboardType}
          autoCorrect={false}
        />
      </View>
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
  wrapper: {
    backgroundColor: colors.white,
    borderRadius: 3,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 8,
    marginTop: 4,
    padding: 8
  },
  textInput: {
    color: colors.black
  }
});
