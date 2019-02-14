import { Formik, FormikProps } from "formik";
import { get, values } from "lodash";
import * as React from "react";
import { ActivityIndicator, KeyboardAvoidingView, StyleSheet, View } from "react-native";

import { LOGIN_MUTATION, LoginMutation, LoginMutationFn, LoginMutationResult } from "../../graphql/mutations";
import { colors } from "../../style/common";
import { createNavigatorFunction, saveTokenAndRedirect } from "../../util";
import { FormErrors, FormField, WobblyButton } from "../atoms";
import WobblyText from "../atoms/WobblyText";

export interface ILoginFormFields {
  email: string;
  password: string;
}

interface ILoginScreenProps {
  login: LoginMutationFn;
  result: LoginMutationResult;
}

class LoginScreen extends React.PureComponent<ILoginScreenProps> {
  public static navigationOptions = {
    header: null
  };
  private loginForm?: Formik<ILoginFormFields> | null;

  public componentDidUpdate() {
    const { data } = this.props.result;
    if (data && data.login.token) {
      saveTokenAndRedirect(data.login.token);
    }
  }

  public render() {
    const goToWelcome = createNavigatorFunction("Welcome");
    const isLoggingIn = this.props.result && this.props.result.loading;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.welcome}>
        <WobblyText h2={true} style={styles.welcomeHeading}>
          Login
        </WobblyText>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={this.handleLogin}
          validateOnChange={false}
          ref={el => (this.loginForm = el)}
        >
          {(formikBag: FormikProps<ILoginFormFields>) => (
            <View>
              <FormErrors errors={values(formikBag.errors)} />
              <FormField
                onChangeText={formikBag.handleChange("email")}
                value={formikBag.values.email}
                placeholder="Email"
                keyboardType="email-address"
              />
              <FormField
                onChangeText={formikBag.handleChange("password")}
                value={formikBag.values.password}
                secureTextEntry={true}
                placeholder="Password"
              />
              <WobblyButton onPress={formikBag.handleSubmit} disabled={isLoggingIn}>
                {isLoggingIn ? <ActivityIndicator /> : "Log in"}
              </WobblyButton>
              <WobblyButton onPress={goToWelcome} disabled={isLoggingIn}>
                Cancel
              </WobblyButton>
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    );
  }

  private handleLogin = (vals: ILoginFormFields) => {
    this.props
      .login({
        variables: {
          email: vals.email,
          password: vals.password
        }
      })
      .catch(e => {
        const error = get(e, "graphQLErrors[0].message", "An error occurred");
        this.loginForm!.setErrors({ email: error });
      });
  };
}

export default () => (
  <LoginMutation mutation={LOGIN_MUTATION}>
    {(login, result) => <LoginScreen login={login} result={result} />}
  </LoginMutation>
);

const styles = StyleSheet.create({
  welcome: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.darkGray1,
    justifyContent: "space-around"
  },
  welcomeHeading: {
    textAlign: "center",
    color: colors.white,
    marginBottom: 10
  }
});
