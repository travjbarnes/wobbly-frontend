import { IErrors } from "../types";

export default function validateSignup(valuesDict: any) {
  const keys = Object.keys(valuesDict);
  const errors: IErrors = {};
  // If email is not present or badly formatted then return error
  if (keys.includes("email") && !valuesDict.email) {
    errors.email = "Email address is required";
    // TODO: find a library for email validation
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]$/i.test(valuesDict.email)) {
    errors.email = "Invalid email address";
  }
  if (keys.includes("password") && !valuesDict.password) {
    errors.password = "Password is required";
  }
  if (keys.includes("passwordConf") && !valuesDict.passwordConf) {
    errors.passwordConf = "Password confirmation is required";
  }
  if (
    keys.includes("passwordConf") &&
    keys.includes("password") &&
    valuesDict.passwordConf &&
    valuesDict.password &&
    valuesDict.passwordConf !== valuesDict.password
  ) {
    errors.password = "Passwords must match";
    errors.passwordConf = "";
  }
  return errors;
}
