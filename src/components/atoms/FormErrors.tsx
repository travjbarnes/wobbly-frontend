import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { colors } from "../../style/common";

interface IFormErrorsProps {
  errors?: string[] | string;
}
const FormErrors: React.SFC<IFormErrorsProps> = ({ errors }) => {
  if (typeof errors === "string") {
    errors = [errors];
  }
  return (
    <View style={style.formError}>
      {errors &&
        errors.map((error: string, idx: number) => (
          <Text key={`${idx}-${error}`} style={style.formErrorText}>
            {error}
          </Text>
        ))}
    </View>
  );
};

const style = StyleSheet.create({
  formError: { flex: 1, paddingBottom: 10 },
  formErrorText: {
    flex: 1,
    color: colors.red1
  }
});

export default FormErrors;
