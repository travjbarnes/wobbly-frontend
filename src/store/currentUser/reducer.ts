import { Reducer } from "redux";

import { CurrentUserActionType, ICurrentUser } from "./types";

const currentUserReducer: Reducer<ICurrentUser | null> = (state = null, action) => {
  switch (action.type) {
    case CurrentUserActionType.LOGIN_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
export default currentUserReducer;
