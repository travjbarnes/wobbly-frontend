import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "../../style/common";

interface IFormErrorsProps {
  errors: Array<string | undefined>;
}
const FormErrors: React.SFC<IFormErrorsProps> = ({ errors }) => {
  const filteredErrors = errors.filter(error => !!error) as string[];
  return (
    <View style={style.formErrors}>
      {filteredErrors &&
        filteredErrors.map((error: string, idx: number) => (
          <Text key={`${idx}-${error}`} style={style.formErrorText}>
            {error}
          </Text>
        ))}
    </View>
  );
};

const style = StyleSheet.create({
  formErrors: {
    padding: 10
  },
  formErrorText: {
    color: colors.red5
  }
});

export default FormErrors;
