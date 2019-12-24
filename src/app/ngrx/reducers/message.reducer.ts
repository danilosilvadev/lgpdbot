import { initialState } from "../initialState";
import { SPANISH_MESSAGE, ENGLISH_MESSAGE } from "../actionTypes";
import { MessageChangeActions } from "../actions/message.action";

export function messageReducer(
  state = initialState,
  action: MessageChangeActions
) {
  switch (action.type) {
    case SPANISH_MESSAGE:
      return { ...state, message: "holla mundo" };
    case ENGLISH_MESSAGE:
      return { ...state, message: "hello world" };
    default:
      return state;
  }
}
