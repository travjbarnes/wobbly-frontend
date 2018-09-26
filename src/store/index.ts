import { combineReducers } from "redux";

import entitiesReducer from "./entities/reducer";
import { IEntitiesState } from "./entities/types";

export interface IApplicationState {
  entities: IEntitiesState;
}

export const rootReducer = combineReducers<IApplicationState>({
  entities: entitiesReducer
});
