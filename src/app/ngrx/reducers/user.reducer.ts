import { initialState } from "../initialState";
import { SET_USER_STATUS } from "../actionTypes";
import { UserActions } from "../actions/user.action";

export function userReducer(state = initialState, action: UserActions) {
  switch (action.type) {
    case SET_USER_STATUS:
      return {
        ...state,
        user: {
          ...state.user,
          status: {
            ...action.payload
          }
        }
      };
    default:
      return state;
  }
}
