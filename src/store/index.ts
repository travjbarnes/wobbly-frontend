import { combineReducers } from "redux";

import currentUserReducer from "./currentUser/reducer";
import { ICurrentUser } from "./currentUser/types";
import entitiesReducer from "./entities/reducer";
import { IEntitiesState } from "./entities/types";

export interface IApplicationState {
  readonly currentUser: ICurrentUser | null;
  readonly entities: IEntitiesState;
}

export const rootReducer = combineReducers<IApplicationState>({
  currentUser: currentUserReducer,
  entities: entitiesReducer
});
