import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { colors } from "../../style/common";

interface IFormErrorsProps {
  errors: Array<string | undefined>;
}
const FormErrors: React.SFC<IFormErrorsProps> = ({ errors }) => {
  const filteredErrors = errors.filter(error => !!error) as string[];
  return (
    <View style={style.formError}>
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
  formError: { flex: 1, paddingBottom: 10 },
  formErrorText: {
    flex: 1,
    color: colors.red1
  }
});

export default FormErrors;
