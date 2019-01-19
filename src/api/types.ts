export interface ILoginResponse {
  auth_token: string;
}

/** Public fields of any user. */
export interface IUser {
  id: number;
  displayName: string;
  // image:
}

/** These are fields that only the user themselves can see. */
export interface IOwnUser extends IUser {
  email: string;
}

export interface ICreateOrUpdateUserErrors {
  // A list of the errors for each field
  [field: string]: string[];
}

// This will always be a single-element list with the string
// "Unable to login with provided credentials".
export interface ILoginErrors {
  non_field_errors: string[];
}

// TODO: handle more typings of errors
// /**
//  * An error may look like so:
//  * {
//  *   "detail": "Authentication credentials were not provided."
//  * }
//  */
// export interface IErrorDetail {
//   detail: string;
// }
