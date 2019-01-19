export interface IEditUserFormFields {
  // TODO: profile image
  // TODO: change password
  email: string;
  displayName: string;
}

export interface IHandleSubmitProps {
  setSubmitting: (isSubmitting: boolean) => void;
}
