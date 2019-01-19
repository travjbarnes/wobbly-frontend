import { Formik, FormikProps } from "formik";
import * as React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import * as yup from "yup";
import { values } from "lodash";

import { IApplicationState } from "../../../store";
import { colors } from "../../../style/common";
import { WobblyButton } from "../../atoms";
import FormField from "../../atoms/FormField";
import FormLabel from "../../atoms/FormLabel";
import Screen from "../Screen";
import { IEditUserFormFields } from "./types";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { logoutThunk, editUserThunk } from "../../../store/auth/thunks";
import FormErrors from "../../atoms/FormErrors";
import { ICreateOrUpdateUserErrors } from "../../../api/types";

interface IAccountScreenProps {
  displayName: string;
  email: string;
  token: string;
  isEditingUser: boolean;
  editUserErrors: ICreateOrUpdateUserErrors;
  editUser: (email: string, displayName: string, password: string) => void;
  logout: (token: string) => void;
}
class AccountScreen extends React.Component<IAccountScreenProps> {
  private editUserForm?: Formik<IEditUserFormFields, { children?: any }> | null;

  public componentDidUpdate() {
    // This is how we pass server-side errors to the Formik component
    const { editUserErrors } = this.props;
    if (this.editUserForm && editUserErrors) {
      this.editUserForm.setErrors(editUserErrors);
      this.editUserForm.setSubmitting(false);
    }
  }

  public render() {
    return (
      <Screen title="Account">
        <Formik
          ref={el => (this.editUserForm = el)}
          initialValues={{ displayName: this.props.displayName, email: this.props.email }}
          onSubmit={this.handleSubmit}
          validateOnChange={false}
          validationSchema={yup.object().shape({
            email: yup
              .string()
              .email("Invalid email")
              .required(),
            displayName: yup
              .string()
              .max(128, "Display name must be fewer than 128 characters")
              .required()
          })}
        >
          {(formikBag: FormikProps<IEditUserFormFields>) => (
            <View style={style.wrapper}>
              <FormErrors errors={values(formikBag.errors)} />
              <FormLabel>Email</FormLabel>
              <FormField
                onChangeText={formikBag.handleChange("email")}
                value={formikBag.values.email}
                backgroundColor={colors.lightGray1}
              />
              <FormLabel>Display name</FormLabel>
              <FormField
                onChangeText={formikBag.handleChange("displayName")}
                value={formikBag.values.displayName}
                backgroundColor={colors.lightGray1}
              />
              <WobblyButton onPress={formikBag.handleSubmit} disabled={this.props.isEditingUser}>
                {this.props.isEditingUser ? <ActivityIndicator /> : "Submit"}
              </WobblyButton>
              <WobblyButton onPress={this.handleLogout} disabled={this.props.isEditingUser}>
                {"Log out"}
              </WobblyButton>
            </View>
          )}
        </Formik>
      </Screen>
    );
  }

  private handleSubmit = (formValues: IEditUserFormFields) => {
    this.props.editUser(this.props.token, formValues.email, formValues.displayName);
    // setSubmitting(false);
  };

  private handleLogout = (): void => {
    this.props.logout(this.props.token);
  };
}

const style = StyleSheet.create({
  wrapper: {
    height: "100%",
    width: "100%"
  }
});

const mapStateToProps = (state: IApplicationState) => ({
  email: state.auth.email,
  displayName: state.auth.displayName,
  token: state.auth.token,
  isEditingUser: state.auth.isEditingUser,
  editUserErrors: state.auth.editUserErrors
});
const mapDispatchToProps = (dispatch: ThunkDispatch<IApplicationState, void, AnyAction>) => ({
  editUser: (token: string, email: string, displayName: string) => dispatch(editUserThunk(token, email, displayName)),
  logout: (token: string) => dispatch(logoutThunk(token) as any)
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountScreen as any);
