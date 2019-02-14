import { Formik, FormikProps } from "formik";
import { values } from "lodash";
import * as React from "react";
import { View } from "react-native";
import * as yup from "yup";

import { colors } from "../../style/common";
import { WobblyButton } from "../atoms";
import FormErrors from "../atoms/FormErrors";
import FormField from "../atoms/FormField";
import FormLabel from "../atoms/FormLabel";

export interface IEditSettingsFormFields {
  testSetting: string;
}

class SettingsScreen extends React.Component {
  public static navigationOptions = {
    title: "Settings"
  };

  public render() {
    return (
      <Formik
        initialValues={{ testSetting: "" }}
        onSubmit={this.handleSubmit}
        validateOnChange={false}
        validationSchema={yup.object().shape({
          testSetting: yup.string().required()
        })}
      >
        {(formikBag: FormikProps<IEditSettingsFormFields>) => (
          <View>
            <FormErrors errors={values(formikBag.errors)} />
            <FormLabel>testSetting</FormLabel>
            <FormField
              onChangeText={formikBag.handleChange("testSetting")}
              value={formikBag.values.testSetting}
              backgroundColor={colors.lightGray1}
            />
            <WobblyButton onPress={formikBag.handleSubmit}>{"Submit"}</WobblyButton>
          </View>
        )}
      </Formik>
    );
  }

  private handleSubmit = () => {
    // this.props.editSettings(this.props.token, formValues.testSetting);
    // setSubmitting(false);
  };
}

export default SettingsScreen;
