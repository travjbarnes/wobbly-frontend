import { combineReducers, Reducer, AnyAction } from "redux";

import { IAuthState } from "./auth/types";
import entitiesReducer from "./entities/reducer";
import { IEntitiesState } from "./entities/types";
import authReducer from "./auth/reducer";
import { createAction } from "typesafe-actions";

export interface IApplicationState {
  readonly auth: IAuthState;
  readonly entities: IEntitiesState;
}

enum IRootActionType {
  RESET_APP = "RESET_APP"
}
export const resetAppAction = createAction(IRootActionType.RESET_APP);

const appReducer = combineReducers<IApplicationState>({
  auth: authReducer,
  entities: entitiesReducer
});

/**
 * A slightly unusual root reducer. `appReducer` is what we'd usually call the root, but setting it up in this way
 * allows us to reset the entire state without having to handle it in each subreducer.
 * https://alligator.io/redux/reset-state-redux/
 */
export const rootReducer: Reducer<IApplicationState, AnyAction> = (state, action) => {
  if (action.type === IRootActionType.RESET_APP) {
    state = undefined;
  }
  return appReducer(state, action);
};
