import { initialState } from "../initialState";
import { COOKIE_ACTION_TYPES } from "../actionTypes";
import { cookieActionTypes } from "../actions/cookie.action";

export function cookieReducer(state = initialState, action: cookieActionTypes) {
  switch (action.type) {
    case COOKIE_ACTION_TYPES.SET_COOKIES:
      return { ...state, cookies: action.payload };
    case COOKIE_ACTION_TYPES.ADD_COOKIE:
      return { ...state };
    default:
      return state;
  }
}
