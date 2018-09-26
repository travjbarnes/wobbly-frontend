export const enum EntitiesActionType {
  // Fetches information about the current user
  USER_REQUEST = "USER_REQUEST",
  USER_SUCCESS = "USER_SUCCESS",
  USER_FAILURE = "USER_FAILURE",
  // Fetches information about a group
  GROUP_REQUEST = "GROUP_REQUEST",
  GROUP_SUCCESS = "GROUP_SUCCESS"
}

export interface IUser {
  id: string;
  displayName: string;
}

interface IUsers {
  [id: number]: IUser;
}

interface IUserErrors {
  // TODO: we'll want to use our own custom error response type
  [id: number]: Error;
}

export interface IEntitiesState {
  readonly users: IUsers;
  readonly loadingUserIds: number[];
  readonly userErrors: IUserErrors;
}
