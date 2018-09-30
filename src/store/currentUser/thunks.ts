import { History } from "history";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

import { IApplicationState } from "../";
import * as API from "../../api";
import { loginSuccess } from "./actions";
import { ICurrentUser } from "./types";

/** Sends login details to the backend and sets the current user with auth token (if no error)
 *  Takes `history` as an argument in order to redirect after a successful login
 */
export const login = (email: string, password: string, history: History) => (
  dispatch: ThunkDispatch<IApplicationState, void, AnyAction>
) => {
  API.login(email, password).then(response => {
    // TODO: handle login errors
    dispatch(loginSuccess({ id: (response as ICurrentUser).id, email, token: (response as ICurrentUser).token }));
    // We logged in, now redirect to the group overview
    history.push("/groups");
  });
};
