import { Action } from "@ngrx/store";
import { COOKIE_ACTION_TYPES } from "../actionTypes";
import { Cookie } from "../../models/cookie.model";

export class SetCookies implements Action {
  constructor(readonly payload: Cookie[]) {}
  readonly type = COOKIE_ACTION_TYPES.SET_COOKIES;
}

// TODO: The below constructors need to delivery the correct payloads

export class AddCookie implements Action {
  constructor(readonly payload: Cookie[]) {}

  readonly type = COOKIE_ACTION_TYPES.ADD_COOKIE;
}

export class RemoveCookie implements Action {
  constructor(readonly payload: Cookie[]) {}

  readonly type = COOKIE_ACTION_TYPES.REMOVE_COOKIE;
}

export class UpdateCookie implements Action {
  constructor(readonly payload: Cookie[]) {}

  readonly type = COOKIE_ACTION_TYPES.UPDATE_COOKIE;
}

export const cookieActions = {
  SetCookies,
  AddCookie,
  RemoveCookie,
  UpdateCookie
};

export type cookieActionTypes =
  | SetCookies
  | AddCookie
  | RemoveCookie
  | UpdateCookie;
