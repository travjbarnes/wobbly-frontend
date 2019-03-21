import { Formik, FormikProps } from "formik";
import { get, values } from "lodash";
import * as React from "react";
import { AsyncStorage, View } from "react-native";
import * as yup from "yup";

import {
  SEND_PASSWORD_RESET_MUTATION,
  SendPasswordResetMutation,
  SendPasswordResetMutationFn,
  SendPasswordResetMutationResult
} from "../../graphql/mutations";
import { OWN_INFO_QUERY, OwnInfoQuery, OwnInfoQueryResult } from "../../graphql/queries";
import { WobblyButton } from "../atoms";
import FormErrors from "../atoms/FormErrors";
import FormField from "../atoms/FormField";
import FormLabel from "../atoms/FormLabel";
import { Intent } from "../atoms/WobblyButton";

export interface ISendResetCodeFields {
  email: string;
}

interface ISendResetCodeProps {
  sendPasswordReset: SendPasswordResetMutationFn;
  result: SendPasswordResetMutationResult;
  ownInfoResult: OwnInfoQueryResult;
}

class SendResetCodeScreen extends React.PureComponent<ISendResetCodeProps> {
  public static navigationOptions = {
    title: "SendResetCode"
  };

  private settingsForm?: Formik<ISendResetCodeFields> | null;

  public render() {
    return (
      <Formik
        initialValues={{ email: "" }}
        ref={el => (this.settingsForm = el)}
        onSubmit={this.handleSubmit}
        validateOnChange={false}
        validationSchema={yup.object().shape({
          email: yup.string().required()
        })}
      >
        {(formikBag: FormikProps<ISendResetCodeFields>) => (
          <View>
            <FormErrors errors={values(formikBag.errors)} />
            <FormLabel>Send Code</FormLabel>
            <FormField
              onChangeText={formikBag.handleChange("email")}
              value={formikBag.values.email}
              autoCapitalize="none"
              textContentType="emailAddress"
            />
            <WobblyButton
              text="Send Code"
              intent={Intent.PRIMARY}
              isLoading={this.props.ownInfoResult.loading}
              onPress={formikBag.handleSubmit}
            />
          </View>
        )}
      </Formik>
    );
  }

  private handleSubmit = (vals: ISendResetCodeFields) => {
    this.props
      .sendPasswordReset({
        variables: {
          email: vals.email
        }
      })
      .then(() => {
        AsyncStorage.setItem("email", vals.email);
      })
      .catch(e => {
        const error = get(e, "graphQLErrors[0].message", "An error occurred");
        this.settingsForm!.setErrors({ email: error });
      });
  };
}

export default () => (
  <OwnInfoQuery query={OWN_INFO_QUERY}>
    {ownInfoResult => (
      <SendPasswordResetMutation mutation={SEND_PASSWORD_RESET_MUTATION}>
        {(sendPasswordReset, result) => (
          <SendResetCodeScreen ownInfoResult={ownInfoResult} sendPasswordReset={sendPasswordReset} result={result} />
        )}
      </SendPasswordResetMutation>
    )}
  </OwnInfoQuery>
);
