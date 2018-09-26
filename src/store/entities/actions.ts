import { action } from "typesafe-actions";

import { EntitiesActionType, IUser } from "./types";

export const userRequest = (id: number) => action(EntitiesActionType.USER_REQUEST, id);
export const userSuccess = (data: IUser) => action(EntitiesActionType.USER_SUCCESS, data);
export const userFailure = (error: Error) => action(EntitiesActionType.USER_FAILURE, error);
