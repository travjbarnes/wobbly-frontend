import { createAsyncAction } from "typesafe-actions";

import { EntitiesActionType, IUser } from "./types";

export const fetchUserAction = createAsyncAction(
  EntitiesActionType.FETCH_USER_REQUEST,
  EntitiesActionType.FETCH_USER_SUCCESS,
  EntitiesActionType.FETCH_USER_FAILURE
)<number, IUser, Error>();
