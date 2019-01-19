import { Formik, FormikProps } from "formik";
import * as React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import * as yup from "yup";
import { values } from "lodash";

import { IApplicationState } from "../../../store";
import { loginThunk, createUserThunk } from "../../../store/auth/thunks";
import { colors } from "../../../style/common";
import { HeadingType } from "../../../types";
import FormField from "../../atoms/FormField";
import Heading from "../../atoms/Heading";
import WobblyButton from "../../atoms/WobblyButton";
import VerticalButtonGroup from "../../molecules/VerticalButtonGroup";
import { ILoginFormFields, ILoginScreenProps, ILoginScreenState, ISignupFormFields, LoginScreenView } from "./types";
import FormErrors from "../../atoms/FormErrors";

/**
 * This screen handles both logins and signups.
 * It's all handled in one component so that we can share e.g. the email field between the login and signup forms.
 */
class LoginScreen extends React.Component<ILoginScreenProps, ILoginScreenState> {
  private loginForm?: Formik<ILoginFormFields, { children?: any }> | null;
  private signupForm?: Formik<ISignupFormFields, { children?: any }> | null;

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

  public componentDidUpdate() {
    // This is how we pass server-side errors to the Formik component
    const { signupErrors, loginError } = this.props;
    if (this.loginForm && loginError) {
      this.loginForm.setErrors({ email: loginError });
      this.loginForm.setSubmitting(false);
    }
    if (this.signupForm && signupErrors) {
      this.signupForm.setErrors(signupErrors);
      this.signupForm.setSubmitting(false);
    }
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
        <Formik
          ref={el => (this.loginForm = el)}
          initialValues={{ email: this.state.email || "", password: "" }}
          onSubmit={this.handleLogin}
          validateOnChange={false}
        >
          {(formikBag: FormikProps<ILoginFormFields>) => (
            <View>
              <FormErrors errors={values(formikBag.errors)} />
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
          ref={el => (this.signupForm = el)}
          initialValues={{ email: this.state.email || "", displayName: "", password: "", passwordConfirmation: "" }}
          onSubmit={this.handleSignup}
          validateOnChange={false}
          // TODO: the validation here should match server-side validation
          validationSchema={yup.object().shape({
            email: yup
              .string()
              .email("Invalid email")
              .required("Email is required"),
            displayName: yup
              .string()
              .max(128, "Display name must be fewer than 128 characters")
              .required("A display name is required"),
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
              <FormErrors errors={values(formikBag.errors)} />
              <FormField
                onChangeText={formikBag.handleChange("email")}
                onBlur={this.persistEmailToState}
                value={formikBag.values.email}
                placeholder="Email"
              />
              <FormField
                onChangeText={formikBag.handleChange("displayName")}
                value={formikBag.values.displayName}
                placeholder="Display name"
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

  private handleLogin = (formValues: ILoginFormFields) => {
    this.props.login(formValues.email!, formValues.password!);
  };

  private handleSignup = (formValues: ISignupFormFields) => {
    this.props.signUp(formValues.email!, formValues.displayName!, formValues.password!);
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

const mapStateToProps = (state: IApplicationState) => ({
  loginError: state.auth.loginError,
  signupErrors: state.auth.signupErrors
});
const mapDispatchToProps = (dispatch: ThunkDispatch<IApplicationState, void, AnyAction>) => ({
  login: (email: string, password: string) => dispatch(loginThunk(email, password)),
  signUp: (email: string, displayName: string, password: string) =>
    dispatch(createUserThunk(email, displayName, password))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);

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
