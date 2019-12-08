import { Action } from "@ngrx/store";
import { SET_USER_STATUS } from "../actionTypes";
import { Domain } from "../../models/domain.model";

interface UserStatus {
  name: string;
  email: string;
  isVerified: boolean;
  uid: string;
  domains: Domain[];
}

export class SetUserStatus implements Action {
  constructor(readonly payload: UserStatus) {}

  readonly type = SET_USER_STATUS;
}

export type UserActions = SetUserStatus;
