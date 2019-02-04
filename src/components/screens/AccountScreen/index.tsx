import { Formik, FormikProps } from "formik";
import { values } from "lodash";
import * as React from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationInjectedProps } from "react-navigation";
import { connect } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import * as yup from "yup";

import { IApplicationState } from "../../../store";
import { editUserThunk, logoutThunk } from "../../../store/auth/thunks";
import { ICreateOrUpdateUserErrors } from "../../../store/auth/types";
import { colors } from "../../../style/common";
import { WobblyButton } from "../../atoms";
import FormErrors from "../../atoms/FormErrors";
import FormField from "../../atoms/FormField";
import FormLabel from "../../atoms/FormLabel";

import { IEditUserFormFields } from "./types";

interface IAccountScreenProps extends Partial<NavigationInjectedProps> {
  displayName: string;
  email: string;
  isEditingUser: boolean;
  editUserErrors: ICreateOrUpdateUserErrors;
  editUser: typeof editUserThunk;
  logout: typeof logoutThunk;
}
class AccountScreen extends React.Component<IAccountScreenProps> {
  public static navigationOptions = {
    title: "Account"
  };

  private editUserForm?: Formik<IEditUserFormFields> | null;

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
          <View>
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
            <WobblyButton onPress={this.props.logout} disabled={this.props.isEditingUser}>
              {"Log out"}
            </WobblyButton>
          </View>
        )}
      </Formik>
    );
  }

  private handleSubmit = (formValues: IEditUserFormFields) => {
    this.props.editUser(formValues.email, formValues.displayName);
    // setSubmitting(false);
  };
}

const mapStateToProps = (state: IApplicationState) => ({
  email: state.auth.email,
  displayName: state.auth.displayName,
  isEditingUser: state.auth.isEditingUser,
  editUserErrors: state.auth.editUserErrors
});
const mapDispatchToProps = (dispatch: ThunkDispatch<IApplicationState, void, AnyAction>) => ({
  editUser: (email: string, displayName: string) => dispatch(editUserThunk(email, displayName)),
  logout: () => dispatch(logoutThunk() as any)
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountScreen as any);
