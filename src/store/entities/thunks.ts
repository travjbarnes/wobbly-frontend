import { Dispatch } from "redux";

import * as API from "../../api";
import { userFailure, userRequest, userSuccess } from "./actions";

export const fetchUser = (id: number) => (dispatch: Dispatch) => {
  dispatch(userRequest(id));
  API.getUser(id)
    .then(response => {
      // fun fact: the response gets returned when all headers have loaded,
      // so `.json()` returns a promise for when the body has loaded, too
      return response.json();
    })
    .then(json => {
      dispatch(userSuccess(json));
    })
    .catch(error => {
      dispatch(userFailure(error));
    });
};
