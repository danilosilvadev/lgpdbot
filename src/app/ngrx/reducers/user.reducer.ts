import { initialState } from "../initialState";
import { SET_USER_STATUS } from "../actionTypes";
import { UserActions } from "../actions/user.action";

export function userReducer(state = initialState.user, action: UserActions) {
  switch (action.type) {
    case SET_USER_STATUS:
      return action.payload;
    default:
      return state;
  }
}
