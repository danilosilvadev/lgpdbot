import { Action } from "@ngrx/store";
import { SET_USER_STATUS } from "../actionTypes";

interface UserStatus {
  name: string;
  email: string;
  isVerified: boolean;
  userId: string;
}

export class SetUserStatus implements Action {
  constructor(readonly payload: UserStatus) {}

  readonly type = SET_USER_STATUS;
}

export type UserActions = SetUserStatus;
