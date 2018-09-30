import { History } from "history";
import { RouteComponentProps } from "react-router";

// The different views contained in `LoginScreen`
export enum LoginScreenView {
  WELCOME,
  LOGIN,
  SIGNUP
}

// Component props/state
export interface ILoginScreenProps extends RouteComponentProps {
  login: (email: string, password: string, history: History) => void;
}
export interface ILoginScreenState {
  view: LoginScreenView;
  email?: string;
}

// Form field types
export interface ILoginFormFields {
  email?: string;
  password?: string;
}

export interface ISignupFormFields {
  email?: string;
  password?: string;
  passwordConfirmation?: string;
}
