import { Formik, FormikProps } from "formik";
import * as React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import * as yup from "yup";

import { IApplicationState } from "../../../store";
import { editUser } from "../../../store/currentUser/thunks";
import { colors } from "../../../style/common";
import { WobblyButton } from "../../atoms";
import FormField from "../../atoms/FormField";
import FormLabel from "../../atoms/FormLabel";
import Screen from "../Screen";
import { IEditUserFormFields, IHandleSubmitProps } from "./types";

interface IAccountScreenProps {
  displayName: string;
  email: string;
  isUpdating: boolean;
  editUser: (email: string, displayName: string, password: string) => void;
}
class AccountScreen extends React.Component<IAccountScreenProps> {
  public render() {
    return (
      <Screen title="Account">
        <Formik
          initialValues={{ displayName: this.props.displayName, email: this.props.email, password: "" }}
          onSubmit={this.handleSubmit}
          validationSchema={yup.object().shape({
            email: yup.string().email("Invalid email"),
            displayName: yup.string(),
            password: yup.string().min(8, "Password must be at least 8 characters")
          })}
        >
          {(formikBag: FormikProps<IEditUserFormFields>) => (
            <View style={style.wrapper}>
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
              <FormLabel>Password</FormLabel>
              <FormField
                onChangeText={formikBag.handleChange("password")}
                value={formikBag.values.password}
                backgroundColor={colors.lightGray1}
              />
              <WobblyButton onPress={formikBag.handleSubmit} disabled={this.props.isUpdating}>
                {this.props.isUpdating ? <ActivityIndicator /> : "Submit"}
              </WobblyButton>
            </View>
          )}
        </Formik>
      </Screen>
    );
  }

  private handleSubmit = (values: IEditUserFormFields, { setSubmitting }: IHandleSubmitProps) => {
    this.props.editUser(values.email, values.displayName, values.password);
    setSubmitting(false);
  };
}

const style = StyleSheet.create({
  wrapper: {
    height: "100%",
    width: "100%"
  }
});

const mapStateToProps = (state: IApplicationState) => ({
  displayName: state.currentUser!.displayName,
  email: state.currentUser!.email,
  isUpdating: state.currentUser!.isUpdating
});
const mapDispatchToProps = (dispatch: ThunkDispatch<IApplicationState, void, AnyAction>) => ({
  editUser: (email: string, displayName: string, password: string) => dispatch(editUser(email, displayName, password))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountScreen as any);
