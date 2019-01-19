import { getType } from "typesafe-actions";

import { IEntitiesState, EntitiesAction } from "./types";
import { Reducer } from "redux";
import { fetchUserAction } from "./actions";

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
