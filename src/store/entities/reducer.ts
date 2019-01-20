import { Reducer } from "redux";
import { getType } from "typesafe-actions";

import { fetchUserAction } from "./actions";
import { EntitiesAction, IEntitiesState } from "./types";

const initialState: IEntitiesState = {
  usersById: {},
  groupsById: {}
};

const entitiesReducer: Reducer<IEntitiesState, EntitiesAction> = (state = initialState, action) => {
  switch (action.type) {
    // Fetch user
    case getType(fetchUserAction.request):
      return state; // TODO
    case getType(fetchUserAction.success):
      return { ...state, usersById: { ...state.usersById, [action.payload.id]: action.payload } };
    case getType(fetchUserAction.failure):
    default:
      return state;
  }
};

export default entitiesReducer;
