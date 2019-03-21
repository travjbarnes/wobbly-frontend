import { Formik, FormikProps } from "formik";
import { get, values } from "lodash";
import * as React from "react";
import { AsyncStorage, View } from "react-native";
import * as yup from "yup";

import {
  RESET_PASSWORD_MUTATION,
  ResetPasswordMutation,
  ResetPasswordMutationFn,
  ResetPasswordMutationResult
} from "../../graphql/mutations";
import { OWN_INFO_QUERY, OwnInfoQuery, OwnInfoQueryResult } from "../../graphql/queries";
import { saveTokenAndRedirect } from "../../util";
import { WobblyButton } from "../atoms";
import FormErrors from "../atoms/FormErrors";
import FormField from "../atoms/FormField";
import FormLabel from "../atoms/FormLabel";
import { Intent } from "../atoms/WobblyButton";

export interface IResetPasswordFields {
  passwordResetCode: string;
  newPassword: string;
}

interface IResetPasswordProps {
  resetPassword: ResetPasswordMutationFn;
  result: ResetPasswordMutationResult;
  ownInfoResult: OwnInfoQueryResult;
}

class ResetPasswordScreen extends React.PureComponent<IResetPasswordProps> {
  public static navigationOptions = {
    title: "ResetPassword"
  };

  private settingsForm?: Formik<IResetPasswordFields> | null;

  constructor(props: IResetPasswordProps) {
    super(props);
  }

  public componentDidUpdate() {
    const { data } = this.props.result;
    if (data && data.resetPassword.token) {
      saveTokenAndRedirect(data.resetPassword.token);
    }
  }

  public render() {
    return (
      <Formik
        initialValues={{ passwordResetCode: "", newPassword: "" }}
        ref={el => (this.settingsForm = el)}
        onSubmit={this.handleSubmit}
        validateOnChange={false}
        validationSchema={yup.object().shape({
          passwordResetCode: yup.string().required()
        })}
      >
        {(formikBag: FormikProps<IResetPasswordFields>) => (
          <View>
            <FormErrors errors={values(formikBag.errors)} />
            <FormLabel>That Code</FormLabel>
            <FormField
              onChangeText={formikBag.handleChange("passwordResetCode")}
              value={formikBag.values.passwordResetCode}
              keyboardType="number-pad"
            />
            <FormLabel>New Password</FormLabel>
            <FormField
              onChangeText={formikBag.handleChange("newPassword")}
              value={formikBag.values.newPassword}
              autoCapitalize="none"
              textContentType="password"
              secureTextEntry={true}
            />
            <WobblyButton
              text="Reset Time"
              intent={Intent.PRIMARY}
              isLoading={this.props.ownInfoResult.loading}
              onPress={formikBag.handleSubmit}
            />
          </View>
        )}
      </Formik>
    );
  }

  private handleSubmit = async (vals: IResetPasswordFields) => {
    const email = await AsyncStorage.getItem("email");
    if (!email) {
      return;
    }
    this.props
      .resetPassword({
        variables: {
          email,
          newPassword: vals.newPassword,
          passwordResetCode: vals.passwordResetCode
        }
      })
      .catch(e => {
        const error = get(e, "graphQLErrors[0].message", "An error occurred");
        this.settingsForm!.setErrors({ passwordResetCode: error });
      });
  };
}

export default () => (
  <OwnInfoQuery query={OWN_INFO_QUERY}>
    {ownInfoResult => (
      <ResetPasswordMutation mutation={RESET_PASSWORD_MUTATION}>
        {(resetPassword, result) => (
          <ResetPasswordScreen ownInfoResult={ownInfoResult} resetPassword={resetPassword} result={result} />
        )}
      </ResetPasswordMutation>
    )}
  </OwnInfoQuery>
);
