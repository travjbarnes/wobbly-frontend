import { ActionType } from "typesafe-actions";

import * as entitiesActions from "./actions";

export const enum EntitiesActionType {
  // Fetches information about a user
  FETCH_USER_REQUEST = "FETCH_USER_REQUEST",
  FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS",
  FETCH_USER_FAILURE = "FETCH_USER_FAILURE",
  // Fetches information about a group
  FETCH_GROUP_REQUEST = "FETCH_GROUP_REQUEST",
  FETCH_GROUP_SUCCESS = "FETCH_GROUP_SUCCESS",
  FETCH_GROUP_FAILURE = "FETCH_GROUP_FAILURE"
}

// Users
export interface IUser {
  id: number;
  displayName: string;
  // image: ...
}
interface IUsers {
  [id: number]: IUser;
}

// Groups
export interface IGroup {
  id: number;
  name: string;
  description: string;
}
interface IGroups {
  [id: number]: IGroup;
}

export interface IEntitiesState {
  readonly usersById: IUsers;
  readonly groupsById: IGroups;
}

export type EntitiesAction = ActionType<typeof entitiesActions>;
