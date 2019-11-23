import { initialState } from "../initialState";
import { START_LOADING, STOP_LOADING } from "../actionTypes";
import { LoadingActions } from "../actions/loading.action";

export function loadingReducer(state = initialState, action: LoadingActions) {
  switch (action.type) {
    case START_LOADING:
      return { ...state, loading: true };
    case STOP_LOADING:
      return { ...state, loading: true };
    default:
      return state;
  }
}
