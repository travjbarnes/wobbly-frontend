export interface IEditUserFormFields {
  // TODO: profile image
  displayName: string;
  email: string;
  password: string;
}

export interface IHandleSubmitProps {
  setSubmitting: (isSubmitting: boolean) => void;
}
