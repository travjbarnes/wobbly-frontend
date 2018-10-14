import { Reducer } from "redux";

import { CurrentUserActionType, ICurrentUser } from "./types";

const currentUserReducer: Reducer<ICurrentUser | null> = (state = null, action) => {
  switch (action.type) {
    case CurrentUserActionType.LOGIN_SUCCESS:
      return action.payload;
    case CurrentUserActionType.USER_EDIT_REQUEST:
      return { ...state, isUpdating: true };
    case CurrentUserActionType.USER_EDIT_SUCCESS:
      return { ...state, ...action.payload, isUpdating: false };
    case CurrentUserActionType.USER_EDIT_FAILURE:
      return { ...state, isUpdating: false };
    default:
      return state;
  }
};
export default currentUserReducer;
