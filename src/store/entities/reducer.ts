import { Reducer } from "redux";
import { ActionType } from "typesafe-actions";

import * as entities from "./actions";
import { EntitiesActionType, IEntitiesState } from "./types";

export type EntitiesAction = ActionType<typeof entities>;
const initialState: IEntitiesState = {
  users: {},
  loadingUserIds: [],
  userErrors: {}
};
const entitiesReducer: Reducer<IEntitiesState> = (state = initialState, action) => {
  switch (action.type) {
    case EntitiesActionType.USER_REQUEST:
      return { ...state, loadingUserIds: [...state.loadingUserIds, action.payload] };
    case EntitiesActionType.USER_SUCCESS:
      return { ...state, users: { ...state.users, [action.payload.id]: action.payload } };
    case EntitiesActionType.USER_FAILURE:
      return { ...state, userErrors: { ...state.userErrors, [action.payload.id]: action.payload } };
    default:
      return state;
  }
};

export default entitiesReducer;
