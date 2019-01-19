import { ICreateOrUpdateUserErrors } from "../../../api/types";

// The different views contained in `LoginScreen`
export enum LoginScreenView {
  WELCOME,
  LOGIN,
  SIGNUP
}

// Component props/state
export interface ILoginScreenProps {
  loginError?: string;
  signupErrors?: ICreateOrUpdateUserErrors;
  login: (email: string, password: string) => void;
  signUp: (email: string, displayName: string, password: string) => void;
}
export interface ILoginScreenState {
  view: LoginScreenView;
  email?: string;
}

// Form field types
export interface ILoginFormFields {
  email: string;
  password: string;
}

export interface ISignupFormFields {
  email: string;
  displayName: string;
  password: string;
  passwordConfirmation: string;
}
