import { Formik, FormikProps } from "formik";
import { History } from "history";
import * as React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import * as yup from "yup";

import { IApplicationState } from "../../../store";
import { login } from "../../../store/currentUser/thunks";
import { colors } from "../../../style/common";
import { HeadingType } from "../../../types";
import FormField from "../../atoms/FormField";
import Heading from "../../atoms/Heading";
import WobblyButton from "../../atoms/WobblyButton";
import VerticalButtonGroup from "../../molecules/VerticalButtonGroup";
import { ILoginFormFields, ILoginScreenProps, ILoginScreenState, ISignupFormFields, LoginScreenView } from "./types";

/**
 * This screen handles both logins and signups.
 * It's all handled in one component so that we can share e.g. the email field between the login and signup forms.
 */
class LoginScreen extends React.Component<ILoginScreenProps, ILoginScreenState> {
  constructor(props: ILoginScreenProps) {
    super(props);
    this.state = { view: LoginScreenView.WELCOME };
  }

  public render() {
    let content: JSX.Element;
    switch (this.state.view) {
      case LoginScreenView.LOGIN:
        content = this.renderLogin();
        break;
      case LoginScreenView.SIGNUP:
        content = this.renderSignup();
        break;
      default:
        content = this.renderWelcome();
    }
    return <View style={styles.welcome}>{content}</View>;
  }

  private renderWelcome = () => (
    <View>
      <Heading level={HeadingType.H1} style={styles.welcomeHeading}>
        Wobbly
      </Heading>
      <VerticalButtonGroup>
        <WobblyButton onPress={this.goToLogin}>Log in</WobblyButton>
        <WobblyButton onPress={this.goToSignup}>Sign up</WobblyButton>
        <WobblyButton>About</WobblyButton>
      </VerticalButtonGroup>
    </View>
  );

  private renderLogin = () => {
    return (
      <View>
        <Heading level={HeadingType.H2} style={styles.welcomeHeading}>
          Login
        </Heading>
        {/*
        If you don't specify initial values, you'll get a console error about a React component changing from
        uncontrolled to controlled
        */}
        <Formik initialValues={{ email: this.state.email || "", password: "" }} onSubmit={this.handleLogin}>
          {(formikBag: FormikProps<ILoginFormFields>) => (
            <View>
              <FormField
                onChangeText={formikBag.handleChange("email")}
                value={formikBag.values.email}
                onBlur={this.persistEmailToState}
                placeholder="Email"
              />
              <FormField
                onChangeText={formikBag.handleChange("password")}
                value={formikBag.values.password}
                secureTextEntry={true}
                placeholder="Password"
              />
              <WobblyButton
                onPress={formikBag.handleSubmit}
                disabled={formikBag.isSubmitting || formikBag.isValidating}
              >
                {formikBag.isValidating || formikBag.isSubmitting ? <ActivityIndicator /> : "Log in"}
              </WobblyButton>
              <WobblyButton onPress={this.goToWelcome} disabled={formikBag.isSubmitting || formikBag.isValidating}>
                Cancel
              </WobblyButton>
            </View>
          )}
        </Formik>
      </View>
    );
  };

  private renderSignup = () => {
    return (
      <View>
        <Heading level={HeadingType.H2} style={styles.welcomeHeading}>
          Sign up
        </Heading>
        <Formik
          initialValues={{ email: this.state.email || "", password: "", passwordConfirmation: "" }}
          onSubmit={this.handleLogin}
          // TODO: the validation here should match server-side validation
          validationSchema={yup.object().shape({
            email: yup
              .string()
              .email("Invalid email")
              .required("Email is required"),
            password: yup
              .string()
              .min(8, "Password must be at least 8 characters")
              .required("Password is required"),
            passwordConfirmation: yup
              .string()
              .oneOf([yup.ref("password")], "Passwords do not match")
              .required("Password confirmation is required")
          })}
        >
          {(formikBag: FormikProps<ISignupFormFields>) => (
            <View>
              <View style={styles.formError}>
                {Object.keys(formikBag.touched)
                  .map(k => (formikBag as any).errors[k])
                  .map((error: string) => (
                    <Text key={error} style={styles.formErrorText}>
                      {error}
                    </Text>
                  ))}
              </View>
              <FormField
                onChangeText={formikBag.handleChange("email")}
                onBlur={this.persistEmailToState}
                value={formikBag.values.email}
                placeholder="Email"
              />
              <FormField
                onChangeText={formikBag.handleChange("password")}
                value={formikBag.values.password}
                secureTextEntry={true}
                placeholder="Password"
              />
              <FormField
                onChangeText={formikBag.handleChange("passwordConfirmation")}
                value={formikBag.values.passwordConfirmation}
                secureTextEntry={true}
                placeholder="Confirm password"
              />
              <WobblyButton
                onPress={formikBag.handleSubmit}
                disabled={formikBag.isSubmitting || formikBag.isValidating}
              >
                {formikBag.isValidating || formikBag.isSubmitting ? <ActivityIndicator /> : "Sign up"}
              </WobblyButton>

              <WobblyButton onPress={this.goToWelcome} disabled={formikBag.isSubmitting || formikBag.isValidating}>
                Cancel
              </WobblyButton>
            </View>
          )}
        </Formik>
      </View>
    );
  };

  /* Util functions */

  private handleLogin = (values: ILoginFormFields) => {
    this.props.login(values.email!, values.password!, this.props.history);
  };

  private persistEmailToState = (fieldValue: string) => {
    this.setState({ email: fieldValue });
  };

  /* Navigation util functions */

  private goToLogin = () => {
    this.setState({ view: LoginScreenView.LOGIN });
  };

  private goToSignup = () => {
    this.setState({ view: LoginScreenView.SIGNUP });
  };

  private goToWelcome = () => {
    this.setState({ view: LoginScreenView.WELCOME });
  };
}

const mapDispatchToProps = (dispatch: ThunkDispatch<IApplicationState, void, AnyAction>) => ({
  login: (email: string, password: string, history: History) => dispatch(login(email, password, history))
});
export default withRouter(
  connect(
    null, // No `mapStateToProps`
    mapDispatchToProps
  )(LoginScreen)
);

const styles = StyleSheet.create({
  welcome: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.gray,
    justifyContent: "space-around"
  },
  welcomeHeading: {
    textAlign: "center",
    color: colors.white,
    marginBottom: 10
  },
  formError: { flex: 1, paddingBottom: 10 },
  formErrorText: {
    flex: 1,
    color: "red"
  }
});
